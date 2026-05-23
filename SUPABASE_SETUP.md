# Supabase Setup for OneScale Data Ingestion

## Database Schema

### 1. Create the `linked_files` table

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

-- Create index for faster queries
CREATE INDEX idx_linked_files_user_id ON linked_files(user_id);
CREATE INDEX idx_linked_files_provider ON linked_files(provider);

-- Enable RLS (Row Level Security)
ALTER TABLE linked_files ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own linked files" ON linked_files
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own linked files" ON linked_files
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own linked files" ON linked_files
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own linked files" ON linked_files
  FOR DELETE USING (auth.uid() = user_id);
```

### 2. Create the `file_uploads` table

```sql
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

-- Create index for faster queries
CREATE INDEX idx_file_uploads_user_id ON file_uploads(user_id);
CREATE INDEX idx_file_uploads_file_type ON file_uploads(file_type);

-- Enable RLS (Row Level Security)
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own file uploads" ON file_uploads
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own file uploads" ON file_uploads
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own file uploads" ON file_uploads
  FOR DELETE USING (auth.uid() = user_id);
```

## Storage Buckets

### 1. Create Storage Buckets

```sql
-- Create linked-excel bucket for Excel files from cloud providers
INSERT INTO storage.buckets (id, name, public) VALUES ('linked-excel', 'linked-excel', true);

-- Create manual-uploads bucket for manually uploaded files
INSERT INTO storage.buckets (id, name, public) VALUES ('manual-uploads', 'manual-uploads', true);
```

### 2. Storage Policies

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

## Environment Variables

Add these to your `.env` file:

```env
# Google Drive API
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret

# OneDrive API (Microsoft Graph)
VITE_MICROSOFT_CLIENT_ID=your_microsoft_client_id
VITE_MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret

# Supabase (already configured)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## API Setup

The API endpoints will be created in the `src/api/` directory and will handle:
- OAuth authentication with Google Drive and OneDrive
- File linking and syncing
- Manual file uploads
- Error handling and validation

## Next Steps

1. Run the SQL commands in your Supabase SQL editor
2. Set up the storage buckets and policies
3. Configure OAuth applications in Google Cloud Console and Microsoft Azure
4. Add the environment variables
5. Implement the API endpoints and UI components 