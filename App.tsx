
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Phone, Mail, MapPin, Menu, X, ChevronRight, 
  CheckCircle2, Clock, Shield, Star, Hammer, Loader2, AlertCircle
} from 'lucide-react';
import { NEIGHBORHOODS, SERVICES, getIconComponent } from './constants';
import { ViewState, Service, Neighborhood } from './types';

/** 
 *  --- הגדרת מזהה Formspree ---
 *  המזהה שלך הוא החלק האחרון בקישור שקיבלת.
 */
const FORMSPREE_ID: string = "meellkeq"; 

// --- Reusable Lead Form Component ---

const LeadForm: React.FC<{ initialService?: string }> = ({ initialService = "" }) => {
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('SUBMITTING');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      if (!FORMSPREE_ID || FORMSPREE_ID === "YOUR_FORMSPREE_ID") {
        console.warn("Formspree ID is not set properly. Simulating success...");
        setTimeout(() => setStatus('SUCCESS'), 1500);
        return;
      }

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        setStatus('SUCCESS');
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  if (status === 'SUCCESS') {
    return (
      <div className="bg-white p-8 rounded-3xl text-center border-2 border-green-100 animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
        <p className="text-slate-600">Your request has been sent successfully. Our team in Burlington will contact you shortly.</p>
        <button 
          onClick={() => setStatus('IDLE')}
          className="mt-6 text-blue-600 font-bold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'ERROR' && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center text-sm">
          <AlertCircle className="w-4 h-4 mr-2" />
          Something went wrong. Please try calling us directly.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
          <input 
            required
            name="name"
            type="text" 
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
          <input 
            required
            name="phone"
            type="tel" 
            placeholder="(647) 699-0540"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
        <input 
          required
          name="email"
          type="email" 
          placeholder="john@example.com"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-1">Service Required</label>
        <textarea 
          required
          name="message"
          rows={3} 
          className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all" 
          defaultValue={initialService ? `I need help with: ${initialService}` : ""}
          placeholder="Tell us about your door issue..."
        ></textarea>
      </div>
      <button 
        type="submit" 
        disabled={status === 'SUBMITTING'}
        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all flex items-center justify-center text-lg"
      >
        {status === 'SUBMITTING' ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          'Request Free Quote'
        )}
      </button>
      <p className="text-[10px] text-center text-slate-400 mt-2">
        By submitting, you agree to be contacted regarding your service request.
      </p>
    </form>
  );
};

// --- Main Layout Components ---

