// // import React from "react";
// import xIcon from "../../assets/icons/x_icon.png"; // Correct path
// import telegramIcon from "../../assets/icons/telegram.png"; // Correct path
// import styles from "./Socials.module.css";

// export const Socials = ({ navigateToAboutPage }) => {

//   const handleSocialsClick = (event) => {
//     event.stopPropagation();
//   };

//   return (
//     <>
//       <div className={styles.iconsContainer} onClick={handleSocialsClick}>
//         <button className={styles.aboutButton} onClick={navigateToAboutPage}>
//           About $SCREAM
//         </button>
//         <a href="https://x.com" target="_blank" rel="noopener noreferrer">
//           <img src={xIcon} alt="X" className={styles.icon} />
//         </a>
//         <a
//           href="https://telegram.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <img src={telegramIcon} alt="Telegram" className={styles.icon} />
//         </a>
//       </div>
//     </>
//   );
// };

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import xIcon from "../../assets/icons/x_icon.png"; // Correct path
import telegramIcon from "../../assets/icons/telegram.png"; // Correct path
import styles from "./Socials.module.css";

export const Socials = () => {
  const location = useLocation(); // Get current route
  const navigate = useNavigate(); // Navigation function

  // Determine if the user is on the About page
  const isAboutPage = location.pathname === "/about-scream";

  // Set button text based on current page
  const buttonLabel = isAboutPage ? "Back to Homepage" : "About $Scream";

  // Handle button click
  const handleButtonClick = () => {
    if (isAboutPage) {
      navigate("/"); // Navigate back to home
    } else {
      navigate("/about-scream"); // Navigate to About page
    }
  };

  return (
    <div className={styles.iconsContainer}>
      <button className={styles.aboutButton} onClick={handleButtonClick}>
        {buttonLabel}
      </button>
      <a href="https://x.com" target="_blank" rel="noopener noreferrer">
        <img src={xIcon} alt="X" className={styles.icon} />
      </a>
      <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
        <img src={telegramIcon} alt="Telegram" className={styles.icon} />
      </a>
    </div>
  );
};
