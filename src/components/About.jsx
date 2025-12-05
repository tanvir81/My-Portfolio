import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImg from '../assets/profile.jpg';

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
          className="max-w-6xl mx-auto w-full"
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
                  I'm a Full-Stack Developer Shopify Expert from Dhaka Bangladesh With a background in
                  Graphic Design and Animation, I've been utilizing my skills to develop modern,
                  creative websites for 2 years. With a strong focus on Frontend Development, I
                  work with React, Next.js, and Tailwind CSS to create responsive, user-friendly
                  websites.
                </motion.p>
              </div>
              <motion.div variants={itemVariants}>
                <motion.a
                  className="inline-block bg-primary text-white font-medium py-3 px-8 rounded-lg shadow-lg relative overflow-hidden group"
                  href="#"
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
                </motion.a>
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
        </motion.div>
      </main>
    </section>
  );
};

export default About;
