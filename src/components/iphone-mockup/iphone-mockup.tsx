import React, { useState } from "react";
import styles from "./iphone-mockup.module.css";

interface IPhoneMockupProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
  showCarousel?: boolean;
}

const IPhoneMockup: React.FC<IPhoneMockupProps> = ({
  images,
  className,
  showCarousel = true,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const currentImage = images[currentImageIndex];

  return (
    <div className={`${styles.phoneContainer} ${className || ""}`}>
      <div className={styles.iphoneFront}>
        <div className={styles.frame}></div>
        <div className={styles.antenas}>
          <div className={styles.tt}></div>
          <div className={styles.tr}></div>
          <div className={styles.tl}></div>
          <div className={styles.bb}></div>
          <div className={styles.br}></div>
          <div className={styles.bl}></div>
        </div>
        <div className={styles.keys}>
          <div className={styles.silent}></div>
          <div className={styles.volt}></div>
          <div className={styles.volb}></div>
          <div className={styles.lock}></div>
        </div>
        <div className={styles.screen}>
          <div className={styles.island}>
            <div className={styles.camera}></div>
          </div>
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className={styles.appScreenshot}
          />

          {/* Carousel Controls */}
          {showCarousel && images.length > 1 && (
            <>
              {/* Navigation Arrows */}
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={prevImage}
                aria-label="Previous image">
                ‹
              </button>
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={nextImage}
                aria-label="Next image">
                ›
              </button>

              {/* Dots Indicator */}
              <div className={styles.dotsContainer}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${
                      index === currentImageIndex ? styles.activeDot : ""
                    }`}
                    onClick={() => goToImage(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>

              {/* Image Counter */}
              <div className={styles.imageCounter}>
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IPhoneMockup;
