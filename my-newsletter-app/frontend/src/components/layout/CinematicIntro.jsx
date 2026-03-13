import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CinematicIntro = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const sequence = [
            { time: 1000, next: 1 }, // Show "Focusing" image
            { time: 3000, next: 2 }, // Show Title
            { time: 5500, next: 3 }, // Dissolve/Complete
        ];

        sequence.forEach((s) => {
            setTimeout(() => setStep(s.next), s.time);
        });

        setTimeout(onComplete, 6500);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden">
            {/* Film Grain Texture */}
            <div className="absolute inset-0 pointer-events-none z-[210] opacity-[0.03]">
                <svg className="w-full h-full">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="visual"
                        initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
                        animate={{ opacity: 0.5, filter: 'blur(0px)', scale: 1 }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        <img 
                            src="/cinema_hero_background.png" 
                            className="w-full h-full object-cover" 
                            alt="Cinematic Detail"
                        />
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="title"
                        initial={{ opacity: 0, letterSpacing: '0.5em', y: 10 }}
                        animate={{ opacity: 1, letterSpacing: '1.2em', y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-[220] flex flex-col items-center"
                    >
                        <h1 className="text-white text-2xl md:text-4xl font-light uppercase tracking-[1.5em] text-center ml-[1.5em]">
                            The School <br /> <span className="font-serif italic lowercase tracking-normal mt-4 block text-gray-500">of the Open</span>
                        </h1>
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '40px' }}
                            transition={{ delay: 1, duration: 2 }}
                            className="h-px bg-white/20 mt-12"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CinematicIntro;
