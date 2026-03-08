import React from 'react';

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h2>Welcome!</h2>
        <p>Generate encrypted QR codes or decrypt data securely using password protection.</p>
        <div>
          <button onClick={() => window.location.href = '/generate'}>Generate Secure QR</button>
          <button style={{ marginLeft: '10px' }} onClick={() => window.location.href = '/decrypt'}>Decrypt Text</button>
        </div>
      </section>

      <div className="cards">
        <div className="card">
          <img src="/icons/security.png" alt="Security" />
          <h4>Secure Encryption</h4>
          <p>AES-256 password protection</p>
        </div>
        <div className="card">
          <img src="/icons/fast.png" alt="Fast" />
          <h4>Fast QR Generation</h4>
          <p>Instant QR code creation</p>
        </div>
        <div className="card">
          <img src="/icons/export.png" alt="Export" />
          <h4>Export Options</h4>
          <p>Save as PNG or JPG</p>
        </div>
      </div>
    </div>
  );
}
