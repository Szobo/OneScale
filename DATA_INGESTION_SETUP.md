# Data Ingestion Setup Guide

This guide will help you set up the data ingestion pipeline for OneScale.

## 🚀 Quick Start

### 1. Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Drive API (for Excel file linking)
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret

# OneDrive API (Microsoft Graph) - for future implementation
VITE_MICROSOFT_CLIENT_ID=your_microsoft_client_id
VITE_MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret
```

### 2. Supabase Database Setup

Run the following SQL commands in your Supabase SQL editor:

#### Create Tables

```sql
-- Create linked_files table for Excel files linked to cloud providers
CREATE TABLE linked_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_id TEXT NOT NULL, -- Cloud provider file ID
  provider TEXT NOT NULL CHECK (provider IN ('gdrive', 'onedrive')),
  file_name TEXT NOT NULL,
  file_url TEXT,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create file_uploads table for manually uploaded files
CREATE TABLE file_uploads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Path in Supabase Storage
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  public_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Create Indexes

```sql
-- Indexes for linked_files
CREATE INDEX idx_linked_files_user_id ON linked_files(user_id);
CREATE INDEX idx_linked_files_provider ON linked_files(provider);

-- Indexes for file_uploads
CREATE INDEX idx_file_uploads_user_id ON file_uploads(user_id);
CREATE INDEX idx_file_uploads_file_type ON file_uploads(file_type);
```

#### Enable Row Level Security

```sql
-- Enable RLS on linked_files
ALTER TABLE linked_files ENABLE ROW LEVEL SECURITY;

-- RLS policies for linked_files
CREATE POLICY "Users can view their own linked files" ON linked_files
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own linked files" ON linked_files
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own linked files" ON linked_files
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own linked files" ON linked_files
  FOR DELETE USING (auth.uid() = user_id);

-- Enable RLS on file_uploads
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- RLS policies for file_uploads
CREATE POLICY "Users can view their own file uploads" ON file_uploads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own file uploads" ON file_uploads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own file uploads" ON file_uploads
  FOR DELETE USING (auth.uid() = user_id);
```

### 3. Supabase Storage Setup

#### Create Storage Buckets

```sql
-- Create linked-excel bucket for Excel files from cloud providers
INSERT INTO storage.buckets (id, name, public) VALUES ('linked-excel', 'linked-excel', true);

-- Create manual-uploads bucket for manually uploaded files
INSERT INTO storage.buckets (id, name, public) VALUES ('manual-uploads', 'manual-uploads', true);
```

#### Storage Policies

```sql
-- Policy for linked-excel bucket
CREATE POLICY "Users can upload to linked-excel" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'linked-excel' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their linked-excel files" ON storage.objects
  FOR SELECT USING (bucket_id = 'linked-excel' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their linked-excel files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'linked-excel' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their linked-excel files" ON storage.objects
  FOR DELETE USING (bucket_id = 'linked-excel' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Policy for manual-uploads bucket
CREATE POLICY "Users can upload to manual-uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'manual-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their manual-uploads files" ON storage.objects
  FOR SELECT USING (bucket_id = 'manual-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their manual-uploads files" ON storage.objects
  FOR UPDATE USING (bucket_id = 'manual-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their manual-uploads files" ON storage.objects
  FOR DELETE USING (bucket_id = 'manual-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### 4. Google Drive API Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Set application type to **Web application**
6. Add authorized redirect URIs:
   - `http://localhost:5173` (for development)
   - `https://your-domain.com` (for production)
7. Copy the **Client ID** and **Client Secret**
8. Add them to your `.env` file

### 5. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/login`

3. Sign in with Google

4. Go to the dashboard and click "Manage Data" on the Data Ingestion card

5. Test the functionality:
   - Upload a file manually
   - Link a Google Drive Excel file
   - Sync linked files

## 🔧 Features

### Manual Upload
- Supports CSV, PDF, JSON, and Excel files
- Maximum file size: 10MB
- Drag-and-drop interface
- Progress indicators
- File validation

### Cloud Storage Linking
- Google Drive integration (fully implemented)
- OneDrive integration (placeholder for future)
- OAuth 2.0 authentication
- File selection modal
- Automatic syncing

### File Management
- View uploaded files
- Delete files
- Pagination (10 items per page)
- File metadata display
- Public URL generation

## 🛡️ Security Features

- Row Level Security (RLS) on all tables
- User-specific file access
- File type validation
- Size limits
- Secure OAuth flow

## 🔄 API Endpoints

The following API functions are available in `src/lib/api.js`:

- `uploadFile(file)` - Upload a file manually
- `getUserFiles(page, limit)` - Get user's uploaded files
- `deleteFile(fileId)` - Delete a file
- `getLinkedFiles(page, limit)` - Get linked files
- `syncLinkedFile(fileId)` - Sync a linked file
- `deleteLinkedFile(fileId)` - Delete a linked file
- `googleDriveAPI.init()` - Initialize Google Drive API
- `googleDriveAPI.listFiles()` - List Google Drive files
- `googleDriveAPI.downloadFile(fileId, fileName)` - Download from Google Drive

## 🐛 Troubleshooting

### Common Issues:

1. **"Google API not loaded"**
   - Check that the Google API script is loaded in `index.html`
   - Verify your Google Client ID is correct

2. **"User not authenticated"**
   - Make sure the user is signed in
   - Check Supabase authentication setup

3. **"File upload failed"**
   - Verify Supabase storage buckets are created
   - Check storage policies
   - Ensure file size is under 10MB

4. **"RLS policy violation"**
   - Verify RLS policies are correctly set up
   - Check that user is authenticated

## 📝 Next Steps

After setting up the basic data ingestion:

1. **Implement OneDrive integration** using Microsoft Graph API
2. **Add background sync** for linked files
3. **Implement file processing** (CSV parsing, PDF text extraction)
4. **Add data validation** and cleaning
5. **Create data preview** functionality
6. **Add bulk operations** (upload multiple files)
7. **Implement file versioning**

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Google Drive API Documentation](https://developers.google.com/drive/api)
- [Microsoft Graph API Documentation](https://docs.microsoft.com/en-us/graph/)
- [React Router Documentation](https://reactrouter.com/) 