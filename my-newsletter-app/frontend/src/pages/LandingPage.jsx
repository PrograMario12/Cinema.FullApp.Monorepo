import { useState } from 'react';
import Layout from '../components/layout/Layout';
import RequestScreeningForm from '../components/forms/RequestScreeningForm';
import CinematicIntro from '../components/layout/CinematicIntro';
import ScrollyText from '../components/sections/ScrollyText';
import VideoMaskTransition from '../components/sections/VideoMaskTransition';
import { motion, AnimatePresence } from 'framer-motion';

const LandingPage = () => {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <>
            <AnimatePresence>
                {showIntro && (
                    <CinematicIntro onComplete={() => setShowIntro(false)} />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showIntro ? 0 : 1 }}
                transition={{ duration: 1.5 }}
            >
                <Layout>
                    {/* Hero Section */}
                    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
                        <div className="absolute inset-0 z-0">
                            <motion.img 
                                initial={{ scale: 1.2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 0.6 }}
                                transition={{ duration: 2.5, ease: "easeOut" }}
                                src="/cinema_hero_background.png" 
                                alt="The School of the Open" 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1115] via-transparent to-black/40"></div>
                        </div>

                        <div className="relative z-10 text-center max-w-5xl px-6">
                            <motion.span 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="inline-block px-4 py-1 mb-8 text-[10px] font-bold tracking-[0.5em] uppercase border border-white/20 rounded-full"
                            >
                                A Documentary Film
                            </motion.span>
                            <h1 className="text-7xl md:text-9xl font-black mb-12 tracking-tighter uppercase leading-[0.85]">
                                The School <br /> <span className="text-gray-500 italic">of the Open</span>
                            </h1>
                            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                                <button className="px-10 py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-full hover:bg-gray-200 transition-all shadow-2xl">
                                    Watch Trailer
                                </button>
                                <a href="#about" className="text-[10px] uppercase font-bold tracking-widest border-b border-white/20 pb-1 hover:border-white transition-all">
                                    Explore the Story
                                </a>
                            </div>
                        </div>
                    </section>

                    {/* Masking Transition */}
                    <VideoMaskTransition />

                    {/* About Section */}
                    <section id="about" className="py-24 md:py-48 px-6 md:px-12 bg-[#0F1115] relative z-10">
                        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-24 items-start">
                            <div className="md:sticky md:top-32 mb-12 md:mb-0">
                                <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold block mb-6">Origins</span>
                                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9] md:leading-tight">
                                    La <br /> <span className="italic text-gray-400">pedagogía</span> <br /> del espíritu.
                                </h2>
                            </div>
                            <div className="pt-0 md:pt-32">
                                <ScrollyText 
                                    text="The School of the Open nace como un diario visual sobre la desescolarización y el descubrimiento de la libertad en el aprendizaje. Desde su concepción en las montañas hasta las aulas abiertas de la ciudad."
                                    className="text-xl md:text-4xl text-white leading-tight font-light mb-12"
                                />
                                <p className="text-gray-500 leading-relaxed text-base md:text-lg max-w-md">
                                    Este proyecto captura la esencia de lo que significa aprender cuando el mundo es tu salón de clases y el tiempo no tiene paredes.
                                </p>
                            </div>
                        </div>
                    </section>

            {/* Screening Form */}
            <RequestScreeningForm />

            {/* Other sections placeholders */}
            <section id="team" className="py-32 flex justify-center border-t border-white/5 bg-black">
                <p className="text-gray-600 uppercase tracking-widest text-xs">Meet the Team Section</p>
            </section>

            <section id="events" className="py-32 flex justify-center border-t border-white/5 bg-black">
                <p className="text-gray-600 uppercase tracking-widest text-xs">Events & Screenings Section</p>
            </section>

        </Layout>
            </motion.div>
        </>
    );
};

export default LandingPage;
