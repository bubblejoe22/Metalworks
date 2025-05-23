import React from 'react';
import './WelcomePopup.css';

const WelcomePopup = ({ onClose }) => {
  return (
    <div className="welcome-overlay" onClick={onClose}>
      <div className="welcome-message" onClick={(e) => e.stopPropagation()}>
        <div className="message-header">
          <h3>Welcome to Metallworks</h3>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        <div className="message-content">
          <div className="anvil-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 13h16M4 13l2-8h12l2 8M4 13l-2 8h20l-2-8" />
            </svg>
          </div>
          <p>Forge ahead with the best gear in the realm!</p>
          <button onClick={onClose} className="continue-btn">
            Begin Crafting
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;