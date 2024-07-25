
import React, { useState, useRef, useEffect } from "react";
import sr from '../utils/sr';
import { srConfig } from '../utils/scrollRevealConfig';

const Jobs = () => {
    const [jobsData, setJobsData] = useState([]);
    const [activeTabId, setActiveTabId] = useState(0);
    const [tabFocus, setTabFocus] = useState(null);
    const tabs = useRef([]);
    const revealContainer = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
    useEffect(() => {
        // JSON 파일에서 데이터를 가져옵니다.
        fetch('/jobsData.json')
          .then(response => response.json())
          .then(data => setJobsData(data))
          .catch(error => console.error('Error loading jobs data:', error));
        if (sr) {
          sr.reveal(revealContainer.current, srConfig());
        }
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 600);
        };
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    const transformStyle = isMobile
      ? `translateX(calc(${activeTabId} * var(--tab-width)))`
      : `translateY(calc(${activeTabId} * var(--tab-height)))`;

    const focusTab = () => {
        if (tabs.current[tabFocus]) {
          tabs.current[tabFocus].focus();
          return;
        }
        // 끝에 도달하면 처음으로 돌아갑니다
        if (tabFocus >= tabs.current.length) {
          setTabFocus(0);
        }
        // 처음에 도달하면 끝으로 이동합니다
        if (tabFocus < 0) {
          setTabFocus(tabs.current.length - 1);
        }
      };
  
    // tabFocus가 변경될 때마다 효과를 재실행합니다
    useEffect(() => focusTab(), [tabFocus]);

    // 위 & 아래 화살표 키를 사용할 때 탭에 포커스합니다
    const onKeyDown = (e) => {
        switch (e.key) {
        case "ArrowUp": {
            e.preventDefault();
            setTabFocus(tabFocus - 1);
            break;
        }

        case "ArrowDown": {
            e.preventDefault();
            setTabFocus(tabFocus + 1);
            break;
        }

        default: {
            break;
        }
        }
    };


    return (
        <section id="jobs" ref={revealContainer}>
          <h2 className="numbered-heading">Where I’ve Worked</h2>
          <div className="inner">
            <div role="tablist" aria-label="Job tabs" onKeyDown={onKeyDown} className="tablist">
              {jobsData &&
                jobsData.map((job, i) => (
                  <button
                    key={i}
                    ref={(el) => (tabs.current[i] = el)}
                    className={`job-tab ${activeTabId === i ? 'active' : ''}`}
                    onClick={() => setActiveTabId(i)}
                    role="tab"
                    aria-selected={activeTabId === i}
                    aria-controls={`tab-${i}`}
                    id={`tab-${i}`}
                  >
                    <span>{job.company}</span>
                  </button>
                ))}
                 <div
                    className="highlight"
                    style={{
                      transform: transformStyle,
                    }}
                ></div>
            </div>
          <div class="tab_wrap">
            {jobsData &&
              jobsData.map((job, i) => (
                <div
                  key={i}
                  id={`tab-${i}`}
                  role="tabpanel"
                  tabIndex={0}
                  hidden={activeTabId !== i}
                  aria-labelledby={`tab-${i}`}
                >
                  <h3>
                    <span>{job.title}</span>
                    <span className="company">
                      &nbsp;@&nbsp;
                      <a href={job.url} target="_blank" rel="noopener noreferrer" className="inline-link">
                        {job.company}
                      </a>
                    </span>
                  </h3>
                  <p className="range">{job.range}</p>
                  <ul>
                    {job.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
};

export default Jobs;