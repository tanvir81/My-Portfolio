import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectImg1 from '../assets/project-1.png';
import projectImg2 from '../assets/project-2.png';
import projectImg3 from '../assets/project-3.png';
import profileImg from '../assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const titleRef = useRef(null);
  const imagesRef = useRef([]);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Split text animation for title with enhanced effects
    const title = titleRef.current;
    const words = title.querySelectorAll('.word');
    
    gsap.fromTo(
      words,
      { 
        opacity: 0, 
        y: 150, 
        rotationX: -90,
        scale: 0.5,
        filter: 'blur(20px)'
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.5,
      }
    );

    // Enhanced parallax effect for project images
    imagesRef.current.forEach((img, index) => {
      if (img) {
        gsap.fromTo(
          img,
          { 
            y: 150, 
            opacity: 0, 
            scale: 0.6, 
            rotation: index % 2 === 0 ? -15 : 15,
            filter: 'blur(10px)'
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            delay: 1.8 + index * 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Enhanced hover animation
        img.addEventListener('mouseenter', () => {
          gsap.to(img, { 
            scale: 1.08, 
            rotation: 0, 
            y: -15,
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
            duration: 0.4, 
            ease: 'power2.out' 
          });
        });
        img.addEventListener('mouseleave', () => {
          gsap.to(img, { 
            scale: 1, 
            y: 0,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            duration: 0.4, 
            ease: 'power2.out' 
          });
        });
      }
    });

    // Floating particles animation
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: -100,
          x: gsap.utils.random(-30, 30),
          opacity: 0,
          duration: gsap.utils.random(4, 8),
          repeat: -1,
          delay: index * 0.3,
          ease: 'power1.out',
        });
      }
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  const profileVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.2
      }
    }
  };

  // Generate floating particles outside render
  const particles = [...Array(15)].map((_, i) => ({
    id: i,
    left: (i * 7) % 100,
    top: (i * 13) % 100,
    size: (i % 3) + 2,
  }));

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background matching other sections */}
      <div className="absolute inset-0 bg-background-light dark:bg-background-dark" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            ref={(el) => (particlesRef.current[particle.id] = el)}
            className="absolute rounded-full bg-gradient-to-r from-primary/30 to-blue-500/30"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border-2 border-primary/20 rounded-full"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg"
          animate={{
            rotate: -360,
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-16 h-16 border-2 border-purple-500/20"
          animate={{
            rotate: 45,
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="max-w-5xl mx-auto flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Enhanced Profile Section */}
          <motion.div
            variants={profileVariants}
            className="mb-12 relative group"
          >
            {/* Animated rings around profile */}
            <motion.div
              className="absolute -inset-8 rounded-full border-2 border-primary/20"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <motion.div
              className="absolute -inset-12 rounded-full border border-blue-500/10"
              animate={{
                rotate: -360,
                scale: [1.1, 1, 1.1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            
            {/* Glowing background */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            
            <img 
              src={profileImg} 
              alt="Tanvir Khan" 
              className="relative w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Status indicator */}
            <motion.div
              className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* Enhanced Title Section */}
          <div className="mb-8">
            <motion.div
              variants={itemVariants}
              className="mb-4"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                ✨ Available for new projects
              </span>
            </motion.div>

            <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6">
              <span className="word inline-block text-gray-900 dark:text-white">
                Creative
              </span>
              <br />
              <span className="word inline-block text-primary">
                Web
              </span>{' '}
              <span className="word inline-block text-primary">
                Development
              </span>
            </h1>

            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                I craft <span className="text-primary font-semibold">high-converting websites</span> that blend 
                stunning visuals with seamless functionality, tailored to elevate your brand and drive results.
              </p>
              
              {/* Decorative line */}
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto mt-6 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1, delay: 2 }}
              />
            </motion.div>
          </div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16"
          >
            <Link to="/project" className="inline-block">
              <motion.div
                className="group relative px-10 py-4 bg-gradient-to-r from-primary to-blue-500 text-white font-bold rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: '-100%', skewX: -15 }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View My Work
                </span>
              </motion.div>
            </Link>
            
            <motion.a
                className="inline-block group relative px-10 py-4 bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white font-bold rounded-2xl overflow-hidden backdrop-blur-sm cursor-pointer"
                href="https://drive.google.com/file/d/1Cvh29leLdWtOMXpOYLKWm5HNa9kQ5lNo/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  borderColor: '#6366f1',
                  backgroundColor: 'rgba(99, 102, 241, 0.1)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span className="material-icons">download</span>
                  Download Resume
                </span>
              </motion.a>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 mb-20 max-w-2xl mx-auto"
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '2+', label: 'Years Experience' },
              { number: '100%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-black text-primary mb-2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.2, duration: 0.5 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Portfolio Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="relative"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Work
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A glimpse into some of my recent projects that showcase creativity, functionality, and results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                src: projectImg1, 
                title: 'Online Learning Platform', 
                category: 'Full Stack Development', 
                link: 'https://course-nest-6d3e1.web.app/' 
              },
              { 
                src: projectImg2, 
                title: 'Food Ordering Platform', 
                category: 'Full Stack Development', 
                link: 'https://feast-flow.web.app/' 
              },
              { 
                src: projectImg3, 
                title: 'Health Care Web App', 
                category: 'Full Stack Development', 
                link: 'https://carecircle-eta.vercel.app/' 
              },
            ].map((project, index) => (
              <motion.a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                ref={(el) => (imagesRef.current[index] = el)}
                className="group relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer block"
                whileHover={{ y: -10 }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden aspect-video">
                  <motion.img
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={project.src}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Project Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-sm text-blue-300 mb-2">{project.category}</div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                   
                    <div className="flex items-center gap-2 text-sm">
                      <span>View Project</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                 
                  </div>
                </div>

                {/* Decorative border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-500" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Hero;