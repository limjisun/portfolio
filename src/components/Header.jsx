import React, { useState, useEffect  } from "react";

import { Link } from 'react-scroll';
import IconLogo from './icons/logo';
import IconHex from './icons/hex';
import {loaderDelay } from '../utils';
import Menu from "../components/Menu";
import { headerNav } from '../utils';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


const Header = ({ isHome }) => {
    const [show, setShow] = useState(false);
    const [scrollDirection, setScrollDirection] = useState(null);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMounted, setIsMounted] = useState(!isHome);
    const toggleMenu = () => {
        setShow((prevShow) => !prevShow);
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) {
                setScrollDirection("down");
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection("up");
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        const timeout = setTimeout(() => {
            setIsMounted(true);
          }, 100);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const timeout = isHome ? loaderDelay : 0;
    const fadeDownClass = isHome ? 'fadedown' : '';
    const fadeClass = isHome ? 'fade' : '';


    const Logo = (
        <div className="logo" tabIndex="-1">
          {isHome ? (
            <a href="/" aria-label="home">
              <div className="hex-container">
                <IconHex />
              </div>
              <div className="logo-container">
                <IconLogo />
              </div>
            </a>
          ) : (
            <Link to="/" aria-label="home">
              <div className="hex-container">
                <IconHex />
              </div>
              <div className="logo-container">
                <IconLogo />
              </div>
            </Link>
          )}
        </div>
      );

    return (
        <header id="header" role="banner" className={scrollDirection}>
            <div className="header__inner">
                <div className="header__logo">
                    <TransitionGroup component={null}>
                        {isMounted && (
                            <CSSTransition classNames={fadeClass} timeout={timeout}>
                                {Logo}
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
                <nav className={`header__nav ${show ? "show" : ""}`} role="navigation" aria-label="메인 메뉴">
                    <TransitionGroup  component="ul">
                        {isMounted &&
                           headerNav.map(({ url, title }, i) => (
                            <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                                 <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                                    <a href={url}>{title}</a>
                                </li>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </nav>
                
                <TransitionGroup component={null}>
                    {isMounted && (
                        <CSSTransition classNames={fadeClass} timeout={timeout}>
                            <Menu />
                        </CSSTransition>
                    )}
                </TransitionGroup>
                
                




                {/* <div
                    className="header__nav__mobile"
                    id="headerToggle"
                    aria-controls="primary-menu"
                    aria-expanded={show ? "true" : "false"}
                    role="button" 
                    tabIndex="0"
                    onClick={toggleMenu}
                >
                    <span></span>
                </div> */}


            </div>
        </header>
    );
};

export default Header;