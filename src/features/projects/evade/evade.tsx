import React from "react";
import { useSectionRounding } from "../../../hooks/useSectionRounding";
import evadeImage from "../images/evade.png";
import styles from "./evade.module.css";

const Evade: React.FC = () => {
  const { sectionRef } = useSectionRounding();

  return (
    <section ref={sectionRef} className={styles.projectSection} id="evade">
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <span className={styles.projectLabel}>Payload Generator</span>
          <h1 className={styles.title}>Evade</h1>
          <p className={styles.subtitle}>
            Self‑decrypting payloads to bypass AV
          </p>
        </div>

        <div className={styles.body}>
          <div className={styles.media}>
            <img src={evadeImage} alt="Evade project" />
          </div>

          <div className={styles.description}>
            <p>
              Generates self‑decrypting payloads aimed at reducing detection by
              antivirus engines through runtime decryption strategies.
            </p>
            <div className={styles.techTags}>
              <span className={styles.techTag}>Python</span>
              <span className={styles.techTag}>Windows</span>
              <span className={styles.techTag}>Encryption</span>
            </div>
            <div className={styles.actions}>
              <a
                href="https://github.com/emreutkan/evade"
                className={styles.githubButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Evade project on GitHub">
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Evade;
