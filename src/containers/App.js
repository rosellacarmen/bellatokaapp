import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Harvest2025 from './2025Harvest';
import Contact from './Contact';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Harvest2025 />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;