import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Twitter, Mail } from 'lucide-react';

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
        { name: 'About', href: '#about' },
        { name: 'Team', href: '#team' },
        { name: 'Events', href: '#events' },
        { name: 'Press', href: '#press' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <div className="min-h-screen bg-[#0F1115] text-white selection:bg-white selection:text-black">
            {/* Navigation */}
            <nav className={`fixed top-0 z-[100] w-full transition-all duration-500 ${isScrolled ? 'py-4 bg-[#0F1115]/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold tracking-tighter uppercase leading-none">
                        The School <br /> <span className="text-gray-500">of the Open</span>
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-10 items-center">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-[11px] font-bold uppercase tracking-[0.2em] hover:text-gray-400 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                        <a 
                            href="#request-screening" 
                            className="px-6 py-2 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
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
            <footer className="py-24 border-t border-white/5 bg-black">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-12 items-center text-center md:text-left">
                    <div>
                        <h3 className="text-xl font-bold uppercase tracking-tighter mb-4">The School of the Open</h3>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                            Una exploración cinematográfica sobre la educación alternativa y el espíritu humano.
                        </p>
                    </div>
                    <div className="flex justify-center gap-6">
                        <Instagram size={20} className="hover:text-gray-400 cursor-pointer transition-colors" />
                        <Twitter size={20} className="hover:text-gray-400 cursor-pointer transition-colors" />
                        <Mail size={20} className="hover:text-gray-400 cursor-pointer transition-colors" />
                    </div>
                    <div className="md:text-right">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
                            &copy; 2026 Open Film Studios. <br /> All Rights Reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
