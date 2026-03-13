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
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="request-screening" className="py-32 px-6 md:px-12 bg-[#14171C]">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold block mb-4">Colaboración</span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Request a Screening</h2>
                </div>

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="group border-b border-white/10 focus-within:border-white transition-colors py-2">
                            <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Organización</label>
                            <input 
                                type="text" 
                                name="organization"
                                value={formData.organization}
                                onChange={handleChange}
                                placeholder="Nombre de tu institución"
                                className="w-full bg-transparent outline-none text-white placeholder:text-gray-700 h-10"
                                required
                            />
                        </div>
                        <div className="group border-b border-white/10 focus-within:border-white transition-colors py-2">
                            <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Tipo de Audiencia</label>
                            <select 
                                name="audienceType"
                                value={formData.audienceType}
                                onChange={handleChange}
                                className="w-full bg-transparent outline-none text-white h-10 appearance-none"
                                required
                            >
                                <option value="" className="bg-black">Seleccionar...</option>
                                <option value="academic" className="bg-black">Académica</option>
                                <option value="festival" className="bg-black">Festival</option>
                                <option value="community" className="bg-black">Comunidad local</option>
                                <option value="private" className="bg-black">Privada</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="group border-b border-white/10 focus-within:border-white transition-colors py-2">
                            <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Fecha Propuesta</label>
                            <input 
                                type="date" 
                                name="proposedDate"
                                value={formData.proposedDate}
                                onChange={handleChange}
                                className="w-full bg-transparent outline-none text-white h-10 [color-scheme:dark]"
                                required
                            />
                        </div>
                        <div className="group border-b border-white/10 focus-within:border-white transition-colors py-2">
                            <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Correo Electrónico</label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="contacto@tu-org.com"
                                className="w-full bg-transparent outline-none text-white placeholder:text-gray-700 h-10"
                                required
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 group border-b border-white/10 focus-within:border-white transition-colors py-2">
                        <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">Mensaje / Detalles adicionales</label>
                        <textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4" 
                            className="w-full bg-transparent outline-none text-white placeholder:text-gray-700 resize-none"
                        ></textarea>
                    </div>

                    <div className="md:col-span-2 flex justify-center mt-8">
                        <button 
                            type="submit" 
                            disabled={status === 'loading'}
                            className={`px-12 py-4 rounded-full font-black uppercase tracking-[0.2em] text-xs transition-all ${
                                status === 'success' ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-gray-200'
                            }`}
                        >
                            {status === 'loading' ? 'Enviando...' : status === 'success' ? '✓ Enviado con éxito' : 'Enviar Solicitud'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default RequestScreeningForm;
