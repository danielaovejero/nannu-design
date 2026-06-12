import React, { useState, useEffect } from "react";
import { Calculator as CalcIcon, Percent, HelpCircle, ArrowRight, MessageSquare } from "lucide-react";

interface JobType {
  id: string;
  name: string;
  unitPrice: number; // Price per m2 or base pack
  byArea: boolean; // Calculates by width * height
  unitLabel: string;
}

const JOB_TYPES: JobType[] = [
  { id: "frontlight", name: "Impresión de Lona Frontlight", unitPrice: 18000, byArea: true, unitLabel: "m²" },
  { id: "backlight", name: "Impresión de Lona Backlight (Cajón)", unitPrice: 24000, byArea: true, unitLabel: "m²" },
  { id: "mesh", name: "Impresión de Lona Mesh (Microperforada)", unitPrice: 22000, byArea: true, unitLabel: "m²" },
  { id: "corporeas-polyfan", name: "Letras Corpóreas (Polyfan Pintado)", unitPrice: 48000, byArea: true, unitLabel: "m²" },
  { id: "corporeas-acrilico", name: "Letras Corpóreas (Acrílico Premium)", unitPrice: 95000, byArea: true, unitLabel: "m²" },
  { id: "vinilo-corte", name: "Vinilo de Corte Mono-Color", unitPrice: 16000, byArea: true, unitLabel: "m²" },
  { id: "vinilo-esmerilado", name: "Vinilo Esmerilado (Privacidad)", unitPrice: 21000, byArea: true, unitLabel: "m²" },
  { id: "vinilo-impreso", name: "Vinilo Impreso Mural Full HD", unitPrice: 19000, byArea: true, unitLabel: "m²" },
  { id: "folletos-pack", name: "Imprenta: Flyers Comerciales (x100u)", unitPrice: 15000, byArea: false, unitLabel: "Packs de 100" },
  { id: "tarjetas-pack", name: "Imprenta: Tarjetas Personales (x100u)", unitPrice: 12500, byArea: false, unitLabel: "Packs de 100" },
  { id: "menues-pack", name: "Imprenta: Menús Cafetería laminados (x10u)", unitPrice: 18500, byArea: false, unitLabel: "Packs de 10" },
];

