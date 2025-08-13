import React from "react";
import { useScrollVisibility } from "../../hooks/useScrollVisibility";
import styles from "./header.module.css";

const Header: React.FC = () => {
  const isVisible = useScrollVisibility(
    typeof window !== "undefined" ? window.innerHeight * 0.8 : 600
  );

  return (
    <header
      className={`${styles.headerContainer} ${
        isVisible ? styles.visible : styles.hidden
      }`}>
      <h1 className={styles.headerName}>Irfan Emre Utkan</h1>
      <nav role="navigation" aria-label="Main navigation">
        <ul>
          <li className={styles.navItem}>
            <a href="#home" aria-label="Navigate to About me section">
              About me
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#projects" aria-label="Navigate to Projects section">
              Projects
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#contact" aria-label="Navigate to Contact section">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
