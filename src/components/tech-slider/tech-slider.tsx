import React from "react";
import styles from "./tech-slider.module.css";

interface TechSliderProps {
  icons: string[];
  className?: string;
  speed?: number; // Animation speed in seconds
  showTooltips?: boolean;
  size?: "small" | "medium" | "large";
}

// Technology mapping - you can extend this as needed
const techIcons: Record<string, { name: string; logo: string }> = {
  react: {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  "react-native": {
    name: "React Native",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  expo: {
    name: "Expo",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/expo/expo-original.svg",
  },
  typescript: {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  javascript: {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  nodejs: {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  linux: {
    name: "Linux",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  bash: {
    name: "Bash",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
  azure: {
    name: "Azure",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  },
  "google-cloud": {
    name: "Google Cloud",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  },
  git: {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  mongodb: {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  postgresql: {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  docker: {
    name: "Docker",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  nextjs: {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  vite: {
    name: "Vite",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  },
  css3: {
    name: "CSS3",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  html5: {
    name: "HTML5",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  python: {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  express: {
    name: "Express",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  vue: {
    name: "Vue.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  angular: {
    name: "Angular",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  },
  svelte: {
    name: "Svelte",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  },
  flutter: {
    name: "Flutter",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  dart: {
    name: "Dart",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  },
  kotlin: {
    name: "Kotlin",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  },
  swift: {
    name: "Swift",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  },
  java: {
    name: "Java",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  "c++": {
    name: "C++",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  "c#": {
    name: "C#",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  go: {
    name: "Go",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  },
  rust: {
    name: "Rust",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
  },
  php: {
    name: "PHP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  mysql: {
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  redis: {
    name: "Redis",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  firebase: {
    name: "Firebase",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  },
  aws: {
    name: "AWS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  },
  kubernetes: {
    name: "Kubernetes",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  graphql: {
    name: "GraphQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  tailwind: {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  },
  sass: {
    name: "Sass",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  },
  webpack: {
    name: "Webpack",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
  },
  eslint: {
    name: "ESLint",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg",
  },
  jest: {
    name: "Jest",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  },
  cypress: {
    name: "Cypress",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",
  },
};

const TechSlider: React.FC<TechSliderProps> = ({
  icons,
  className = "",
  speed = 30,
  showTooltips = true,
  size = "medium",
}) => {
  // Filter technologies based on provided icons
  const technologies = icons
    .map((icon) => techIcons[icon.toLowerCase()])
    .filter(Boolean); // Remove undefined entries

  // If no valid technologies found, return null or a fallback
  if (technologies.length === 0) {
    console.warn(
      "TechSlider: No valid technology icons found. Available icons:",
      Object.keys(techIcons)
    );
    return null;
  }

  // Duplicate technologies for seamless loop
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <div className={`${styles.techSlider} ${styles[size]} ${className}`}>
      <div
        className={styles.sliderTrack}
        style={
          {
            "--animation-duration": `${speed}s`,
          } as React.CSSProperties
        }>
        {duplicatedTech.map((tech, index) => (
          <div key={`${tech.name}-${index}`} className={styles.techItem}>
            <img
              src={tech.logo}
              alt={tech.name}
              className={styles.techLogo}
              loading="lazy"
            />
            {showTooltips && (
              <span className={styles.techTooltip}>{tech.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechSlider;
