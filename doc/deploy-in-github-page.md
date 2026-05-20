## Deploy the App to GitHub Pages

### 1. Install deploy tool
```bash
npm install --save-dev gh-pages
```
### 2. Edit vite.config.ts:

export default defineConfig({
  base: '/analytics-engine/',
  plugins: [react(), tailwindcss()],
})

### 3. Add deploy script
Edit package.json:
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "gh-pages -d dist"
}

### 4. Build the APP
npm run build

### 5. Deploy
npm run deploy


### 6. GitHub Pages settings
Repository → Settings → Pages
Source: gh-pages branch
Folder: / (root)

Wait few mins then check the live url 
### 7. Live URL
https://abdursujon.github.io/analytics-engine/