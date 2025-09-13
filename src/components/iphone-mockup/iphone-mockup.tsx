import React from "react";
import styles from "./iphone-mockup.module.css";

interface IPhoneMockupProps {
  images: {
    src: string;
    alt: string;
  }[];
  className?: string;
  showCarousel?: boolean;
  flat?: boolean;
}

const IPhoneMockup: React.FC<IPhoneMockupProps> = ({
  images,
  className,
  flat = false,
}) => {
  const currentImage = images[0];

  return (
    <div className={`${styles.phoneContainer} ${className || ""}`}>
      <div className={`${styles.iphoneFront} ${flat ? styles.noTilt : ""}`}>
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
        </div>
      </div>
    </div>
  );
};

export default IPhoneMockup;
