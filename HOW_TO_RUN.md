# 🚀 How to Run the Shoe Store Website

## Quick Start (3 Steps!)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start the Server
```bash
npm run dev
```

### Step 3: Open in Browser
Open: **http://localhost:3000**

That's it! 🎉

---

## Detailed Instructions

### Prerequisites

Make sure you have **Node.js** installed:
- Download from: https://nodejs.org/
- Install Node.js 18 or higher
- This also installs `npm` (Node Package Manager)

### Verify Installation

Open PowerShell or Command Prompt and check:
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show version number
```

### Installation Steps

1. **Open Terminal/PowerShell**
   - Navigate to the project folder:
   ```bash
   cd "C:\Users\Pratik Mahatara\Desktop\workspace"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install all required packages (takes 1-2 minutes)

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   You should see:
   ```
   ▲ Next.js 14.0.4
   - Local:        http://localhost:3000
   ```

4. **Open Browser**
   - Open Chrome, Firefox, Edge, or any browser
   - Go to: **http://localhost:3000**
   - You should see the Shoe Store homepage! 👟

---

## 🎯 What You'll See

- **Home Page**: Hero section with featured products
- **Products Page**: Browse all shoes
- **Product Details**: Click any shoe to see details
- **Shopping Cart**: Add items and manage your cart

---

## 🛑 To Stop the Server

Press `Ctrl + C` in the terminal where the server is running.

---

## 🐛 Troubleshooting

### "npm is not recognized"
- Make sure Node.js is installed
- Restart your terminal after installing Node.js
- Check installation: `node --version`

### "Port 3000 already in use"
- Another app is using port 3000
- Use a different port: `npm run dev -- -p 3001`
- Then open: http://localhost:3001

### "Module not found" errors
- Delete `node_modules` folder
- Delete `package-lock.json` file
- Run `npm install` again

### Images not loading
- Check your internet connection (uses Unsplash images)
- Images are loaded from external URLs

### Page shows blank or errors
- Check the terminal for error messages
- Make sure all dependencies installed correctly
- Try: `npm install` again

---

## 📝 Next Steps

- **Customize Products**: Edit `lib/data.ts` to add your own shoes
- **Change Colors**: Modify `app/globals.css`
- **Add Features**: Check the README.md for enhancement ideas

---

## ✅ Quick Command Reference

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

**Enjoy your Shoe Store! 👟**
