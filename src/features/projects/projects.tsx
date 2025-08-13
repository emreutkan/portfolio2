import React from "react";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import styles from "./projects.module.css";

const Projects: React.FC = () => {
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation({ threshold: 0.3 });
  const { ref: gridRef, isInView: gridInView } = useScrollAnimation({ threshold: 0.1 });
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/api/placeholder/400/250",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
      image: "/api/placeholder/400/250",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather application with geolocation, forecasts, and beautiful data visualizations using modern web APIs.",
      technologies: ["Vue.js", "Chart.js", "OpenWeather API", "CSS3"],
      image: "/api/placeholder/400/250",
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.container}>
        <div ref={titleRef}>
          <h2 className={`${styles.sectionTitle} ${titleInView ? styles.animate : ''}`}>Featured Projects</h2>
          <p className={`${styles.sectionDescription} ${titleInView ? styles.animate : ''}`}>
            Here are some of my recent projects that showcase my skills and passion for development.
          </p>
        </div>
        
        <div className={styles.projectsGrid} ref={gridRef}>
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`${styles.projectCard} ${gridInView ? styles.animateCard : ''}`}
              data-index={index}
            >
              <div className={styles.projectImage}>
                <div className={styles.imagePlaceholder}>
                  <span>{project.title}</span>
                </div>
                <div className={styles.projectOverlay}>
                  <div className={styles.projectLinks}>
                    <a href={project.liveUrl} className={styles.projectLink}>
                      <span>🔗</span> Live Demo
                    </a>
                    <a href={project.githubUrl} className={styles.projectLink}>
                      <span>📁</span> Source Code
                    </a>
                  </div>
                </div>
              </div>
              
              <div className={styles.projectContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                
                <div className={styles.projectTechnologies}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
