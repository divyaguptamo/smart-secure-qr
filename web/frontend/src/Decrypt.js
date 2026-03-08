import React, { useState } from "react";
import CryptoJS from "crypto-js";

export default function Decrypt() {
  const [encrypted, setEncrypted] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResult("");

    try {
      // decrypt AES data
      const bytes = CryptoJS.AES.decrypt(encrypted, password);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      if (!decrypted) {
        setError("Wrong password or invalid encrypted data");
        return;
      }

      setResult(decrypted);
    } catch (err) {
      setError("Decryption failed");
    }
  };

  return (
    <div style={{ animation: "fadeIn 1.5s" }}>
      <h2 style={{ color: "#0074d9" }}>Decrypt Text</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <textarea
          placeholder="Paste encrypted text from QR"
          value={encrypted}
          onChange={(e) => setEncrypted(e.target.value)}
          cols="60"
          rows="4"
        />

        <br />

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <br />

        <button type="submit">Decrypt</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result</h3>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}