import React from "react";
import { useSectionRounding } from "../../../hooks/useSectionRounding";
import citrusImage from "../images/citrus.png";
import styles from "./citrus.module.css";

const Citrus: React.FC = () => {
  const { sectionRef } = useSectionRounding();

  return (
    <section ref={sectionRef} className={styles.projectSection} id="citrus">
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.projectLabel}>Evil Twin Framework</span>
          <h1 className={styles.title}>Citrus</h1>
          <p className={styles.subtitle}>
            Automated AP + captive portal tooling
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.media}>
            <img src={citrusImage} alt="Citrus project" />
          </div>

          <div className={styles.description}>
            <p>
              Automated Evil Twin framework with dnsmasq/hostapd integration and
              optional captive portal deployment for realistic Wi‑Fi testing.
            </p>
            <div className={styles.techTags}>
              <span className={styles.techTag}>Python</span>
              <span className={styles.techTag}>Linux</span>
              <span className={styles.techTag}>hostapd</span>
              <span className={styles.techTag}>dnsmasq</span>
            </div>
            <div className={styles.actions}>
              <a
                href="https://github.com/emreutkan/citrus"
                className={styles.githubButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Citrus project on GitHub">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Citrus;
