import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CinematicIntro = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timers = [];
        
        // Start sequence
        timers.push(setTimeout(() => setStep(1), 1000));  // Image focus + Bokeh Start
        timers.push(setTimeout(() => setStep(2), 3500)); // Title Reveal
        timers.push(setTimeout(() => setStep(3), 6500)); // Finish/Fade out
        
        timers.push(setTimeout(onComplete, 8000));

        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden">
            {/* 1. Bokeh Background Particles */}
            <div className="absolute inset-0 z-[1001] pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        layoutId={`particle-${i}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ 
                            opacity: step >= 1 ? [0, 0.15, 0] : 0, 
                            scale: step >= 1 ? [1, 1.5, 1] : 0,
                            x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                            y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                        }}
                        transition={{ 
                            duration: 8 + i, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                        }}
                        className="absolute rounded-full bg-white/10 blur-[80px]"
                        style={{
                            width: `${200 + i * 50}px`,
                            height: `${200 + i * 50}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* 2. Film Grain Texture */}
            <div className="absolute inset-0 pointer-events-none z-[1010] opacity-[0.02]">
                <svg className="w-full h-full opacity-30">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>

            <AnimatePresence>
                {step === 1 && (
                    <motion.div
                        key="visual"
                        initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
                        animate={{ opacity: 0.4, filter: 'blur(0px)', scale: 1 }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute inset-0 z-[1001]"
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
                        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-[1020] flex flex-col items-center"
                    >
                        <h1 className="text-white text-3xl md:text-5xl font-light uppercase tracking-[1.5em] text-center ml-[1.5em]">
                            The School <br /> 
                            <span className="font-serif italic lowercase tracking-normal mt-6 block text-gray-500">of the Open</span>
                        </h1>
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '60px' }}
                            transition={{ delay: 1, duration: 2.5 }}
                            className="h-px bg-white/30 mt-16"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Skip Button - Just in case */}
            <button 
                onClick={onComplete}
                className="absolute bottom-12 right-12 z-[1030] text-[10px] text-white/20 uppercase tracking-widest hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-1"
            >
                Skip Intro
            </button>
        </div>
    );
};

export default CinematicIntro;
