import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const VideoMaskTransition = () => {
    const containerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Expand the "Iris" as we scroll
    const scale = useTransform(scrollYProgress, [0.1, 0.9], [1, 60]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const backgroundScale = useTransform(scrollYProgress, [0.4, 1], [1.1, 1]);

    return (
        <div ref={containerRef} className="relative h-[250vh] bg-black">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                {/* 1. The Background Layer (Revealed inside the hole) */}
                <div className="absolute inset-0 z-0">
                    <motion.div style={{ scale: backgroundScale }} className="w-full h-full">
                        <img 
                            src="/cinema_hero_background.png" 
                            className="w-full h-full object-cover grayscale brightness-[0.4]"
                            alt="Revealed Cinematic Shot"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-white/[0.03] text-[20vw] font-black uppercase tracking-tighter select-none">
                                TRUTH
                            </h3>
                        </div>
                    </motion.div>
                </div>

                {/* 2. The Interactive Eye / Iris */}
                <motion.div 
                    style={{ scale }}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="relative z-10 w-32 h-32 md:w-48 md:h-48 border-[80px] md:border-[120px] border-black rounded-full flex items-center justify-center shadow-[0_0_150px_rgba(0,0,0,1)] cursor-none"
                >
                    {/* Inner Lens Area */}
                    <div className="w-full h-full rounded-full overflow-hidden relative group">
                        {/* Static Placeholder (Visible when not hovering) */}
                        <div className="absolute inset-0 bg-transparent flex items-center justify-center border border-white/10 rounded-full transition-opacity duration-700">
                             {/* The actual "Video Eye" */}
                            <AnimatePresence>
                                {isHovering && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-20"
                                    >
                                        <video 
                                            autoPlay 
                                            loop 
                                            muted 
                                            playsInline
                                            className="w-full h-full object-cover scale-[1.5]"
                                        >
                                            <source src="https://assets.mixkit.co/videos/preview/mixkit-cinematic-shot-of-a-misty-forest-at-dawn-43183-large.mp4" type="video/mp4" />
                                        </video>
                                        <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay"></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        {/* Lens Reflections (Aesthetic) */}
                        <div className="absolute inset-0 pointer-events-none z-30 opacity-20 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
                    </div>
                </motion.div>

                {/* 3. Initial Instruction Text */}
                <motion.div 
                    style={{ opacity }}
                    className="absolute z-20 text-center px-6 pointer-events-none"
                >
                    <span className="text-[10px] uppercase tracking-[0.8em] text-amber-500/50 block mb-4 font-black">Scroll to reveal</span>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-[0.4em] italic text-white drop-shadow-2xl">
                        Open <br className="md:hidden" /> Your Eyes
                    </h2>
                </motion.div>

                {/* Hover Message */}
                <motion.div
                    animate={{ opacity: isHovering ? 1 : 0, y: isHovering ? 0 : 10 }}
                    className="absolute bottom-24 z-40 text-center pointer-events-none"
                >
                    <span className="text-[8px] uppercase tracking-[0.5em] text-white/40 font-bold">You are looking into the soul of the film</span>
                </motion.div>
            </div>
        </div>
    );
};

export default VideoMaskTransition;
