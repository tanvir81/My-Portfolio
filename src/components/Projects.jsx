import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const location = useLocation();
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
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
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
                  {projects.slice(0, location.pathname === '/' ? 3 : undefined).map((project, index) => (
                    <motion.div
                      key={index}
                      ref={(el) => (projectRefs.current[index] = el)}
                      className="flex flex-col gap-4 bg-black p-4 rounded-xl border border-[#233f48] relative overflow-hidden group"
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
                        <p className="text-[#92bbc9] text-sm font-normal leading-normal line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {project.technologies.slice(0, 4).map((tag) => (
                            <motion.span
                              key={tag}
                              className="text-xs font-medium text-primary bg-primary/20 px-2 py-1 rounded-full"
                              whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="text-xs font-medium text-gray-400 px-2 py-1">+{project.technologies.length - 4} more</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 mt-2 relative z-10">
                        <Link to={`/project/${project.id}`}>
                          <motion.div
                            className="flex items-center gap-2 text-sm font-bold text-primary hover:text-white transition-colors bg-primary/10 px-4 py-2 rounded-lg"
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.8)' }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="material-icons text-lg">visibility</span>
                            View Details
                          </motion.div>
                        </Link>

                        {project.liveLink && (
                          <motion.a
                            className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                          >
                            <span className="material-icons text-xl">open_in_new</span>
                            Live Demo
                          </motion.a>
                        )}
                        {project.codeLink && project.codeLink !== '#' && (
                          <motion.a
                            className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
                            href={project.codeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                          >
                            <span className="material-icons text-xl">code</span>
                            View Code
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {location.pathname === '/' && (
                  <motion.div 
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Link to="/project">
                      <motion.button
                        className="flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/20 hover:bg-white/10 text-white rounded-full font-bold transition-all group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View All Projects
                        <span className="material-icons group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </motion.button>
                    </Link>
                  </motion.div>
                )}
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
    </section>
  );
};

export default Projects;
