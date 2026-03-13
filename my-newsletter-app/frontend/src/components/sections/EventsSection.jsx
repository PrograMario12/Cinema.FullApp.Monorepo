import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket } from 'lucide-react';

const EventsSection = () => {
    const events = [
        {
            date: "OCT 14, 2026",
            title: "World Premiere: Sundance Film Festival",
            location: "Park City, Utah",
            status: "Sold Out",
            type: "Premiere"
        },
        {
            date: "NOV 05, 2026",
            title: "Special Academic Screening & Q&A",
            location: "Columbia University, NY",
            status: "Open for RSVP",
            type: "Academic"
        },
        {
            date: "DEC 12, 2026",
            title: "International Documentary Film Festival",
            location: "Amsterdam, Netherlands",
            status: "Coming Soon",
            type: "Festival"
        },
        {
            date: "JAN 20, 2027",
            title: "Community Open-Air Cinema Tour",
            location: "Austin, Texas",
            status: "Free Admission",
            type: "Community"
        }
    ];

    return (
        <section id="events" className="py-48 px-6 md:px-12 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-24">
                    <span className="text-[10px] uppercase tracking-[0.5em] text-amber-500 font-black block mb-6">On the Road</span>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
                        Upcoming <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-700 italic">Screenings</span>
                    </h2>
                </div>

                <div className="space-y-0 border-t border-white/10">
                    {events.map((event, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group flex flex-col md:flex-row items-start md:items-center py-12 border-b border-white/10 hover:bg-white/[0.02] transition-all px-4"
                        >
                            {/* Date Area */}
                            <div className="w-48 mb-4 md:mb-0">
                                <span className="text-xs font-mono text-gray-500 tracking-tighter">
                                    {event.date}
                                </span>
                            </div>

                            {/* Main Info */}
                            <div className="flex-1">
                                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-white group-hover:pl-4 transition-all duration-500">
                                    {event.title}
                                </h3>
                                <div className="flex items-center gap-4 mt-2 text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={12} />
                                        <span className="text-[10px] uppercase tracking-widest leading-none">{event.location}</span>
                                    </div>
                                    <span className="text-[10px] text-gray-700">•</span>
                                    <span className="text-[10px] uppercase tracking-widest text-amber-500/80">{event.type}</span>
                                </div>
                            </div>

                            {/* CTA / Status */}
                            <div className="mt-8 md:mt-0 md:ml-12 flex items-center gap-8 w-full md:w-auto justify-between">
                                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${event.status === 'Sold Out' ? 'text-red-500' : 'text-gray-400'}`}>
                                    {event.status}
                                </span>
                                <button className="p-4 rounded-full border border-white/10 group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                                    <Ticket size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <p className="text-gray-600 text-sm italic font-light">
                        Are you an organizer? <a href="#request-screening" className="text-white border-b border-white/20 hover:border-white transition-all ml-1">Request a private screening</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default EventsSection;
