import React, { useState } from "react";
import Logo from "./components/Logo";
import ServiceCard from "./components/ServiceCard";
import Portfolio from "./components/Portfolio";
import Calculator from "./components/Calculator";
import ChatBot from "./components/ChatBot";

import { SERVICES_DATA, BENEFITS_DATA, TESTIMONIALS_DATA } from "./data/mockData";

import { 
  Phone, 
  Instagram, 
  Facebook, 
  Mail, 
  Clock, 
  MapPin, 
  Star, 
  Send,
  UserCheck,
  Palette,
  ShieldCheck,
  Wrench,
  Zap,
  FileSpreadsheet,
  ArrowRight,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
  Sun,
  Moon
} from "lucide-react";

// Icon mapping helper for benefits list
const benefitIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  UserCheck: UserCheck,
  Palette: Palette,
  ShieldCheck: ShieldCheck,
  Wrench: Wrench,
  Zap: Zap,
  FileSpreadsheet: FileSpreadsheet,
};

export default function App() {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nannu_theme");
      if (saved === "dark" || saved === "light") {
        return saved;
      }
    }
    return "light"; // Default theme is Light as per instructions
  });

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("nannu_theme", next);
      return next;
    });
  };

  // Quick scrolling helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  // Submit Contact Form to WhatsApp +54 9 3834033343
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !message) {
      alert("Por favor, ingrese un Nombre y un Mensaje.");
      return;
    }

    const compiledText = `Hola Nannu Desing! Dejo mi contacto desde el formulario web:\n\n👤 Nombre: ${name}\n📞 Teléfono: ${phone || "No provisto"}\n✉️ Email: ${email || "No provisto"}\n\n📝 Consulta:\n${message}`;
    const encoded = encodeURIComponent(compiledText);
    
    // Redirects to real WhatsApp API
    window.open(`https://wa.me/5493834033343?text=${encoded}`, "_blank");
  };

  return (
    <div className={`min-h-screen selection:bg-[#FF00A8] selection:text-white font-sans overflow-x-hidden transition-colors duration-300 ${
      isDark ? "bg-black text-white" : "bg-[#FCFCFC] text-slate-800"
    }`}>
      
      {/* 1. Header Navigation Bar */}
      <header className={`fixed top-0 left-0 w-full border-b z-40 transition-all duration-300 ${
        isDark ? "bg-black/90 border-white/10 text-white backdrop-blur-md" : "bg-white/95 border-slate-200 text-slate-800 shadow-sm backdrop-blur-md"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo brand */}
          <Logo className="w-11 h-11" showText={true} theme={theme} />

          {/* Nav Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-7">
            <button 
              onClick={() => scrollToSection("servicios")} 
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-250 cursor-pointer ${
                isDark ? "text-gray-300 hover:text-[#FF00A8]" : "text-slate-650 hover:text-[#FF00A8]"
              }`}
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection("galeria")} 
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-250 cursor-pointer ${
                isDark ? "text-gray-300 hover:text-[#FF00A8]" : "text-slate-650 hover:text-[#FF00A8]"
              }`}
            >
              Trabajos
            </button>
            <button 
              onClick={() => scrollToSection("beneficios")} 
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-250 cursor-pointer ${
                isDark ? "text-gray-300 hover:text-[#FF00A8]" : "text-slate-650 hover:text-[#FF00A8]"
              }`}
            >
              Nosotros
            </button>
            <button 
              onClick={() => scrollToSection("calculadora")} 
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-250 cursor-pointer ${
                isDark ? "text-gray-300 hover:text-[#FF00A8]" : "text-slate-650 hover:text-[#FF00A8]"
              }`}
            >
              Calculadora
            </button>
            <button 
              onClick={() => scrollToSection("testimonios")} 
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-250 cursor-pointer ${
                isDark ? "text-gray-300 hover:text-[#FF00A8]" : "text-slate-650 hover:text-[#FF00A8]"
              }`}
            >
              Opiniones
            </button>
            <button 
              onClick={() => scrollToSection("contacto")} 
              className={`text-xs font-bold uppercase tracking-widest transition-all duration-250 cursor-pointer ${
                isDark ? "text-gray-300 hover:text-[#FF00A8]" : "text-slate-650 hover:text-[#FF00A8]"
              }`}
            >
              Contacto
            </button>
          </nav>

          {/* Quick Contact CTA & Theme toggler */}
          <div className="flex items-center gap-3">
            {/* Elegant visual icon button for modes */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                isDark 
                  ? "bg-neutral-950 border-white/10 text-yellow-400 hover:border-[#FF00A8]/50 hover:bg-[#111111]" 
                  : "bg-slate-100 border-slate-200 text-slate-600 hover:border-[#FF00A8]/50 hover:bg-white hover:text-[#FF00A8] hover:shadow-sm"
              }`}
              title={isDark ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
              aria-label="Cambiar tema visual"
              id="theme-toggle-button"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a 
              href="https://wa.me/5493834033343" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(255,0,168,0.5)] text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full transition-all duration-300 ${
                isDark ? "bg-white text-black hover:bg-[#FF00A8] hover:text-white" : "bg-slate-900 text-white hover:bg-[#FF00A8]"
              }`}
              id="header-nav-whatsapp-btn"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>WhatsApp Directo</span>
            </a>
          </div>

        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-32 pb-20 sm:pb-28 lg:pt-44 lg:pb-36 flex items-center min-h-[90vh] overflow-hidden" id="hero-section">
        
        {/* Neon Fuchsia lighting flares in the backgrounds */}
        <div className={`absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-[#FF00A8] rounded-full filter blur-[120px] pointer-events-none transition-opacity duration-300 ${
          isDark ? "opacity-15" : "opacity-[0.07]"
        }`} />
        <div className={`absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-[#FF00A8] rounded-full filter blur-[150px] pointer-events-none transition-opacity duration-300 ${
          isDark ? "opacity-10" : "opacity-[0.05]"
        }`} />
        
        {/* Stylized mesh blueprint canvas lines overlay */}
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,168,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none transition-all duration-300 ${
          isDark ? "opacity-100" : "opacity-60"
        }`} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left intro text content */}
            <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
              
              <div className={`inline-flex items-center gap-2 self-start backdrop-blur-md px-4 py-1.5 rounded-full shadow-md border transition-all duration-300 ${
                isDark 
                  ? "bg-neutral-900/80 border-[#FF00A8]/20 text-[#FF00A8]" 
                  : "bg-pink-50/70 border-[#FF00A8]/30 text-[#d6008c]"
              }`}>
                <Sparkles className="w-4 h-4 animate-spin text-[#FF00A8]" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase">
                  Impresiones de Alta Gama • Catamarca
                </span>
              </div>

              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black leading-none tracking-tight transition-colors duration-300 ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
                Impulsamos tu marca <br className="hidden sm:inline" />
                con <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00A8] via-pink-500 to-amber-500 font-extrabold">soluciones gráficas</span> <br />
                profesionales
              </h1>

              <p className={`text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-slate-600 font-medium"
              }`}>
                Lonas de alta definición, letras corpóreas deslumbrantes, marquesinas robustas y ploteos vehiculares precisos. Ponemos pasión en cada detalle para consolidar la identidad visual de tu negocio.
              </p>

              {/* Action buttons CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => scrollToSection("calculadora")}
                  className="bg-[#FF00A8] hover:bg-[#d6008c] text-white py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_4px_25px_rgba(255,0,168,0.35)] hover:shadow-[0_0_20px_rgba(255,0,168,0.8)] cursor-pointer flex items-center justify-center gap-2"
                  id="hero-estimation-cta"
                >
                  <span>Calcular Presupuesto</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <a
                  href="https://wa.me/5493834033343?text=Hola!%20Vengo%20de%20la%20página%20web%20y%20me%20gustaría%20realizar%20una%20consulta%20técnica%20sobre%20sus%20servicios."
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`border py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-2 ${
                    isDark 
                      ? "bg-[#111111] border-[#FF00A8] text-[#FF00A8] hover:bg-black hover:text-white hover:shadow-[0_0_20px_rgba(255,0,168,0.4)]" 
                      : "bg-white border-slate-300 text-slate-700 hover:border-[#FF00A8]/80 hover:text-[#d6008c] hover:shadow-md"
                  }`}
                  id="hero-whatsapp-cta"
                >
                  <Phone className="w-4 h-4 text-[#FF00A8]" />
                  <span>Consultar por WhatsApp</span>
                </a>
              </div>

              {/* Quality indicators stats */}
              <div className={`grid grid-cols-3 gap-6 pt-10 border-t max-w-md transition-all duration-300 ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}>
                <div>
                  <div className={`text-xl sm:text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>100%</div>
                  <div className="text-[10px] text-gray-500 font-mono tracking-widest mt-1 uppercase">A Medida</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#FF00A8]">PRO</div>
                  <div className="text-[10px] text-gray-500 font-mono tracking-widest mt-1 uppercase">Colocación</div>
                </div>
                <div>
                  <div className={`text-xl sm:text-2xl font-black ${isDark ? "text-white" : "text-slate-900"}`}>Sin Cargo</div>
                  <div className="text-[10px] text-gray-500 font-mono tracking-widest mt-1 uppercase">Cotizaciones</div>
                </div>
              </div>

            </div>

            {/* Right mock logo display graphic */}
            <div className="lg:col-span-5 flex justify-center items-center relative select-none">
              
              {/* Spinning background neon radial orbit ring */}
              <div className={`absolute w-[360px] h-[360px] border border-dashed rounded-full animate-[spin_40s_linear_infinite] ${
                isDark ? "border-[#FF00A8]/20" : "border-[#FF00A8]/30"
              }`} />
              <div className="absolute h-[250px] w-[250px] bg-gradient-to-r from-pink-500 to-[#FF00A8] rounded-full filter blur-[120px] opacity-10" />

              <div className={`relative p-10 rounded-full border shadow-2xl flex items-center justify-center transition-all duration-300 ${
                isDark 
                  ? "bg-[#111111] border-white/10 shadow-[0_0_25px_rgba(255,0,168,0.15)]" 
                  : "bg-white border-slate-200 shadow-xl shadow-slate-100"
              }`}>
                <Logo className="w-44 h-44 sm:w-56 sm:h-56" showText={false} theme={theme} />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. Servicios Section */}
      <section className={`py-20 border-t transition-all duration-300 ${
        isDark ? "bg-gradient-to-b from-black to-[#050505] border-white/5" : "bg-gradient-to-b from-[#FCFCFC] to-slate-50 border-slate-200"
      }`} id="servicios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section banner outline */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF00A8] bg-[#FF00A8]/10 border border-[#FF00A8]/25 px-3.5 py-1.5 rounded-full inline-block animate-pulse">
              NUESTRAS SOLUCIONES
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-300 ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              Servicios Gráficos Profesionales
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-slate-650"
            }`}>
              Equipamiento tecnológico de vanguardia y mano de obra calificada para brindar rotulaciones, corpóreos y gigantografías espectaculares que causen un fuerte impacto visual.
            </p>
          </div>

          {/* Cards dynamic bento grid list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service) => (
              <ServiceCard key={service.id} service={service} theme={theme} />
            ))}
          </div>

        </div>
      </section>

      {/* 4. Galería de Trabajos Section */}
      <section className={`py-20 border-t transition-all duration-300 ${
        isDark ? "bg-black border-white/5" : "bg-white border-slate-200"
      }`} id="galeria">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF00A8] bg-[#FF00A8]/10 border border-[#FF00A8]/20 px-3.5 py-1.5 rounded-full inline-block">
              IMÁGENES REALES DE NUESTRA PRODUCCIÓN
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-300 ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              Galería de Trabajos Realizados
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-slate-650"
            }`}>
              Explorá nuestro catálogo de obras entregadas bajo estrictas pautas de calidad. Podés filtrar por tu categoría de interés y hacer zoom en cada proyecto.
            </p>
          </div>

          {/* Filterable gallery with Integrated Lightbox + Carousel */}
          <Portfolio theme={theme} />

        </div>
      </section>

      {/* 5. ¿Por qué elegirnos? Section */}
      <section className={`py-20 border-t transition-colors duration-300 ${
        isDark ? "bg-gradient-to-b from-black to-[#050505] border-white/5" : "bg-gradient-to-b from-white to-slate-50/50 border-slate-200"
      }`} id="beneficios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF00A8] bg-[#FF00A8]/10 border border-[#FF00A8]/20 px-3.5 py-1.5 rounded-full inline-block">
              VALOR COMPROMETIDO
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-300 ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              ¿Por qué elegir Nannu Desing?
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-slate-600"
            }`}>
              Trabajamos todos los días con el objetivo de elevar el estándar publicitario en la región, ofreciendo ventajas competitivas insuperables.
            </p>
          </div>

          {/* Benefits Grid list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFITS_DATA.map((benefit) => {
              const IconComp = benefitIconMap[benefit.iconName] || Info;
              return (
                <div 
                  key={benefit.id} 
                  className={`border hover:border-[#FF00A8]/50 hover:shadow-[0_0_15px_rgba(255,0,168,0.25)] p-8 rounded-2xl transition-all duration-300 flex flex-col items-start gap-4 ${
                    isDark 
                      ? "bg-[#111111] border-white/5" 
                      : "bg-white border-slate-200 shadow-md shadow-slate-100 hover:shadow-slate-200/50"
                  }`}
                  id={`benefit-item-${benefit.id}`}
                >
                  <div className="bg-[#FF00A8]/10 border border-[#FF00A8]/20 p-3.5 rounded-xl text-[#FF00A8]">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className={`text-lg font-bold mt-1 transition-colors duration-300 ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}>
                    {benefit.title}
                  </h3>
                  <p className={`text-xs leading-relaxed transition-colors duration-300 ${
                    isDark ? "text-gray-400" : "text-slate-500 font-medium"
                  }`}>
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Calculadora de Presupuesto Section */}
      <section className={`py-20 border-t transition-colors duration-300 ${
        isDark ? "bg-black border-white/5" : "bg-slate-50 border-slate-200"
      }`} id="calculadora">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF00A8] bg-[#FF00A8]/10 border border-[#FF00A8]/25 px-3.5 py-1.5 rounded-full inline-block">
              TRANSPARENCIA TOTAL
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-300 ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              Presupuestos Estimativos Interactivos
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-slate-600"
            }`}>
              ¿Querés conocer un aproximado antes de arrancar? Indicá el material, medidas deseadas y volumen de producción. Tu estimación se calcula en pesos argentinos en tiempo real.
            </p>
          </div>

          <Calculator theme={theme} />

        </div>
      </section>

      {/* 7. Testimonios Section */}
      <section className={`py-20 border-t transition-colors duration-300 ${
        isDark ? "bg-gradient-to-b from-black to-[#050505] border-white/5" : "bg-gradient-to-b from-white to-slate-100/70 border-slate-200"
      }`} id="testimonios">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF00A8] bg-[#FF00A8]/10 border border-[#FF00A8]/25 px-3.5 py-1.5 rounded-full inline-block">
              VALORACIONES DE NUESTROS CLIENTES
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-300 ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              Opiniones de Marcas de Confianza
            </h2>
          </div>

          {/* Testimonial slider / carousel controller layout */}
          <div className={`border rounded-3xl p-6 sm:p-10 shadow-2xl relative select-none hover:border-[#FF00A8]/20 transition-all duration-300 ${
            isDark 
              ? "bg-[#111111] border-white/5" 
              : "bg-white border-slate-200 shadow-xl shadow-slate-100 hover:border-[#FF00A8]/40"
          }`}>
            
            {/* Background quote design mark inside corner */}
            <span className={`absolute top-4 left-6 text-9xl font-mono leading-none h-0 opacity-20 pointer-events-none select-none ${
              isDark ? "text-neutral-800" : "text-slate-100"
            }`}>“</span>

            <div className="relative z-10 flex flex-col space-y-6 pt-4">
              
              {/* Stars rating indicator */}
              <div className="flex gap-1.5">
                {Array.from({ length: TESTIMONIALS_DATA[activeTestimonialIdx].rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-amber-500 fill-amber-500" />
                ))}
              </div>

              {/* Review Text */}
              <p className={`text-sm sm:text-base italic leading-relaxed transition-colors duration-300 ${
                isDark ? "text-gray-200" : "text-slate-705"
              }`}>
                "{TESTIMONIALS_DATA[activeTestimonialIdx].text}"
              </p>

              {/* Reviewer Details */}
              <div className={`flex justify-between items-center pt-6 border-t ${
                isDark ? "border-neutral-900" : "border-slate-105"
              }`}>
                <div>
                  <h4 className={`font-bold text-sm sm:text-base transition-colors duration-300 ${
                    isDark ? "text-white" : "text-slate-800"
                  }`}>
                    {TESTIMONIALS_DATA[activeTestimonialIdx].name}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-mono tracking-widest mt-1 uppercase">
                    {TESTIMONIALS_DATA[activeTestimonialIdx].role} • <span className="text-[#FF00A8] font-bold">{TESTIMONIALS_DATA[activeTestimonialIdx].company}</span>
                  </p>
                </div>

                {/* Hand control navigation triggers */}
                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    className={`w-10 h-10 rounded-full border font-bold transition-all flex items-center justify-center cursor-pointer ${
                      isDark 
                        ? "bg-neutral-900 border-neutral-850 hover:border-neutral-700 hover:bg-[#FF00A8] text-gray-400 hover:text-white" 
                        : "bg-slate-100 border-slate-200 hover:border-[#FF00A8]/50 hover:bg-[#FF00A8] text-slate-600 hover:text-white hover:shadow-sm"
                    }`}
                    aria-label="Opinión anterior"
                    id="btn-prev-testimony"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className={`w-10 h-10 rounded-full border font-bold transition-all flex items-center justify-center cursor-pointer ${
                      isDark 
                        ? "bg-neutral-900 border-neutral-850 hover:border-neutral-700 hover:bg-[#FF00A8] text-gray-400 hover:text-white" 
                        : "bg-slate-100 border-slate-200 hover:border-[#FF00A8]/50 hover:bg-[#FF00A8] text-slate-600 hover:text-white hover:shadow-sm"
                    }`}
                    aria-label="Siguiente opinión"
                    id="btn-next-testimony"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 8. Redes Sociales Section */}
      <section className={`py-14 border-t transition-colors duration-300 ${
        isDark ? "bg-black border-white/5" : "bg-white border-slate-200"
      }`} id="redes">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className={`text-lg font-mono font-bold uppercase tracking-widest transition-colors duration-300 ${
            isDark ? "text-gray-400" : "text-slate-500"
          }`}>Síguenos en las Redes</h3>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href="https://wa.me/5493834033343"
              target="_blank"
              rel="noopener noreferrer"
              className={`border px-5 sm:px-6 py-3 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                isDark 
                  ? "bg-[#111111] hover:bg-[#25D366] text-white hover:text-white border-white/5" 
                  : "bg-slate-50 hover:bg-[#25D366] text-slate-700 hover:text-white border-slate-200 hover:border-transparent hover:shadow-sm"
              }`}
              id="social-btn-whatsapp"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`border px-5 sm:px-6 py-3 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                isDark 
                  ? "bg-[#111111] hover:bg-[#E1306C] text-white hover:text-white border-white/5" 
                  : "bg-slate-50 hover:bg-[#E1306C] text-slate-700 hover:text-white border-slate-200 hover:border-transparent hover:shadow-sm"
              }`}
              id="social-btn-instagram"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`border px-5 sm:px-6 py-3 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                isDark 
                  ? "bg-[#111111] hover:bg-[#1877F2] text-white hover:text-white border-white/5" 
                  : "bg-slate-50 hover:bg-[#1877F2] text-slate-700 hover:text-white border-slate-200 hover:border-transparent hover:shadow-sm"
              }`}
              id="social-btn-facebook"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </a>
            
            <a
              href="mailto:nannudesing@gmail.com"
              className={`border px-5 sm:px-6 py-3 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                isDark 
                  ? "bg-[#111111] hover:bg-[#FF00A8] text-white hover:text-white border-white/5" 
                  : "bg-slate-50 hover:bg-[#FF00A8] text-slate-700 hover:text-white border-slate-200 hover:border-transparent hover:shadow-sm"
              }`}
              id="social-btn-email"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. Contacto Section */}
      <section className={`py-20 border-t transition-colors duration-300 ${
        isDark ? "bg-black border-white/5" : "bg-slate-50 border-slate-200"
      }`} id="contacto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#FF00A8] bg-[#FF00A8]/10 border border-[#FF00A8]/25 px-3.5 py-1.5 rounded-full inline-block animate-pulse">
              CHARLEMOS DE TU PROYECTO
            </span>
            <h2 className={`text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-300 ${
              isDark ? "text-white" : "text-slate-900"
            }`}>
              Solicitud de Contacto Rápida
            </h2>
            <p className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
              isDark ? "text-gray-400" : "text-slate-600"
            }`}>
              Completá tus datos básicos a continuación. Al presionar "Enviar Mensaje", se abrirá una conversación en tu WhatsApp con toda tu consulta pre-llenada para coordinar inmediatamente.
            </p>
          </div>

          {/* Form input fields card */}
          <div className={`border rounded-3xl p-6 sm:p-10 shadow-2xl max-w-2xl mx-auto transition-all duration-300 ${
            isDark 
              ? "bg-[#111111] border-white/5" 
              : "bg-white border-slate-200 shadow-xl shadow-slate-100"
          }`}>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Nombre */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="contact-name" className={`text-xs font-mono uppercase tracking-wider ${
                    isDark ? "text-gray-400" : "text-slate-500 font-semibold"
                  }`}>Nombre Completo *</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    placeholder="Ej. Juan Pérez"
                    className={`w-full border text-sm rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#FF00A8] focus:border-[#FF00A8] transition-all duration-300 ${
                      isDark 
                        ? "bg-black border-white/10 text-white focus:bg-neutral-950" 
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white"
                    }`}
                  />
                </div>

                {/* Telefono */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="contact-phone" className={`text-xs font-mono uppercase tracking-wider ${
                    isDark ? "text-gray-400" : "text-slate-500 font-semibold"
                  }`}>Teléfono (WhatsApp)</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    placeholder="Ej. +54 9 3834..."
                    className={`w-full border text-sm rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#FF00A8] focus:border-[#FF00A8] transition-all duration-300 ${
                      isDark 
                        ? "bg-black border-white/10 text-white focus:bg-neutral-950" 
                        : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white"
                    }`}
                  />
                </div>

              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="contact-email" className={`text-xs font-mono uppercase tracking-wider ${
                  isDark ? "text-gray-400" : "text-slate-500 font-semibold"
                }`}>Correo Electrónico</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="Ej. juan@correo.com"
                  className={`w-full border text-sm rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#FF00A8] focus:border-[#FF00A8] transition-all duration-300 ${
                    isDark 
                      ? "bg-black border-white/10 text-white focus:bg-neutral-950" 
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white"
                  }`}
                />
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="contact-message" className={`text-xs font-mono uppercase tracking-wider ${
                  isDark ? "text-gray-400" : "text-slate-500 font-semibold"
                }`}>Contanos tu idea / Medidas / Materiales *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="¿Qué tenés en mente? Contanos las medidas estimadas, el lugar de colocación o los materiales elegidos para darte la cotización correcta de inmediato..."
                  className={`w-full border text-sm rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#FF00A8] focus:border-[#FF00A8] resize-none transition-all duration-300 ${
                    isDark 
                      ? "bg-black border-white/10 text-white focus:bg-neutral-950" 
                      : "bg-slate-50 border-slate-200 text-slate-800 focus:bg-white"
                  }`}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#FF00A8] hover:bg-[#d6008c] text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(255,0,168,0.3)] hover:shadow-[0_0_20px_rgba(255,0,168,0.8)] cursor-pointer"
                  id="btn-contact-submit"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar por WhatsApp</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* 10. Footer */}
      <footer className={`pt-16 pb-8 border-t transition-colors duration-300 ${
        isDark ? "bg-black border-neutral-900 text-gray-300" : "bg-slate-50 border-slate-200 text-slate-600"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className={`grid grid-cols-1 md:grid-cols-12 gap-10 xl:gap-16 pb-12 border-b transition-colors duration-300 ${
            isDark ? "border-neutral-900" : "border-slate-200"
          }`}>
            
            {/* Column 1: Logo & Brief */}
            <div className="md:col-span-5 space-y-4">
              <Logo className="w-12 h-12" showText={true} theme={theme} />
              <p className={`text-xs max-w-sm leading-relaxed mt-4 transition-colors duration-300 ${
                isDark ? "text-gray-500" : "text-slate-500"
              }`}>
                Estudio creativo e imprenta premium boutique con sede en Catamarca, Argentina. Diseñamos, fabricamos e instalamos letreros corpóreos, marquesinas y ploteos integrales de alto estándar visual.
              </p>
            </div>

            {/* Column 2: Hours */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#FF00A8] font-bold">Horarios de Atención</h4>
              <ul className={`space-y-3 text-xs mt-2 transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#FF00A8]" />
                  <div>
                    <p className={`font-semibold transition-colors duration-300 ${isDark ? "text-white" : "text-slate-800"}`}>Lunes a Viernes</p>
                    <p className={`text-[11px] transition-colors duration-300 ${isDark ? "text-gray-500" : "text-slate-400"}`}>9:00 a 13:00 hs y 17:00 a 21:00 hs</p>
                  </div>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#FF00A8]" />
                  <div>
                    <p className={`font-semibold transition-colors duration-300 ${isDark ? "text-white" : "text-slate-800"}`}>Sábados</p>
                    <p className={`text-[11px] transition-colors duration-300 ${isDark ? "text-gray-500" : "text-slate-400"}`}>9:00 a 13:00 hs</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 3: Contacts info & map */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#FF00A8] font-bold">Datos de Contacto</h4>
              <ul className={`space-y-3.5 text-xs mt-2 transition-colors duration-300 ${
                isDark ? "text-gray-400" : "text-slate-600"
              }`}>
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#FF00A8] mt-0.5 shrink-0" />
                  <span>
                    San Fernando del Valle de Catamarca,<br />
                    Catamarca, Argentina
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#FF00A8] shrink-0" />
                  <span>+54 9 3834033343</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#FF00A8] shrink-0" />
                  <span>nannudesing@gmail.com</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Map layout simulation */}
          <div className={`py-8 text-center text-xs flex flex-col items-center justify-between gap-4 md:flex-row transition-colors duration-300 ${
            isDark ? "text-gray-600" : "text-slate-500"
          }`}>
            <div>
              <p>© {new Date().getFullYear()} Imprenta Gráfica Nannu Desing. Reservados todos los derechos.</p>
              <p className={`text-[10px] mt-0.5 transition-colors duration-300 ${isDark ? "text-gray-600" : "text-slate-400"}`}>Catamarca, Argentina.</p>
            </div>
            <div className="flex gap-4 text-[11px]">
              <a href="#" className={`transition-colors duration-300 ${isDark ? "hover:text-white" : "hover:text-[#FF00A8]"}`}>Términos Comerciales</a>
              <span className={`transition-colors duration-300 ${isDark ? "text-neutral-800" : "text-slate-300"}`}>•</span>
              <a href="#" className={`transition-colors duration-300 ${isDark ? "hover:text-white" : "hover:text-[#FF00A8]"}`}>Asistencia Directa</a>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Chatbot Assistant Widget */}
      <ChatBot theme={theme} />

    </div>
  );
}
export type { };
