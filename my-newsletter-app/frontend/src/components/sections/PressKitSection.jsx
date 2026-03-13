import { motion } from 'framer-motion';
import { Download, FileText, Image as ImageIcon, Film } from 'lucide-react';

const PressKitSection = () => {
    const assets = [
        {
            title: "Official Press Release",
            description: "Detailed information about the film's background, vision, and core team.",
            icon: <FileText size={24} />,
            size: "2.4 MB",
            format: "PDF"
        },
        {
            title: "High-Res Movie Stills",
            description: "A collection of cinematic frames for print and digital media usage.",
            icon: <ImageIcon size={24} />,
            size: "45 MB",
            format: "ZIP"
        },
        {
            title: "EPK & Behind the Scenes",
            description: "Electronic Press Kit including interview snippets and production notes.",
            icon: <Film size={24} />,
            size: "120 MB",
            format: "ZIP"
        }
    ];

    return (
        <section id="press" className="py-48 px-6 md:px-12 bg-[#0F1115] border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-24 items-end mb-24">
                    <div className="max-w-xl">
                        <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-black block mb-6">Media Resources</span>
                        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white">
                            PRESS <br /> <span className="text-gray-500 italic">KIT</span>
                        </h2>
                    </div>
                    <div className="pb-4">
                        <p className="text-gray-400 text-lg font-light leading-relaxed">
                            For all media inquiries and interview requests, please download our comprehensive Electronic Press Kit or contact our media relation team.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {assets.map((asset, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-black/40 border border-white/10 p-10 rounded-2xl hover:border-amber-500/50 transition-all group"
                        >
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-8 text-gray-400 group-hover:text-amber-500 transition-colors">
                                {asset.icon}
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tight text-white mb-4">
                                {asset.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-8 font-light">
                                {asset.description}
                            </p>
                            <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                                    {asset.format} • {asset.size}
                                </span>
                                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-amber-500 transition-colors">
                                    DOWNLOAD <Download size={14} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Media Logos Placeholder */}
                <div className="mt-32 pt-24 border-t border-white/5">
                    <p className="text-center text-[10px] uppercase tracking-[0.4em] text-gray-600 font-bold mb-12">As Seen On</p>
                    <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-20 grayscale hover:grayscale-0 transition-all duration-1000">
                        {['THE NEW YORK TIMES', 'VARIETY', 'THE HOLLYWOOD REPORTER', 'SIGHT & SOUND'].map((brand) => (
                            <span key={brand} className="text-xl md:text-2xl font-black italic tracking-tighter text-white">
                                {brand}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PressKitSection;
