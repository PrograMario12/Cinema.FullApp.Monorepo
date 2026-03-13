import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ScrollyText = ({ text, className }) => {
    const containerRef = useRef();

    useGSAP(() => {
        const chars = containerRef.current.querySelectorAll('.char');
        
        gsap.fromTo(chars, 
            { opacity: 0.1, y: 10 },
            { 
                opacity: 1, 
                y: 0, 
                stagger: 0.05,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 60%",
                    scrub: true,
                }
            }
        );
    }, { scope: containerRef });

    return (
        <p ref={containerRef} className={className}>
            {text.split('').map((char, i) => (
                <span key={i} className="char inline-block">
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </p>
    );
};

export default ScrollyText;
