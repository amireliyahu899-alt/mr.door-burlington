
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Phone, Mail, MapPin, Menu, X, ChevronRight, 
  CheckCircle2, Clock, Shield, Star, Hammer, Loader2, Search, Info
} from 'lucide-react';
import { NEIGHBORHOODS, SERVICES, getIconComponent } from './constants';
import { ViewState, Service, Neighborhood } from './types';

const FORMSPREE_ID = "meellkeq"; 

const LeadForm: React.FC<{ initialService?: string }> = ({ initialService = "" }) => {
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SUBMITTING');
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) setStatus('SUCCESS');
      else setStatus('ERROR');
    } catch {
      setStatus('ERROR');
    }
  };

  if (status === 'SUCCESS') return (
    <div className="bg-white p-8 rounded-3xl text-center border-2 border-green-100 animate-in zoom-in duration-300">
      <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
      <p className="text-slate-600">Our Burlington technician will contact you shortly.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input required name="name" type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
        <input required name="phone" type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
      </div>
      <input required name="email" type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" />
      <textarea required name="message" rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" defaultValue={initialService ? `I need help with ${initialService}` : ""} placeholder="How can we help you today?"></textarea>
      <button type="submit" disabled={status === 'SUBMITTING'} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 flex items-center justify-center transition-all disabled:opacity-50">
        {status === 'SUBMITTING' ? <Loader2 className="animate-spin mr-2" /> : null}
        Get My Free Estimate
      </button>
    </form>
  );
};

const Header: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate({ page: 'home' })}>
          <div className="bg-blue-600 p-2 rounded-lg mr-3 shadow-lg shadow-blue-200"><Hammer className="w-6 h-6 text-white" /></div>
          <div>
            <span className="text-xl font-black text-slate-900 tracking-tighter">MR. DOOR</span>
            <span className="block text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] leading-none">Burlington</span>
          </div>
        </div>
        <nav className="hidden md:flex space-x-8 items-center">
          <button onClick={() => onNavigate({ page: 'home' })} className="font-semibold text-slate-600 hover:text-blue-600 transition-colors">Home</button>
          <button onClick={() => { document.getElementById('services')?.scrollIntoView(); }} className="font-semibold text-slate-600 hover:text-blue-600 transition-colors">Services</button>
          <a href="tel:6476990540" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 flex items-center transition-all"><Phone className="w-4 h-4 mr-2" /> (647) 699-0540</a>
        </nav>
        <button className="md:hidden p-2 text-slate-600" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X /> : <Menu />}</button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-6 space-y-4 animate-in slide-in-from-top duration-300">
          <button onClick={() => { onNavigate({ page: 'home' }); setIsOpen(false); }} className="block w-full text-left font-bold text-lg p-2 border-b">Home</button>
          <a href="tel:6476990540" className="block w-full bg-blue-600 text-white p-4 rounded-xl font-bold text-center shadow-lg">Call Now: (647) 699-0540</a>
        </div>
      )}
    </header>
  );
};

