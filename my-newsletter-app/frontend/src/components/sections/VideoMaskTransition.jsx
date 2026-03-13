import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VideoMaskTransition = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Animate the scale of the mask as we scroll
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 15]);
    const opacity = useTransform(scrollYProgress, [0.4, 0.5], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-[200vh] bg-black overflow-hidden">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                {/* Background Video/Image to be revealed */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/cinema_hero_background.png" 
                        className="w-full h-full object-cover grayscale brightness-50"
                        alt="Reveal background"
                    />
                </div>

                {/* The Mask Element */}
                <motion.div 
                    style={{ scale }}
                    className="relative z-10 w-64 h-64 border-[40px] border-black rounded-full flex items-center justify-center"
                >
                    <div className="w-full h-full bg-transparent rounded-full border border-white/20"></div>
                </motion.div>

                <motion.div 
                    style={{ opacity }}
                    className="absolute z-20 text-center"
                >
                    <h2 className="text-2xl font-black uppercase tracking-[0.5em] italic">Open Your Eyes</h2>
                </motion.div>
            </div>
        </div>
    );
};

export default VideoMaskTransition;
