import React, { useEffect, useState, useRef } from 'react';
import sr from '../utils/sr';
import { srConfig } from '../utils/scrollRevealConfig';

const Projects = () => {
  const [projectData, setProjectData] = useState([]);

  const revealTitle = useRef(null);
  const revealProjects = useRef([]);

  useEffect(() => {
    
    sr.reveal(revealTitle, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, [projectData]); // Depend on projectData to ensure refs are set

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/projectsData.json`)
      .then(response => response.json())
      .then(data => setProjectData(data))
      .catch(error => console.error('Error loading projects data:', error));
  }, []);


  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Built
      </h2>
      <ul>
        {projectData.map((project, i) => (
          <li
            className="project-li"
            key={i}
            ref={el => (revealProjects.current[i] = el)}
          >
            <div className="project-content">
              <div>
                <p className="project-overline">추천 프로젝트</p>
                <h3 className="project-title">
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </h3>
                <div className="project-description">{project.description}</div>
                <ul className="project-tech-list">
                  {project.skill.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
                <div className="project-links">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="cta">
                    바로 가기
                  </a>
                </div>
              </div>
            </div>
            <div className="project-image">
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <img src={`${process.env.PUBLIC_URL}${project.image}`}  alt="" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Projects;