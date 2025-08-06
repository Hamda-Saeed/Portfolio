// Updated projects data with real information from Hamda's GitHub
export const projectsData = [
  {
    id: 1,
    title: "QR Code Generator",
    description: "A Flask-based web application that generates QR codes from text or URLs. Features a clean Bootstrap UI, downloadable QR images, and easy deployment options.",
    img: "/home/ubuntu/upload/search_images/kNrbrnb50flC.jpg", // QR code generator interface
    technologies: ["Python", "Flask", "HTML", "CSS", "Bootstrap"],
    github: "https://github.com/Hamda-Saeed/qr-code-generator",
    demo: null, // Demo mentioned but link not provided
    category: "Web Application",
    featured: true
  },
  {
    id: 2,
    title: "Face Recognition Attendance",
    description: "Browser-based attendance system using ReactJS and face-api.js. Features facial recognition, automatic attendance marking, and real-time face detection without backend dependencies.",
    img: "/home/ubuntu/upload/search_images/lKBhP36kmeow.webp", // Face recognition system
    technologies: ["ReactJS", "face-api.js", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/Hamda-Saeed/face-match-attendance",
    demo: null, // Live demo mentioned (Netlify) but link not provided
    category: "AI/ML Application",
    featured: true
  },
  {
    id: 3,
    title: "My Dear Diary",
    description: "Personal digital planner for academic life with custom scheduling, subject tracking, and task management. Built with Node.js, Express, and SQL Server with JWT authentication.",
    img: "/home/ubuntu/upload/search_images/inqRDvAapNsR.jpg", // Personal planner interface
    technologies: ["Node.js", "Express.js", "SQL Server", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/Hamda-Saeed/My_Dear_Diary",
    demo: null,
    category: "Full-Stack Application",
    featured: true
  },
  {
    id: 4,
    title: "Dreamy To-Do Dashboard",
    description: "Beautiful themed To-Do list application built with Python & Tkinter. Features theme switching, notes/focus sections, Pomodoro timer, and file saving capabilities.",
    img: "/home/ubuntu/upload/search_images/As7NiJAEmTNa.png", // Todo app interface
    technologies: ["Python", "Tkinter"],
    github: "https://github.com/Hamda-Saeed/dreamy-todo",
    demo: null,
    category: "Desktop Application",
    featured: false
  },
  {
    id: 5,
    title: "Flappy Bird Game",
    description: "Classic Flappy Bird game implementation built with Assembly language, showcasing low-level programming skills and game development fundamentals.",
    img: "/home/ubuntu/upload/search_images/C57a3epfdKQ5.png", // Flappy bird screenshot
    technologies: ["Assembly"],
    github: "https://github.com/Hamda-Saeed/Flappy-Bird",
    demo: null,
    category: "Game Development",
    featured: false
  },
  {
    id: 6,
    title: "Interactive 3D Portfolio",
    description: "Modern 3D animated portfolio website built with React, Three.js, and GSAP. Features interactive 3D models, smooth animations, and responsive design.",
    img: "/home/ubuntu/upload/search_images/Y72UtKfGGSsw.png", // Modern UI design
    technologies: ["React", "Three.js", "GSAP", "Tailwind CSS", "JavaScript"],
    github: "https://github.com/Hamda-Saeed/Portfolio",
    demo: null,
    category: "Web Development",
    featured: true
  }
];

// Categories for filtering
export const projectCategories = [
  "All",
  "Web Application", 
  "AI/ML Application",
  "Full-Stack Application",
  "Desktop Application",
  "Game Development",
  "Web Development"
];

// Technology icons mapping
export const techIcons = {
  "Python": "/images/python.svg",
  "Flask": "/images/flask.svg", 
  "ReactJS": "/images/react.svg",
  "JavaScript": "/images/js.svg",
  "HTML": "/images/html.svg",
  "CSS": "/images/css.svg",
  "Node.js": "/images/nodejs.svg",
  "Three.js": "/images/threejs.svg",
  "GSAP": "/images/gsap.svg",
  "Tailwind CSS": "/images/tailwind.svg",
  "Bootstrap": "/images/bootstrap.svg",
  "Assembly": "/images/assembly.svg",
  "Tkinter": "/images/tkinter.svg",
  "face-api.js": "/images/faceapi.svg",
  "Express.js": "/images/express.svg",
  "SQL Server": "/images/sqlserver.svg"
};

