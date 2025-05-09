import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./2025Harvest.css";
import { content } from '../db/content';


const Harvest2025 = () => {
  const [strains] = useState(["applescotti", "gelato-33"]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedNutrient, setSelectedNutrient] = useState(null);
  const { strainName, section } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleNutrientClick = (e) => {
      const nutrientEl = e.target.closest('.clickable');
      if (nutrientEl && section === 'nutrients') {
        const imageNum = nutrientEl.dataset.image;
        setSelectedNutrient(imageNum);
      }
    };

    document.addEventListener('click', handleNutrientClick);
    return () => document.removeEventListener('click', handleNutrientClick);
  }, [section]);

  const getImages = (strain) => {
    try {
      return require(`../images/strains/${strain}/index.js`).default;
    } catch (error) {
      console.error(`Error loading image list for ${strain}`);
      return [];
    }
  };

  const strainImages = getImages(strainName);
  const getNutrientImage = (imageName) => {
    try {
      return require(`../images/nutrients/${imageName}.png`);
    } catch (error) {
      console.error(`Error loading nutrient image: ${imageName}`);
      return null; // Return null instead of throwing an error to gracefully handle missing images.
    }
  };

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

  const sectionContent = content[section] ? content[section][strainName] : "Strain data not found";
  let imagePath;

  if (section === 'pest-management') {
    imagePath = require(`../images/icons/pest-management.png`);
  } else {
    imagePath = require(`../images/icons/${section}.png`);
  }


  return (
    <div className="harvest-page">
      <div className="section-1"> {/* Section 1 */}
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
      </div>

      <div className="section-container"> {/*Sections 2, 3, and 4 */}
        <div className="sidebar section-2">
          <img src={imagePath} alt={`${section} Icon`} className="chart-icon" />
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

        <div className="main-content section-3">
          <h2>
            {section
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: sectionContent }} />
        </div>

        <div className="strain-carousel section-4" onClick={() => setIsExpanded(true)}>
          {section === 'nutrients' ? (
            selectedNutrient ? (
              <img
                src={getNutrientImage(selectedNutrient)}
                alt={`Nutrient ${selectedNutrient}`}
                className="strain-image active"
                onError={(e) => {
                  console.error(`Failed to load nutrient image: ${selectedNutrient}`);
                  e.target.style.display = 'none'; // Hide image on error
                }}
              />
            ) : (
              <div className="select-nutrient-prompt">Click a nutrient to view details</div>
            )
          ) : (
            strainImages.map((imageName, index) => {
              try {
                const imagePath = require(`../images/strains/${strainName}/${imageName}`);
                return (
                  <img
                    key={imageName}
                    src={imagePath}
                    alt={`${displayNames[strainName]} ${index + 1}`}
                    className={`strain-image ${index === currentImageIndex ? 'active' : ''}`}
                    onError={(e) => {
                      console.log(`Failed to load image: ${strainName}/${imageName}`);
                      e.target.style.display = 'none'; // Hide image on error
                    }}
                  />
                );
              } catch (error) {
                console.error(`Error loading image ${imageName} for ${strainName}: ${error.message}`);
                return null; // Return null to prevent rendering errors
              }
            })
          )}
        </div>
        <div className={`expanded-overlay ${isExpanded ? 'active' : ''}`}>
          {isExpanded && (
            <>
              <div className="nav-area nav-left" onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev - 1 + strainImages.length) % strainImages.length);
              }} />
              <div className="nav-area nav-center" onClick={() => setIsExpanded(false)} />
              <div className="nav-area nav-right" onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex((prev) => (prev + 1) % strainImages.length);
              }} />
              <img
                src={require(`../images/strains/${strainName}/${strainImages[currentImageIndex]}`)}
                alt={`${displayNames[strainName]} expanded`}
                className="expanded-image"
                onClick={(e) => e.stopPropagation()}
                onError={(e) => {
                  console.error(`Failed to load expanded image: ${strainName}/${strainImages[currentImageIndex]}`);
                  e.target.style.display = 'none';
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Harvest2025;