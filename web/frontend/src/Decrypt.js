import React, { useState } from 'react';
import axios from 'axios';

export default function Decrypt() {
  const [encrypted, setEncrypted] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult('');
    try {
      const resp = await axios.post('/api/decrypt', { encrypted, password });
      if (resp.data.error) {
        setError(resp.data.error);
      } else {
        setResult(resp.data.result);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 1.5s' }}>
      <h2 style={{ color: '#0074d9' }}>Decrypt Text</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <textarea value={encrypted} onChange={e=>setEncrypted(e.target.value)} cols="60" rows="4" />
        <br />
        <label>Password: <input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></label>
        <br />
        <button type="submit">Decrypt</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {result && (
        <div style={{ marginTop: '20px' }}><h3>Result</h3><pre>{result}</pre></div>
      )}
    </div>
  );
}
