import React, { useState, useEffect, useRef  } from 'react';
import { Helmet } from 'react-helmet';
import { headerNav, KEY_CODES } from '../utils';
import useOnClickOutside from '../utils/useOnClickOutside';
import { Link } from 'react-router-dom'; 

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const buttonRef = useRef(null);
  const navRef = useRef(null);

  let menuFocusables;
  let firstFocusableEl;
  let lastFocusableEl;

  const setFocusables = () => {
    menuFocusables = [buttonRef.current, ...Array.from(navRef.current.querySelectorAll('a'))];
    firstFocusableEl = menuFocusables[0];
    lastFocusableEl = menuFocusables[menuFocusables.length - 1];
  };

  const handleBackwardTab = e => {
    if (document.activeElement === firstFocusableEl) {
      e.preventDefault();
      lastFocusableEl.focus();
    }
  };

  const handleForwardTab = e => {
    if (document.activeElement === lastFocusableEl) {
      e.preventDefault();
      firstFocusableEl.focus();
    }
  };

  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        setMenuOpen(false);
        break;
      }

      case KEY_CODES.TAB: {
        if (menuFocusables && menuFocusables.length === 1) {
          e.preventDefault();
          break;
        }
        if (e.shiftKey) {
          handleBackwardTab(e);
        } else {
          handleForwardTab(e);
        }
        break;
      }

      default: {
        break;
      }
    }
  };

  const onResize = e => {
    if (e.currentTarget.innerWidth > 768) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    setFocusables();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const wrapperRef = useRef();
  useOnClickOutside(wrapperRef, () => setMenuOpen(false));
  
    return (
        <div className='mobile_nav'>
             <Helmet>
                <body className={menuOpen ? 'blur' : ''} />
            </Helmet>
            <div ref={wrapperRef}>
                    <button 
                    className={menuOpen ? 'mo_nav_btn on' : 'mo_nav_btn'} 
                    onClick={toggleMenu}
                    menuOpen={menuOpen}
                    ref={buttonRef}
                    aria-label="Menu">
                        <div className="ham-box">
                            <div className="ham-box-inner" />
                        </div>
                    </button>
                    <aside
                    className={menuOpen ? 'mo_nav_wrap on' : 'mo_nav_wrap'} 
                    aria-hidden={!menuOpen} 
                    tabIndex={menuOpen ? 1 : -1}
                    >
                        <nav ref={navRef}>
                            {headerNav && (
                            <ol>
                                {headerNav.map(({ url, title }, i) => (
                                <li key={i}>
                                    <Link to={url} onClick={() => setMenuOpen(false)}>
                                        {title}
                                    </Link>
                                </li>
                                ))}
                            </ol>
                            )}
                        </nav>
                    </aside>
            </div>
            
        </div>
    )
};

export default Menu;