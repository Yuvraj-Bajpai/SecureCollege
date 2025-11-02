# How to Run Secure College Website

## Method 1: Using the Batch File (EASIEST)

1. Double-click `START_DEV_SERVER.bat` in the SecureCollege folder
2. **DO NOT CLOSE** the black window that opens
3. Wait 30 seconds for the server to start
4. Open your browser to: http://localhost:3000

**To Stop:** Press Ctrl+C in the black window, or close it

---

## Method 2: Using Terminal

### Windows PowerShell
1. Open PowerShell in the SecureCollege folder
2. Run: `npm run dev`
3. **DO NOT CLOSE** the terminal
4. Wait 30 seconds, then visit: http://localhost:3000

**To Stop:** Press Ctrl+C in the terminal

---

## Method 3: Using Command Prompt
1. Open Command Prompt in the SecureCollege folder
2. Run: `npm run dev`
3. **DO NOT CLOSE** the window
4. Wait 30 seconds, then visit: http://localhost:3000

---

## Important Notes

### ⚠️ Common Issues

**Issue:** "localhost refused to connect"
- **Solution:** Wait 30-40 seconds for the initial compile. The first load takes time.

**Issue:** Website stops when I close the terminal
- **Solution:** This is normal! You must keep the terminal/batch file window OPEN. Closing it stops the server.

**Issue:** Changes don't appear on the website
- **Solution:** Press Ctrl+F5 (hard refresh) to clear browser cache

**Issue:** npm command not found
- **Solution:** Node.js is not installed or not in PATH. Run `SETUP.bat` first.

---

## Quick Start Guide

1. ✅ Make sure Node.js is installed (run `setup.bat` if not)
2. ✅ Double-click `START_DEV_SERVER.bat`
3. ✅ Wait for "Ready" message in the window
4. ✅ Visit http://localhost:3000 in your browser
5. ✅ Keep the window open while using the website

---

## What's Running in the Background?

The dev server:
- Watches for file changes
- Recompiles automatically when you edit files
- Provides hot reloading
- Serves files on port 3000

**You must keep it running!**

---

## Need Help?

- Check `README.md` for full documentation
- Check `SETUP_INSTRUCTIONS.md` for setup help
- Make sure all dependencies are installed: `npm install`

