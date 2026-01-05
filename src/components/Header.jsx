import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // GSAP animation for header on mount
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    // Logo animation with rotation and scale
    gsap.fromTo(
      logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)', delay: 0.3 }
    );
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skill', path: '/skill' },
    { name: 'Project', path: '/project' },
    { name: 'Contact', path: '/contact' },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: 'afterChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <header ref={headerRef} className="py-4 sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80">
      <nav className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/">
          <motion.div
            ref={logoRef}
            className="text-2xl font-bold font-logo text-gray-800 dark:text-white cursor-pointer"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            &lt;Tanvir/&gt;
          </motion.div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, i) => (
            <Link key={item.name} to={item.path} className="relative group">
              <motion.span
                custom={i}
                initial="hidden"
                animate="visible"
                variants={navVariants}
                className={`text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 ${location.pathname === item.path ? 'text-primary dark:text-primary font-medium' : ''}`}
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.span>
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                initial={{ width: location.pathname === item.path ? '100%' : '0%' }}
                animate={{ width: location.pathname === item.path ? '100%' : '0%' }}
                whileHover={{ width: '100%' }}
              />
            </Link>
          ))}
        </div>

        <motion.a
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: 'backOut' }}
          className="hidden md:inline-block bg-primary text-white font-medium py-2 px-5 rounded-md hover:bg-opacity-90 transition-all duration-300"
          href="https://drive.google.com/file/d/16xg_t5Ictnq8jNTJTmVSTLVwyT4IQylV/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
          whileTap={{ scale: 0.95 }}
        >
          Download CV
        </motion.a>

        <motion.button
          className="md:hidden text-gray-800 dark:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileTap={{ scale: 0.9, rotate: 90 }}
        >
          <span className="material-icons"> {isMenuOpen ? 'close' : 'menu'} </span>
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-4 flex flex-col space-y-4 overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
              >
                 <motion.div
                  variants={mobileItemVariants}
                  className={`text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-300 pl-4 ${location.pathname === item.path ? 'text-primary dark:text-primary font-medium' : ''}`}
                  whileHover={{ x: 10 }}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
