import { useState } from 'react';

const LandingPage = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert('¡Gracias por suscribirte!');
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-amber-500/30">
            {/* Navigation */}
            <nav className="fixed top-0 z-50 w-full px-8 py-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/5">
                <div className="text-2xl font-black tracking-tighter uppercase italic">
                    Cinema<span className="text-amber-500 underline decoration-2 underline-offset-4">Plus</span>
                </div>
                <div className="flex gap-8 items-center">
                    <a href="#features" className="text-sm font-medium hover:text-amber-500 transition-colors uppercase tracking-widest">Estrenos</a>
                    <a href="#about" className="text-sm font-medium hover:text-amber-500 transition-colors uppercase tracking-widest">Sobre Nosotros</a>
                    <a href="/login" className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm font-semibold transition-all backdrop-blur-sm">
                        Admin
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/cinema_hero_background.png" 
                        alt="Cinema Background" 
                        className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/60"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl px-4 mt-20">
                    <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full animate-fade-in">
                        Exclusivo para Amantes del Cine
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight animate-slide-up">
                        VIVE LA MAGIA <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">DESDE TU CORREO</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                        Suscríbete a nuestra newsletter premium y recibe análisis profundos, estrenos exclusivos y noticias del séptimo arte antes que nadie.
                    </p>

                    <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 bg-transparent px-6 py-4 outline-none text-white placeholder:text-gray-500"
                            required
                        />
                        <button type="submit" className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-black font-black uppercase text-sm tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)]">
                            Suscribirme
                        </button>
                    </form>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
                    <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
                </div>
            </section>

            {/* Empty space for demo */}
            <section id="features" className="py-32 px-8 flex justify-center text-center">
                <div className="max-w-2xl">
                    <h2 className="text-4xl font-bold mb-6 italic">Próximamente</h2>
                    <p className="text-gray-500">Estamos preparando una cartelera espectacular para ti.</p>
                </div>
            </section>

            <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
                <p>&copy; 2026 CinemaPlus. Todos los derechos reservados.</p>
            </footer>

            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1.05); }
                    50% { transform: scale(1.1); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 20s infinite ease-in-out;
                }
                @keyframes slide-up {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-slide-up {
                    animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-fade-in {
                    animation: slide-up 1s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
                }
            `}</style>
        </div>
    );
};

export default LandingPage;
