import React, { useState, useEffect } from 'react';
import { loaderDelay } from '../utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const EmailUrl ='time2_go@naver.com'


const Email = ({ isHome }) => {
    const [isMounted, setIsMounted] = useState(!isHome);

    useEffect(() => {
      const timeout = setTimeout(() => setIsMounted(true), loaderDelay);
      return () => clearTimeout(timeout);
    }, []);

    return (
        <TransitionGroup component={null}>
           {isMounted && (
            <CSSTransition classNames={isHome ? 'fade' : ''} timeout={isHome ? loaderDelay : 0}>
                <div className="right">
                    <div className="email">
                    <a href={`mailto:${EmailUrl}`}>{EmailUrl}</a>
                    </div>
                </div>
            </CSSTransition>
            )}
        </TransitionGroup>
    )
};

export default Email;