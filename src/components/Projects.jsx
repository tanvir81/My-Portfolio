import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import foodImg from '../assets/food.jpg';
import storeImg from '../assets/store.jpg';
import businessImg from '../assets/business.jpg';
import hotelImg from '../assets/hotel.jpg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack online store with a modern UI, built with React and Node.js for a seamless shopping experience.',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: storeImg
  },
  {
    title: 'Task Management App',
    description: 'A productivity tool for organizing daily tasks with a clean, intuitive drag-and-drop interface.',
    tags: ['Next.js', 'Tailwind CSS', 'Firebase'],
    image: businessImg
  },
  {
    title: 'Luxury Hotel Website',
    description: 'A premium booking platform for high-end hotels, featuring virtual tours and real-time availability.',
    tags: ['React', 'Next.js', 'Tailwind CSS','Firebase'],
    image: hotelImg
  },
  {
    title: 'Food Delivery App',
    description: 'A delicious food ordering experience with live tracking, diverse cuisines, and instant payments.',
    tags: ['React', 'MongoDB', 'Stripe','Next Auth'],
    image: foodImg
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectRefs = useRef([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    // Title animation with split text effect
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        }
      );
    }

    // Project cards animation
    projectRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 100,
            rotationY: -45,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section ref={sectionRef} className="bg-black font-display overflow-hidden">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <main className="flex-grow mt-10 sm:mt-16">
                <motion.div
                  className="flex flex-wrap justify-between gap-3 p-4"
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={containerVariants}
                >
                  <motion.p
                    ref={titleRef}
                    className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em] min-w-72"
                    variants={itemVariants}
                  >
                    My Projects
                  </motion.p>
                </motion.div>
                
                <motion.p
                  className="text-white/70 text-base font-normal leading-normal pb-8 pt-1 px-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Here's a selection of my recent work. Feel free to explore the live demos and
                  browse the source code.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      ref={(el) => (projectRefs.current[index] = el)}
                      className="flex flex-col gap-4 bg-black p-4 rounded-xl border border-[#233f48] relative overflow-hidden group cursor-pointer"
                      whileHover={{ y: -10, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-blue-600/10 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, rotate: 45 }}
                        whileHover={{ scale: 1.5, rotate: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      <motion.div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden relative z-10"
                        style={{ backgroundImage: `url('${project.image}')` }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      <div className="flex flex-col gap-3 relative z-10">
                        <h3 className="text-white text-xl font-bold leading-normal">
                          {project.title}
                        </h3>
                        <p className="text-[#92bbc9] text-sm font-normal leading-normal">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {project.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              className="text-xs font-medium text-primary bg-primary/20 px-2 py-1 rounded-full"
                              whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2 relative z-10">
                        <motion.a
                          className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
                          href="#"
                          whileHover={{ x: 5 }}
                        >
                          <span className="material-icons text-xl">open_in_new</span>
                          Live Demo
                        </motion.a>
                        <motion.a
                          className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
                          href="#"
                          whileHover={{ x: 5 }}
                        >
                          <span className="material-icons text-xl">code</span>
                          View Code
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </main>

              <motion.div
                className="@container mt-16 sm:mt-24"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20 border-t border-white/10">
                  <motion.div
                    className="flex flex-col gap-2 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h1 className="text-white tracking-tight text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px] mx-auto">
                      Interested in working together?
                    </h1>
                    <p className="text-white/70 text-base font-normal leading-normal max-w-[720px] mx-auto">
                      I'm always open to discussing new projects and opportunities.
                    </p>
                  </motion.div>
                  
                  <div className="flex flex-1 justify-center">
                    <div className="flex justify-center">
                      <motion.button
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] grow relative group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.span
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%', skewX: -15 }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="truncate relative z-10">Contact Me</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
