import React, { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificatesData, certificateCategories, platforms } from './constants/certificates';
import TitleHeader from './TitleHeader';
import GradientSpheres from './GradientSpheres';

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const certificatesRef = useRef(null);
  const cardsRef = useRef([]);
  const modalRef = useRef(null);

  // Filter certificates based on selected category
  const filteredCertificates = selectedCategory === 'All' 
    ? certificatesData 
    : certificatesData.filter(cert => cert.category === selectedCategory);

  // GSAP Animations
  useGSAP(() => {
    // Certificate cards entrance animation
    gsap.fromTo('.certificate-card', 
      {
        y: 80,
        opacity: 0,
        rotationX: 45,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: '.certificates-grid',
          start: 'top 85%',
          end: 'bottom 15%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Featured certificates glow animation
    gsap.to('.featured-certificate', {
      boxShadow: '0 0 30px rgba(139, 92, 246, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    // Floating animation for certificate icons
    gsap.to('.certificate-icon', {
      y: -10,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.5
    });

  }, [filteredCertificates]);

  // Modal animations
  useGSAP(() => {
    if (isModalOpen && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isModalOpen]);

  // 3D hover effect for certificate cards
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = (e.clientY - centerY) / 15;
    const rotateY = (centerX - e.clientX) / 15;

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

  // Open certificate modal
  const openCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          setIsModalOpen(false);
          setSelectedCertificate(null);
        }
      });
    }
  };

  return (
    <section className="w-full min-h-screen flex-center relative overflow-hidden" id="certificates">
      {/* Animated Background */}
      <GradientSpheres
        sphere1Class="certificates-gradient-sphere certificates-sphere-1"
        sphere2Class="certificates-gradient-sphere certificates-sphere-2"
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="certificate-icon absolute top-16 right-20 w-12 h-12 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-sm"></div>
        <div className="certificate-icon absolute bottom-24 left-16 w-16 h-16 bg-gradient-to-r from-green-400/30 to-emerald-500/30 rounded-full blur-sm"></div>
        <div className="certificate-icon absolute top-1/3 left-8 w-8 h-8 bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full blur-sm"></div>
      </div>

      <div className="w-full md:my-40 my-20 relative z-10" ref={certificatesRef}>
        <div className="container mx-auto md:p-0 px-5">
          <TitleHeader
            title="CERTIFICATES"
            number="04"
            text="Professional achievements and continuous learning"
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mt-16 mb-12">
            {certificateCategories.map((category) => (
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

          {/* Certificates Grid */}
          <div className="certificates-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-20">
            {filteredCertificates.map((certificate, index) => (
              <div
                key={certificate.id}
                ref={el => cardsRef.current[index] = el}
                className={`certificate-card group relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-purple-500/50 transition-all duration-500 cursor-pointer ${
                  certificate.featured ? 'featured-certificate' : ''
                }`}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => openCertificate(certificate)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Featured Badge */}
                {certificate.featured && (
                  <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                    FEATURED
                  </div>
                )}

                {/* Certificate Preview */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Verification Badge */}
                  {certificate.verificationUrl && (
                    <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Verified
                    </div>
                  )}
                </div>

                {/* Certificate Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-purple-400 font-mono tracking-wider uppercase">
                      {certificate.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {certificate.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {certificate.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-300">by</span>
                    <span className="text-sm font-semibold text-blue-400">{certificate.issuer}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-300">{certificate.platform}</span>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                    {certificate.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-md border border-white/20"
                      >
                        {skill}
                      </span>
                    ))}
                    {certificate.skills.length > 3 && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-md">
                        +{certificate.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* 3D Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Add New Certificate Button (for easy updates) */}
          <div className="flex justify-center mt-16">
            <div className="text-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl mb-4">
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Add New Certificate
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <p className="text-gray-400 text-sm">
                To add new certificates, update the certificatesData array in constants/certificates.js
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {isModalOpen && selectedCertificate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <div className="p-8">
              {/* Certificate Image */}
              <div className="mb-6">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>

              {/* Certificate Details */}
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-4">{selectedCertificate.title}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-purple-300">Issuer Information</h3>
                    <p className="text-gray-300 mb-1"><strong>Issuer:</strong> {selectedCertificate.issuer}</p>
                    <p className="text-gray-300 mb-1"><strong>Platform:</strong> {selectedCertificate.platform}</p>
                    <p className="text-gray-300 mb-1"><strong>Date:</strong> {selectedCertificate.date}</p>
                    <p className="text-gray-300"><strong>Category:</strong> {selectedCertificate.category}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-purple-300">Skills Acquired</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-purple-300">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedCertificate.description}</p>
                </div>

                {/* Verification Link */}
                {selectedCertificate.verificationUrl && (
                  <div className="flex justify-center">
                    <a
                      href={selectedCertificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full hover:from-green-700 hover:to-emerald-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Verify Certificate
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .certificates-gradient-sphere {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.4;
          animation: pulse 6s ease-in-out infinite;
        }
        
        .certificates-sphere-1 {
          top: 15%;
          right: 15%;
          width: 250px;
          height: 250px;
          background: linear-gradient(45deg, #fbbf24, #f59e0b);
        }
        
        .certificates-sphere-2 {
          bottom: 15%;
          left: 15%;
          width: 350px;
          height: 350px;
          background: linear-gradient(45deg, #10b981, #059669);
          animation-delay: 3s;
        }
      `}</style>
    </section>
  );
};

export default Certificates;

