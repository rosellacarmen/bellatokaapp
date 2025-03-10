import React from "react";
import "../styles/header.css";

const Header = () => (
  <div className="header-container">
    <h1>Bellatoka</h1>
    <nav>
      <ul>
        <li><a href="/2025-harvest">2025 Harvest</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </div>
);

export default Header;