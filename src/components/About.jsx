import React, { useRef, useEffect } from 'react';
import exampleLogo from '../assets/img/jisun.jpg'
import sr from '../utils/sr';
import { srConfig } from '../utils/scrollRevealConfig';

const About = () => {
    const revealContainer = useRef(null);
    useEffect(() => {
        if (sr) {
          sr.reveal(revealContainer.current, srConfig());
        }
      }, []);

    const skills = ['HTML', 'CSS','SCSS', 'jQuery', 'JavaScript', 'React'];
    return  <section id="about" ref={revealContainer}>
    <h2 className="numbered-heading">About Me</h2>
    <div className="inner">
        <div className="about_text">
            <p>
             안녕하세요! 저는 임지선입니다. 열정적인 프론트엔드 개발자로, 사용자가 직관적이고 즐겁게 사용할 수 있는 웹을 만드는 것을 목표로 하고 있습니다. 최신 웹 기술과 트렌드를 지속적으로 학습하며, 실용적이고 아름다운 사용자 경험을 제공하는 데 주력하고 있습니다.
            </p>
            <ul className="skills-list">
                {skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
        </div>
        <div className="about_img">
            <div className="wrapper">
                <img src={exampleLogo} alt="" />
            </div>
        </div>
    </div>
  </section>;
};

export default About;