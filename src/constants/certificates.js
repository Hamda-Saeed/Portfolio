// Certificates data based on Hamda's achievements
export const certificatesData = [
  {
    id: 1,
    title: "Getting Started with Git and GitHub",
    issuer: "IBM",
    platform: "Coursera",
    date: "Jul 25, 2025",
    description: "An online non-credit course authorized by IBM and offered through Coursera covering version control fundamentals and collaborative development workflows.",
    image: "/home/ubuntu/upload/githubcertifiacae.png",
    verificationUrl: "https://coursera.org/verify/WFTL8ZBV6K4N",
    skills: ["Git", "GitHub", "Version Control", "Collaboration"],
    category: "Development Tools",
    featured: true
  },
  {
    id: 2,
    title: "Databases and SQL for Data Science with Python",
    issuer: "IBM",
    platform: "Coursera", 
    date: "Jul 22, 2025",
    description: "An online non-credit course authorized by IBM and offered through Coursera focusing on database management and SQL programming for data science applications.",
    image: "/home/ubuntu/upload/Screenshot2025-07-22222511.png",
    verificationUrl: "https://coursera.org/verify/6QP6V52HQ5",
    skills: ["SQL", "Python", "Database Management", "Data Science"],
    category: "Data Science",
    featured: true
  },
  {
    id: 3,
    title: "Introduction to HTML",
    issuer: "Coursera Project Network",
    platform: "Coursera",
    date: "Jul 21, 2025", 
    description: "An online non-credit project authorized by Coursera Project Network covering HTML fundamentals and web development basics.",
    image: "/home/ubuntu/upload/Screenshot2025-07-22001351.png",
    verificationUrl: "https://coursera.org/verify/MHE5XZA8VLQ9",
    skills: ["HTML", "Web Development", "Frontend"],
    category: "Web Development",
    featured: false
  },
  {
    id: 4,
    title: "Technology Job Simulation",
    issuer: "Deloitte",
    platform: "Forage",
    date: "July 5th, 2025",
    description: "Certificate of Completion for practical tasks in Coding and Development during July 2025, demonstrating hands-on experience in technology consulting.",
    image: "/home/ubuntu/upload/Screenshot2025-07-05090409.png",
    verificationUrl: null,
    skills: ["Coding", "Development", "Technology Consulting", "Problem Solving"],
    category: "Professional Development",
    featured: true
  }
];

// Certificate categories for filtering
export const certificateCategories = [
  "All",
  "Development Tools",
  "Data Science", 
  "Web Development",
  "Professional Development"
];

// Skills extracted from all certificates
export const allSkills = [
  "Git", "GitHub", "Version Control", "Collaboration",
  "SQL", "Python", "Database Management", "Data Science",
  "HTML", "Web Development", "Frontend",
  "Coding", "Development", "Technology Consulting", "Problem Solving"
];

// Platform/Issuer information
export const platforms = {
  "Coursera": {
    logo: "/images/coursera-logo.svg",
    color: "#0056D3"
  },
  "IBM": {
    logo: "/images/ibm-logo.svg", 
    color: "#1261FE"
  },
  "Deloitte": {
    logo: "/images/deloitte-logo.svg",
    color: "#86BC25"
  },
  "Forage": {
    logo: "/images/forage-logo.svg",
    color: "#FF6B35"
  }
};

