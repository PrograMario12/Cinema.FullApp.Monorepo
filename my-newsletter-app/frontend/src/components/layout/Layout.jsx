import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Twitter, Mail } from 'lucide-react';
import CustomCursor from './CustomCursor';

const Layout = ({ children }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#about' },
        { name: 'Festivals', href: '#events' },
        { name: 'Press', href: '#press' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <div className="min-h-screen bg-[#0F1115] text-white selection:bg-white selection:text-black">
            <CustomCursor />
            {/* Navigation */}
            <nav className={`fixed top-0 z-[100] w-full transition-all duration-500 ${isScrolled ? 'py-4 bg-[#0F1115]/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold tracking-tighter uppercase leading-none">
                        The School <br /> <span className="text-gray-500">of the Open</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-12 items-center">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all duration-500"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a 
                            href="#request-screening" 
                            className="ml-4 px-5 py-2 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] text-white/60 hover:bg-white hover:text-black hover:border-white transition-all duration-500"
                        >
                            Request Screening
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[90] bg-black transition-transform duration-700 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} flex flex-col items-center justify-center`}>
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-4xl font-black uppercase tracking-tighter my-4 hover:italic transition-all"
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="pt-32 pb-12 border-t border-white/5 bg-black relative overflow-hidden">
                {/* Subtle Background Text */}
                <div className="absolute bottom-0 left-0 text-[20vw] font-black text-white/[0.02] leading-none pointer-events-none select-none tracking-tighter">
                    OPEN
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
                        {/* Branding */}
                        <div className="md:col-span-2">
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">The School of the Open</h3>
                            <p className="text-gray-500 text-lg font-light leading-relaxed max-w-md">
                                A cinematic exploration into alternative education, the de-schooling movement, and the radical pursuit of human freedom.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-8">Navigation</h4>
                            <ul className="space-y-4">
                                {navLinks.map(link => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-sm text-gray-500 hover:text-amber-500 transition-colors">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social & Platforms */}
                        <div>
                            <h4 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-8">Follow & Watch</h4>
                            <div className="flex flex-wrap gap-4 mb-8">
                                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-white hover:text-white hover:bg-white/5 transition-all group">
                                    <Instagram size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-white hover:text-white hover:bg-white/5 transition-all group">
                                    <Twitter size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-white hover:text-white hover:bg-white/5 transition-all group">
                                    <Mail size={18} />
                                </a>
                            </div>
                            
                            <div className="space-y-3">
                                <a href="#" className="flex items-center gap-3 group">
                                    <div className="px-2 py-0.5 bg-amber-500 text-black text-[9px] font-black rounded uppercase">IMDb</div>
                                    <span className="text-xs text-gray-500 group-hover:text-white transition-colors">Official Movie Page</span>
                                </a>
                                <a href="#" className="flex items-center gap-3 group opacity-50 cursor-not-allowed">
                                    <div className="px-2 py-0.5 bg-white text-black text-[9px] font-black rounded uppercase tracking-tighter">MUBI</div>
                                    <span className="text-xs text-gray-500">Coming Soon</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Strip */}
                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-gray-600">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-600 font-bold">
                            &copy; 2026 OPEN FILM STUDIOS. <br className="md:hidden" /> ALL RIGHTS RESERVED.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
