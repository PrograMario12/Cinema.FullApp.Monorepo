import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const VideoMaskTransition = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // We increase the scale significantly to ensure the mask clears the screen.
    // Transitioning from 1 to 60 makes the "hole" expand until the black borders are long gone.
    const scale = useTransform(scrollYProgress, [0.1, 0.9], [1, 60]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const backgroundScale = useTransform(scrollYProgress, [0.4, 1], [1.1, 1]);

    return (
        <div ref={containerRef} className="relative h-[250vh] bg-black">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                {/* Background Content: Revealed through the hole */}
                <div className="absolute inset-0 z-0">
                    <motion.div style={{ scale: backgroundScale }} className="w-full h-full">
                        <img 
                            src="/cinema_hero_background.png" 
                            className="w-full h-full object-cover grayscale brightness-[0.4]"
                            alt="Revealed Cinematic Shot"
                        />
                        {/* Dramatic overlay text revealed inside the circle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-white/[0.03] text-[20vw] font-black uppercase tracking-tighter select-none">
                                TRUTH
                            </h3>
                        </div>
                    </motion.div>
                </div>

                {/* The Lens / Mask: A hollow circle that expands */}
                {/* The 'black' part is the border. Increasing scale to 60+ pushes it off-screen. */}
                <motion.div 
                    style={{ scale }}
                    className="relative z-10 w-40 h-40 border-[100px] border-black rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(0,0,0,1)]"
                >
                    {/* Subtle aesthetic ring at the inner edge of the mask */}
                    <div className="w-full h-full rounded-full border border-white/10"></div>
                </motion.div>

                {/* Initial Instruction Text */}
                <motion.div 
                    style={{ opacity }}
                    className="absolute z-20 text-center px-6"
                >
                    <span className="text-[10px] uppercase tracking-[0.8em] text-amber-500/50 block mb-4 font-black">Scroll to reveal</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[0.4em] italic text-white drop-shadow-2xl">
                        Open <br className="md:hidden" /> Your Eyes
                    </h2>
                </motion.div>
            </div>
        </div>
    );
};

export default VideoMaskTransition;
