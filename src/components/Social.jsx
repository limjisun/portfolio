import React, { useState, useEffect } from 'react';
import { loaderDelay } from '../utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import IconCodepen from './icons/codepen';
import IconGitHub from './icons/github';
import IconInstagram from './icons/instagram';
import PropTypes from 'prop-types';

const socialMedia = [
  {
    name: <IconGitHub />,
    url: 'https://github.com/limjisun',
  },
  {
    name: <IconInstagram />,
    url: 'https://www.instagram.com/38kd',
  },
  {
    name: <IconCodepen />,
    url: 'https://codepen.io/limjisun',
  },
];

const Social = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), loaderDelay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="left">
      <TransitionGroup component="ul">
        {isMounted &&
          socialMedia.map((nav, key) => (
            <CSSTransition
              key={key}
              classNames={isHome ? 'fade' : ''}
              timeout={isHome ? loaderDelay : 0}
            >
              <li>
                <a href={nav.url} target="_blank" rel="noopener noreferrer">
                  {nav.name}
                </a>
              </li>
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
};

Social.propTypes = {
  isHome: PropTypes.bool,
};

export default Social;