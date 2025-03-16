
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './2025Harvest.css';

const Harvest2025 = () => {
  const [strain, setStrain] = useState(null);
  const { strainName, section } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchStrains = async () => {
      try {
        const response = await fetch('/db/strains.json');
        const data = await response.json();
        const currentStrain = data.find(s => s.name.toLowerCase() === strainName.toLowerCase());
        if (currentStrain) {
          setStrain(currentStrain);
        }
      } catch (error) {
        console.error("Error fetching strains:", error);
      }
    };
    
    fetchStrains();
  }, [strainName]);

  const handleSectionChange = (newSection) => {
    navigate(`/2025-harvest/${strainName}/${newSection}`);
  };

  if (!strain) return <div>Loading...</div>;

  return (
    <div className="harvest-page">
      <div className="strain-header">
        <div className="strain-icon"></div>
        <h1>{strain.name}</h1>
        <div className="strain-icon"></div>
      </div>
      
      <div className="content-container">
        <div className="sidebar">
          <div className="chart-icon"></div>
          <div className="navigation-buttons">
            <button 
              className={section === 'stats' ? 'active' : ''} 
              onClick={() => handleSectionChange('stats')}
            >
              Stats
            </button>
            <button 
              className={section === 'nutrients' ? 'active' : ''} 
              onClick={() => handleSectionChange('nutrients')}
            >
              Nutrients
            </button>
            <button 
              className={section === 'pest-management' ? 'active' : ''} 
              onClick={() => handleSectionChange('pest-management')}
            >
              Pest Management
            </button>
          </div>
        </div>

        <div className="main-content">
          <h2>{section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
          <p>{strain[section]}</p>
        </div>

        <div className="strain-image">
          <img src={strain.image} alt={strain.name} />
        </div>
      </div>
    </div>
  );
};

export default Harvest2025;
