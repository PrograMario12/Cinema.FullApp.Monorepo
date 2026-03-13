import { useState } from 'react';
import Layout from '../components/layout/Layout';
import RequestScreeningForm from '../components/forms/RequestScreeningForm';
import CinematicIntro from '../components/layout/CinematicIntro';
import ScrollyText from '../components/sections/ScrollyText';
import VideoMaskTransition from '../components/sections/VideoMaskTransition';
import TeamSection from '../components/sections/TeamSection';
import EventsSection from '../components/sections/EventsSection';
import PressKitSection from '../components/sections/PressKitSection';
import ContactSection from '../components/sections/ContactSection';
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
                transition={{ duration: 2, ease: "easeInOut" }}
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
                            {/* Floating Parallax Element 1 */}
                            <motion.div 
                                animate={{ 
                                    y: [0, -20, 0],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/4 left-10 w-32 h-32 border border-white/5 rounded-full blur-xl pointer-events-none"
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
                            <h1 className="text-7xl md:text-9xl font-black mb-8 tracking-tighter uppercase leading-[0.85]">
                                The School <br /> <span className="text-gray-500 italic">of the Open</span>
                            </h1>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-2xl text-gray-300 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
                            >
                                A feature documentary exploring the de-schooling movement <br className="hidden md:block" /> and the radical pursuit of true education.
                            </motion.p>

                            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                                <button className="group relative px-10 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-full hover:bg-amber-500 hover:text-white transition-all duration-500 shadow-2xl flex items-center gap-3">
                                    Watch Trailer
                                    <div className="w-2 h-2 bg-black group-hover:bg-white rounded-full animate-pulse"></div>
                                </button>
                                
                                <a href="#request-screening" className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white font-black uppercase text-[11px] tracking-[0.2em] rounded-full hover:bg-white/10 transition-all duration-500">
                                    Request Screening
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
                                    The <br /> <span className="italic text-gray-400">pedagogy</span> <br /> of spirit.
                                </h2>
                            </div>
                            <div className="pt-0 md:pt-32">
                                <ScrollyText 
                                    text="The School of the Open was born as a visual diary about unschooling and the discovery of freedom in learning. From its conception in the mountains to the open classrooms of the city."
                                    className="text-xl md:text-4xl text-white leading-tight font-light mb-12"
                                />
                                <p className="text-gray-500 leading-relaxed text-base md:text-lg max-w-md">
                                    This project captures the essence of what it means to learn when the world is your classroom and time has no walls.
                                </p>
                            </div>
                        </div>
                    </section>

            {/* Screening Form */}
            <RequestScreeningForm />

            <TeamSection />

            <EventsSection />

            <PressKitSection />

            <ContactSection />

        </Layout>
            </motion.div>
        </>
    );
};

export default LandingPage;
