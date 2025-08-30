import React from "react";
import { useSectionRounding } from "../../../hooks/useSectionRounding";
import styles from "./freshdeal-backend.module.css";

const FreshdealBackend: React.FC = () => {
  const { sectionRef } = useSectionRounding();

  return (
    <section
      ref={sectionRef}
      className={styles.projectSection}
      id="freshdeal-backend">
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.projectLabel}>Backend Services</span>
          <h1 className={styles.title}>Freshdeal Backend</h1>
          <p className={styles.subtitle}>
            APIs and integrations powering the app
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.description}>
            <p>
              Backend microservices and integrations providing authentication,
              order processing, messaging, and data orchestration for the
              Freshdeal ecosystem.
            </p>
            <div className={styles.techTags}>
              <span className={styles.techTag}>Python</span>
              <span className={styles.techTag}>Flask</span>
              <span className={styles.techTag}>PostgreSQL</span>
              <span className={styles.techTag}>Azure</span>
            </div>
            <div className={styles.actions}>
              <a
                href="https://github.com/emreutkan/freshdeal-backend"
                className={styles.githubButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Freshdeal Backend on GitHub">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreshdealBackend;
