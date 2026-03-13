import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {/* The Spotlight / Focus Point */}
            <motion.div
                className="fixed top-0 left-0 w-[400px] h-[400px] bg-white/[0.03] rounded-full pointer-events-none z-[9999] blur-[100px]"
                animate={{
                    x: mousePos.x - 200,
                    y: mousePos.y - 200,
                }}
                transition={{ type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }}
            />
            {/* The Lens Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-white/20 rounded-full pointer-events-none z-[9999]"
                animate={{
                    x: mousePos.x - 16,
                    y: mousePos.y - 16,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
            />
        </>
    );
};

export default CustomCursor;
