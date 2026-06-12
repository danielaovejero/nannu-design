import React, { useState } from "react";
import { ServiceItem } from "../types";
import { 
  Maximize2, 
  Layers, 
  Hammer, 
  Compass, 
  Activity, 
  Gift, 
  Printer, 
  ChevronRight,
  Info 
} from "lucide-react";

// Icon mapping helper
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Maximize2: Maximize2,
  Layers: Layers,
  Hammer: Hammer,
  Compass: Compass,
  Activity: Activity,
  Gift: Gift,
  Printer: Printer,
};

interface ColorPillConfig {
  hoverBorder: string;
  badgeBg: string;
  text: string;
  bullet: string;
  accentIcon: string;
  gradient: string;
}

const COLOR_PILL_MAP: Record<string, ColorPillConfig> = {
  fuchsia: {
    hoverBorder: "hover:border-[#FF00A8]/50 hover:shadow-[0_0_20px_rgba(255,0,168,0.25)]",
    badgeBg: "bg-[#FF00A8]/10 border-[#FF00A8]/20 text-[#FF00A8]",
    text: "text-[#FF00A8]",
    bullet: "bg-[#FF00A8]",
    accentIcon: "text-[#FF00A8]",
    gradient: "from-[#FF00A8] to-pink-500",
  },
  cyan: {
    hoverBorder: "hover:border-[#00F0FF]/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]",
    badgeBg: "bg-[#00F0FF]/10 border-[#00F0FF]/25 text-[#00E5F5]",
    text: "text-[#00E5F5]",
    bullet: "bg-[#00F0FF]",
    accentIcon: "text-[#00F0FF]",
    gradient: "from-[#00F0FF] to-blue-500",
  },
  violet: {
    hoverBorder: "hover:border-[#8B5CF6]/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]",
    badgeBg: "bg-[#8B5CF6]/10 border-[#8B5CF6]/25 text-[#9D71FD]",
    text: "text-[#9D71FD]",
    bullet: "bg-[#8B5CF6]",
    accentIcon: "text-[#8B5CF6]",
    gradient: "from-[#8B5CF6] to-indigo-500",
  },
  emerald: {
    hoverBorder: "hover:border-[#10B981]/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]",
    badgeBg: "bg-[#10B981]/10 border-[#10B981]/25 text-[#10B981]",
    text: "text-[#10B981]",
    bullet: "bg-[#10B981]",
    accentIcon: "text-[#10B981]",
    gradient: "from-[#10B981] to-teal-500",
  },
  amber: {
    hoverBorder: "hover:border-[#FBBF24]/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.25)]",
    badgeBg: "bg-[#FBBF24]/10 border-[#FBBF24]/25 text-[#F59E0B]",
    text: "text-[#F59E0B]",
    bullet: "bg-[#FBBF24]",
    accentIcon: "text-[#FBBF24]",
    gradient: "from-[#FBBF24] to-red-500",
  },
};

interface ServiceCardProps {
  key?: React.Key;
  service: ServiceItem;
  theme?: "light" | "dark";
}

export default function ServiceCard({ service, theme = "light" }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = iconMap[service.iconName] || Info;
  const isDark = theme === "dark";

  // Default fallback if colorName is missing
  const colorKey = service.colorName || "fuchsia";
  const styles = COLOR_PILL_MAP[colorKey] || COLOR_PILL_MAP.fuchsia;

  return (
    <div 
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 border ${
        isDark 
          ? `bg-[#111111] border-white/5 text-white ${styles.hoverBorder}` 
          : `bg-white border-slate-200 text-slate-900 shadow-md shadow-slate-100 hover:shadow-xl hover:shadow-slate-200/50 ${styles.hoverBorder}`
      }`}
      id={`service-card-${service.id}`}
    >
      {/* Dynamic colorful decorative glowing strip */}
      <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${styles.text}`} />

      {/* Hero Service Banner Image */}
      <div className="h-44 w-full relative overflow-hidden bg-neutral-900">
        <img 
          src={service.bannerUrl} 
          alt={service.title} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? "from-[#111111] via-transparent to-black/50" : "from-white via-transparent to-black/35"}`} />
        
        {/* Absolute floating category label with complementary color pill styling */}
        <div className={`absolute top-4 left-4 flex items-center gap-2 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 bg-black/80 shadow-md`}>
          <IconComponent className={`w-4 h-4 ${styles.accentIcon}`} />
          <span className="text-[10px] font-mono tracking-widest text-white uppercase font-bold">PREMIUM</span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-6">
        <h3 className={`text-xl font-bold transition-colors duration-300 group-hover:${styles.text} ${isDark ? "text-white" : "text-slate-800"}`}>
          {service.title}
        </h3>
        
        <p className={`text-sm mt-2 line-clamp-3 leading-relaxed ${isDark ? "text-gray-400" : "text-slate-500"}`}>
          {service.shortDescription}
        </p>

        {/* Detailed Items list */}
        <div className={`mt-4 space-y-2 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[350px] opacity-100" : "max-h-0 opacity-0"}`}>
          <div className={`pt-3 border-t ${isDark ? "border-white/10" : "border-slate-100"}`}>
            <h4 className={`text-xs font-mono uppercase tracking-wider mb-2 font-bold ${styles.text}`}>Especificaciones Técnicas:</h4>
            <ul className="space-y-2">
              {service.details.map((detail, idx) => (
                <li key={idx} className={`flex items-start gap-2 text-xs leading-relaxed ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${styles.bullet}`} />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Toggle details trigger btn */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`mt-6 w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 border ${
            isDark 
              ? "bg-black border-white/10 hover:border-white/20 text-gray-300 hover:text-white hover:bg-[#111111]" 
              : "bg-slate-50 border-slate-200/80 hover:border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
          }`}
          aria-expanded={isOpen}
          id={`btn-toggle-service-${service.id}`}
        >
          <span>{isOpen ? "Ocultar especificaciones" : "Ver especificaciones técnicas"}</span>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${styles.accentIcon} ${isOpen ? "rotate-90" : ""}`} />
        </button>
      </div>
    </div>
  );
}
