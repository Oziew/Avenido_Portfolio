# AVENIDO-Port — React Portfolio

A personal portfolio with interactive DotField background built with React.js.

## 🚀 How to Run in VS Code

1. Open the **AVENIDO-Port** folder in VS Code
2. Open the terminal (`Ctrl + ~`)
3. Run these commands:

```bash
# Install dependencies (only needed once)
npm install

# Start the development server
npm start
```

4. Your browser will open at **http://localhost:3000** automatically!

---

## 📁 File Structure

```
AVENIDO-Port/
├── public/
│   └── index.html           ← The HTML shell (don't edit much here)
├── src/
│   ├── components/
│   │   ├── DotField.js      ← ✨ Interactive dot background
│   │   └── DotField.css     ← Dot field container styles
│   ├── App.js               ← 🏠 Main page (ALL sections are here)
│   ├── App.css              ← 🎨 All section styles
│   ├── index.js             ← Entry point (mounts App)
│   └── index.css            ← Global base styles + CSS variables
└── package.json
```

---

## ✏️ How to Customise

### Change your name
Open `src/App.js` → find `Hi, I'm` → change **Avenido** to your name.

### Change your skills
Find the `SKILLS` array at the top of `src/App.js`:
```js
const SKILLS = [
  { icon: '⚛️', name: 'React.js', level: 85 },
  // add or edit entries here
];
```

### Change your projects
Find the `PROJECTS` array. Update `title`, `desc`, `tags`, `demo`, `code`.

### Change your certificates
Find the `CERTS` array. Update `badge` (emoji), `title`, `issuer`, `date`.

### Change accent color
Open `src/index.css` → edit `:root`:
```css
--accent:  #a855f7;  /* change this to any color */
--accent2: #7c3aed;
```

### Add a real profile photo
In `src/App.js`, replace:
```jsx
<div className="about-avatar">
  <span className="avatar-initials">AV</span>
</div>
```
with:
```jsx
<img src="/photo.jpg" alt="Avenido" className="about-avatar" />
```
Then put your `photo.jpg` inside the `public/` folder.

### Adjust the DotField background
In `src/App.js`, find `<DotField .../>` and change:
- `dotSpacing` → higher = fewer dots
- `bulgeStrength` → how strongly dots react to cursor
- `sparkle={true}` → enables random twinkling dots
