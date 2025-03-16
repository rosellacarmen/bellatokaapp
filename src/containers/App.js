
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Harvest2025 from './2025Harvest';
import Contact from './Contact';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/2025-harvest/*" element={<Harvest2025 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Harvest2025 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
