import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../components/Header";
import Intro from "../components/Intro";
import About from "../components/About";
import Jobs from "../components/Jobs";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Social from "../components/Social";
import Email from "../components/Email";
import Main from "../components/Main";





const HomeView = ({ children}) => {
    const location = useLocation();
    const isHome = location.pathname === '/';
  
    const handleExternalLinks = () => {
      const allLinks = Array.from(document.querySelectorAll('a'));
      if (allLinks.length > 0) {
        allLinks.forEach(link => {
          if (link.host !== window.location.host) {
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('target', '_blank');
          }
        });
      }
    };
  
    useEffect(() => {
      if (location.hash) {
        const id = location.hash.substring(1);
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView();
            el.focus();
          }
        }, 0);
      }
  
      handleExternalLinks();
    }, [location]);
    return (
        <>
        <div>
            <Header isHome={isHome} />
            <Social isHome={isHome}/>
            <Email isHome={isHome}/>
            <Main>
            <Intro />
            <About />
            <Jobs />
            <Projects />
            <Contact />
            </Main>
            <Footer />
        </div>
        </>
      );
};

export default HomeView;