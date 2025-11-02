# Google OAuth Setup Guide

## Step-by-Step Instructions

### Step 1: Create Google Cloud Project

1. Go to https://console.cloud.google.com
2. Sign in with your Google account
3. Click "Select a project" → "New Project"
4. Project name: `Secure College` (or any name)
5. Click "Create"
6. Wait for project to be created

### Step 2: Configure OAuth Consent Screen

1. In Google Cloud Console, go to **APIs & Services** → **OAuth consent screen**
2. Choose "External" (unless you have Google Workspace)
3. Click "Create"
4. Fill in:
   - **App name**: `Secure College`
   - **User support email**: Your email
   - **Developer contact**: Your email
5. Click "Save and Continue"
6. **Scopes**: Leave default, click "Save and Continue"
7. **Test users**: Add your email (optional for testing)
8. Click "Save and Continue"
9. Click "Back to Dashboard"

### Step 3: Create OAuth Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click "Create Credentials" → "OAuth client ID"
3. Application type: **Web application**
4. Name: `Secure College Web Client`
5. **Authorized JavaScript origins**:
   ```
   http://localhost:3000
   http://localhost:3001
   ```
   (Add more as needed)
6. **Authorized redirect URIs**:
   ```
   http://localhost:3000/auth/callback
   http://localhost:3001/auth/callback
   ```
7. Click "Create"
8. **IMPORTANT**: Copy the **Client ID** and **Client Secret**

### Step 4: Configure in Supabase

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Authentication** → **Providers**
4. Find **Google** and click to enable
5. Paste:
   - **Client ID**: (from Google Cloud)
   - **Client Secret**: (from Google Cloud)
6. Click "Save"

### Step 5: Add Production URLs (When Ready)

Once deployed to Vercel, add your production URL:

**In Google Cloud Console**:
- Authorized JavaScript origins:
  ```
  https://securecollege.in
  https://www.securecollege.in
  ```
- Authorized redirect URIs:
  ```
  https://securecollege.in/auth/callback
  https://www.securecollege.in/auth/callback
  ```

**In Supabase** (Authentication → URL Configuration):
- Site URL: `https://securecollege.in`
- Redirect URLs: Add your domain

### Step 6: Test

1. Visit http://localhost:3000/login
2. Click "Sign in with Google"
3. You should be redirected to Google login
4. After login, you'll be redirected back

---

## Troubleshooting

### "redirect_uri_mismatch" Error
- Check that redirect URIs match exactly in Google Cloud Console
- Include both http://localhost:3000 and https://yourdomain.com

### "access_denied" Error
- Make sure your email is added as a test user (if app is in testing mode)
- Publish your OAuth app in Google Cloud Console

### No Google Button Showing
- Verify Supabase Google provider is enabled
- Check that credentials are saved correctly

---

## Production Checklist

- [ ] Google Cloud project created
- [ ] OAuth consent screen configured
- [ ] OAuth credentials created
- [ ] Supabase Google provider enabled
- [ ] Localhost URLs added
- [ ] Production URLs added
- [ ] Test login works
- [ ] Production login works

---

**Once configured, the "Sign in with Google" button will appear automatically!**

