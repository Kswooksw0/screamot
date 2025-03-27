import React, { useEffect, useRef } from "react";
import styles from "./MemeGallery.module.css";

export const MemeGallery = () => {
  const videos = ["ykOG5fVqGD0", "Q4ZcZDLV7Dc", "5YMIoBUPDsw", "FBh9c2f2fXI"];
  const galleryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // ✅ Fix: Assign `galleryRef.current` to a constant inside effect
    const currentGalleryRef = galleryRef.current;
    if (currentGalleryRef) {
      observer.observe(currentGalleryRef);
    }

    return () => {
      if (currentGalleryRef) {
        observer.unobserve(currentGalleryRef);
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
