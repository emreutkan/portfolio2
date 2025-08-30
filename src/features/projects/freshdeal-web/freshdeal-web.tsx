import React from "react";
import { useSectionRounding } from "../../../hooks/useSectionRounding";
import styles from "./freshdeal-web.module.css";

const FreshdealWeb: React.FC = () => {
  const { sectionRef } = useSectionRounding();

  return (
    <section
      ref={sectionRef}
      className={styles.projectSection}
      id="freshdeal-web">
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.projectLabel}>Web Client</span>
          <h1 className={styles.title}>Freshdeal Web</h1>
          <p className={styles.subtitle}>Modern web client for Freshdeal</p>
        </div>

        <div className={styles.body}>
          <div className={styles.description}>
            <p>
              Web interface complementing the mobile app, enabling browsing,
              ordering, and account management from desktop and mobile browsers.
            </p>
            <div className={styles.techTags}>
              <span className={styles.techTag}>React</span>
              <span className={styles.techTag}>TypeScript</span>
              <span className={styles.techTag}>REST</span>
            </div>
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
      </div>
    </section>
  );
};

export default FreshdealWeb;
