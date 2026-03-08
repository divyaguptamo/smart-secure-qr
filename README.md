# Smart Secure QR Generator

This repository contains two complementary applications for creating and working
with encrypted, password‑protected QR codes:

1. **Desktop application** (C + Win32/GDI+) – a Windows GUI tool for generation,
   encryption, saving, and history tracking of QR codes. Intended for an
   offline, native experience.
2. **Web application** (Python backend + React frontend) – a portable browser‑based
   UI that performs the same operations via a Flask API, with encryption,
   image export, and real‑time QR generation.

Both apps use AES encryption to protect the personal information embedded in
each QR code, requiring a password to decrypt the data. QR payloads are JSON
objects containing name, phone, email, and age fields.

---

## Features

- Password‑protected QR codes
- AES (Fernet) encryption of data, key derived with PBKDF2
- QR code generation (PNG/JPG) with desktop and web UIs
- Web QR scanner/clipboard decryption
- Downloadable QR images, form/history support
- React/Flask single‑page web frontend
- History stub (desktop) for tracking past codes

---

## Tech Stack

### Desktop app

- C (MSVC-compatible)
- Win32 API for windowing and controls
- GDI+ for rendering and image export
- AES encryption hooks (placeholder stubs)
- QR encode/decode stubs (e.g. libqrencode integration)

### Web app

- Python 3 with Flask (backend)
- `cryptography` package for Fernet/AES
- `qrcode` library for image generation
- React (Create React App) frontend with `axios` and `react-router`
- HTML/CSS for styling and animations

---

## Repository Layout

```
Smart Secure QR Generator/
├─ README.md            # this file
├─ Makefile             # MSVC build example for desktop
├─ .gitignore
├─ src/                 # desktop app sources
│  ├─ main.c
│  ├─ aes.c/.h
│  ├─ qr.c/.h
│  ├─ history.c/.h
│  └─ …
├─ web/                 # web application
│  ├─ app.py            # Flask backend
│  ├─ requirements.txt
│  ├─ templates/        # optional HTML pages
│  └─ frontend/         # React project
│     ├─ package.json
│     ├─ public/
│     └─ src/
└─ …
```

---

## Getting Started

### Desktop (Windows)

1. Open a Visual Studio solution or use `cl.exe` with the provided
   `Makefile`.
2. Ensure you have GDI+ and any necessary AES/QR libraries installed.
3. Compile `src\*.c` files and link `gdiplus.lib`.
4. Run `SmartSecureQR.exe` to open the GUI. Implement AES/QR logic as needed.

### Web

```powershell
cd "web"
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py        # starts Flask on http://127.0.0.1:5000
```

In another terminal:

```powershell
cd web\frontend
npm install
npm start            # opens React UI at http://localhost:3000
```

Use the web interface to generate/decrypt QR codes. Frontend and backend
communicate via `/api/generate` and `/api/decrypt` routes.

---

## Deployment

- For desktop, package the compiled EXE with dependencies.
- For web, build React (`npm run build`) and serve static files from Flask or
  deploy separate frontend hosting with CORS enabled.

### Deploying the frontend to Netlify

1. Run `npm run build` in `web/frontend` to create the `build/` directory.
2. Push your code to GitHub (Netlify will pull from the `main` branch).
3. On Netlify, choose **New site → Import an existing project** and select
   your `divyaguptamo/smart-secure-qr` repository.
4. Accept the default build command (`npm run build`) and set the publish
   directory to `web/frontend/build` (or `build` if you move the frontend to
   the repo root). Environment variables can be defined under **Site settings**.
5. After deployment youll have a `<your-site>.netlify.app` URL serving the
   React app.

#### Configuring the API base URL

The React code uses `process.env.REACT_APP_API_BASE` to determine where to send
requests. By default it assumes the backend is served from the same origin:

```js
const API_BASE = process.env.REACT_APP_API_BASE || '';
const axiosInstance = axios.create({ baseURL: API_BASE });
```

Set `REACT_APP_API_BASE` in Netlify's environment settings to the URL of your
Flask server (or leave empty if you convert the backend to Netlify Functions).

## Version Control

This project is intended to be version‑controlled with Git. To push to GitHub:

```bash
cd "c:/Users/divya/OneDrive/Desktop/Smart Secure QR Generator"
git init
git add .
git commit -m "Initial commit: desktop + web skeleton"
# create a repo on GitHub (e.g. github.com/yourusername/smart-secure-qr)
# then:
# git remote add origin https://github.com/yourusername/smart-secure-qr.git
# git push -u origin main
```

---

## Notes

- Encryption in the desktop app is currently a stub; integrate a proper AES
  library before releasing.
- History storage is placeholder; you may use a file or database.
- The React frontend uses placeholder icons; replace them in
  `web/frontend/public/icons/`.

Feel free to expand features or port the logic to mobile platforms.
