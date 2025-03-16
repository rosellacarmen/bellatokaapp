
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './2025Harvest.css';

const Harvest2025 = () => {
  const [strain, setStrain] = useState(null);
  const [strains, setStrains] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [subSection, setSubSection] = useState("stats");
  
  useEffect(() => {
    const fetchStrains = async () => {
      try {
        const response = await fetch('/db/strains.json');
        const data = await response.json();
        setStrains(data);
        setStrain(data[0]);
      } catch (error) {
        console.error("Error fetching strains:", error);
      }
    };
    
    fetchStrains();
  }, []);

  const handleSubSectionChange = (section) => {
    setSubSection(section);
  };

  const handlePreviousStrain = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setStrain(strains[currentIndex - 1]);
    }
  };

  const handleNextStrain = () => {
    if (currentIndex < strains.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setStrain(strains[currentIndex + 1]);
    }
  };

  if (!strain) return <div>Loading...</div>;

  return (
    <div className="harvest-2025">
      <h1>{strain.name}</h1>
      <p>{strain.description}</p>
      
      <div className="navigation">
        <button onClick={handlePreviousStrain} disabled={currentIndex === 0}>Previous Strain</button>
        <button onClick={handleNextStrain} disabled={currentIndex === strains.length - 1}>Next Strain</button>
      </div>
      
      <div className="sub-sections">
        <button onClick={() => handleSubSectionChange("stats")}>Stats</button>
        <button onClick={() => handleSubSectionChange("nutrients")}>Nutrients</button>
        <button onClick={() => handleSubSectionChange("pest-management")}>Pest Management</button>
      </div>

      <div className="content">
        {subSection === "stats" && (
          <div className="stats">
            <h2>Stats</h2>
            <p>{strain.stats}</p>
          </div>
        )}
        {subSection === "nutrients" && (
          <div className="nutrients">
            <h2>Nutrients</h2>
            <p>{strain.nutrients}</p>
          </div>
        )}
        {subSection === "pest-management" && (
          <div className="pest-management">
            <h2>Pest Management</h2>
            <p>{strain.pestManagement}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Harvest2025;