const ServiceSection: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredServices = useMemo(() => 
    SERVICES.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 24), 
    [searchTerm]
  );

  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Expert Door Solutions</h2>
          <p className="text-lg text-slate-600 mb-8">Whether you're in Millcroft or Aldershot, we provide professional services for every door type.</p>
          <div className="relative group max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search services (e.g., 'Patio', 'Lock', 'Glass')..." 
              className="w-full pl-12 pr-6 py-4 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all shadow-sm"
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map(service => (
            <div 
              key={service.id} 
              onClick={() => onNavigate({ page: 'service', serviceId: service.id })} 
              className="group bg-white p-8 rounded-3xl border border-slate-100 card-hover cursor-pointer"
            >
              <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {getIconComponent(service.name)}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{service.name}</h3>
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{service.description}</p>
              <div className="mt-6 pt-6 border-t border-slate-50 flex items-center text-blue-600 font-bold text-sm">
                View Details <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NeighborhoodSection: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => (
  <section className="py-24 bg-slate-900 text-white overflow-hidden relative" id="neighborhoods">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 skew-x-12 translate-x-1/2"></div>
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Serving Every Corner of Burlington</h2>
          <p className="text-xl text-slate-400 mb-12">Local technicians are already in your area. We guarantee fast response times for emergency repairs across Burlington.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {NEIGHBORHOODS.map(n => (
              <button 
                key={n.id} 
                onClick={() => onNavigate({ page: 'neighborhood', neighborhoodId: n.id })} 
                className="flex items-center p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-500/50 transition-all text-left group"
              >
                <MapPin className="w-6 h-6 text-blue-500 mr-4 group-hover:scale-110 transition-transform" /> 
                <div>
                  <span className="font-bold block text-white">{n.name}</span>
                  <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">Burlington District</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="relative group hidden lg:block">
          <div className="absolute -inset-4 bg-blue-600/20 rounded-[3rem] blur-2xl group-hover:bg-blue-600/30 transition-all"></div>
          <div className="relative h-[550px] rounded-[2.5rem] overflow-hidden border-8 border-white/5 shadow-2xl">
            <iframe 
              title="Burlington Neighborhoods Map" 
              width="100%" height="100%" 
              style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }} 
              loading="lazy" 
              src="https://maps.google.com/maps?q=Burlington,ON,Canada&t=&z=12&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HomeView: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => (
  <div className="animate-in fade-in duration-700">
    <section className="relative min-h-[90vh] flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop" 
          className="w-full h-full object-cover" 
          alt="Luxury Burlington Home" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/30"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 z-10 text-white">
        <div className="max-w-3xl">
          <div className="inline-flex items-center bg-blue-600/20 border border-blue-500/30 px-4 py-2 rounded-full text-blue-400 font-bold text-sm mb-8">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Your Local Burlington Door Experts
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            PREMIUM <span className="text-blue-500">DOOR</span> SERVICES.
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 font-medium leading-relaxed max-w-2xl">
            Reliable repair, installation, and replacement for residential and commercial doors. Serving all Burlington neighborhoods 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button 
              onClick={() => onNavigate({ page: 'contact' })} 
              className="bg-blue-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center"
            >
              Get a Free Quote
            </button>
            <a 
              href="tel:6476990540" 
              className="bg-white/10 backdrop-blur-md border-2 border-white/20 px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center hover:bg-white/20 transition-all"
            >
              <Phone className="w-6 h-6 mr-3" /> (647) 699-0540
            </a>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white border-b py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: <Shield className="text-blue-600" />, label: "Fully Insured", sub: "Peace of mind guaranteed" },
          { icon: <Clock className="text-blue-600" />, label: "Same Day Service", sub: "Fast Burlington response" },
          { icon: <Star className="text-blue-600" />, label: "5-Star Service", sub: "Over 500+ local reviews" },
          { icon: <CheckCircle2 className="text-blue-600" />, label: "Certified Techs", sub: "Experienced professionals" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center p-4">
            <div className="mb-3">{item.icon}</div>
            <div className="font-bold text-slate-900">{item.label}</div>
            <div className="text-xs text-slate-500 font-medium">{item.sub}</div>
          </div>
        ))}
      </div>
    </section>

    <ServiceSection onNavigate={onNavigate} />
    <NeighborhoodSection onNavigate={onNavigate} />
  </div>
);

