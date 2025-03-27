import React, { useEffect, useRef } from "react";
import styles from "./MemeGallery.module.css";

export const MemeGallery = () => {
  // Array of YouTube video IDs or URLs
  const videos = ["ykOG5fVqGD0 ", "Q4ZcZDLV7Dc", "5YMIoBUPDsw", "FBh9c2f2fXI"];

  const galleryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible); // Add class when in view
            observer.unobserve(entry.target); // Stop observing once it's visible
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );
    // The "element" refers to the specific HTML element that is being observed by the IntersectionObserver. 
    // In this case, it is the div with the class memeGalleryContainer that is referenced by galleryRef. 
    // This means the observer is watching this container, and it will trigger when 10% of this container becomes visible in the viewport.

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  return (
    <>
      <h1 className={styles.title}>Meme Gallery</h1>
      <div className={styles.memeGalleryContainer} ref={galleryRef}>
        {videos.map((videoId, index) => (
          <div key={index} className={styles.videoWrapper}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`Meme video ${index + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </>
  );
};

// title={`Meme video ${index + 1}`}
