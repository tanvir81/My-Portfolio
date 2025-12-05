import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import local icons
import jsIcon from '../assets/js.png';
import nextIcon from '../assets/nextjs.png';
import reactIcon from '../assets/react.png';
import htmlIcon from '../assets/html.png';
import cssIcon from '../assets/css.png';
import nodeIcon from '../assets/nodejs.png';
import expressIcon from '../assets/express.png';
import tailwindIcon from '../assets/tailwind.png';
import mongoIcon from '../assets/mongodb.png';
import githubIcon from '../assets/github.png';
import figmaIcon from '../assets/figma.png';
import photoshopIcon from '../assets/photoshop.png';
import illustratorIcon from '../assets/illustrator.png';
import canvaIcon from '../assets/canva.png';
import slackIcon from '../assets/icons8-slack-48.png';
import gitIcon from '../assets/git.png'; // Added Git if user wants to use it, though not in original list explicitly as separate item usually, but good to have.
import shopifyIcon from '../assets/shopify.png'; // Available in assets
import firebaseIcon from '../assets/firebase.png';
import npmIcon from '../assets/npm.png';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { name: 'Javascript', icon: jsIcon },
  { name: 'Next.js', icon: nextIcon },
  { name: 'React.js', icon: reactIcon },
  { name: 'HTML5', icon: htmlIcon },
  { name: 'CSS', icon: cssIcon },
  { name: 'Nodejs', icon: nodeIcon },
  { name: 'Express', icon: expressIcon, invertDark: true },
  { name: 'Tailwind', icon: tailwindIcon },
  { name: 'Mongodb', icon: mongoIcon },
  { name: 'Firebase', icon: firebaseIcon },
];

const otherSkills = [
  { name: 'Shopify', icon: shopifyIcon },
   { name: 'Figma', icon: figmaIcon },
  { name: 'Photoshop', icon: photoshopIcon },
  { name: 'Illustrator', icon: illustratorIcon },
  { name: 'Canva', icon: canvaIcon },
   { name: 'Slack', icon: slackIcon },
   { name: 'Git', icon: gitIcon },
   { name: 'Npm', icon: npmIcon },
  { name: 'Github', icon: githubIcon, invertDark: true },
 
];

const Skills = () => {
  const sectionRef = useRef(null);
  const skillRefs = useRef([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    skillRefs.current.forEach((skill, index) => {
      if (skill) {
        gsap.fromTo(
          skill,
          { scale: 0, rotation: 180, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: skill,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Hover animation
        skill.addEventListener('mouseenter', () => {
          gsap.to(skill, {
            y: -10,
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        skill.addEventListener('mouseleave', () => {
          gsap.to(skill, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }
    });
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const SkillCard = ({ skill, index }) => (
    <motion.div
      ref={(el) => (skillRefs.current[index] = el)}
      className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900/50 rounded-lg space-y-2 cursor-pointer relative overflow-hidden group"
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
      />
      <img
        alt={`${skill.name} logo`}
        className={`w-10 h-10 relative z-10 ${skill.invertDark ? 'invert-0 dark:invert' : ''}`}
        src={skill.icon}
      />
      <span className="text-sm font-medium relative z-10">{skill.name}</span>
    </motion.div>
  );

  return (
    <section
      ref={sectionRef}
      className="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="space-y-24">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-4"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={titleVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white relative pb-2">
                Development Skills
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '6rem' } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </h2>
              <p className="text-base leading-relaxed">
                As a MERN stack developer specializing in frontend development with a strong
                understanding of backend architecture, I build dynamic, scalable web applications.
                My focus is on creating seamless user experiences with high performance and
                efficiency, leveraging modern technologies to deliver robust, full-stack solutions.
              </p>
            </motion.div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {skillsData.map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </section>


          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 lg:order-last">
              {otherSkills.slice(0, 8).map((skill, index) => (
                <SkillCard key={skill.name} skill={skill} index={skillsData.length + index} />
              ))}
            </div>
            <motion.div
              className="space-y-4 lg:text-right"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={titleVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white relative pb-2 inline-block">
                Web Design Skills
                <motion.span
                  className="absolute bottom-0 right-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '6rem' } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </h2>
              <p className="text-base leading-relaxed">
                I focus on creating unique, brand-driven web designs that are not only visually
                compelling but also optimized for user experience and conversion rates. With a
                blend of creative tools and intuitive platforms, I craft designs that resonate with
                target audiences and support business goals.
              </p>
            </motion.div>
          </section>

        </div>
      </div>
    </section>
  );
};

export default Skills;
