import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./2025Harvest.css";

const Harvest2025 = () => {
  const [strains] = useState(["applescotti", "gelato-33"]);
  const displayNames = {
    "applescotti": "Applescotti",
    "gelato-33": "Gelato 33"
  };
  const { strainName, section } = useParams();
  const navigate = useNavigate();

  const handleNavigation = (direction) => {
    const currentIndex = strains.indexOf(strainName);
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % strains.length
        : (currentIndex - 1 + strains.length) % strains.length;
    navigate(`/2025-harvest/${strains[newIndex]}/${section}`);
  };

  const handleSectionChange = (newSection) => {
    navigate(`/2025-harvest/${strainName.replace(/ /g, '-')}/${newSection}`);
  };

  return (
    <div className="harvest-page">
      <div className="strain-header">
        <button
          className="nav-button prev"
          onClick={() => handleNavigation("prev")}
        />
        <h1>{displayNames[strainName] || strainName}</h1>
        <button
          className="nav-button next"
          onClick={() => handleNavigation("next")}
        />
      </div>

      <div className="content-container">
        <div className="sidebar">
          <div className="chart-icon" />
          <div className="navigation-buttons">
            <button
              className={`nav-btn ${section === "stats" ? "active" : ""}`}
              onClick={() => handleSectionChange("stats")}
            >
              Stats
            </button>
            <button
              className={`nav-btn ${section === "nutrients" ? "active" : ""}`}
              onClick={() => handleSectionChange("nutrients")}
            >
              Nutrients
            </button>
            <button
              className={`nav-btn ${section === "pest-management" ? "active" : ""}`}
              onClick={() => handleSectionChange("pest-management")}
            >
              Pest Management
            </button>
          </div>
        </div>

        <div className="main-content">
          <h2>
            {section
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h2>
          <p>
            {" "}
            {strains.find((s) => s === strainName)
              ? "Placeholder for data"
              : "Strain data not found"}
          </p>
        </div>

        <div className="strain-carousel">
          {Array.from({ length: 3 }, (_, i) => i + 1).map((num) => (
            <img
              key={num}
              src={require(`../images/strains/${strainName}/${num}.jpg`)}
              alt={`${displayNames[strainName]} image ${num}`}
              className={`strain-image ${num === 1 ? 'active' : ''}`}
              onError={(e) => e.target.style.display = 'none'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Harvest2025;
