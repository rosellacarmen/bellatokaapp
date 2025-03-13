import React, { useState, useEffect } from "react";
import "../styles/harvest.css";
import { useParams } from 'react-router-dom';

const Harvest2025 = () => {
  const [strain, setStrain] = useState({});
  const [strains, setStrains] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subSection, setSubSection] = useState("stats");
  const [nutrients, setNutrients] = useState([]);

  let params = useParams();

  useEffect(() => {
    fetch("/db/strains.json")
      .then(response => response.json())
      .then(data => {
        setStrains(data);
        const currentStrain = data.find(strain => strain.name === params.strainName);
        if (currentStrain) {
          setStrain(currentStrain);
          const index = data.indexOf(currentStrain);
          setCurrentIndex(index);
        }
      });
  }, [params.strainName]);

  useEffect(() => {
    fetch("/db/nutrient-list.json")
      .then(response => response.json())
      .then(data => setNutrients(data));
  }, []);

  const handlePreviousStrain = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      const previousStrain = strains[currentIndex - 1];
      setStrain(previousStrain);
      window.location.href = `/2025-harvest/${previousStrain.name}/${subSection}`;
    }
  };

  const handleNextStrain = () => {
    if (currentIndex < strains.length - 1) {
      setCurrentIndex(currentIndex + 1);
      const nextStrain = strains[currentIndex + 1];
      setStrain(nextStrain);
      window.location.href = `/2025-harvest/${nextStrain.name}/${subSection}`;
    }
  };

  const handleSubSectionChange = (section) => {
    setSubSection(section);
    window.location.href = `/2025-harvest/${strain.name}/${section}`;
  }

  return (
    <div className="harvest-2025">
      <button onClick={handlePreviousStrain}>Previous Strain</button>
      <button onClick={handleNextStrain}>Next Strain</button>
      <div className="sub-sections">
        <button onClick={() => handleSubSectionChange("stats")}>Stats</button>
        <button onClick={() => handleSubSectionChange("nutrients")}>Nutrients</button>
        <button onClick={() => handleSubSectionChange("pest-management")}>Pest Management</button>
      </div>
      {subSection === "stats" && (
        <div className="stats">
          <h2>Stats</h2>
          <img src={require("../images/stats.png")} alt="Stats Image" />
          <p>Stats body text</p>
        </div>
      )}
      {subSection === "nutrients" && (
        <div className="nutrients">
          <h2>Nutrients</h2>
          <img src={require("../images/nutrients.png")} alt="Nutrients Image" />
          <p>Nutrients body text</p>
          <div className="carousel">
            {nutrients.map((nutrient, index) => (
              <div key={index} className="carousel-item">
                <h3>{nutrient.name}</h3>
                <p>{nutrient.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {subSection === "pest-management" && (
        <div className="pest-management">
          <h2>Pest Management</h2>
          <img src={require("../images/pest-management.jpg")} alt="Pest Management Image" />
          <p>Pest management body text</p>
        </div>
      )}
      <img
        className="primary-image"
        src={require(`../images/strains/${strain.name}.jpg`)}
        alt="Primary Image"
      />
      {subSection === "stats" && (
        <img
          className="secondary-image"
          src={require("../images/stats.png")}
          alt="Secondary Image"
        />
      )}
      {subSection === "nutrients" && (
        <img
          className="secondary-image"
          src={require("../images/nutrients.png")}
          alt="Secondary Image"
        />
      )}
      {subSection === "pest-management" && (
        <img
          className="secondary-image"
          src={require("../images/pest-management.jpg")}
          alt="Secondary Image"
        />
      )}
    </div>
  );
};

export default Harvest2025;