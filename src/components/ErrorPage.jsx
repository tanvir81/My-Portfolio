import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// Generate particle positions outside component to avoid re-renders
const particlePositions = [...Array(20)].map(() => ({
  left: Math.random() * 100,
  top: Math.random() * 100,
}));

const ErrorPage = () => {
  const containerRef = useRef(null);
  const numberRefs = useRef([]);
  const glitchRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Glitch effect on 404 text
    const glitchTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    if (glitchRef.current) {
      glitchTimeline
        .to(glitchRef.current, {
          skewX: 20,
          duration: 0.1,
          ease: 'power4.inOut',
        })
        .to(glitchRef.current, {
          skewX: -20,
          duration: 0.1,
        })
        .to(glitchRef.current, {
          skewX: 0,
          duration: 0.1,
        })
        .to(glitchRef.current, {
          x: -10,
          duration: 0.05,
        })
        .to(glitchRef.current, {
          x: 10,
          duration: 0.05,
        })
        .to(glitchRef.current, {
          x: 0,
          duration: 0.05,
        });
    }

    // Floating animation for numbers
    numberRefs.current.forEach((num, index) => {
      if (num) {
        gsap.to(num, {
          y: -30,
          duration: 2 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.3,
        });

        gsap.to(num, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: 'none',
        });
      }
    });

    // Particle floating animation
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: -100,
          x: gsap.utils.random(-50, 50),
          opacity: 0,
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          delay: index * 0.5,
          ease: 'power1.out',
        });
      }
    });

    // Entrance animation
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }
      );
    }
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particlePositions.map((pos, i) => (
          <div
            key={i}
            ref={(el) => (particlesRef.current[i] = el)}
            className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-30"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
          />
        ))}
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div ref={containerRef} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Large 404 with glitch effect */}
        <div className="relative mb-8">
          <div
            ref={glitchRef}
            className="text-[180px] sm:text-[250px] md:text-[300px] font-black leading-none"
          >
            <span
              ref={(el) => (numberRefs.current[0] = el)}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600"
            >
              4
            </span>
            <span
              ref={(el) => (numberRefs.current[1] = el)}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
            >
              0
            </span>
            <span
              ref={(el) => (numberRefs.current[2] = el)}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500"
            >
              4
            </span>
          </div>

          {/* Glitch layers */}
          <div className="absolute inset-0 text-[180px] sm:text-[250px] md:text-[300px] font-black leading-none text-red-500 opacity-20 mix-blend-screen pointer-events-none">
            404
          </div>
          <div className="absolute inset-0 text-[180px] sm:text-[250px] md:text-[300px] font-black leading-none text-cyan-500 opacity-20 mix-blend-screen pointer-events-none">
            404
          </div>
        </div>

        {/* Error message */}
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white animate-pulse">
            Page Not Found
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            Oops! The page you're looking for seems to have vanished into the digital void. Let's
            get you back on track.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.a
            href="/"
            className="group relative px-8 py-4 bg-blue-500 text-white font-bold rounded-lg overflow-hidden transition-transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Home
            </span>
          </motion.a>

          <motion.button
            onClick={() => window.history.back()}
            className="group relative px-8 py-4 bg-transparent border-2 border-blue-500 text-blue-500 font-bold rounded-lg overflow-hidden transition-all hover:scale-105 hover:border-blue-400"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </span>
          </motion.button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border-4 border-blue-500/30 rounded-full animate-spin-slow" />
        <div className="absolute bottom-20 right-10 w-16 h-16 border-4 border-purple-500/30 animate-spin-slow" />
      </div>
    </section>
  );
};

export default ErrorPage;
