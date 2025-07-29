# Supabase Authentication Setup Guide

This guide will help you set up Supabase authentication for your OneScale React application.

## 🚀 Quick Start

### 1. Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `onescale-auth` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to your users
5. Click "Create new project"

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

### 3. Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Configure Google OAuth (Optional but Recommended)

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Find **Google** and click **Enable**
3. You'll need to create a Google OAuth application:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Google+ API
   - Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
   - Set application type to **Web application**
   - Add authorized redirect URIs:
     - `https://your-project-id.supabase.co/auth/v1/callback`
     - `http://localhost:5173/auth/callback` (for development)
4. Copy the **Client ID** and **Client Secret** from Google
5. Paste them into the Google provider settings in Supabase

### 5. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/login`

3. Try signing in with Google (if configured) or check the console for any errors

## 🔧 Project Structure

```
src/
├── contexts/
│   └── AuthContext.jsx          # Authentication state management
├── components/
│   ├── Login.jsx                # Login page
│   ├── Dashboard.jsx            # Protected dashboard
│   └── ProtectedRoute.jsx       # Route protection component
├── lib/
│   └── supabaseClient.js        # Supabase client configuration
└── App.jsx                      # Updated with auth routes
```

## 🛡️ Security Features

- **Protected Routes**: `/dashboard` is only accessible to authenticated users
- **Automatic Redirects**: Unauthenticated users are redirected to `/login`
- **Session Management**: Auth state is managed globally via React Context
- **Loading States**: Proper loading indicators during auth checks

## 🔄 Authentication Flow

1. **Unauthenticated User**:
   - Visits `/dashboard` → Redirected to `/login`
   - Signs in with Google → Redirected to `/dashboard`

2. **Authenticated User**:
   - Can access `/dashboard` directly
   - Header shows "Dashboard" button instead of "Sign In"
   - Can sign out from dashboard

## 🐛 Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check that your `.env` file exists and has the correct variable names
   - Ensure the file is in the project root
   - Restart your development server

2. **"Invalid API key"**
   - Verify your Supabase URL and anon key are correct
   - Check that you copied the entire key (it should start with `eyJ`)

3. **Google OAuth not working**
   - Verify redirect URIs are correctly configured
   - Check that Google OAuth is enabled in Supabase
   - Ensure your Google Cloud project has the Google+ API enabled

4. **CORS errors**
   - Add your development URL to Supabase's allowed origins:
     - Go to **Settings** → **API**
     - Add `http://localhost:5173` to **Additional Allowed Origins**

## 📝 Next Steps

After setting up authentication, you can:

1. **Add more auth providers** (GitHub, Discord, etc.)
2. **Implement user profiles** and settings
3. **Add role-based access control**
4. **Create user-specific data storage**
5. **Add email verification**

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [React Router Documentation](https://reactrouter.com/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html) 