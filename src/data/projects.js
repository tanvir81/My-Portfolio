import projectImg1 from '../assets/project-1.png';
import projectImg2 from '../assets/project-2.png';
import projectImg3 from '../assets/project-3.png';
import projectImg4 from '../assets/project-4.png';

export const projects = [
  {
    id: 'online-learning-platform',
    title: 'Online Learning Platform',
    image: projectImg1,
    description: 'A full-stack online Learning Platform with a modern UI, built with React, Express.js, Node.js and MongoDB for a seamless Learning experience.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Firebase', 'Express.js', 'Tailwind CSS'],
    liveLink: 'https://course-nest-6d3e1.web.app/',
    codeLink: 'https://github.com/tanvir81/FeastFlow-client.git',
    challenges: 'Implementing secure user authentication and managing real-time course updates were significant challenges. Ensuring data consistency across the distributed database system required careful planning.',
    improvements: 'Future plans include adding AI-driven personalized course recommendations and a mobile application for offline learning.'
  },
  {
    id: 'food-ordering-platform',
    title: 'Food Ordering Platform',
    image: projectImg2,
    description: 'A full-stack food ordering platform with a modern UI, built with React and Node.js for a seamless Food ordering experience.',
    technologies: ['React', 'Express.js', 'Node.js', 'MongoDB', 'Firebase', 'Tailwind CSS', 'Stripe'],
    liveLink: 'https://feast-flow.web.app/',
    codeLink: 'https://github.com/tanvir81/FeastFlow-client.git',
    challenges: 'Integrating the Stripe payment gateway securely while handling complex order states and inventory management was a complex task.',
    improvements: 'We plan to introduce a real-time delivery tracking system and a partner dashboard for restaurant owners.'
  },
  {
    id: 'health-care-web-app',
    title: 'Health Care Web App',
    image: projectImg3,
    description: 'A premium booking platform for Care Givers, featuring 24/7 Booking Availability.',
    technologies: ['Next.js', 'Tailwind CSS', 'Next Auth'],
    liveLink: 'https://carecircle-eta.vercel.app/',
    codeLink: 'https://github.com/tanvir81/-Care.Circle.git',
    challenges: 'Building a reliable booking system that handles time zone differences and conflicting schedules was the main technical hurdle.',
    improvements: 'Integration with telemedicine APIs for virtual consultations and an AI chatbot for symptoms checking are in the pipeline.'
  },
  {
    id: 'online-skill-share-app',
    title: 'Online Skill Share App',
    image: projectImg4,
    description: 'A full-stack online skill sharing platform with a modern UI, built with React, Express.js, Node.js and MongoDB for a seamless Learning experience.',
    technologies: ['React', 'MongoDB', 'Tailwind CSS', 'Node.js', 'Express.js'],
    liveLink: 'https://extraordinary-gelato-cb7f0b.netlify.app/',
    codeLink: 'https://github.com/tanvir81/Skill-swap.git',
    challenges: 'Creating an intuitive interface for users to both teach and learn skills required multiple iterations of user testing and design refinement.',
    improvements: 'We aim to add video streaming capabilities for live classes and a gamified progress tracking system.'
  }
];
