import React, { useEffect } from "react";
import { Title } from "../../components/Title/Title";
import { Socials } from "../../components/Socials/Socials";
import { Tokenomics } from "../../components/Tokenomics/Tokenomics";
import { MemeGallery } from "../../components/MemeGallery/MemeGallery";
import styles from "./AboutScream.module.css";

const AboutScream = () => {

  useEffect(() => {
     // Use setTimeout to delay adding the class to ensure elements are rendered
     setTimeout(() => {
      const descElement = document.querySelector(`.${styles.descContainer}`);
      const tokenomicsElement = document.querySelector(`.${styles.tokenomics}`);

      // Ensure the elements exist before trying to modify them
      if (descElement) {
        descElement.classList.add(styles['slide-in-left']);
      }
      if (tokenomicsElement) {
        tokenomicsElement.classList.add(styles['slide-in-right']);
      }
    }, 200); // Slight delay to ensure rendering
  }, []);

  return (
    <div className={styles.aboutScreamContainer}>
      <Title />
      <Socials />
      <div className={styles.descContainer}>
        <div className={styles.desc}>
          The Screaming Marmot meme originates from a 2015 video posted by
          Instagram user @lonegoatsoap, capturing a marmot making a high-pitched
          noise at Blackcomb Mountain, Whistler, British Columbia. The video
          went viral after being dubbed with a human-like scream, turning it
          into a symbol of exaggerated emotional expression. Over time, it
          went viral across platforms like YouTube and Vine, often used humorously
          to represent absurd or cathartic reactions to everyday situations.
        </div>
      </div>
      <div className={styles.tokenomics}>
        <Tokenomics />
      </div>
      <MemeGallery/>
    </div>
  );
};

export default AboutScream;
