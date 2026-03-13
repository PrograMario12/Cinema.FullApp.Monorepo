import { motion } from 'framer-motion';

const TeamSection = () => {
    const team = [
        {
            name: "Alex Rivera",
            role: "Director / Editor",
            image: "/team_1.png",
            bio: "Viajero visual enfocado en narrativas que desafían la educación tradicional."
        },
        {
            name: "Elena Solis",
            role: "Cinematographer",
            image: "/team_2.png",
            bio: "Capturando la luz natural de las montañas y la crudeza del aprendizaje real."
        },
        {
            name: "Marcus Chen",
            role: "Sound Designer",
            image: "/team_3.png",
            bio: "Creador de paisajes sonoros inmersivos para la experiencia desescolarizada."
        }
    ];

    return (
        <section id="team" className="py-32 px-6 md:px-12 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-xl">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-gray-600 font-bold block mb-6">Creative Force</span>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                            MEET <br /> <span className="italic text-gray-500">THE TEAM</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5">
                    {team.map((member, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-[#0F1115] group"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                            </div>
                            
                            <div className="p-10">
                                <h3 className="text-xl font-bold uppercase tracking-tighter mb-2 group-hover:italic transition-all">
                                    {member.name}
                                </h3>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500 font-bold mb-6">
                                    {member.role}
                                </p>
                                <p className="text-gray-500 text-sm leading-relaxed font-light">
                                    {member.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
