import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projectImg1 from '../assets/project-1.jpg';
import projectImg2 from '../assets/project-2.jpg';
import projectImg3 from '../assets/project-3.jpg';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const titleRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    // Split text animation for title
    const title = titleRef.current;
    const words = title.querySelectorAll('.word');
    
    gsap.fromTo(
      words,
      { opacity: 0, y: 100, rotationX: -90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.5,
      }
    );

    // Parallax effect for images
    imagesRef.current.forEach((img, index) => {
      gsap.fromTo(
        img,
        { y: 100, opacity: 0, scale: 0.8, rotation: index % 2 === 0 ? -10 : 10 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          delay: 1.5 + index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Hover animation
      img.addEventListener('mouseenter', () => {
        gsap.to(img, { scale: 1.05, rotation: 0, duration: 0.3, ease: 'power2.out' });
      });
      img.addEventListener('mouseleave', () => {
        gsap.to(img, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <main className="container mx-auto py-16 px-6 sm:px-10 lg:px-16 text-center overflow-hidden">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">
          <span className="word inline-block">Creative</span>{' '}
          <span className="word inline-block text-primary">Web</span>{' '}
          <span className="word inline-block text-primary">Designs</span>
        </h1>
        
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg text-gray-600 dark:text-gray-400"
        >
          I create high-converting websites tailored to your brand and business goals.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <motion.button
            className="w-full sm:w-auto bg-primary text-white font-medium py-3 px-8 rounded-md relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">My Work</span>
          </motion.button>
          
          <motion.button
            className="w-full sm:w-auto bg-transparent border-2 border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white font-medium py-3 px-8 rounded-md relative overflow-hidden group"
            whileHover={{ scale: 1.05, borderColor: '#3b82f6' }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-primary/10"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Create a website</span>
          </motion.button>
        </motion.div>
      </motion.div>



      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          projectImg1,
          projectImg2,
          projectImg3,
        ].map((src, index) => (
          <motion.div
            key={index}
            ref={(el) => (imagesRef.current[index] = el)}
            className="rounded-lg overflow-hidden shadow-lg cursor-pointer"
            whileHover={{ y: -10 }}
          >
            <motion.img
              alt={`Portfolio design ${index + 1}`}
              className="w-full h-full object-cover"
              src={src}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default Hero;
