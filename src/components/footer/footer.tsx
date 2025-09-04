import React from "react";
import styles from "./footer.module.css";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.container}>
        {/* <div className={styles.more}>
          <h5>Want to see more?</h5>
          <p>Visit</p>
          <div className={styles.links}>
            <a
              className={styles.linkButton}
              href="https://places.irfanemreutkan.com"
              target="_blank"
              rel="noopener noreferrer">
              places.irfanemreutkan.com
            </a>
            <a
              className={styles.linkButton}
              href="https://guides.irfanemreutkan.com"
              target="_blank"
              rel="noopener noreferrer">
              guides.irfanemreutkan.com
            </a>
          </div>
        </div> */}
        <div className={styles.copyright}>
          © {year} Irfan Emre Utkan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
