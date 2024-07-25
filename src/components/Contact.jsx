import React, { useRef, useEffect } from 'react';
import sr from '../utils/sr';
import { srConfig } from '../utils/scrollRevealConfig';
const EmailUrl ='time2_go@naver.com'

const Contact = () => {
    const revealContainer = useRef(null);
    useEffect(() => {
      
        sr.reveal(revealContainer.current, srConfig());
      }, []);
    return (
    <section id="contact" ref={revealContainer}>
        <h2 className="numbered-heading overline">What’s Next?</h2>
        <h2 className="title">Get In Touch</h2>
        <p>
            제 포트폴리오를 방문해 주셔서 감사합니다. 제 작업과 경험에 대해 궁금한 점이 있거나 협업을 원하시면 언제든지 연락해 주세요.
        </p>
        <a className="email-link" href={`mailto:${EmailUrl}`}>
            Say Hello
        </a>
    </section>
    );
};

export default Contact;