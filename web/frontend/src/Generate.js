import React, { useState } from 'react';
import axios from 'axios';

export default function Generate() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', age:'', password:'', format:'PNG' });
  const [imageData, setImageData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setImageData(null);
    try {
      const resp = await axios.post('/api/generate', form);
      setImageData(resp.data.image);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 1.5s' }}>
      <h2 style={{ color: '#0074d9' }}>Generate QR</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <label>Name: <input name="name" value={form.name} onChange={handleChange} /></label><br />
        <label>Phone: <input name="phone" value={form.phone} onChange={handleChange} /></label><br />
        <label>Email: <input name="email" value={form.email} onChange={handleChange} /></label><br />
        <label>Age: <input name="age" value={form.age} onChange={handleChange} type="number" /></label><br />
        <label>Password: <input name="password" value={form.password} onChange={handleChange} type="password" /></label><br />
        <label>Format: <select name="format" value={form.format} onChange={handleChange}><option>PNG</option><option>JPEG</option></select></label><br />
        <button type="submit">Create QR</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {imageData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Output</h3>
          <img src={`data:image/png;base64,${imageData}`} alt="QR code" style={{boxShadow:'0 0 10px rgba(0,0,0,0.2)'}} />
          <br />
          <a href={`data:image/png;base64,${imageData}`} download="qr.png" style={{display:'inline-block',marginTop:'10px'}}>
            <button>Download QR</button>
          </a>
        </div>
      )}
    </div>
  );
}
