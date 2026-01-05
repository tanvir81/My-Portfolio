import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
        <Link to="/project" className="text-primary hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Link to="/project" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
        <span className="material-icons mr-2">arrow_back</span>
        Back to Projects
      </Link>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* Project Image */}
        <motion.div variants={itemVariants} className="space-y-6">
          <motion.div 
            className="rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-auto object-cover"
            />
          </motion.div>
          
          <div className="flex flex-wrap gap-4 pt-4">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all"
              >
                <span className="material-icons">open_in_new</span>
                Live Demo
              </a>
            )}
            {project.codeLink && project.codeLink !== '#' && (
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white font-bold py-3 px-6 rounded-lg border border-gray-700 hover:border-gray-500 transition-all"
              >
                <span className="material-icons">code</span>
                GitHub Repo
              </a>
            )}
          </div>
        </motion.div>

        {/* Project Info */}
        <motion.div variants={itemVariants} className="space-y-8 text-gray-300">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{project.title}</h1>
            <p className="text-xl leading-relaxed text-gray-400">{project.description}</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span 
                  key={tech} 
                  className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-3">Challenges Faced</h3>
            <p className="leading-relaxed">{project.challenges}</p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-3">Future Improvements</h3>
            <p className="leading-relaxed">{project.improvements}</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
