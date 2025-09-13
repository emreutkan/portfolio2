import React from "react";
import TechSlider from "../../../components/tech-slider";
import styles from "./freshdeal-business.module.css";
import freshdealWebImage from "./images/freshdealBusinessWebsite.svg";

const FreshdealBusiness: React.FC = () => {
  return (
    <section className={styles.projectSection} id="freshdeal-business">
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.projectLabel}>
            Website for Business Owners
          </span>
          <div className={styles.titleContainer}>
            <h3 className={styles.title}>Freshdeal Business </h3>
            <div className={styles.actions}>
              <a
                href="https://github.com/FreshDealApp/FreshDealBusinessWebsite"
                className={styles.githubButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Freshdeal Web on GitHub">
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.description}>
            <p>
              Web interface complementing the mobile app, enabling browsing,
              ordering, and account management from desktop and mobile browsers.
            </p>
            <TechSlider icons={["typescript", "redux", "react"]} speed={40} />
          </div>
        </div>
        <div className={styles.browserMockup}>
          <div className={styles.browserHeader}>
            <div className={styles.browserButtons}>
              <span className={styles.browserButton}></span>
              <span className={styles.browserButton}></span>
              <span className={styles.browserButton}></span>
            </div>
            <div className={styles.addressBar}>
              <span>https://freshdeal-web.app</span>
            </div>
          </div>
          <div className={styles.browserContent}>
            <img
              src={freshdealWebImage}
              alt="Freshdeal Web Interface"
              className={styles.websitePreview}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreshdealBusiness;
