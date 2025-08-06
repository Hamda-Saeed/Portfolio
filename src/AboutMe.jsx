import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TitleHeader from './TitleHeader';
import GradientSpheres from './GradientSpheres';

gsap.registerPlugin(ScrollTrigger);

const AboutMe = () => {
  const aboutRef = useRef(null);
  const cardsRef = useRef([]);
  const shapesRef = useRef([]);
  const [activeCard, setActiveCard] = useState(0);

  // About me data
  const aboutData = {
    intro: "Hi there! 👋 I'm Hamda Saeed",
    description: "A passionate developer who breaks into creative experiments and sometimes forgets I'm not building the next Iron Man suit 🦾💻. I specialize in creating innovative web applications, exploring AI/ML technologies, and bringing ideas to life through code.",
    currentWork: "Gesture Controlled Virtual Assistant 🤖 & Interactive 3D Web Portfolio 💫",
    learning: "Backend APIs (Node.js, MongoDB), Full-stack integrations & Data Science",
    collaboration: "Creative tech projects, web apps, or anything experimental & fun 🌟",
    help: "Scaling full-stack apps and deploying ML-powered features",
    askMe: "Web dev, creative coding, passion projects, and productivity hacks",
    contact: "hamdasaeed915@gmail.com",
    pronouns: "She/Her",
    funFact: "I break into creative experiments and sometimes forget I'm not building the next Iron Man suit 🦾💻"
  };

  // Floating cards data
  const floatingCards = [
    {
      title: "Currently Working On",
      content: aboutData.currentWork,
      icon: "🔭",
      gradient: "from-purple-500 to-pink-500",
      delay: 0
    },
    {
      title: "Currently Learning",
      content: aboutData.learning,
      icon: "🌱",
      gradient: "from-green-500 to-emerald-500",
      delay: 0.2
    },
    {
      title: "Looking to Collaborate",
      content: aboutData.collaboration,
      icon: "👯",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.4
    },
    {
      title: "Ask Me About",
      content: aboutData.askMe,
      icon: "💬",
      gradient: "from-orange-500 to-red-500",
      delay: 0.6
    }
  ];

  // GSAP Animations
  useGSAP(() => {
    // Main intro animation
    gsap.fromTo('.about-intro', 
      {
        y: 100,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: '.about-intro',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Floating cards animation
    gsap.fromTo('.floating-card', 
      {
        y: 80,
        opacity: 0,
        rotationY: 45,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: '.floating-cards-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // 3D shapes animation
    gsap.to('.floating-shape', {
      y: -20,
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: 'none',
      stagger: 1
    });

    // Continuous floating animation for cards
    gsap.to('.floating-card', {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.5
    });

  }, []);

  // 3D hover effect for cards
  const handleCardMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = (e.clientY - centerY) / 20;
    const rotateY = (centerX - e.clientX) / 20;

    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleCardMouseLeave = (index) => {
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
    <section className="w-full min-h-screen flex-center relative overflow-hidden" id="about">
      {/* Animated Background */}
      <GradientSpheres
        sphere1Class="about-gradient-sphere about-sphere-1"
        sphere2Class="about-gradient-sphere about-sphere-2"
      />

      {/* 3D Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          ref={el => shapesRef.current[0] = el}
          className="floating-shape absolute top-20 left-16 w-16 h-16 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-sm"
        ></div>
        <div 
          ref={el => shapesRef.current[1] = el}
          className="floating-shape absolute bottom-32 right-20 w-20 h-20 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 transform rotate-45 blur-sm"
        ></div>
        <div 
          ref={el => shapesRef.current[2] = el}
          className="floating-shape absolute top-1/3 right-16 w-12 h-12 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full blur-sm"
        ></div>
        <div 
          ref={el => shapesRef.current[3] = el}
          className="floating-shape absolute bottom-1/4 left-12 w-14 h-14 bg-gradient-to-r from-orange-400/30 to-red-400/30 transform rotate-12 blur-sm"
        ></div>
      </div>

      <div className="w-full md:my-40 my-20 relative z-10" ref={aboutRef}>
        <div className="container mx-auto md:p-0 px-5">
          <TitleHeader
            title="ABOUT ME"
            number="05"
            text="Get to know the person behind the code"
          />

          {/* Main Introduction */}
          <div className="about-intro text-center max-w-4xl mx-auto mt-20 mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {aboutData.intro}
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
              {aboutData.description}
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg">
              <div className="flex items-center gap-2 text-purple-300">
                <span className="text-2xl">📫</span>
                <a 
                  href={`mailto:${aboutData.contact}`}
                  className="hover:text-purple-200 transition-colors"
                >
                  {aboutData.contact}
                </a>
              </div>
              <div className="flex items-center gap-2 text-blue-300">
                <span className="text-2xl">😄</span>
                <span>Pronouns: {aboutData.pronouns}</span>
              </div>
            </div>
          </div>

          {/* Floating Cards Grid */}
          <div className="floating-cards-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {floatingCards.map((card, index) => (
              <div
                key={index}
                ref={el => cardsRef.current[index] = el}
                className="floating-card group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-500 cursor-pointer"
                onMouseMove={(e) => handleCardMouseMove(e, index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                
                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center text-2xl shadow-lg`}>
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {card.content}
                  </p>
                </div>

                {/* 3D Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-5 transition-all duration-500 pointer-events-none blur-xl`}></div>
              </div>
            ))}
          </div>

          {/* Fun Fact Section */}
          <div className="text-center mt-20">
            <div className="inline-block bg-gradient-to-r from-yellow-400/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-8 border border-yellow-400/30">
              <h3 className="text-2xl font-bold text-yellow-300 mb-4 flex items-center justify-center gap-2">
                <span className="text-3xl">⚡</span>
                Fun Fact
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                {aboutData.funFact}
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">Let's Connect</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
              
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <span className="relative z-10">View My Work</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .about-gradient-sphere {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.3;
          animation: pulse 8s ease-in-out infinite;
        }
        
        .about-sphere-1 {
          top: 10%;
          left: 5%;
          width: 400px;
          height: 400px;
          background: linear-gradient(45deg, #a855f7, #ec4899);
        }
        
        .about-sphere-2 {
          bottom: 10%;
          right: 5%;
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, #3b82f6, #06b6d4);
          animation-delay: 4s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .floating-shape {
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-shape:nth-child(2) {
          animation-delay: 2s;
        }
        
        .floating-shape:nth-child(3) {
          animation-delay: 4s;
        }
        
        .floating-shape:nth-child(4) {
          animation-delay: 6s;
        }
      `}</style>
    </section>
  );
};

export default AboutMe;

