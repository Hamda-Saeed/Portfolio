import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { iconsList } from './constants';
import TitleHeader from './TitleHeader';
import GradientSpheres from './GradientSpheres';

gsap.registerPlugin(ScrollTrigger);

const EnhancedTechStack = () => {
  const techRef = useRef(null);
  const iconsRef = useRef([]);
  const orbsRef = useRef([]);
  const [hoveredTech, setHoveredTech] = useState(null);

  // Extended tech stack with categories
  const techCategories = {
    "Frontend": [
      { name: "HTML", image: "/images/html.svg", level: 90 },
      { name: "CSS", image: "/images/css.svg", level: 85 },
      { name: "JavaScript", image: "/images/js.svg", level: 88 },
      { name: "React", image: "/images/react.svg", level: 85 },
      { name: "TypeScript", image: "/images/ts.svg", level: 75 }
    ],
    "Backend & Database": [
      { name: "Node.js", image: "/images/nodejs.svg", level: 80 },
      { name: "Python", image: "/images/python.svg", level: 85 },
      { name: "SQL Server", image: "/images/sqlserver.svg", level: 75 },
      { name: "MongoDB", image: "/images/mongodb.svg", level: 70 }
    ],
    "Tools & Frameworks": [
      { name: "Git/GitHub", image: "/images/github.svg", level: 90 },
      { name: "GSAP", image: "/images/gsap.svg", level: 80 },
      { name: "Three.js", image: "/images/threejs.svg", level: 75 },
      { name: "Figma", image: "/images/figma.svg", level: 85 },
      { name: "AWS", image: "/images/aws.svg", level: 65 }
    ],
    "Currently Learning": [
      { name: "Data Science", image: "/images/datascience.svg", level: 60 },
      { name: "Machine Learning", image: "/images/ml.svg", level: 55 },
      { name: "Docker", image: "/images/docker.svg", level: 50 }
    ]
  };

  // GSAP Animations
  useGSAP(() => {
    // Tech icons entrance animation
    gsap.fromTo('.tech-icon', 
      {
        scale: 0,
        rotation: 180,
        opacity: 0
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: '.tech-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Category cards animation
    gsap.fromTo('.tech-category', 
      {
        y: 100,
        opacity: 0,
        rotationX: 45
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.tech-categories',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Floating orbs animation
    gsap.to('.tech-orb', {
      y: -30,
      x: 20,
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: 'none',
      stagger: 2
    });

    // Continuous floating for tech icons
    gsap.to('.tech-icon', {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.2
    });

  }, []);

  // 3D hover effect for tech icons
  const handleTechMouseMove = (e, index) => {
    const icon = iconsRef.current[index];
    if (!icon) return;

    const rect = icon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = (e.clientY - centerY) / 10;
    const rotateY = (centerX - e.clientX) / 10;

    gsap.to(icon, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: 1.1,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleTechMouseLeave = (index) => {
    const icon = iconsRef.current[index];
    if (!icon) return;

    gsap.to(icon, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <section className="w-full min-h-screen flex-center relative overflow-hidden" id="tech">
      {/* Animated Background */}
      <GradientSpheres
        sphere1Class="tech-gradient-sphere tech-sphere-1"
        sphere2Class="tech-gradient-sphere tech-sphere-2"
      />

      {/* Floating Tech Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          ref={el => orbsRef.current[0] = el}
          className="tech-orb absolute top-16 left-20 w-20 h-20 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        ></div>
        <div 
          ref={el => orbsRef.current[1] = el}
          className="tech-orb absolute bottom-24 right-16 w-24 h-24 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"
        ></div>
        <div 
          ref={el => orbsRef.current[2] = el}
          className="tech-orb absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-xl"
        ></div>
        <div 
          ref={el => orbsRef.current[3] = el}
          className="tech-orb absolute bottom-1/3 left-16 w-18 h-18 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-full blur-xl"
        ></div>
      </div>

      <div className="w-full md:my-40 my-20 relative z-10" ref={techRef}>
        <div className="container mx-auto md:p-0 px-5">
          <TitleHeader
            title="TECH STACK"
            number="06"
            text="Technologies I work with and love"
          />

          {/* Tech Categories */}
          <div className="tech-categories grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 max-w-6xl mx-auto">
            {Object.entries(techCategories).map(([category, techs], categoryIndex) => (
              <div
                key={category}
                className="tech-category group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-500"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">
                      {category === 'Frontend' ? '🎨' : 
                       category === 'Backend & Database' ? '⚙️' : 
                       category === 'Tools & Frameworks' ? '🛠️' : '📚'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    {category}
                  </h3>
                </div>

                {/* Tech Icons Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {techs.map((tech, techIndex) => {
                    const globalIndex = categoryIndex * 10 + techIndex;
                    return (
                      <div
                        key={tech.name}
                        ref={el => iconsRef.current[globalIndex] = el}
                        className="tech-icon group/icon relative bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
                        onMouseMove={(e) => handleTechMouseMove(e, globalIndex)}
                        onMouseLeave={() => handleTechMouseLeave(globalIndex)}
                        onMouseEnter={() => setHoveredTech(tech)}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Tech Icon */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 flex items-center justify-center">
                            <img
                              src={tech.image}
                              alt={tech.name}
                              className="w-full h-full object-contain group-hover/icon:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                // Fallback for missing images
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div 
                              className="w-full h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg items-center justify-center text-white font-bold text-xs hidden"
                            >
                              {tech.name.slice(0, 2)}
                            </div>
                          </div>
                          <span className="text-xs text-white/80 text-center font-medium">
                            {tech.name}
                          </span>
                        </div>

                        {/* Skill Level Bar */}
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${tech.level}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Hover Glow */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-blue-500/0 group-hover/icon:from-purple-500/10 group-hover/icon:to-blue-500/10 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    );
                  })}
                </div>

                {/* Category Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:via-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Hovered Tech Details */}
          {hoveredTech && (
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md rounded-xl p-4 border border-purple-500/50 z-50 pointer-events-none">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8">
                  <img
                    src={hoveredTech.image}
                    alt={hoveredTech.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold">{hoveredTech.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Proficiency:</span>
                    <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                        style={{ width: `${hoveredTech.level}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-purple-300">{hoveredTech.level}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Learning Journey */}
          <div className="text-center mt-20">
            <div className="inline-block bg-gradient-to-r from-green-400/20 to-blue-400/20 backdrop-blur-md rounded-2xl p-8 border border-green-400/30 max-w-2xl">
              <h3 className="text-2xl font-bold text-green-300 mb-4 flex items-center justify-center gap-2">
                <span className="text-3xl">🚀</span>
                Continuous Learning
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                I'm constantly exploring new technologies and expanding my skill set. 
                Currently diving deep into Data Science, Machine Learning, and cloud technologies 
                to build more intelligent and scalable applications.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">See These Skills in Action</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .tech-gradient-sphere {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.4;
          animation: pulse 6s ease-in-out infinite;
        }
        
        .tech-sphere-1 {
          top: 20%;
          right: 10%;
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
        }
        
        .tech-sphere-2 {
          bottom: 20%;
          left: 10%;
          width: 250px;
          height: 250px;
          background: linear-gradient(45deg, #10b981, #06b6d4);
          animation-delay: 3s;
        }
        
        .tech-icon {
          transform-style: preserve-3d;
        }
        
        .tech-category {
          transform-style: preserve-3d;
        }
        
        @keyframes techFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        
        .tech-orb {
          animation: techFloat 8s ease-in-out infinite;
        }
        
        .tech-orb:nth-child(2) {
          animation-delay: 2s;
        }
        
        .tech-orb:nth-child(3) {
          animation-delay: 4s;
        }
        
        .tech-orb:nth-child(4) {
          animation-delay: 6s;
        }
      `}</style>
    </section>
  );
};

export default EnhancedTechStack;

