import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MessageSquare, User } from 'lucide-react';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        
        // Simulating API call
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-48 px-6 md:px-12 bg-black relative overflow-hidden">
            {/* Ambient Background Element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 relative z-10">
                <div>
                    <span className="text-[10px] uppercase tracking-[0.5em] text-amber-500 font-black block mb-6">Dialogue</span>
                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-white underline decoration-white/10 decoration-1 underline-offset-8">
                        GET IN <br /> <span className="text-gray-500 italic">TOUCH</span>
                    </h2>
                    
                    <div className="mt-24 space-y-12">
                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:border-white group-hover:text-white transition-all">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold mb-2">General Inquiries</h4>
                                <p className="text-xl text-white font-light">hello@schooloftheopen.film</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:border-white group-hover:text-white transition-all">
                                <MessageSquare size={20} />
                            </div>
                            <div>
                                <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold mb-2">Production Office</h4>
                                <p className="text-xl text-white font-light">Park City, Utah · USA</p>
                            </div>
                        </div>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="bg-[#0F1115] p-8 md:p-12 border border-white/5 rounded-3xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest pl-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-4 text-gray-700" size={16} />
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 outline-none focus:border-white/40 transition-all text-white placeholder:text-gray-800"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest pl-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-4 text-gray-700" size={16} />
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-12 py-4 outline-none focus:border-white/40 transition-all text-white placeholder:text-gray-800"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest pl-1">Subject</label>
                            <input 
                                type="text" 
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Distribution / Interview / Collaboration"
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-white/40 transition-all text-white placeholder:text-gray-800"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest pl-1">Message</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="6"
                                placeholder="Your message here..."
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-white/40 transition-all text-white placeholder:text-gray-800 resize-none"
                                required
                            ></textarea>
                        </div>

                        <button 
                            type="submit"
                            disabled={status === 'loading'}
                            className={`w-full py-5 rounded-xl font-black uppercase tracking-[0.3em] text-xs transition-all flex items-center justify-center gap-3 overflow-hidden relative ${
                                status === 'success' ? 'bg-green-600 text-white' : 'bg-white text-black hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                        >
                            {status === 'loading' ? (
                                <motion.div 
                                    animate={{ rotate: 360 }} 
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                >
                                    <Send size={18} />
                                </motion.div>
                            ) : status === 'success' ? (
                                <>MESSAGE SENT <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.span></>
                            ) : (
                                <>SEND MESSAGE <Send size={16} /></>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
