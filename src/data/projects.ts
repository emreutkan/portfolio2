export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  category: string;
  highlighted: boolean;
  stats?: {
    [key: string]: string;
  };
  featured?: boolean;
  duration?: string;
  team?: string;
  impact?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Enterprise ERP System",
    description: "Complete enterprise resource planning system for large organizations with modules for HR, Finance, Inventory, and CRM. Built with microservices architecture and scalable design patterns for handling millions of transactions.",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker", "Kubernetes", "AWS", "Redis", "GraphQL"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://erp-demo.example.com",
    githubUrl: "https://github.com/username/enterprise-erp",
    category: "Enterprise",
    highlighted: true,
    stats: {
      users: "10K+",
      companies: "50+",
      uptime: "99.9%",
      transactions: "1M+/day"
    },
    duration: "18 months",
    team: "8 developers",
    impact: "Reduced operational costs by 40% for client companies"
  },
  {
    id: 2,
    title: "Smart City Management Platform",
    description: "Comprehensive platform for smart city infrastructure management including traffic monitoring, waste management, energy optimization, and citizen services portal with real-time analytics.",
    technologies: ["React", "Python", "TensorFlow", "MongoDB", "Redis", "GraphQL", "IoT", "Machine Learning"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://smartcity-demo.example.com",
    githubUrl: "https://github.com/username/smart-city",
    category: "Smart City",
    highlighted: true,
    stats: {
      cities: "5",
      sensors: "10K+",
      efficiency: "+30%",
      citizens: "500K+"
    },
    duration: "24 months",
    team: "12 developers",
    impact: "Improved city efficiency by 30% and reduced energy consumption by 25%"
  },
  {
    id: 3,
    title: "Healthcare Management System",
    description: "Advanced healthcare platform with patient management, appointment scheduling, telemedicine, electronic health records, and analytics dashboard for healthcare providers with HIPAA compliance.",
    technologies: ["Vue.js", "Django", "PostgreSQL", "WebRTC", "Machine Learning", "HIPAA", "Docker", "AWS"],
    image: "/api/placeholder/600/400",
    liveUrl: "https://healthcare-demo.example.com",
    githubUrl: "https://github.com/username/healthcare-system",
    category: "Healthcare",
    highlighted: true,
    stats: {
      patients: "25K+",
      doctors: "500+",
      appointments: "100K+",
      satisfaction: "98%"
    },
    duration: "20 months",
    team: "10 developers",
    impact: "Improved patient care efficiency by 45% and reduced appointment wait times by 60%"
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with modern UI/UX, payment processing, inventory management, and comprehensive admin dashboard with real-time analytics.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redis", "AWS"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://ecommerce-demo.example.com",
    githubUrl: "https://github.com/username/ecommerce-platform",
    category: "E-Commerce",
    highlighted: false,
    duration: "8 months",
    team: "4 developers"
  },
  {
    id: 5,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates, drag-and-drop functionality, team collaboration features, and advanced project analytics.",
    technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL", "Redis"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://taskmanager-demo.example.com",
    githubUrl: "https://github.com/username/task-manager",
    category: "Productivity",
    highlighted: false,
    duration: "6 months",
    team: "3 developers"
  },
  {
    id: 6,
    title: "Weather Dashboard",
    description: "Responsive weather application with geolocation, forecasts, beautiful data visualizations, and weather alerts using modern web APIs.",
    technologies: ["Vue.js", "Chart.js", "OpenWeather API", "CSS3", "PWA"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://weather-demo.example.com",
    githubUrl: "https://github.com/username/weather-dashboard",
    category: "Dashboard",
    highlighted: false,
    duration: "3 months",
    team: "Solo project"
  },
  {
    id: 7,
    title: "Social Media App",
    description: "Modern social platform with real-time messaging, content sharing, stories feature, and advanced privacy controls built for mobile-first experience.",
    technologies: ["React Native", "Expo", "Firebase", "Redux", "WebRTC"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://social-demo.example.com",
    githubUrl: "https://github.com/username/social-media-app",
    category: "Social",
    highlighted: false,
    duration: "10 months",
    team: "5 developers"
  },
  {
    id: 8,
    title: "AI Chat Assistant",
    description: "Intelligent chatbot with natural language processing, machine learning capabilities, and multi-language support for customer service automation.",
    technologies: ["Python", "TensorFlow", "FastAPI", "React", "NLP", "OpenAI"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://ai-chat-demo.example.com",
    githubUrl: "https://github.com/username/ai-chat-assistant",
    category: "AI/ML",
    highlighted: false,
    duration: "7 months",
    team: "4 developers"
  },
  {
    id: 9,
    title: "Crypto Portfolio Tracker",
    description: "Real-time cryptocurrency portfolio management with advanced analytics, price alerts, trading signals, and comprehensive market analysis.",
    technologies: ["Next.js", "TypeScript", "Chart.js", "CoinGecko API", "WebSocket"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://crypto-demo.example.com",
    githubUrl: "https://github.com/username/crypto-tracker",
    category: "Finance",
    highlighted: false,
    duration: "5 months",
    team: "Solo project"
  },
  {
    id: 10,
    title: "Video Streaming Platform",
    description: "Netflix-like streaming service with user authentication, content management, video encoding, and personalized recommendations using machine learning.",
    technologies: ["React", "Node.js", "AWS", "MongoDB", "FFmpeg", "CDN"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://streaming-demo.example.com",
    githubUrl: "https://github.com/username/video-streaming",
    category: "Media",
    highlighted: false,
    duration: "12 months",
    team: "6 developers"
  },
  {
    id: 11,
    title: "Learning Management System",
    description: "Complete LMS with course creation, progress tracking, assessments, live streaming classes, and comprehensive analytics for educational institutions.",
    technologies: ["Vue.js", "Laravel", "MySQL", "Socket.io", "WebRTC", "AWS"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://lms-demo.example.com",
    githubUrl: "https://github.com/username/learning-management",
    category: "Education",
    highlighted: false,
    duration: "14 months",
    team: "7 developers"
  },
  {
    id: 12,
    title: "IoT Dashboard",
    description: "Real-time IoT device monitoring with data visualization, alerts, predictive maintenance, and comprehensive device management capabilities.",
    technologies: ["React", "MQTT", "InfluxDB", "Grafana", "Docker", "Kubernetes"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://iot-demo.example.com",
    githubUrl: "https://github.com/username/iot-dashboard",
    category: "IoT",
    highlighted: false,
    duration: "9 months",
    team: "5 developers"
  },
  {
    id: 13,
    title: "Fitness Tracking App",
    description: "Comprehensive fitness app with workout plans, nutrition tracking, progress analytics, social features, and AI-powered personal trainer recommendations.",
    technologies: ["React Native", "Redux", "SQLite", "Chart.js", "Machine Learning"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://fitness-demo.example.com",
    githubUrl: "https://github.com/username/fitness-tracker",
    category: "Health",
    highlighted: false,
    duration: "8 months",
    team: "4 developers"
  },
  {
    id: 14,
    title: "Project Management Tool",
    description: "Advanced project management platform with Gantt charts, resource allocation, time tracking, team collaboration, and comprehensive reporting features.",
    technologies: ["Angular", "Spring Boot", "PostgreSQL", "WebSocket", "Chart.js"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://pm-demo.example.com",
    githubUrl: "https://github.com/username/project-management",
    category: "Productivity",
    highlighted: false,
    duration: "11 months",
    team: "6 developers"
  },
  {
    id: 15,
    title: "Real Estate Platform",
    description: "Complete real estate marketplace with property listings, virtual tours, mortgage calculator, agent management, and advanced search capabilities.",
    technologies: ["React", "Node.js", "MongoDB", "MapBox", "Stripe", "AWS"],
    image: "/api/placeholder/400/250",
    liveUrl: "https://realestate-demo.example.com",
    githubUrl: "https://github.com/username/real-estate",
    category: "Real Estate",
    highlighted: false,
    duration: "10 months",
    team: "5 developers"
  }
];

// Helper functions to filter projects
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => !project.highlighted);
};

export const getHighlightedProjects = (): Project[] => {
  return projects.filter(project => project.highlighted);
};

export const getProjectById = (id: number): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter(project => project.category === category);
};
