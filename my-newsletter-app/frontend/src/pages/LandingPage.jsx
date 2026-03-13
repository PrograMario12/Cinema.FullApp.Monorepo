import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/layout/Layout';
import ScrollyText from '../components/sections/ScrollyText';
import VideoMaskTransition from '../components/sections/VideoMaskTransition';
import CinematicIntro from '../components/layout/CinematicIntro';
import TeamSection from '../components/sections/TeamSection';
import EventsSection from '../components/sections/EventsSection';
import ContactSection from '../components/sections/ContactSection';
import RequestScreeningForm from '../components/forms/RequestScreeningForm';
import PressKitSection from '../components/sections/PressKitSection';

const LandingPage = () => {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <div className="relative min-h-screen">
            <AnimatePresence>
                {showIntro && (
                    <CinematicIntro key="intro" onComplete={() => setShowIntro(false)} />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showIntro ? 0 : 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="relative"
            >
                <Layout>
                    {/* Hero Section */}
                    <section id="home" className="relative h-screen flex items-center justify-center overflow-x-hidden">
                        <div className="absolute inset-0 z-0">
                            <img 
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

                        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: showIntro ? 0 : 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="max-w-4xl mx-auto"
                            >
                                <span className="text-[10px] md:text-sm uppercase tracking-[1em] text-amber-500 font-black mb-8 block drop-shadow-lg">
                                    A Film by Open Studios
                                </span>
                                <h1 className="text-4xl sm:text-5xl md:text-[120px] font-black uppercase tracking-tighter leading-none mb-12 drop-shadow-2xl">
                                    The School <br /> <span className="italic text-gray-400">of the</span> Open
                                </h1>
                                
                                <p className="text-lg md:text-2xl text-white/80 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                                    A documentary film exploring the de-schooling movement <br className="hidden md:block" /> and the true meaning of education.
                                </p>

                                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                    <button className="px-12 py-5 bg-white text-black rounded-full font-black uppercase tracking-[0.3em] text-xs hover:bg-amber-500 hover:text-white transition-all transform hover:scale-105 shadow-2xl">
                                        Watch Trailer
                                    </button>
                                    <a href="#request-screening" className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all">
                                        Request Screening
                                    </a>
                                </div>
                            </motion.div>
                        </div>

                        {/* Animated Scroll Indicator */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: showIntro ? 0 : 0.5 }}
                            transition={{ delay: 2, duration: 1 }}
                            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                        >
                             <div className="w-px h-12 bg-gradient-to-b from-transparent via-white to-transparent"></div>
                        </motion.div>
                    </section>

                    {/* Masking Transition */}
                    <VideoMaskTransition />

                    {/* About Section - Narrative Storytelling */}
                    <section id="about" className="py-24 md:py-48 px-6 md:px-12 bg-[#0F1115] relative z-10">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start mb-32">
                                <div className="md:sticky md:top-32">
                                    <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold block mb-6">Origins</span>
                                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9] md:leading-tight">
                                        The <br /> <span className="italic text-gray-400">pedagogy</span> <br /> of spirit.
                                    </h2>
                                </div>
                                <div className="pt-0 md:pt-32">
                                    <ScrollyText 
                                        text="The School of the Open was born as a visual diary about unschooling and the discovery of freedom in learning."
                                        className="text-xl md:text-3xl text-white leading-tight font-light mb-12"
                                    />
                                    
                                    {/* Micro-sections */}
                                    <div className="space-y-24 mt-32">
                                        {/* Origin */}
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 1 }}
                                            className="group"
                                        >
                                            <div className="aspect-video mb-8 overflow-hidden rounded-2xl grayscale hover:grayscale-0 transition-all duration-700">
                                                <img src="/about_1.png" alt="Misty Mountains" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                                            </div>
                                            <h4 className="text-amber-500 text-[10px] uppercase tracking-[0.3em] font-black mb-4">I. The Origin</h4>
                                            <p className="text-gray-400 leading-relaxed font-light">
                                                Conceived in the silence of the mountains, the project began as a personal quest to document the breakdown of traditional educational walls.
                                            </p>
                                        </motion.div>

                                        {/* Mission */}
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 1 }}
                                            className="group"
                                        >
                                            <div className="aspect-video mb-8 overflow-hidden rounded-2xl grayscale hover:grayscale-0 transition-all duration-700">
                                                <img src="/about_2.png" alt="Child in Nature" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                                            </div>
                                            <h4 className="text-amber-500 text-[10px] uppercase tracking-[0.3em] font-black mb-4">II. The Mission</h4>
                                            <p className="text-gray-400 leading-relaxed font-light">
                                                To capture the raw essence of human curiosity when it is not bound by schedules, grades, or artificial hierarchies of knowledge.
                                            </p>
                                        </motion.div>

                                        {/* Vision */}
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 1 }}
                                            className="group"
                                        >
                                            <div className="aspect-video mb-8 overflow-hidden rounded-2xl grayscale hover:grayscale-0 transition-all duration-700">
                                                <img src="/about_3.png" alt="Open Classroom" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                                            </div>
                                            <h4 className="text-amber-500 text-[10px] uppercase tracking-[0.3em] font-black mb-4">III. The Vision</h4>
                                            <p className="text-gray-400 leading-relaxed font-light">
                                                Building a world where the classroom is everywhere, and every interaction is an opportunity for authentic discovery.
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
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
        </div>
    );
};

export default LandingPage;
