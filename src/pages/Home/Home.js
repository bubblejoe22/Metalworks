import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useAppStore } from '../../stores/useStore';
import Overlay from '../../components/Overlay/Overlay.js';
import ironShieldImage from '../../assets/iron_shield.png';
import steelArmorImage from '../../assets/steel_armor.png';
import steelSwordImage from '../../assets/steel_sword.png';
import kristineImage from '../../assets/kristine.png';
import deborahImage from '../../assets/deborah.png';
import jereveImage from '../../assets/jereve.png';
import icon from '../../assets/icon.jpg';
import banner from '../../assets/bannerr.png';

export default function Home() {
  const { openOverlay } = useAppStore();
  const navigate = useNavigate();

  // Centralized image assets
  const images = {
    icons: {
      services: icon,
      events: icon,
      promos: icon,
    },
    deals: {
      ironShield: ironShieldImage,
      steelArmor: steelArmorImage,
      steelSword: steelSwordImage,
    },
    blacksmiths: {
      kristine: kristineImage,
      deborah: deborahImage,
      jereve: jereveImage,
    },
    heroBanner: banner
  };

  // Mock data with image references
  const dealItems = [
    { 
      id: 1, 
      title: 'IRON SHIELD', 
      price: '$45.99', 
      description: 'Forged with precision for warriors', 
      onSale: true,
      image: images.deals.ironShield
    },
    { 
      id: 2, 
      title: 'STEEL ARMOR',  // Fixed typo (ARMOR instead of ARMOR)
      price: '$62.50', 
      description: 'Protective gear for brave fighters', 
      onSale: true,
      image: images.deals.steelArmor
    },
    { 
      id: 3, 
      title: 'STEEL SWORD', 
      price: '$89.99', 
      description: 'Legendary weapon for champions', 
      onSale: true,
      image: images.deals.steelSword
    },
  ];

  const blacksmiths = [
    { id: 1, name: 'Kristine', image: images.blacksmiths.kristine },
    { id: 2, name: 'Elven Forger', image: images.blacksmiths.deborah },
    { id: 3, name: 'Dwarven Artisan', image: images.blacksmiths.jereve },
  ];

  return (
     <div className="dashboard">
      {/* Main Overlay Component */}
      <Overlay />

      {/* Hero Section */}
      <div 
  className="hero-section" 
  style={{ 
    backgroundImage: `url(${images.heroBanner})`,
    width: '100%',
    height: '200px', 
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat', 
    paddingTop: '50px'
  }}
></div>

      {/* Quick Access Buttons */}
      <div className="quick-access-buttons">
        <button 
          className="overlay-trigger services-btn"
          onClick={() => openOverlay('services')}
        >
          <span className="btn-icon">🔧</span> Services
        </button>
        <button 
          className="overlay-trigger events-btn"
          onClick={() => openOverlay('events')}
        >
          <span className="btn-icon">🎉</span> Events
        </button>
        <button 
          className="overlay-trigger promos-btn"
          onClick={() => openOverlay('promos')}
        >
          <span className="btn-icon">💰</span> Promos
        </button>
      </div>

      {/* Best Deals Section */}
      <div className="section">
        <h3 className="section-title">Best Deals</h3>
        <div className="deals-grid">
          {dealItems.map((item) => (
            <div key={item.id} className="deal-card">
              <div className="deal-image">
                <img src={item.image} alt={item.title} />
                {item.onSale && <span className="sale-badge">SALE</span>}
              </div>
              <div className="deal-info">
                <h4 className="deal-title">{item.title}</h4>
                <p className="deal-description">{item.description}</p>
                <div className="deal-price-row">
                  <span className="deal-price">{item.price}</span>
                  <button 
                    className="buy-button" 
                    onClick={() => navigate('/productdetail')}
                  >
                    VIEW DEAL
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Blacksmiths Section */}
      <div className='blacksmith'>
        <div className="blacksmiths-section">
          <h3 className="section-title">Top Blacksmiths</h3>
          <div className="blacksmiths-grid">
            {blacksmiths.map((smith) => (
              <div key={smith.id} className="blacksmith-card">
                <div className="blacksmith-image">
                  <img src={smith.image} alt={smith.name} />
                </div>
                <p className="blacksmith-name">{smith.name}</p>
              </div>
            ))}
          </div>
          <div className="view-all-row">
            <span className="view-all-text">VIEW INTERACTIVE LIST</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="feature">
          <h4 className="feature-title">Your trusted forge for heavy and crafting with skill.</h4>
          <p className="feature-text">Join our artisans.</p>
        </div>
        <div className="limited-deals">
          <h4 className="limited-deals-title">Limited-Time Deals</h4>
          <p className="limited-deals-text">Expires in 12h 24m 45s!</p>
        </div>
      </div>
    </div>
  );
}