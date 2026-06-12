import React, { useState } from "react";
import { PORTFOLIO_DATA } from "../data/mockData";
import { PortfolioItem } from "../types";
import { ChevronLeft, ChevronRight, X, Maximize2, Sparkles } from "lucide-react";

type PortfolioCategory = "Todos" | "Carteles" | "Lonas" | "Vehículos" | "Vinilos" | "Eventos" | "Papelería";

export default function Portfolio({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>("Todos");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const isDark = theme === "dark";

  // Filter items
  const filteredItems = PORTFOLIO_DATA.filter((item) => {
    if (selectedCategory === "Todos") return true;
    return item.category === selectedCategory;
  });

  const categories: PortfolioCategory[] = [
    "Todos",
    "Carteles",
    "Lonas",
    "Vehículos",
    "Vinilos",
    "Eventos",
    "Papelería"
  ];

  // Carousel actions in Lightbox
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => {
        if (prev === null) return null;
        return prev === 0 ? filteredItems.length - 1 : prev - 1;
      });
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => {
        if (prev === null) return null;
        return prev === filteredItems.length - 1 ? 0 : prev + 1;
      });
    }
  };

  const currentItem: PortfolioItem | null = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="w-full" id="portfolio-section">
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setLightboxIndex(null); // Reset lightbox to prevent overflow
            }}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 border ${
              selectedCategory === cat
                ? "bg-[#FF00A8] border-[#FF00A8] text-white shadow-[0_0_15px_rgba(255,0,168,0.6)]"
                : isDark
                  ? "bg-[#111111] border-white/10 text-gray-400 hover:text-white hover:border-white/25 hover:shadow-[0_0_10px_rgba(255,0,168,0.1)]"
                  : "bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 hover:border-slate-300 hover:shadow-sm"
            }`}
            id={`btn-filter-${cat.toLowerCase()}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(index)}
            className={`group relative cursor-pointer rounded-2xl overflow-hidden aspect-square flex flex-col justify-end transition-all duration-300 border ${
              isDark 
                ? "bg-black border-white/5 hover:border-[#FF00A8]/30 hover:shadow-[0_0_15px_rgba(255,0,168,0.15)]" 
                : "bg-white border-slate-200 hover:border-[#FF00A8]/50 hover:shadow-lg hover:shadow-slate-200/50"
            }`}
            id={`portfolio-item-${item.id}`}
          >
            {/* Image display */}
            <div className="absolute inset-0 z-0">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {/* Overlay with black and fuchsia tones */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 transition-opacity duration-300" />
            </div>

            {/* Glowing effect inside top right border */}
            <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md hover:bg-[#FF00A8] border border-white/5 w-9 h-9 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 scale-90 group-hover:scale-100">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>

            {/* Content Text overlay */}
            <div className="p-6 relative z-10 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF00A8] bg-[#FF00A8]/10 border border-[#FF00A8]/20 px-2 py-0.5 rounded-md inline-block">
                {item.category}
              </span>
              <h4 className="text-lg font-bold text-white mt-2 group-hover:text-white transition-colors duration-200 line-clamp-1">
                {item.title}
              </h4>
              <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className={`text-center py-12 rounded-2xl border ${isDark ? "bg-[#111111] border-white/5" : "bg-slate-50 border-slate-200"}`}>
          <p className={`${isDark ? "text-gray-400" : "text-slate-500"} text-sm`}>No se encontraron trabajos en esta categoría por el momento.</p>
        </div>
      )}

      {/* Lightbox / Immersive Carousel Overlay */}
      {currentItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close trigger */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-gray-400 hover:text-white bg-neutral-900/80 p-3 rounded-full border border-neutral-850 hover:bg-[#FF00A8] transition-all duration-300 z-50"
            aria-label="Cerrar modal"
            id="lightbox-close-btn"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-6 text-white bg-neutral-900/80 hover:bg-[#FF00A8] p-3 sm:p-4 rounded-full border border-neutral-850 transition-all duration-300 z-50"
            aria-label="Anterior"
            id="lightbox-prev-btn"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right button */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-6 text-white bg-neutral-900/80 hover:bg-[#FF00A8] p-3 sm:p-4 rounded-full border border-neutral-850 transition-all duration-300 z-50"
            aria-label="Siguiente"
            id="lightbox-next-btn"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Immersive Image & Info container */}
          <div
            className={`relative max-w-4xl w-full flex flex-col md:flex-row border rounded-2xl overflow-hidden shadow-2xl scale-95 animate-fade-in ${
              isDark ? "bg-black border-white/10" : "bg-white border-slate-200"
            }`}
            onClick={(e) => e.stopPropagation()} // Stop propagation to not close the modal
          >
            {/* Heavy image container */}
            <div className="w-full md:w-3/5 aspect-auto max-h-[70vh] md:max-h-[80vh] flex items-center justify-center bg-black overflow-hidden select-none">
              <img
                src={currentItem.imageUrl}
                alt={currentItem.title}
                className="w-full h-full object-contain max-h-[50vh] md:max-h-[80vh]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Technical product details section */}
            <div className={`w-full md:w-2/5 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l ${
              isDark ? "bg-[#111111] border-white/10 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#FF00A8] bg-[#FF00A8]/10 border border-[#FF00A8]/20 px-2.5 py-1 rounded-md">
                    {currentItem.category}
                  </span>
                  <span className={`text-xs font-mono ${isDark ? "text-neutral-500" : "text-slate-400"}`}>
                    {lightboxIndex + 1} de {filteredItems.length}
                  </span>
                </div>

                <h3 className={`text-xl sm:text-2xl font-black tracking-tight mb-3 ${isDark ? "text-white" : "text-slate-800"}`}>
                  {currentItem.title}
                </h3>

                <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                  {currentItem.description}
                </p>

                {/* Additional simulated technical context as dynamic bullet lists */}
                <div className={`space-y-3 pt-4 border-t ${isDark ? "border-white/10" : "border-slate-200"}`}>
                  <div className={`flex items-center gap-2 text-xs ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                    <Sparkles className="w-3.5 h-3.5 text-[#FF00A8]" />
                    <span>Resolución: Impresión Fotográfica 1440 lpi</span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                    <Sparkles className="w-3.5 h-3.5 text-[#FF00A8]" />
                    <span>Sustratos: Importados con filtro UV</span>
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${isDark ? "text-gray-400" : "text-slate-600"}`}>
                    <Sparkles className="w-3.5 h-3.5 text-[#FF00A8]" />
                    <span>Resistencia: Altamente apto exterior</span>
                  </div>
                </div>
              </div>

              {/* Solicitud Quick Direct call to action */}
              <div className={`mt-8 pt-4 border-t ${isDark ? "border-white/5" : "border-slate-200"}`}>
                <a
                  href={`https://wa.me/5493834033343?text=Hola!%20Me%20interesa%20un%20trabajo%20similar%20al%20de%20Su%20Galeria:%20"${encodeURIComponent(currentItem.title)}"%20(${(currentItem.category)})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center text-center bg-[#FF00A8] hover:bg-[#d6008c] text-white py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(255,0,168,0.3)] hover:shadow-[0_0_20px_rgba(255,0,168,0.8)]"
                  id={`btn-lightbox-quote-${currentItem.id}`}
                >
                  Consultar por este trabajo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export type { PortfolioCategory };
