import React from "react";
import TechSlider from "../../../components/tech-slider";
import { useSectionRounding } from "../../../hooks/useSectionRounding";
import styles from "./freshdeal-business.module.css";
import freshdealWebImage from "./images/freshdealBusinessWebsite.svg";

const FreshdealBusiness: React.FC = () => {
  const { sectionRef } = useSectionRounding();

  return (
    <section
      ref={sectionRef}
      className={styles.projectSection}
      id="freshdeal-business">
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.projectLabel}>
            Website for Business Owners
          </span>
          <h3 className={styles.title}>Freshdeal Business </h3>
        </div>

        <div className={styles.body}>
          <div className={styles.description}>
            <p>
              Web interface complementing the mobile app, enabling browsing,
              ordering, and account management from desktop and mobile browsers.
            </p>
            <TechSlider icons={["typescript", "redux", "react"]} speed={40} />
            <div className={styles.actions}>
              <a
                href="https://github.com/emreutkan/freshdeal-web"
                className={styles.githubButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Freshdeal Web on GitHub">
                View on GitHub
              </a>
            </div>
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
