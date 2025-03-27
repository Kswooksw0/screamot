import React from 'react';
import logo from '../../assets/images/screamot_logo.png';
import styles from './Logo.module.css';
import { useNavigate } from 'react-router-dom';

export const Logo = () => {
  const navigate = useNavigate();

  // Function to handle navigation for mobile view
  const handleLogoClick = (event) => {
    // Check if the current device width is below 768px (mobile width)
    if (window.innerWidth <= 767) {
      event.stopPropagation();
      navigate('/about-scream'); 
    }
  };

  return (
    <div className={styles.logoContainer}>
      <img 
        src={logo} 
        className={styles.logo} 
        alt="Screamot Logo" 
        onClick={handleLogoClick} // Add click handler conditionally
      />
    </div>
  );
};
