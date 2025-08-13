import React, { useState } from "react";
import {
  getFeaturedProjects,
  getHighlightedProjects,
} from "../../data/projects";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import styles from "./projects.module.css";

const Projects: React.FC = () => {
  const { ref: featuredTitleRef, isInView: featuredTitleInView } =
    useScrollAnimation({
      threshold: 0.3,
    });
  const { ref: carouselRef, isInView: carouselInView } = useScrollAnimation({
    threshold: 0.1,
  });
  const { ref: bigProjectsTitleRef, isInView: bigProjectsTitleInView } =
    useScrollAnimation({
      threshold: 0.3,
    });
  const { ref: bigProjectsRef, isInView: bigProjectsInView } =
    useScrollAnimation({
      threshold: 0.1,
    });

  const [currentSlide, setCurrentSlide] = useState(0);

  // Get projects from data file
  const featuredProjects = getFeaturedProjects();
  const highlightedProjects = getHighlightedProjects();

  const projectsPerSlide = 3;
  const totalSlides = Math.ceil(featuredProjects.length / projectsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className={styles.projectsSection} id="projects">
      {/* Featured Projects Carousel */}
      <div className={styles.featuredSection}>
        <div className={styles.container}>
          <div ref={featuredTitleRef}>
            <h2
              className={`${styles.sectionTitle} ${
                featuredTitleInView ? styles.animate : ""
              }`}>
              Featured Projects
            </h2>
            <p
              className={`${styles.sectionDescription} ${
                featuredTitleInView ? styles.animate : ""
              }`}>
              A showcase of my recent work spanning various technologies and
              domains.
            </p>
          </div>

          <div className={styles.carouselContainer} ref={carouselRef}>
            <button
              className={styles.carouselButton}
              onClick={prevSlide}
              aria-label="Previous projects">
              ‹
            </button>

            <div className={styles.carousel}>
              <div className={styles.carouselTrack} data-slide={currentSlide}>
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className={styles.carouselSlide}>
                    {featuredProjects
                      .slice(
                        slideIndex * projectsPerSlide,
                        (slideIndex + 1) * projectsPerSlide
                      )
                      .map((project, index) => (
                        <div
                          key={project.id}
                          className={`${styles.projectCard} ${
                            carouselInView ? styles.animateCard : ""
                          }`}
                          data-index={index}>
                          <div className={styles.projectImage}>
                            <div className={styles.imagePlaceholder}>
                              <span>{project.title}</span>
                            </div>
                            <div className={styles.projectOverlay}>
                              <div className={styles.projectLinks}>
                                <a
                                  href={project.liveUrl}
                                  className={styles.projectLink}>
                                  <span>🔗</span> Live Demo
                                </a>
                                <a
                                  href={project.githubUrl}
                                  className={styles.projectLink}>
                                  <span>📁</span> Source Code
                                </a>
                              </div>
                            </div>
                            <div className={styles.categoryBadge}>
                              {project.category}
                            </div>
                          </div>

                          <div className={styles.projectContent}>
                            <h3 className={styles.projectTitle}>
                              {project.title}
                            </h3>
                            <p className={styles.projectDescription}>
                              {project.description}
                            </p>

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
                ))}
              </div>
            </div>

            <button
              className={styles.carouselButton}
              onClick={nextSlide}
              aria-label="Next projects">
              ›
            </button>
          </div>

          <div className={styles.carouselDots}>
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentSlide ? styles.activeDot : ""
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Big Projects Section */}
      <div className={styles.bigProjectsSection}>
        <div className={styles.container}>
          <div ref={bigProjectsTitleRef}>
            <h2
              className={`${styles.sectionTitle} ${
                bigProjectsTitleInView ? styles.animate : ""
              }`}>
              Major Projects
            </h2>
            <p
              className={`${styles.sectionDescription} ${
                bigProjectsTitleInView ? styles.animate : ""
              }`}>
              Large-scale applications and enterprise solutions that demonstrate
              comprehensive technical expertise.
            </p>
          </div>

          <div className={styles.bigProjectsGrid} ref={bigProjectsRef}>
            {highlightedProjects.map((project, index) => (
              <div
                key={project.id}
                className={`${styles.bigProjectCard} ${
                  bigProjectsInView ? styles.animateCard : ""
                }`}
                data-index={index}>
                <div className={styles.bigProjectImage}>
                  <div className={styles.bigImagePlaceholder}>
                    <span>{project.title}</span>
                  </div>
                  <div className={styles.projectOverlay}>
                    <div className={styles.projectLinks}>
                      <a href={project.liveUrl} className={styles.projectLink}>
                        <span>🔗</span> Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        className={styles.projectLink}>
                        <span>📁</span> Source Code
                      </a>
                    </div>
                  </div>
                  <div className={styles.categoryBadge}>{project.category}</div>
                </div>

                <div className={styles.bigProjectContent}>
                  <h3 className={styles.bigProjectTitle}>{project.title}</h3>
                  <p className={styles.bigProjectDescription}>
                    {project.description}
                  </p>

                  {project.stats && (
                    <div className={styles.projectStats}>
                      {Object.entries(project.stats).map(([key, value]) => (
                        <div key={key} className={styles.statItem}>
                          <span className={styles.statValue}>{value}</span>
                          <span className={styles.statLabel}>{key}</span>
                        </div>
                      ))}
                    </div>
                  )}

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
      </div>
    </section>
  );
};

export default Projects;
