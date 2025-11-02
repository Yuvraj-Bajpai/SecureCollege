# Supabase "Invalid API Key" Troubleshooting

## Common Causes & Solutions

### 1. **Check Supabase Project Status**

Go to: https://supabase.com/dashboard/project/cfgtwyywgrhihqjkoilt

- Is the project **paused**? → Click "Restore"
- Is there a billing issue? → Check your plan
- Project not found? → Key is from wrong project

### 2. **Verify API Key is Latest**

1. Go to: https://supabase.com/dashboard/project/cfgtwyywgrhihqjkoilt/settings/api
2. Copy the **anon/public key** again
3. Replace in `.env.local`
4. Restart dev server

### 3. **Check Auth Configuration**

Go to: https://supabase.com/dashboard/project/cfgtwyywgrhihqjkoilt/auth/settings

**Must enable:**
- ✅ Email auth enabled
- ✅ Confirm email: OFF (for testing) or ON (production)
- ✅ Email rate limiting: Configured

**Site URL must be:**
```
http://localhost:3000
```

**Redirect URLs must include:**
```
http://localhost:3000/auth/callback
http://localhost:3001/auth/callback
```

### 4. **Check Auth Provider Setup**

Go to: https://supabase.com/dashboard/project/cfgtwyywgrhihqjkoilt/auth/providers

- Email provider enabled? ✅
- Password requirements met (min length, etc.)
- If using Google OAuth, is it configured?

### 5. **Verify Database is Running**

Go to: https://supabase.com/dashboard/project/cfgtwyywgrhihqjkoilt

- Database status: ✅ Active
- API status: ✅ Active

### 6. **Check Browser Console**

Open Developer Tools (F12) → Console tab → Look for:
- CORS errors
- Network errors
- Specific API error messages

### 7. **Test API Directly**

Run this in browser console (on your site):
```javascript
console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
```

Or use curl:
```bash
curl -X POST https://cfgtwyywgrhihqjkoilt.supabase.co/auth/v1/signup \
  -H "Content-Type: application/json" \
  -H "apikey: YOUR_ANON_KEY" \
  -d '{"email":"test@example.com","password":"testpassword"}'
```

### 8. **Clear Cache & Restart**

```bash
# Stop server
# Delete .next folder
rm -rf .next

# Restart
npm run dev
```

---

## Quick Fixes to Try

### Fix 1: Recreate .env.local
```bash
# Backup current
cp .env.local .env.local.backup

# Create fresh .env.local with:
NEXT_PUBLIC_SUPABASE_URL=https://cfgtwyywgrhihqjkoilt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<paste fresh key from dashboard>
```

### Fix 2: Verify Supabase SDK Version
```bash
npm list @supabase/supabase-js @supabase/auth-ui-react
```

Should show:
- `@supabase/supabase-js@^2.78.0`
- `@supabase/auth-ui-react@^0.4.7`

If not, reinstall:
```bash
npm install @supabase/supabase-js@latest @supabase/auth-ui-react@latest
```

### Fix 3: Check for Environment Variable Loading

Add to `app/layout.tsx` temporarily:
```tsx
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
```

---

## Still Not Working?

1. **Check Supabase Status**: https://status.supabase.com
2. **Supabase Docs**: https://supabase.com/docs/guides/auth
3. **Community Forum**: https://github.com/supabase/supabase/discussions

---

## Your Current Configuration

- **URL**: https://cfgtwyywgrhihqjkoilt.supabase.co ✅
- **Key**: Valid JWT format ✅
- **Next.js**: 14.2.5 ✅
- **Supabase SDK**: 2.78.0 ✅

**Most likely issue**: Redirect URL or email settings in Supabase dashboard.