const Header: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate({ page: 'home' })}
          >
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              < Hammer className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">MR. DOOR</span>
              <span className="block text-xs font-bold text-blue-600 uppercase tracking-widest leading-none">Burlington</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8 items-center">
            <button onClick={() => onNavigate({ page: 'home' })} className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</button>
            <div className="relative group">
              <button className="text-slate-600 hover:text-blue-600 font-medium transition-colors flex items-center">
                Services <ChevronRight className="w-4 h-4 ml-1 rotate-90" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-white border border-slate-200 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 mt-2 max-h-[400px] overflow-y-auto">
                {SERVICES.slice(0, 10).map(s => (
                  <button 
                    key={s.id} 
                    onClick={() => onNavigate({ page: 'service', serviceId: s.id })}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 text-slate-700 text-sm border-b border-slate-100 last:border-0"
                  >
                    {s.name}
                  </button>
                ))}
                <button 
                   onClick={() => onNavigate({ page: 'home' })}
                   className="w-full text-left px-4 py-3 bg-blue-50 text-blue-600 font-semibold text-sm"
                >
                  View All Services
                </button>
              </div>
            </div>
            <button onClick={() => onNavigate({ page: 'contact' })} className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              (647) 699-0540
            </button>
          </nav>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-4">
          <button onClick={() => { onNavigate({ page: 'home' }); setIsOpen(false); }} className="block w-full text-left font-medium p-2">Home</button>
          <button onClick={() => { onNavigate({ page: 'contact' }); setIsOpen(false); }} className="block w-full text-left font-medium p-2">Contact</button>
          <div className="pt-4">
            <a href="tel:6476990540" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold flex justify-center items-center">
              <Phone className="w-5 h-5 mr-2" /> Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => (
  <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <div className="flex items-center mb-6">
            <Hammer className="w-8 h-8 text-blue-500 mr-3" />
            <span className="text-2xl font-bold text-white">Mr. Door <span className="text-blue-500">Burlington</span></span>
          </div>
          <p className="mb-6 leading-relaxed">
            Your local door experts in Burlington, Ontario. Providing top-tier repair and installation services for residential and commercial properties.
          </p>
          <div className="flex space-x-4">
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
              <Star className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-6">Popular Services</h4>
          <ul className="space-y-3">
            {SERVICES.slice(0, 6).map(s => (
              <li key={s.id}>
                <button onClick={() => onNavigate({ page: 'service', serviceId: s.id })} className="hover:text-blue-400 transition-colors">
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-6">Service Areas</h4>
          <ul className="space-y-3">
            {NEIGHBORHOODS.slice(0, 6).map(n => (
              <li key={n.id}>
                <button onClick={() => onNavigate({ page: 'neighborhood', neighborhoodId: n.id })} className="hover:text-blue-400 transition-colors">
                  {n.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start">
              <MapPin className="w-5 h-5 text-blue-500 mr-3 shrink-0" />
              <span>Burlington, ON, Canada</span>
            </li>
            <li className="flex items-center">
              <Phone className="w-5 h-5 text-blue-500 mr-3" />
              <a href="tel:6476990540" className="hover:text-white transition-colors">(647) 699-0540</a>
            </li>
            <li className="flex items-center">
              <Mail className="w-5 h-5 text-blue-500 mr-3" />
              <a href="mailto:info@mrdoorburlington.ca" className="hover:text-white transition-colors">info@mrdoorburlington.ca</a>
            </li>
            <li className="flex items-center">
              <Clock className="w-5 h-5 text-blue-500 mr-3" />
              <span>24/7 Emergency Service</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 pt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Mr. Door Burlington. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// --- Page Content Components ---

const HomeView: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredServices = useMemo(() => 
    SERVICES.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 12)
  , [searchTerm]);

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1600&auto=format&fit=crop" 
            alt="Professional Front Door" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center bg-blue-600/20 border border-blue-400/30 px-3 py-1 rounded-full text-blue-400 text-sm font-bold mb-6">
              <Star className="w-4 h-4 mr-2" /> Top Rated in Burlington
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Expert Door <br />
              <span className="text-blue-500">Services</span> in Burlington
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-lg">
              Reliable repair, installation, and replacement for residential and commercial doors. Serving all Burlington neighborhoods 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => onNavigate({ page: 'contact' })} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center transition-all">
                Get a Free Quote
              </button>
              <a href="tel:6476990540" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all">
                <Phone className="w-5 h-5 mr-3" /> (647) 699-0540
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between gap-8">
          {[
            { icon: <Shield className="w-8 h-8 text-blue-600" />, title: "Fully Insured", sub: "Peace of mind guaranteed" },
            { icon: <Clock className="w-8 h-8 text-blue-600" />, title: "Same Day Service", sub: "Fast Burlington response" },
            { icon: <Star className="w-8 h-8 text-blue-600" />, title: "5-Star Service", sub: "Over 500+ local reviews" },
            { icon: <CheckCircle2 className="w-8 h-8 text-blue-600" />, title: "Certified Techs", sub: "Experienced professionals" },
          ].map((item, i) => (
            <div key={i} className="flex items-center text-left">
              <div className="mr-4">{item.icon}</div>
              <div>
                <div className="font-bold text-slate-900">{item.title}</div>
                <div className="text-sm text-slate-500">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Our Professional Services</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">We handle everything from simple fixes to complete commercial door installations.</p>
            
            <div className="relative max-w-md mx-auto mb-12">
              <input 
                type="text" 
                placeholder="Search for a specific service..."
                className="w-full px-6 py-4 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map(service => (
              <div 
                key={service.id} 
                onClick={() => onNavigate({ page: 'service', serviceId: service.id })}
                className="group bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {getIconComponent(service.name)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-500 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex items-center text-blue-600 font-bold text-sm">
                  Learn More <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
          
          {filteredServices.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              No services found matching your search. Try "Repair" or "Installation".
            </div>
          )}
        </div>
      </section>

      {/* Neighborhoods Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-6">Service Areas in Burlington</h2>
              <p className="text-lg text-slate-600 mb-8">
                Mr. Door Burlington provides mobile door repair and installation services across all neighborhoods. Whether you're in the north end or near the lake, our technicians are ready to help.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {NEIGHBORHOODS.map(n => (
                  <button 
                    key={n.id} 
                    onClick={() => onNavigate({ page: 'neighborhood', neighborhoodId: n.id })}
                    className="flex items-center p-4 bg-slate-50 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all text-left group"
                  >
                    <MapPin className="w-5 h-5 text-blue-500 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-slate-800">{n.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              {/* Google Maps Interactive Embed for Burlington */}
              <div className="h-[450px] w-full rounded-3xl shadow-2xl border-4 border-white overflow-hidden bg-slate-100">
                <iframe 
                  title="Burlington Service Map"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=Burlington,ON,Canada&t=&z=12&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
              <div className="absolute -bottom-10 -left-10 bg-blue-600 text-white p-8 rounded-3xl shadow-xl hidden md:block z-10">
                <div className="text-4xl font-black mb-1">100%</div>
                <div className="font-bold opacity-80 uppercase tracking-widest text-sm">Burlington Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Ready to Fix Your Door Today?</h2>
          <p className="text-xl mb-12 opacity-90">Don't wait for your door issues to get worse. Get a professional, fast, and affordable solution now.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button onClick={() => onNavigate({ page: 'contact' })} className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-transform">
              Get Free Estimate
            </button>
            <a href="tel:6476990540" className="bg-blue-800 text-white px-10 py-5 rounded-2xl font-black text-xl flex items-center justify-center hover:bg-blue-900 transition-all">
              <Phone className="w-6 h-6 mr-3" /> (647) 699-0540
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceNeighborhoodDetail: React.FC<{ 
  service: Service; 
  neighborhood?: Neighborhood;
  onNavigate: (view: ViewState) => void;
}> = ({ service, neighborhood, onNavigate }) => {
  return (
    <div className="pt-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button 
              onClick={() => onNavigate({ page: 'home' })}
              className="text-blue-400 font-bold flex items-center hover:text-blue-300 transition-colors"
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> Back to Home
            </button>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            {service.name} <br />
            {neighborhood && <span className="text-blue-500">in {neighborhood.name}, Burlington</span>}
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl">
            {neighborhood 
              ? `Expert ${service.name.toLowerCase()} solutions tailored for residents and businesses in the ${neighborhood.name} area of Burlington.`
              : service.description
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Professional {service.name}</h2>
            <div className="prose prose-lg text-slate-600 max-w-none">
              <p className="mb-6">{service.longDescription}</p>
              <p className="mb-6">
                Our team is fully equipped to handle any door challenge. From traditional wood doors to modern high-security glass systems, 
                we ensure your entrance is safe, efficient, and looking its best. Residents of 
                {neighborhood ? ` ${neighborhood.name}` : ' Burlington'} trust Mr. Door for our punctuality and superior results.
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Why Choose Us?</h3>
              <ul className="space-y-4">
                {[
                  "Local expertise in Burlington building codes and styles",
                  "24/7 Emergency response times",
                  "Transparent pricing with no hidden fees",
                  "Certified and fully insured technicians",
                  "High-quality commercial grade hardware"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!neighborhood && (
              <div className="mt-20">
                <h3 className="text-2xl font-bold mb-8">Available in all Burlington Neighborhoods:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {NEIGHBORHOODS.map(n => (
                    <button 
                      key={n.id}
                      onClick={() => onNavigate({ page: 'service-neighborhood', serviceId: service.id, neighborhoodId: n.id })}
                      className="p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-slate-700"
                    >
                      {service.name} {n.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                <h3 className="text-2xl font-bold mb-6">Instant Quote</h3>
                <LeadForm initialService={`${service.name}${neighborhood ? ` in ${neighborhood.name}` : ''}`} />
              </div>

              <div className="bg-blue-600 text-white p-8 rounded-3xl">
                <h4 className="text-xl font-bold mb-2">Need Help Faster?</h4>
                <p className="opacity-80 mb-6">Call our 24/7 emergency hotline for immediate assistance.</p>
                <a href="tel:6476990540" className="flex items-center justify-center bg-white text-blue-600 font-black py-4 rounded-xl text-xl">
                  <Phone className="w-6 h-6 mr-3" /> (647) 699-0540
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactView: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => (
  <div className="pt-20">
    <div className="bg-slate-900 text-white py-24 text-center">
      <h1 className="text-5xl font-black mb-4">Contact Mr. Door</h1>
      <p className="text-xl text-slate-400">The premier door service in Burlington, Ontario</p>
    </div>
    
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-8 text-slate-900">Get in Touch</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 mr-6">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Office Location</h4>
                <p className="text-slate-600">Burlington, ON, Canada</p>
                <p className="text-slate-400 text-sm">Serving all Burlington neighborhoods</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 mr-6">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Phone</h4>
                <a href="tel:6476990540" className="text-slate-600 hover:text-blue-600 font-bold">(647) 699-0540</a>
                <p className="text-slate-400 text-sm">Emergency calls accepted 24/7</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 mr-6">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-xl mb-1">Email</h4>
                <a href="mailto:info@mrdoorburlington.ca" className="text-slate-600 hover:text-blue-600 font-bold">info@mrdoorburlington.ca</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
          <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
          <LeadForm />
        </div>
      </div>
    </div>
  </div>
);

// --- App Root ---

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ page: 'home' });

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleNavigate = (newView: ViewState) => {
    setView(newView);
    // Simple hash routing simulation
    const hash = `#${newView.page}${newView.serviceId ? `/${newView.serviceId}` : ''}${newView.neighborhoodId ? `/n/${newView.neighborhoodId}` : ''}`;
    window.location.hash = hash;
  };

  const currentService = view.serviceId ? SERVICES.find(s => s.id === view.serviceId) : undefined;
  const currentNeighborhood = view.neighborhoodId ? NEIGHBORHOODS.find(n => n.id === view.neighborhoodId) : undefined;

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {view.page === 'home' && <HomeView onNavigate={handleNavigate} />}
        
        {view.page === 'service' && currentService && (
          <ServiceNeighborhoodDetail 
            service={currentService} 
            onNavigate={handleNavigate} 
          />
        )}

        {view.page === 'neighborhood' && currentNeighborhood && (
          <ServiceNeighborhoodDetail 
            service={SERVICES[23]} // Default "Door Repair" for neighborhood pages
            neighborhood={currentNeighborhood}
            onNavigate={handleNavigate} 
          />
        )}

        {view.page === 'service-neighborhood' && currentService && currentNeighborhood && (
          <ServiceNeighborhoodDetail 
            service={currentService} 
            neighborhood={currentNeighborhood}
            onNavigate={handleNavigate} 
          />
        )}

        {view.page === 'contact' && <ContactView onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
      
      {/* Sticky Call Button for Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <a 
          href="tel:6476990540" 
          className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center animate-bounce"
        >
          <Phone className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
};

export default App;
