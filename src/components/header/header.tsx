import React from "react";
import styles from "./header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.headerName}>Irfan Emre Utkan</h1>
      <nav>
        <ul>
          <li className={styles.navItem}>
            <a href="#home">About me</a>
          </li>
          <li className={styles.navItem}>
            <a href="#projects">Projects</a>
          </li>
          <li className={styles.navItem}>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
