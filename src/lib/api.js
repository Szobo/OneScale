import { supabase } from './supabaseClient'

// API Response wrapper
const apiResponse = (status, message, data = null) => ({
  status,
  message,
  data,
  timestamp: new Date().toISOString()
})

// Error handler
const handleError = (error, defaultMessage = 'An error occurred') => {
  console.error('API Error:', error)
  return apiResponse('error', error.message || defaultMessage)
}

// File validation
const validateFile = (file, allowedTypes = [], maxSize = 10 * 1024 * 1024) => {
  if (!file) {
    return { valid: false, error: 'No file provided' }
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    return { valid: false, error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` }
  }

  if (file.size > maxSize) {
    return { valid: false, error: `File too large. Maximum size: ${Math.round(maxSize / 1024 / 1024)}MB` }
  }

  return { valid: true }
}

// Get user session
const getUserSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session) {
    throw new Error('User not authenticated')
  }
  return session
}

// File Upload API
export const uploadFile = async (file, bucket = 'manual-uploads') => {
  try {
    const session = await getUserSession()
    const userId = session.user.id

    // Validate file
    const allowedTypes = [
      'text/csv',
      'application/pdf',
      'application/json',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ]
    
    const validation = validateFile(file, allowedTypes)
    if (!validation.valid) {
      return apiResponse('error', validation.error)
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${timestamp}_${file.name}`
    const filePath = `${userId}/${fileName}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      return handleError(error, 'Failed to upload file')
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    // Save to database
    const { data: dbData, error: dbError } = await supabase
      .from('file_uploads')
      .insert({
        user_id: userId,
        file_name: file.name,
        file_path: filePath,
        file_size: file.size,
        file_type: file.type,
        public_url: urlData.publicUrl
      })
      .select()
      .single()

    if (dbError) {
      return handleError(dbError, 'Failed to save file metadata')
    }

    return apiResponse('success', 'File uploaded successfully', {
      id: dbData.id,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      publicUrl: urlData.publicUrl,
      uploadedAt: dbData.created_at
    })

  } catch (error) {
    return handleError(error)
  }
}

// Get user's uploaded files
export const getUserFiles = async (page = 1, limit = 10) => {
  try {
    const session = await getUserSession()
    const userId = session.user.id

    const offset = (page - 1) * limit

    const { data, error, count } = await supabase
      .from('file_uploads')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      return handleError(error, 'Failed to fetch files')
    }

    return apiResponse('success', 'Files fetched successfully', {
      files: data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    })

  } catch (error) {
    return handleError(error)
  }
}

// Delete file
export const deleteFile = async (fileId) => {
  try {
    const session = await getUserSession()
    const userId = session.user.id

    // Get file info first
    const { data: file, error: fetchError } = await supabase
      .from('file_uploads')
      .select('*')
      .eq('id', fileId)
      .eq('user_id', userId)
      .single()

    if (fetchError || !file) {
      return apiResponse('error', 'File not found')
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('manual-uploads')
      .remove([file.file_path])

    if (storageError) {
      console.error('Storage deletion error:', storageError)
      // Continue with DB deletion even if storage deletion fails
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('file_uploads')
      .delete()
      .eq('id', fileId)
      .eq('user_id', userId)

    if (dbError) {
      return handleError(dbError, 'Failed to delete file')
    }

    return apiResponse('success', 'File deleted successfully')

  } catch (error) {
    return handleError(error)
  }
}

// Google Drive API utilities
export const googleDriveAPI = {
  // Initialize Google Drive API
  init: () => {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID
          }).then(resolve).catch(reject)
        })
      } else {
        reject(new Error('Google API not loaded'))
      }
    })
  },

  // Get user's Google Drive files
  listFiles: async () => {
    try {
      const auth2 = window.gapi.auth2.getAuthInstance()
      if (!auth2.isSignedIn.get()) {
        throw new Error('User not signed in to Google')
      }

      const response = await window.gapi.client.drive.files.list({
        pageSize: 50,
        fields: 'files(id,name,mimeType,modifiedTime,size)',
        q: "mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' or mimeType='application/vnd.ms-excel'"
      })

      return apiResponse('success', 'Files fetched successfully', response.result.files)
    } catch (error) {
      return handleError(error, 'Failed to fetch Google Drive files')
    }
  },

  // Download file from Google Drive
  downloadFile: async (fileId, fileName) => {
    try {
      const session = await getUserSession()
      const userId = session.user.id

      const response = await window.gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media'
      })

      // Convert response to blob
      const blob = new Blob([response.body], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })

      // Upload to Supabase Storage
      const timestamp = Date.now()
      const filePath = `${userId}/${timestamp}_${fileName}`

      const { data, error } = await supabase.storage
        .from('linked-excel')
        .upload(filePath, blob, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        return handleError(error, 'Failed to upload file from Google Drive')
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('linked-excel')
        .getPublicUrl(filePath)

      // Save to linked_files table
      const { data: dbData, error: dbError } = await supabase
        .from('linked_files')
        .upsert({
          user_id: userId,
          file_id: fileId,
          provider: 'gdrive',
          file_name: fileName,
          file_url: urlData.publicUrl,
          last_synced_at: new Date().toISOString()
        })
        .select()
        .single()

      if (dbError) {
        return handleError(dbError, 'Failed to save linked file')
      }

      return apiResponse('success', 'File synced successfully', {
        id: dbData.id,
        fileName: fileName,
        fileUrl: urlData.publicUrl,
        syncedAt: dbData.last_synced_at
      })

    } catch (error) {
      return handleError(error)
    }
  }
}

// OneDrive API utilities
export const oneDriveAPI = {
  // Initialize OneDrive API
  init: () => {
    return new Promise((resolve, reject) => {
      // OneDrive uses Microsoft Graph API
      // This would require Microsoft Graph SDK
      reject(new Error('OneDrive API not implemented yet'))
    })
  },

  // Placeholder for OneDrive implementation
  listFiles: async () => {
    return apiResponse('error', 'OneDrive integration not implemented yet')
  },

  downloadFile: async (fileId, fileName) => {
    return apiResponse('error', 'OneDrive integration not implemented yet')
  }
}

// Get linked files
export const getLinkedFiles = async (page = 1, limit = 10) => {
  try {
    const session = await getUserSession()
    const userId = session.user.id

    const offset = (page - 1) * limit

    const { data, error, count } = await supabase
      .from('linked_files')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      return handleError(error, 'Failed to fetch linked files')
    }

    return apiResponse('success', 'Linked files fetched successfully', {
      files: data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    })

  } catch (error) {
    return handleError(error)
  }
}

// Sync linked file
export const syncLinkedFile = async (fileId) => {
  try {
    const session = await getUserSession()
    const userId = session.user.id

    // Get linked file info
    const { data: linkedFile, error: fetchError } = await supabase
      .from('linked_files')
      .select('*')
      .eq('id', fileId)
      .eq('user_id', userId)
      .single()

    if (fetchError || !linkedFile) {
      return apiResponse('error', 'Linked file not found')
    }

    // Sync based on provider
    if (linkedFile.provider === 'gdrive') {
      return await googleDriveAPI.downloadFile(linkedFile.file_id, linkedFile.file_name)
    } else if (linkedFile.provider === 'onedrive') {
      return await oneDriveAPI.downloadFile(linkedFile.file_id, linkedFile.file_name)
    } else {
      return apiResponse('error', 'Unknown provider')
    }

  } catch (error) {
    return handleError(error)
  }
}

// Delete linked file
export const deleteLinkedFile = async (fileId) => {
  try {
    const session = await getUserSession()
    const userId = session.user.id

    // Get file info first
    const { data: file, error: fetchError } = await supabase
      .from('linked_files')
      .select('*')
      .eq('id', fileId)
      .eq('user_id', userId)
      .single()

    if (fetchError || !file) {
      return apiResponse('error', 'Linked file not found')
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('linked_files')
      .delete()
      .eq('id', fileId)
      .eq('user_id', userId)

    if (dbError) {
      return handleError(dbError, 'Failed to delete linked file')
    }

    return apiResponse('success', 'Linked file deleted successfully')

  } catch (error) {
    return handleError(error)
  }
} 