# Smart Secure QR Frontend

This is a simple React frontend for the Smart Secure QR generator service.

## Setup

1. Install [Node.js](https://nodejs.org/) (which includes npm).
2. Open a terminal in this directory (`web/frontend`).
3. Run:
   ```bash
   npm install
   npm start
   ```
   This will start a development server on `http://localhost:3000`.
   The proxy configuration forwards `/api` calls to the Python backend at port 5000.

## Functionality

- **Home page** with two buttons: *Generate QR* and *Decrypt Text*.
- **Generate** page allows entering personal details, password, and format, then displays the generated QR code image.
- **Decrypt** page allows pasting encrypted text and password to retrieve the original data.

The React app communicates with the Flask backend through the `/api/generate` and `/api/decrypt` endpoints.

To deploy, build the frontend (`npm run build`) and serve the static files alongside the Flask app.
