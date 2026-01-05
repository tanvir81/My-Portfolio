import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ErrorPage from './components/ErrorPage';
import ProjectDetails from './components/ProjectDetails';
import Hero from './components/Hero'; // Kept for individual route if needed, or remove if not used elsewhere
import Footer from './components/Footer';

function App() {
  const location = useLocation();
  
  // Check if current route matches any defined routes
  // Allow /project/:id by checking if pathname starts with /project/
  const validRoutes = ['/', '/about', '/skill', '/project', '/contact'];
  const isValidRoute = validRoutes.includes(location.pathname) || location.pathname.startsWith('/project/');

  // If it's a 404, render ErrorPage without wrapper
  if (!isValidRoute) {
    return <ErrorPage />;
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen font-display text-gray-800 dark:text-gray-200 antialiased">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skill" element={<Skills />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
