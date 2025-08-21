import React from "react";

const Projects: React.FC = () => {
  const projects = [
    {
      title: "Freshdeal - Mobile app",
      description:
        "FreshDeal is a comprehensive multi-platform application designed to tackle food waste by connecting businesses with surplus food to consumers seeking affordable, high-quality meals. The app promotes sustainability while providing budget-friendly dining options, aligning with the UN's Sustainable Development Goals.",
      image: "path/to/freshdeal-image.jpg",
      technologies: ["React Native", "Node.js", "MongoDB"],
      OpenSource: true,
      link: "https://github.com/freshdealapp/freshdealmobile",
    },
    {
      title: "Jukebox",
      description:
        " an interactive toolkit designed for Wi-Fi network attacks and security analysis. It automates various wireless security testing tasks including network reconnaissance, attack execution, and WPA/WPA2 password cracking.",
      image: "path/to/project2-image.jpg",
      technologies: ["Python", "Linux", "aircrack-ng"],
      OpenSource: true,
      link: "https://github.com/emreutkan/jukebox",
    },
    {
      title: "Citrus",
      description:
        "An Automated Evil Twin Framework designed to impersonate legitimate wireless networks with dnsmasq and hostapd. Citrus sets up a foundation for executing Man-in-the-Middle (MITM) attacks. It also has an option to deploy a captive portal using apache2, complete with a fake credentials page for phishing attacks.",
      image: "path/to/portfolio-image.jpg",
      technologies: ["Python", "Linux", "hostapd", "dnsmasq", "apache2", ],
      OpenSource: true,
      link: "https://github.com/emreutkan/citrus",
    },
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio website showcasing my projects, skills, and experiences. Built with React and styled-components for a modern, responsive design.",
      image: "path/to/portfolio-image.jpg",
      technologies: ["React", "CSS", "JavaScript"],
      OpenSource: true,
      link: "https://github.com/emreutkan/portfolio",
    },
  ];

  return null;
};

export default Projects;
