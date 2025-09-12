import React from "react";
import TechSlider from "../../../components/tech-slider";
import styles from "./freshdeal-backend.module.css";

const FreshdealBackend: React.FC = () => {
  return (
    <section className={styles.projectSection} id="freshdeal-backend">
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.projectLabel}>Backend Services</span>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Freshdeal Backend</h1>
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
          <p className={styles.subtitle}>
            APIs and integrations powering the platform
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.description}>
            <p>
              Backend services providing authentication, order processing,
              geospatial search, messaging, and data orchestration for the
              Freshdeal ecosystem. Built for scalability and operational
              reliability.
            </p>
            <TechSlider
              icons={[
                "azure",
                "google-maps",
                "mssql",
                "python",
                "flask",
                "firebase",
              ]}
              speed={40}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreshdealBackend;
