# analytics-engine — Vite + React + TypeScript + Tailwind Setup Guide


## 1. Clone the Project Directory
```bash
git clone https://github.com/abdursujon/analytics-engine-ui.git
```

## 2. Create react app with typeScript and add node.js dependency 
```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D typescript@latest
```

**Project Flow**
- index.html → main.tsx → App.tsx → components
- Run Development Server
```bash
npm run dev
```
Open in browser:
http://localhost:5173

## 3. Pin React Versions (Avoid Tooling Mismatch)
```bash
npm uninstall react react-dom @types/react @types/react-dom
npm install react@18.2.0 react-dom@18.2.0
npm install -D @types/react@18.2.55 @types/react-dom@18.2.19
```

## 4. Add Tailwind CSS (Final UI Stack)
```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
tailwind.config.js should look like this

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
- Source index.css should contain tailwind required components a list below
src/index.css

@tailwind base;
@tailwind components;
@tailwind utilities;
src/main.tsx


Make sure to add this to your App.tsx :'import ./index.css'


## 5. Build & Preview
``bash
npm run build
npm run preview
```

## 6. Common Vite Cache Issues & Fixes
Light Reset
```bash
rm -rf node_modules/.vite
rm -f tsconfig.tsbuildinfo
rm -rf dist
npm install
npm run build
```

Full Clean Reset
```bash
pkill -f vite
rm -rf node_modules
rm -rf node_modules/.vite
rm -rf .vite
rm -rf dist
rm -rf .turbo
rm -rf .cache
rm -f package-lock.json
npm cache clean --force
npm install
npm run dev
```

## 7. Fix Broken Imports After Refactors
Example: lingering App.css references.
```bash
grep -R "App.css" .
sed -i "/App\.css/d" src/App.tsx
sed -i "/App\.css/d" src/components/Header.tsx
rm -f src/App.css
grep -R "App.css" src
```
## 8. Nuclear Fix When Build Keeps Failing
Overwrite a component to eliminate hidden imports.
```bash
cat > src/components/Header.tsx <<'EOF'

import logo from '../assets/favicon.png'

export default function Header() {
  return (
    <header className="flex items-center justify-center h-[120px]">
      <img src={logo} alt="analytics-engine Logo" className="h-12 w-12" />
    </header>
  )
}
EOF
```
Verify the reset worked 
```bash
sed -n '1,20p' src/components/Header.tsx
grep -R "@elastic/eui" src
```