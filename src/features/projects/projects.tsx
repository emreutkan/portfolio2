import React from "react";
import styles from "./projects.module.css";

const Projects: React.FC = () => {
  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <p className={styles.sectionDescription}>Coming soon...</p>
      </div>
    </section>
  );
};

export default Projects;