export default function Calculator({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [selectedJobId, setSelectedJobId] = useState<string>("frontlight");
  const [width, setWidth] = useState<number>(1.5);
  const [height, setHeight] = useState<number>(1.0);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const isDark = theme === "dark";
  const selectedJob = JOB_TYPES.find((j) => j.id === selectedJobId) || JOB_TYPES[0];

  // Perform estimation formula inside a useEffect
  useEffect(() => {
    let price = 0;
    if (selectedJob.byArea) {
      const area = width * height;
      price = area * selectedJob.unitPrice * quantity;
    } else {
      price = selectedJob.unitPrice * quantity;
    }
    setTotalPrice(Math.round(price));
  }, [selectedJobId, width, height, quantity, selectedJob]);

  // Handle format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0
    }).format(val);
  };

  // Prefill WhatsApp text
  const handleRequestQuote = () => {
    let specText = "";
    if (selectedJob.byArea) {
      specText = `Trabajo: ${selectedJob.name}\nAncho: ${width.toFixed(2)}m\nAlto: ${height.toFixed(2)}m\nCantidad: ${quantity}\nEstimación orientativa: ${formatCurrency(totalPrice)}`;
    } else {
      specText = `Trabajo: ${selectedJob.name}\nCantidad: ${quantity} (${selectedJob.unitLabel})\nEstimación orientativa: ${formatCurrency(totalPrice)}`;
    }

    const fullMessage = `Hola Nannu Desing! Estuve calculando un presupuesto en su web:\n\n${specText}\n\nMe gustaría recibir el asesoramiento de un instalador para afinar mi presupuesto. ¡Muchas gracias!`;
    const encoded = encodeURIComponent(fullMessage);
    window.open(`https://wa.me/5493834033343?text=${encoded}`, "_blank");
  };

  return (
    <div 
      className={`border rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 ${
        isDark ? "bg-[#111111] border-white/5" : "bg-white border-slate-200/80"
      }`}
      id="calculator-card"
    >
      {/* Background neon fuchsia decorative circular fuzz */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#FF00A8] rounded-full filter blur-[120px] opacity-10 pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Input parameters panel */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF00A8]/10 border border-[#FF00A8]/20 p-2.5 rounded-xl">
              <CalcIcon className="w-5 h-5 text-[#FF00A8]" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>Configurá tu Estimación</h3>
              <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-slate-500"}`}>Obtené un aproximado al instante ingresando las medidas.</p>
            </div>
          </div>

          <div className={`pt-2 border-t space-y-5 ${isDark ? "border-white/10" : "border-slate-100"}`}>
            
            {/* Field: Tipo de trabajo */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="job-type-select" className="text-xs font-mono uppercase tracking-widest text-[#FF00A8] font-bold">Tipo de Trabajo</label>
              <div className="relative">
                <select
                  id="job-type-select"
                  value={selectedJobId}
                  onChange={(e) => {
                    setSelectedJobId(e.target.value);
                    // Reset sizing to reasonable defaults if switching
                    if (e.target.value.includes("pack")) {
                      setQuantity(1);
                    }
                  }}
                  className={`w-full text-sm rounded-xl py-3 px-4 focus:outline-none focus:border-[#FF00A8] focus:ring-1 focus:ring-[#FF00A8] cursor-pointer appearance-none transition-colors border ${
                    isDark 
                      ? "bg-black border-white/10 text-white hover:border-white/20" 
                      : "bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-350"
                  }`}
                >
                  {JOB_TYPES.map((job) => (
                    <option key={job.id} value={job.id} className={isDark ? "bg-neutral-950 text-white" : "bg-white text-slate-800"}>
                      {job.name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#FF00A8]">
                  ▼
                </div>
              </div>
            </div>

            {/* Field: Sizing (Only if relevant to Area) */}
            {selectedJob.byArea ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Width */}
                <div className={`flex flex-col gap-1.5 p-4 rounded-2xl border transition-all ${
                  isDark 
                    ? "bg-black border-white/10 hover:border-white/20" 
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                }`}>
                  <div className="flex justify-between items-center text-xs font-mono uppercase text-gray-400">
                    <label htmlFor="width-input" className={isDark ? "text-gray-400" : "text-slate-500"}>Ancho (m)</label>
                    <span className={`font-bold text-[13px] ${isDark ? "text-white" : "text-slate-800"}`}>{width.toFixed(2)} m</span>
                  </div>
                  <input
                    type="range"
                    id="width-input"
                    min="0.2"
                    max="15.0"
                    step="0.05"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value))}
                    className={`w-full h-1 mt-3 rounded-lg appearance-none cursor-pointer accent-[#FF00A8] ${
                      isDark ? "bg-neutral-900" : "bg-slate-200"
                    }`}
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                    <span>Min: 0.2m</span>
                    <span>Max: 15m</span>
                  </div>
                </div>

                {/* Height */}
                <div className={`flex flex-col gap-1.5 p-4 rounded-2xl border transition-all ${
                  isDark 
                    ? "bg-black border-white/10 hover:border-white/20" 
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
                }`}>
                  <div className="flex justify-between items-center text-xs font-mono uppercase font-semibold">
                    <label htmlFor="height-input" className={isDark ? "text-gray-400" : "text-slate-500"}>Alto (m)</label>
                    <span className={`font-bold text-[13px] ${isDark ? "text-white" : "text-slate-800"}`}>{height.toFixed(2)} m</span>
                  </div>
                  <input
                    type="range"
                    id="height-input"
                    min="0.2"
                    max="6.0"
                    step="0.05"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value))}
                    className={`w-full h-1 mt-3 rounded-lg appearance-none cursor-pointer accent-[#FF00A8] ${
                      isDark ? "bg-neutral-900" : "bg-slate-200"
                    }`}
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                    <span>Min: 0.2m</span>
                    <span>Max: 6m</span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Field: Cantidad */}
            <div className={`flex flex-col gap-1.5 p-4 rounded-2xl border transition-all ${
              isDark 
                ? "bg-black border-white/10 hover:border-white/20" 
                : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300"
            }`}>
              <div className="flex justify-between items-center text-xs font-mono uppercase text-gray-400">
                <label htmlFor="quantity-input" className={isDark ? "text-gray-400" : "text-slate-500"}>Cantidad</label>
                <span className="font-bold text-[#FF00A8] text-base">{quantity} {selectedJob.byArea ? "unidades" : "packs"}</span>
              </div>
              <input
                type="number"
                id="quantity-input"
                min="1"
                max="1000"
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setQuantity(isNaN(val) || val < 1 ? 1 : val);
                }}
                className={`w-full rounded-xl py-2 px-3 focus:outline-none focus:border-[#FF00A8] mt-2 font-mono text-sm border ${
                  isDark 
                    ? "bg-black border-white/10 text-white" 
                    : "bg-white border-slate-200 text-slate-800"
                }`}
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-[10px] text-gray-500 font-mono">Ajustar Unidades</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                    className={`w-8 h-8 rounded-lg font-bold border flex items-center justify-center hover:bg-[#FF00A8] hover:text-white hover:border-transparent transition-all cursor-pointer ${
                      isDark 
                        ? "bg-[#111111] text-white border-white/15" 
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    -
                  </button>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className={`w-8 h-8 rounded-lg font-bold border flex items-center justify-center hover:bg-[#FF00A8] hover:text-white hover:border-transparent transition-all cursor-pointer ${
                      isDark 
                        ? "bg-[#111111] text-white border-white/15" 
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Real-time result details display */}
        <div className={`border rounded-2xl p-6 sm:p-8 flex flex-col justify-between ${
          isDark ? "bg-black border-white/5" : "bg-slate-50 border-slate-100"
        }`}>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#FF00A8] bg-[#FF00A8]/10 border border-[#FF00A8]/20 px-2.5 py-1 rounded-md uppercase font-bold inline-block">
              PRESUPUESTO PRELIMINAR
            </span>
            
            <h4 className={`text-lg font-bold mt-4 ${isDark ? "text-white" : "text-slate-800"}`}>{selectedJob.name}</h4>
            
            {selectedJob.byArea && (
              <div className={`flex flex-wrap items-center gap-2 mt-2 font-mono text-xs ${isDark ? "text-gray-400" : "text-slate-500"}`}>
                <span>Superficie total:</span>
                <span className={`font-bold ${isDark ? "text-white" : "text-slate-700"}`}>{(width * height).toFixed(2)} m²</span>
                <span className="text-neutral-500">|</span>
                <span>Acumulada:</span>
                <span className={`font-bold ${isDark ? "text-white" : "text-slate-700"}`}>{(width * height * quantity).toFixed(2)} m²</span>
              </div>
            )}

            {/* Calculations lines list */}
            <div className={`mt-6 space-y-3 pt-4 border-t text-xs ${isDark ? "border-white/5" : "border-slate-200/60"}`}>
              <div className="flex justify-between items-center">
                <span className={isDark ? "text-gray-400" : "text-slate-550"}>Precio unitario base</span>
                <span className={`font-mono ${isDark ? "text-white" : "text-slate-700"}`}>{formatCurrency(selectedJob.unitPrice)} {selectedJob.byArea ? "/ m²" : "/ pack"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? "text-gray-400" : "text-slate-550"}>Multiplicador (Cantidad)</span>
                <span className={`font-mono ${isDark ? "text-white" : "text-slate-700"}`}>x {quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? "text-gray-400" : "text-slate-550"}>Asesoramiento técnico</span>
                <span className="text-[#FF00A8] font-bold">¡INCLUIDO SIN COSTO!</span>
              </div>
            </div>
          </div>

          <div className={`mt-8 pt-6 border-t space-y-4 ${isDark ? "border-[#FF00A8]/15" : "border-[#FF00A8]/20"}`}>
            <div className="flex justify-between items-baseline">
              <span className={`text-sm font-bold ${isDark ? "text-gray-200" : "text-slate-600"}`}>Total estimado</span>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-black text-[#FF00A8] tracking-tight">
                  {formatCurrency(totalPrice)}
                </div>
                <div className="text-[10px] text-[#FF00A8] font-mono mt-0.5 tracking-wide font-bold">
                  Pesos Argentinos
                </div>
              </div>
            </div>

            {/* MANDATORY WARNING LABEL */}
            <p className="text-xs text-amber-600/90 bg-amber-500/5 border border-amber-500/10 rounded-lg p-3 leading-relaxed">
              ⚠️ <span className="font-bold underline">Valor orientativo sujeto a revisión.</span> Las cotizaciones finales pueden variar según las complejidades técnicas de montaje, terminación de ojal, tipo de pintura o archivos provistos.
            </p>

            <button
              onClick={handleRequestQuote}
              className="w-full inline-flex items-center justify-center gap-2.5 bg-[#FF00A8] hover:bg-[#d6008c] text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(255,0,168,0.3)] hover:shadow-[0_0_20px_rgba(255,0,168,0.8)] cursor-pointer mt-2"
              id="btn-send-whatsapp-estimation"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Pedir cotización formal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
export type { JobType };
