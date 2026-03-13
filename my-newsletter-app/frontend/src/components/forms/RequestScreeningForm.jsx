import { useState } from 'react';

const RequestScreeningForm = () => {
    const [formData, setFormData] = useState({
        organization: '',
        audienceType: '',
        proposedDate: '',
        location: '',
        email: '',
        message: ''
    });

    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Simulated API call
            const response = await fetch('http://localhost:5000/api/screenings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ organization: '', audienceType: '', proposedDate: '', location: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 3000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="request-screening" className="py-32 px-6 md:px-12 bg-[#14171C]">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-16">
                
                {/* Context & Testimonial Side */}
                <div className="lg:col-span-1 space-y-12 pt-4">
                    <div>
                        <span className="text-[10px] uppercase tracking-[0.4em] text-amber-500 font-bold block mb-4">Why host a screening?</span>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-6">Open the Conversation</h2>
                        <ul className="space-y-4 text-gray-400 text-sm font-light leading-relaxed">
                            <li className="flex gap-3"><span className="text-white">▪</span> Foster meaningful dialogue about the future of learning.</li>
                            <li className="flex gap-3"><span className="text-white">▪</span> Engage with filmmaker Q&As (available upon request).</li>
                            <li className="flex gap-3"><span className="text-white">▪</span> Screen high-quality documentary content for your community.</li>
                        </ul>
                    </div>

                    <div className="p-8 bg-black/20 rounded-2xl border border-white/5 relative">
                        <div className="text-4xl text-white/10 italic absolute top-4 left-4 font-serif">"</div>
                        <p className="text-gray-300 italic text-sm font-light leading-relaxed relative z-10">
                            The School of the Open transformed our students' perspective on autonomy. It's not just a film; it's a pedagogical tool for freedom.
                        </p>
                        <div className="mt-6 flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-[10px] font-bold">U</div>
                            <div>
                                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Director of Innovation</p>
                                <p className="text-[9px] text-gray-500">University of Arts & Sciences</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* The Form */}
                <div className="lg:col-span-2 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5">
                    <div className="mb-12">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold block mb-2">Collaboration</span>
                        <h3 className="text-4xl font-black uppercase tracking-tighter text-white">Booking Inquiry</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                            <div className="group border-b border-white/10 focus-within:border-amber-500 transition-colors py-2">
                                <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Organization</label>
                                <input 
                                    type="text" 
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    placeholder="Your institution name"
                                    className="w-full bg-transparent outline-none text-white placeholder:text-gray-800 h-10 transition-all pl-1"
                                    required
                                />
                            </div>
                            <div className="group border-b border-white/10 focus-within:border-amber-500 transition-colors py-2">
                                <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Audience Type</label>
                                <select 
                                    name="audienceType"
                                    value={formData.audienceType}
                                    onChange={handleChange}
                                    className="w-full bg-transparent outline-none text-white h-10 appearance-none cursor-pointer pl-1"
                                    required
                                >
                                    <option value="" className="bg-black">Select...</option>
                                    <option value="academic" className="bg-black">Academic Institution</option>
                                    <option value="festival" className="bg-black">Film Festival</option>
                                    <option value="community" className="bg-black">Local Community Group</option>
                                    <option value="private" className="bg-black">Private Event</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="group border-b border-white/10 focus-within:border-amber-500 transition-colors py-2">
                                <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Proposed Date</label>
                                <input 
                                    type="date" 
                                    name="proposedDate"
                                    value={formData.proposedDate}
                                    onChange={handleChange}
                                    className="w-full bg-transparent outline-none text-white h-10 [color-scheme:dark] pl-1"
                                    required
                                />
                            </div>
                            <div className="group border-b border-white/10 focus-within:border-amber-500 transition-colors py-2">
                                <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Email Address</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="contact@your-org.com"
                                    className="w-full bg-transparent outline-none text-white placeholder:text-gray-800 h-10 pl-1"
                                    required
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 group border-b border-white/10 focus-within:border-amber-500 transition-colors py-2">
                            <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Proposed Location / City</label>
                            <input 
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Park City, Utah / Online"
                                className="w-full bg-transparent outline-none text-white placeholder:text-gray-800 h-10 pl-1"
                                required
                            />
                        </div>

                        <div className="md:col-span-2 group border-b border-white/10 focus-within:border-amber-500 transition-colors py-2">
                            <label className="text-[10px] uppercase font-bold text-gray-500 mb-2 block">Message / Additional Details</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="3" 
                                placeholder="Tell us about your event..."
                                className="w-full bg-transparent outline-none text-white placeholder:text-gray-800 resize-none pl-1"
                            ></textarea>
                        </div>

                        <div className="md:col-span-2 flex justify-end mt-8">
                            <button 
                                type="submit" 
                                disabled={status === 'loading'}
                                className={`px-12 py-5 rounded-full font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-xl ${
                                    status === 'success' ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-amber-500 hover:text-white'
                                }`}
                            >
                                {status === 'loading' ? 'Processing...' : status === 'success' ? '✓ Request Received' : 'Send Inquiry'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default RequestScreeningForm;
