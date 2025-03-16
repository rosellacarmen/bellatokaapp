
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './2025Harvest.css';

const Harvest2025 = () => {
  const [strains, setStrains] = useState([]);
  const [currentStrainIndex, setCurrentStrainIndex] = useState(0);
  const { strainName, section } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchStrains = async () => {
      try {
        const response = await fetch('/db/strains.json');
        const data = await response.json();
        setStrains(data);
        const index = data.findIndex(s => s.name.toLowerCase() === strainName.toLowerCase());
        if (index !== -1) {
          setCurrentStrainIndex(index);
        }
      } catch (error) {
        console.error("Error fetching strains:", error);
      }
    };
    
    fetchStrains();
  }, [strainName]);

  const handleNavigation = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentStrainIndex + 1) % strains.length 
      : (currentStrainIndex - 1 + strains.length) % strains.length;
    const newStrain = strains[newIndex];
    navigate(`/2025-harvest/${newStrain.name.toLowerCase()}/${section}`);
  };

  const handleSectionChange = (newSection) => {
    navigate(`/2025-harvest/${strainName}/${newSection}`);
  };

  if (!strains.length) return <div>Loading...</div>;

  const currentStrain = strains[currentStrainIndex];

  return (
    <div className="harvest-page">
      <div className="strain-header">
        <button className="nav-button prev" onClick={() => handleNavigation('prev')} />
        <h1>{currentStrain.name}</h1>
        <button className="nav-button next" onClick={() => handleNavigation('next')} />
      </div>
      
      <div className="content-container">
        <div className="sidebar">
          <div className="chart-icon" />
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
          <p>{currentStrain[section.replace('-', '')]}</p>
        </div>

        <div className="strain-images">
          {strains.map((strain, index) => (
            <img 
              key={strain.id}
              src={`/images/strains/${strain.name.toLowerCase()}.jpg`}
              alt={strain.name}
              className={index === currentStrainIndex ? 'active' : ''}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Harvest2025;
