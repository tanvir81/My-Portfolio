import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const socialRefs = useRef([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    // Form inputs animation
    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll('input, textarea');
      gsap.fromTo(
        inputs,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // Social icons animation
    socialRefs.current.forEach((icon, index) => {
      if (icon) {
        gsap.fromTo(
          icon,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: icon,
              start: 'top 90%',
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
        delayChildren: 0.3,
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

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section ref={sectionRef} className="bg-black font-display overflow-hidden">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
              <main className="flex-grow mt-10 sm:mt-16">
                <motion.div
                  className="flex flex-col items-center text-center px-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <motion.h2
                    className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em]"
                    variants={itemVariants}
                  >
                    Get in Touch
                  </motion.h2>
                  <motion.p
                    className="text-white/70 text-base font-normal leading-normal mt-3 max-w-xl"
                    variants={itemVariants}
                  >
                    Have a project in mind or just want to say hi? I'd love to hear from you. Fill
                    out the form below or reach out through my social channels.
                  </motion.p>
                </motion.div>

                <motion.div
                  className="mt-12 sm:mt-16"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <form
                    ref={formRef}
                    action="#"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    method="POST"
                  >
                    <motion.div className="md:col-span-1" whileFocus="focus" variants={inputVariants}>
                      <label className="text-sm font-medium text-white/90" htmlFor="name">
                        Name
                      </label>
                      <motion.input
                        className="mt-2 block w-full rounded-lg border border-neutral-border bg-black px-3 py-2 text-white placeholder-white/40 focus:border-primary focus:ring-primary transition-all"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        type="text"
                        whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
                      />
                    </motion.div>

                    <motion.div className="md:col-span-1" whileFocus="focus" variants={inputVariants}>
                      <label className="text-sm font-medium text-white/90" htmlFor="email">
                        Email
                      </label>
                      <motion.input
                        className="mt-2 block w-full rounded-lg border border-neutral-border bg-black px-3 py-2 text-white placeholder-white/40 focus:border-primary focus:ring-primary transition-all"
                        id="email"
                        name="email"
                        placeholder="email@example.com"
                        type="email"
                        whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
                      />
                    </motion.div>

                    <motion.div className="md:col-span-2" whileFocus="focus" variants={inputVariants}>
                      <label className="text-sm font-medium text-white/90" htmlFor="subject">
                        Subject
                      </label>
                      <motion.input
                        className="mt-2 block w-full rounded-lg border border-neutral-border bg-black px-3 py-2 text-white placeholder-white/40 focus:border-primary focus:ring-primary transition-all"
                        id="subject"
                        name="subject"
                        placeholder="Project Inquiry"
                        type="text"
                        whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
                      />
                    </motion.div>

                    <motion.div className="md:col-span-2" whileFocus="focus" variants={inputVariants}>
                      <label className="text-sm font-medium text-white/90" htmlFor="message">
                        Message
                      </label>
                      <motion.textarea
                        className="mt-2 block w-full rounded-lg border border-neutral-border bg-black px-3 py-2 text-white placeholder-white/40 focus:border-primary focus:ring-primary transition-all"
                        id="message"
                        name="message"
                        placeholder="Your message here..."
                        rows="5"
                        whileFocus={{ scale: 1.02, borderColor: '#3b82f6' }}
                      />
                    </motion.div>

                    <div className="md:col-span-2 flex justify-start">
                      <motion.button
                        className="flex min-w-[120px] max-w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-background-dark text-base font-bold leading-normal tracking-[0.015em] relative group"
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.span
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: '-100%', skewX: -15 }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="truncate relative z-10">Send Message</span>
                      </motion.button>
                    </div>
                  </form>
                </motion.div>

                <motion.div
                  className="mt-16 sm:mt-24 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-white/70 text-base font-normal leading-normal">
                    Or connect with me on
                  </p>
                  
                  <div className="flex justify-center items-center gap-6 mt-6">
                    {[
                      {
                        name: 'LinkedIn',
                        path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
                        link: 'https://www.linkedin.com/in/tanvir-khan81/',
                      },
                      {
                        name: 'GitHub',
                        path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
                        link: 'https://github.com/tanvir81',
                      },
                      {
                        name: 'Twitter',
                        path: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.635 4.212 3.804 4.649-.69.188-1.423.237-2.16.084.603 1.883 2.345 3.256 4.412 3.293-1.786 1.4-4.038 2.235-6.478 2.235-.42 0-.835-.025-1.243-.073 2.298 1.474 5.025 2.33 7.942 2.33 9.492 0 14.686-7.86 14.398-14.954.993-.715 1.854-1.612 2.538-2.635z',
                        link: 'https://x.com/TanvirKhan82781',
                      },
                      {
                        name: 'Facebook',
                        path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
                        link: 'https://www.facebook.com/tanvir.opu.633310',
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={social.name}
                        ref={(el) => (socialRefs.current[index] = el)}
                        className="text-white/70 hover:text-primary transition-colors cursor-pointer"
                        href={social.link}
                        title={social.name}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg
                          aria-hidden="true"
                          className="h-7 w-7"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d={social.path} />
                        </svg>
                        <span className="sr-only">{social.name}</span>
                      </motion.a>
                    ))}
                  </div>

                  <motion.div
                    className="mt-8 border-t border-white/10 pt-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="flex flex-col gap-4 items-center">
                      <motion.a
                        className="flex items-center justify-center gap-2 text-white/70 hover:text-primary transition-colors"
                        href="mailto:tanvirkha2019@gmail.com"
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.span
                          className="material-icons text-2xl"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        >
                          mail
                        </motion.span>
                        <span className="text-base font-medium">tanvirkha2019@gmail.com</span>
                      </motion.a>

                      <motion.a
                        className="flex items-center justify-center gap-2 text-white/70 hover:text-primary transition-colors"
                        href="tel:+8801781116426"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="material-icons text-2xl">phone</span>
                        <span className="text-base font-medium">+880 1781-116426</span>
                      </motion.a>

                      <motion.a
                        className="flex items-center justify-center gap-2 text-white/70 hover:text-green-500 transition-colors"
                        href="https://wa.me/8801781116426"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="material-icons text-2xl">chat</span>
                        <span className="text-base font-medium">WhatsApp: +880 1781-116426</span>
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              </main>
          </div>
      </div>
    </section>
  );
};

export default Contact;
