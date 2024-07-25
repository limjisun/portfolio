import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { navDelay, loaderDelay } from '../utils';

const Intro = () => {
    const one = <h1>Hi, my name is</h1>;
    const two = <h2 className="big-heading">Lim ji sun.</h2>;
    const three = <h3 className="big-heading">I build things for the web.</h3>;
    const items = [one, two, three];
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      const timeout = setTimeout(() => setIsMounted(true), navDelay);
      return () => clearTimeout(timeout);
    }, []);

    return (
        <section id="intro">
           <TransitionGroup className="transition-group">
              {isMounted &&
                 items.map((item, i) => (
                  <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                    <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                  </CSSTransition>
                ))}
            </TransitionGroup>
        </section>
    );
};

export default Intro;