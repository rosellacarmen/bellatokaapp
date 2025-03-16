import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './2025Harvest.css';

const Harvest2025 = () => {
  const [strain, setStrain] = useState({});
  const [strains, setStrains] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subSection, setSubSection] = useState("stats");
  const [error, setError] = useState(null);

  let params = useParams();

  useEffect(() => {
    // Initialize with default data if fetch fails
    const defaultStrains = [
      { name: "Strain 1", description: "Default strain 1" },
      { name: "Strain 2", description: "Default strain 2" }
    ];
    setStrains(defaultStrains);
    setStrain(defaultStrains[0]);

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
      })
      .catch(error => setError(error));
  }, [params.strainName]);


  const handleSubSectionChange = (section) => {
    setSubSection(section);
  };

  const handlePreviousStrain = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setStrain(strains[currentIndex - 1]);
    }
  };

  const handleNextStrain = () => {
    if (currentIndex < strains.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setStrain(strains[currentIndex + 1]);
    }
  };

  if (error) {
    return <div>Something went wrong. Please try again.</div>;
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
          <img src="https://via.placeholder.com/300x200?text=Stats" alt="Stats" />
          <p>Stats for {strain.name}</p>
        </div>
      )}
      {subSection === "nutrients" && (
        <div className="nutrients">
          <h2>Nutrients</h2>
          <img src="https://via.placeholder.com/300x200?text=Nutrients" alt="Nutrients" />
          <p>Nutrient info for {strain.name}</p>
        </div>
      )}
      {subSection === "pest-management" && (
        <div className="pest-management">
          <h2>Pest Management</h2>
          <img src="https://via.placeholder.com/300x200?text=Pest+Management" alt="Pest Management" />
          <p>Pest management for {strain.name}</p>
        </div>
      )}
    </div>
  );
};

export default Harvest2025;