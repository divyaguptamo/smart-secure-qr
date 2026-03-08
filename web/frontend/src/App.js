import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Generate from './Generate';
import Decrypt from './Decrypt';
import './App.css';

function App() {
  return (
    <div>
      <header className="header">
        <img src="/icons/logo.png" alt="logo" className="logo" />
        <h1>Smart Secure QR</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/generate">Generate</Link>
          <Link to="/decrypt">Decrypt</Link>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/decrypt" element={<Decrypt />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
