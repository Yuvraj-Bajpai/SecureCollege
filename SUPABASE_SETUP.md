# Supabase Setup - Invalid API Key Fix

## Issue

The `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your `.env.local` appears to be incomplete or corrupted.

## Solution

### Step 1: Get Fresh Credentials from Supabase

1. Go to https://supabase.com/dashboard
2. Select your project: `cfgtwyywgrhihqjkoilt`
3. Click **Settings** (gear icon in sidebar)
4. Click **API** under Project Settings

### Step 2: Copy the Correct Key

You need to copy:
- **Project URL**: Should be `https://cfgtwyywgrhihqjkoilt.supabase.co`
- **anon/public key**: This is a **VERY LONG** JWT token

⚠️ **Important**: The anon key is EXTREMELY long (200+ characters). Make sure you copy the ENTIRE key!

### Step 3: Update .env.local

Open `C:\Users\Lenovo\OneDrive\Documents\SecureCollege\.env.local` and replace:

```env
NEXT_PUBLIC_SUPABASE_URL=https://cfgtwyywgrhihqjkoilt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_the_complete_key_here
```

Make sure:
- ✅ No line breaks in the middle of the key
- ✅ No spaces before/after the `=`
- ✅ The entire key is on one line
- ✅ No quotes around the values

### Step 4: Restart Dev Server

After updating `.env.local`:
1. Stop the dev server (Ctrl+C in terminal)
2. Run: `npm run dev`
3. Refresh your browser

### Step 5: Enable Email Auth (If Not Already Done)

In Supabase Dashboard:
1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure settings:
   - Enable "Confirm email" if you want email verification
   - Set "Secure email change" if needed
4. Click **Save**

### Step 6: Test Sign Up

Try signing up again with a test email. You should receive a confirmation email if email verification is enabled.

---

## Common Issues

### "Invalid API Key"
- Key is incomplete (check length - should be 200+ characters)
- Key has line breaks
- Wrong key copied (make sure it's the "anon public" key, not the service_role key)

### "Email already exists"
- Good! User is already registered
- Try logging in instead

### "Email not confirmed"
- Check your inbox for verification email
- Or disable email confirmation in Supabase settings for testing

---

## Verify Setup

After fixing, test:
- ✅ Sign up with new email
- ✅ Login with existing email
- ✅ Reset password (if needed)
- ✅ Google OAuth (if configured)

**Status**: Waiting for you to update the anon key in `.env.local`

