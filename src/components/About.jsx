import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImg from '../assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    // Image reveal animation with clip-path
    gsap.fromTo(
      imageRef.current,
      {
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
        scale: 1.3,
      },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        scale: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Floating animation for image
    gsap.to(imageRef.current, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Text reveal with stagger
    const lines = textRef.current.querySelectorAll('.line');
    gsap.fromTo(
      lines,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 antialiased overflow-hidden"
    >
      <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          className="max-w-7xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div ref={textRef} className="space-y-8" variants={itemVariants}>
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  <motion.span
                    className="line block"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Hey, I'm Tanvir Khan!
                  </motion.span>
                  <motion.span
                    className="line block text-primary"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Full-Stack Developer
                  </motion.span>
                  <motion.span
                    className="line block"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    Based in Dhaka, Bangladesh
                  </motion.span>
                </h1>
                <motion.p
                  className="line text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
                  variants={itemVariants}
                >
                  My journey into tech began with a curiosity for Graphic Design and Animation, which laid the foundation for my transition into Full-Stack Development. Over the last 2 years, I've honed my skills in the MERN stack (React, Node.js, MongoDB), finding my true passion in creating websites that are both functional and visually striking.
                  <br /><br />
                  I thrive on building modern, minimal interfaces where every animation serves a purpose. I believe a great website should feel alive, and I love the challenge of blending performance with aesthetics.
                  <br /><br />
                  When I'm not debugging code or tweaking animations, you'll find me on the court playing badminton. It's my favorite way to recharge, stay active, and keep my mind sharp.
                </motion.p>
              </div>
              <motion.div variants={itemVariants}>
                <Link to="/project" className="inline-block relative overflow-hidden rounded-lg shadow-lg group">
                  <motion.div
                    className="bg-primary text-white font-medium py-3 px-8"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%', skewX: -15 }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10">My Work</span>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-end"
              variants={itemVariants}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-primary to-blue-600 rounded-lg opacity-20 blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />


                <img
                  ref={imageRef}
                  alt="Profile"
                  className="rounded-lg shadow-2xl w-full max-w-md h-auto object-cover aspect-square relative z-10"
                  src={profileImg} 
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 sm:mt-24"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Education</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  degree: 'M.Com (Management)',
                  institution: 'Gov. Titumir College, Dhaka',
                  year: 'Completed',
                  icon: 'school'
                },
                {
                  degree: 'B.Com (Honours) Management',
                  institution: 'Gov. Edward College, Pabna',
                  year: 'Completed',
                  icon: 'school'
                }
              ].map((edu, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 dark:bg-white/5 p-6 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/50 transition-colors"
                  whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/20 rounded-lg text-primary">
                      <span className="material-icons">{edu.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{edu.degree}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{edu.institution}</p>
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {edu.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </section>
  );
};

export default About;
