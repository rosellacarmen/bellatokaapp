import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./2025Harvest.css";

const Harvest2025 = () => {
  const [strains] = useState(["applescotti", "gelato-33"]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { strainName, section } = useParams();
  const navigate = useNavigate();

  const getImages = (strain) => {
    try {
      return require(`../images/strains/${strain}/index.js`).default;
    } catch (error) {
      console.error(`Error loading image list for ${strain}`);
      return [];
    }
  };

  const images = getImages(strainName);
  const displayNames = {
    "applescotti": "Applescotti",
    "gelato-33": "Gelato 33"
  };

  const handleNavigation = (direction) => {
    const currentIndex = strains.indexOf(strainName);
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % strains.length
        : (currentIndex - 1 + strains.length) % strains.length;
    navigate(`/2025-harvest/${strains[newIndex]}/${section}`);
  };

  const handleSectionChange = (newSection) => {
    navigate(`/2025-harvest/${strainName}/${newSection}`);
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
          <img 
            src={require(`../images/icons/${section}.png`)} 
            alt={`${section} Icon`} 
            className="chart-icon"
          />
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
            {strains.find((s) => s === strainName)
              ? require('../db/body.json')[section][strainName]
              : "Strain data not found"}
          </p>
        </div>

        <div className="strain-carousel" onClick={() => setIsExpanded(true)}>
          {getImages(strainName).map((imageName, index) => {
            try {
              const imagePath = require(`../images/strains/${strainName}/${imageName}`);
              return (
                <img
                  key={imageName}
                  src={imagePath}
                  alt={`${displayNames[strainName]} image ${index + 1}`}
                  className={`strain-image ${index === currentImageIndex ? 'active' : ''}`}
                  onError={(e) => {
                    console.log(`Failed to load image: ${strainName}/${imageName}`);
                    e.target.style.display = 'none';
                  }}
                />
              );
            } catch (error) {
              console.error(`Error loading image ${imageName} for ${strainName}: ${error.message}`);
              return null;
            }
          })}
        </div>
        <div className={`expanded-overlay ${isExpanded ? 'active' : ''}`}>
          {isExpanded && (
            <>
              <div className="nav-area nav-left" onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
              }} />
              <div className="nav-area nav-center" onClick={() => setIsExpanded(false)} />
              <div className="nav-area nav-right" onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
              }} />
              <img
                src={require(`../images/strains/${strainName}/${images[currentImageIndex]}`)}
                alt={`${displayNames[strainName]} expanded`}
                className="expanded-image"
                onClick={(e) => e.stopPropagation()}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Harvest2025;