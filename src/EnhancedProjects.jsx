import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData, projectCategories } from './constants/projects';
import TitleHeader from './TitleHeader';
import GradientSpheres from './GradientSpheres';

gsap.registerPlugin(ScrollTrigger);

const EnhancedProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentProject, setCurrentProject] = useState(0);
  const projectsRef = useRef(null);
  const cardsRef = useRef([]);

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);

  // 3D Card Animation Setup
  useGSAP(() => {
    // Initial setup for all cards
    gsap.set('.project-card', {
      rotationY: 0,
      rotationX: 0,
      z: 0,
      scale: 1,
      opacity: 1
    });

    // Stagger animation for cards entrance
    gsap.fromTo('.project-card', 
      {
        y: 100,
        opacity: 0,
        rotationY: 45,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Featured project spotlight animation
    gsap.to('.featured-project', {
      scale: 1.05,
      z: 50,
      boxShadow: '0 25px 50px rgba(139, 92, 246, 0.3)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

  }, [filteredProjects]);

  // Mouse interaction for 3D tilt effect
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = (e.clientY - centerY) / 10;
    const rotateY = (centerX - e.clientX) / 10;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <section className="w-full min-h-screen flex-center relative overflow-hidden" id="projects">
      {/* Animated Background Elements */}
      <GradientSpheres
        sphere1Class="projects-gradient-sphere projects-sphere-1"
        sphere2Class="projects-gradient-sphere projects-sphere-2"
      />
      
      {/* Floating 3D Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
      </div>

      <div className="w-full md:my-40 my-20 relative z-10" ref={projectsRef}>
        <div className="container mx-auto md:p-0 px-5">
          <TitleHeader
            title="My PROJECTS"
            number="03"
            text="Explore my latest work and innovations"
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mt-16 mb-12">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20 border border-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={el => cardsRef.current[index] = el}
                className={`project-card group relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-purple-500/50 transition-all duration-500 cursor-pointer ${
                  project.featured ? 'featured-project' : ''
                }`}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    FEATURED
                  </div>
                )}

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-sm text-white text-sm rounded-full hover:bg-gray-800/80 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                            </svg>
                            GitHub
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm rounded-full hover:from-purple-700 hover:to-blue-700 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12L8 10l5.5-5.5 1.5 1.5L10 12z"/>
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd"/>
                            </svg>
                            Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-purple-400 font-mono tracking-wider uppercase">
                      {project.category}
                    </span>
                    <div className="flex gap-1">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <div
                          key={techIndex}
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400"
                        ></div>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-md border border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-md">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* 3D Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="flex justify-center mt-16">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <span className="relative z-10">View All Projects</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .project-card {
          transform-style: preserve-3d;
        }
        
        .projects-gradient-sphere {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.6;
          animation: pulse 4s ease-in-out infinite;
        }
        
        .projects-sphere-1 {
          top: 10%;
          left: 10%;
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #8b5cf6, #3b82f6);
        }
        
        .projects-sphere-2 {
          bottom: 10%;
          right: 10%;
          width: 400px;
          height: 400px;
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default EnhancedProjects;