const ServiceDetail: React.FC<{ 
  service: Service; 
  neighborhood?: Neighborhood; 
  onNavigate: (view: ViewState) => void 
}> = ({ service, neighborhood, onNavigate }) => (
  <div className="pt-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
    {/* Page Banner */}
    <div className="bg-slate-900 text-white py-32 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 -skew-x-12 translate-x-1/4"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <button 
          onClick={() => onNavigate({ page: 'home' })}
          className="text-blue-500 font-bold mb-8 flex items-center hover:text-blue-400 transition-colors"
        >
          <ChevronRight className="w-5 h-5 rotate-180 mr-2" /> Home
        </button>
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight max-w-5xl">
          {service.name} <br />
          {neighborhood ? <span className="text-blue-500">in {neighborhood.name}</span> : <span className="text-blue-500 italic">Burlington, ON</span>}
        </h1>
        <p className="text-2xl text-slate-400 max-w-3xl font-medium leading-relaxed">
          {neighborhood 
            ? `Specialized ${service.name.toLowerCase()} tailored for homeowners and businesses in the ${neighborhood.name} area. We provide 24/7 emergency support.` 
            : service.description}
        </p>
      </div>
    </div>

    {/* Content Grid */}
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        <div className="lg:col-span-2">
          <div className="prose prose-slate prose-lg max-w-none mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Expert {service.name} Services</h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light mb-6">
              {service.longDescription}
            </p>
            <p className="text-xl text-slate-600 leading-relaxed font-light">
              Our Burlington team understands that a broken door is more than just an inconvenience—it's a security risk. 
              Whether it's a {neighborhood ? `property in ${neighborhood.name}` : 'residence in Burlington'}, 
              we arrive equipped with the latest tools and premium hardware to fix the issue on the first visit.
            </p>
            
            <div className="mt-12 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex items-start">
              <div className="bg-blue-600 p-3 rounded-xl mr-6 mt-1 shadow-lg shadow-blue-200">
                <Info className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Did You Know?</h4>
                <p className="text-slate-600 text-sm italic">
                  In Burlington, extreme weather can cause door frames to warp. 
                  We specialize in weather-stripping and frame reinforcement to keep your energy bills low and your home secure year-round.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Why Choose Us?</h3>
              <ul className="space-y-4">
                {["15-Min Response Time", "Certified Local Techs", "Upfront Pricing", "Warranty on All Parts"].map((item, idx) => (
                  <li key={idx} className="flex items-center font-bold text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-slate-900 rounded-3xl text-white shadow-xl shadow-slate-200">
              <h3 className="text-2xl font-bold mb-6 tracking-tight">Need Urgent Help?</h3>
              <p className="text-slate-400 mb-6 font-medium leading-relaxed">We have mobile units stationed across Burlington {neighborhood ? `near ${neighborhood.name}` : ''}.</p>
              <a href="tel:6476990540" className="inline-flex items-center text-blue-500 font-black text-2xl hover:text-blue-400 transition-all">
                (647) 699-0540 <Phone className="ml-3 w-6 h-6 animate-bounce" />
              </a>
            </div>
          </div>

          {/* Cross-linking Neighborhoods */}
          <div className="pt-12 border-t border-slate-100">
            <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">
              {neighborhood ? `Other services in ${neighborhood.name}:` : `Available in all Burlington districts:`}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {neighborhood 
                ? SERVICES.slice(0, 12).map(s => (
                  <button 
                    key={s.id} 
                    onClick={() => onNavigate({ page: 'service-neighborhood', serviceId: s.id, neighborhoodId: neighborhood.id })}
                    className="p-4 bg-white border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all text-left flex items-center"
                  >
                    <ChevronRight className="w-3 h-3 mr-2 text-blue-500" /> {s.name}
                  </button>
                ))
                : NEIGHBORHOODS.map(n => (
                  <button 
                    key={n.id} 
                    onClick={() => onNavigate({ page: 'service-neighborhood', serviceId: service.id, neighborhoodId: n.id })}
                    className="p-4 bg-white border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all text-left flex items-center"
                  >
                    <MapPin className="w-3 h-3 mr-2 text-blue-500" /> {service.name} {n.name}
                  </button>
                ))
              }
            </div>
          </div>
        </div>

        {/* Sticky Lead Form */}
        <div className="relative">
          <div className="sticky top-32 p-10 bg-white rounded-[2.5rem] border-2 border-slate-50 shadow-2xl shadow-slate-200/40">
            <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Fast Estimate</h3>
            <p className="text-slate-500 mb-8 font-medium">Free inspection for all Burlington calls.</p>
            <LeadForm initialService={`${service.name}${neighborhood ? ` in ${neighborhood.name}` : ''}`} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ page: 'home' });
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view]);

  const currentService = view.serviceId ? SERVICES.find(s => s.id === view.serviceId) : undefined;
  const currentNeighborhood = view.neighborhoodId ? NEIGHBORHOODS.find(n => n.id === view.neighborhoodId) : undefined;

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-600 selection:text-white">
      <Header onNavigate={setView} />
      
      <main className="flex-grow">
        {view.page === 'home' && <HomeView onNavigate={setView} />}
        {view.page === 'service' && currentService && <ServiceDetail service={currentService} onNavigate={setView} />}
        {view.page === 'neighborhood' && currentNeighborhood && <ServiceDetail service={SERVICES[23]} neighborhood={currentNeighborhood} onNavigate={setView} />}
        {view.page === 'service-neighborhood' && currentService && currentNeighborhood && <ServiceDetail service={currentService} neighborhood={currentNeighborhood} onNavigate={setView} />}
        {view.page === 'contact' && (
          <div className="py-40 bg-slate-50">
            <div className="max-w-xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Get In Touch</h2>
                <p className="text-slate-600 text-lg">We serve residential and commercial properties.</p>
              </div>
              <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100">
                <LeadForm />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Sticky Mobile Call Footer */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
        <a 
          href="tel:6476990540" 
          className="pointer-events-auto w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-2xl flex items-center justify-center animate-bounce-short"
        >
          <Phone className="w-5 h-5 mr-3" /> CALL NOW (647) 699-0540
        </a>
      </div>

      <footer className="bg-slate-900 text-slate-500 py-24 px-4 border-t border-white/5 pb-32 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-20">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-2 rounded-lg mr-3 shadow-lg shadow-blue-500/20"><Hammer className="w-5 h-5 text-white" /></div>
                <span className="text-xl font-black text-white tracking-tighter">MR. DOOR</span>
              </div>
              <p className="text-sm leading-relaxed max-w-xs font-medium">Providing premium door solutions for homes and businesses across Burlington, ON. Emergency service 24/7.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Neighborhoods</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs font-bold">
                {NEIGHBORHOODS.map(n => (
                  <button key={n.id} onClick={() => setView({ page: 'neighborhood', neighborhoodId: n.id })} className="hover:text-blue-500 transition-colors text-left flex items-center">
                    <MapPin className="w-3 h-3 mr-2 opacity-50" /> {n.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-[10px]">Contact Burlington</h4>
              <p className="text-sm mb-2 font-medium">Serving All L7P, L7T, L7M Postal Areas</p>
              <a href="tel:6476990540" className="text-2xl font-black text-white hover:text-blue-500 transition-colors block mb-6 tracking-tight">(647) 699-0540</a>
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"><Shield className="w-4 h-4 text-white" /></div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer"><Mail className="w-4 h-4 text-white" /></div>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 text-center text-[10px] font-bold uppercase tracking-widest opacity-40">
            <p>© {new Date().getFullYear()} Mr. Door Burlington. Professional Installation & Repair.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
