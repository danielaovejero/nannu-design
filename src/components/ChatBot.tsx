import React, { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  CornerDownLeft, 
  RefreshCcw,
  User,
  MessagesSquare 
} from "lucide-react";
import { FAQS_DATA, CLIENT_FALLBACK_ANSWER } from "../data/faqs";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

interface ChatBotProps {
  theme?: "light" | "dark";
}

export default function ChatBot({ theme = "light" }: ChatBotProps) {
  const isDark = theme === "dark";
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "¡Hola! Soy NN Bot, el asistente inteligente de Nannu Desing. 🎨✨\n\n¿En qué te puedo asesorar hoy? Podés consultarme sobre nuestros materiales, plazos de entrega, colocación profesional en Catamarca, condiciones de pago o formatos de diseño gráfico.",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Quick helper questions
  const SUGGESTION_CHIPS = [
    { label: "Materiales de Lonas 👀", query: "¿Qué tipo de lonas ofrecen y cuál es la diferencia?" },
    { label: "Letras Corpóreas 🏗️", query: "¿De qué materiales se pueden hacer las Letras Corpóreas?" },
    { label: "Vinilos y Ploteos 🚗", query: "¿Qué opciones de vinilos y rotulaciones tienen disponibles?" },
    { label: "Plazos de Entrega 📅", query: "¿Cuáles son los plazos y tiempos de entrega de los trabajos?" },
    { label: "Métodos de Pago 💳", query: "¿Cuáles son los métodos de pago aceptados y condiciones?" },
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Create chat history body for api endpoint
      const historyBody = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      // Call our secure backend API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyBody
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        const botMsg: Message = {
          id: `msg-${Date.now()}-${Math.random()}`,
          role: "assistant",
          text: data.response || CLIENT_FALLBACK_ANSWER,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("Server error, failing back to local FAQ matching");
      }

    } catch (err) {
      console.warn("API Chat failed, falling back to local FAQs matching in client...", err);
      
      // Client-side fallback: Match against local FAQs list using simple keyword matching
      const queryLower = textToSend.toLowerCase();
      let bestFAQMatch = null;
      let matchedWeight = 0;

      for (const faq of FAQS_DATA) {
        let weight = 0;
        for (const kw of faq.keywords) {
          if (queryLower.includes(kw)) {
            weight++;
          }
        }
        if (weight > matchedWeight) {
          matchedWeight = weight;
          bestFAQMatch = faq;
        }
      }

      // If weight matches nicely, use the FAQ, otherwise return the fallback
      const fallbackText = (bestFAQMatch && matchedWeight >= 1) 
        ? bestFAQMatch.answer 
        : CLIENT_FALLBACK_ANSWER;

      // Simulate network thinking latency
      await new Promise(resolve => setTimeout(resolve, 600));

      const botMsg: Message = {
        id: `msg-${Date.now()}-${Math.random()}`,
        role: "assistant",
        text: fallbackText,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Immersive Chat Panel Console */}
      {isOpen && (
        <div 
          className={`w-[90vw] sm:w-[380px] h-[500px] rounded-2xl flex flex-col overflow-hidden shadow-2xl relative pointer-events-auto mb-4 animate-scale-up border transition-all duration-300 ${
            isDark 
              ? "bg-[#0c0c0c] border-neutral-900 text-white" 
              : "bg-white border-slate-200 text-slate-800"
          }`}
          role="dialog"
          aria-label="Asistente de Inteligencia Artificial"
        >
          {/* Header */}
          <div className={`border-b p-4 flex items-center justify-between transition-colors duration-300 ${
            isDark ? "bg-[#121212] border-neutral-900" : "bg-slate-50 border-slate-200"
          }`}>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className={`w-9 h-9 border rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  isDark ? "bg-neutral-950 border-[#FF00A8]/30" : "bg-white border-[#FF00A8]/40"
                }`}>
                  <Sparkles className="w-5 h-5 text-[#FF00A8]" />
                </div>
                {/* Active green point indicator */}
                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border transition-colors duration-300 ${
                  isDark ? "border-[#121212]" : "border-white"
                }`} />
              </div>
              <div className="flex flex-col leading-tight pt-0.5">
                <span className={`text-sm font-bold flex items-center gap-1.5 transition-colors duration-300 ${
                  isDark ? "text-white" : "text-slate-800"
                }`}>
                  Asistente NN Bot
                </span>
                <span className={`text-[10px] font-mono transition-colors duration-300 ${
                  isDark ? "text-gray-500" : "text-slate-400"
                }`}>IA Soporte al cliente</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className={`p-1.5 rounded-lg border transition-all duration-300 cursor-pointer ${
                isDark 
                  ? "text-gray-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border-neutral-850" 
                  : "text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 border-slate-200"
              }`}
              aria-label="Cerrar chat"
              id="chatbot-close-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick FAQ Suggestion Chips Strip */}
          <div className={`px-3 py-2 border-b flex gap-2 items-center overflow-x-auto no-scrollbar scroll-smooth transition-colors duration-300 ${
            isDark ? "bg-neutral-950 border-neutral-900" : "bg-slate-100/50 border-slate-200"
          }`}>
            <div className="text-[9px] font-mono text-[#FF00A8] uppercase shrink-0 font-bold mr-1">Tópicos:</div>
            {SUGGESTION_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip.query)}
                className={`text-[10px] font-bold border px-2.5 py-1 rounded-full whitespace-nowrap transition-all duration-250 select-none cursor-pointer ${
                  isDark 
                    ? "bg-neutral-900 text-gray-400 border-neutral-850 hover:text-[#FF00A8] hover:border-[#FF00A8]/40 hover:bg-[#FF00A8]/5" 
                    : "bg-white text-slate-600 border-slate-200 hover:text-[#FF00A8] hover:border-[#FF00A8]/50 hover:bg-pink-50/50 hover:shadow-sm"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Chat Messages viewport */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 leading-relaxed transition-all duration-300 ${
            isDark 
              ? "bg-gradient-to-b from-[#0c0c0c] to-[#111]" 
              : "bg-gradient-to-b from-white to-slate-50/60"
          }`}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                  m.role === "user" 
                    ? (isDark ? "bg-neutral-900 border-neutral-850 text-gray-400" : "bg-slate-100 border-slate-200 text-slate-500")
                    : "bg-[#FF00A8]/10 border-[#FF00A8]/20 text-[#FF00A8]"
                }`}>
                  {m.role === "user" ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                </div>

                {/* Message body */}
                <div className={`rounded-xl p-3 text-xs flex flex-col gap-1 shadow-sm transition-all duration-300 ${
                  m.role === "user"
                    ? "bg-[#FF00A8] text-white rounded-tr-none"
                    : isDark 
                      ? "bg-neutral-900 border-neutral-850 text-gray-200 rounded-tl-none" 
                      : "bg-slate-100 border-slate-200/60 text-slate-700 rounded-tl-none"
                }`}>
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span className={`text-[8px] font-mono self-end ${
                    m.role === "user" ? "text-pink-100" : (isDark ? "text-gray-500" : "text-slate-400")
                  }`}>
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 max-w-[80%] mr-auto">
                <div className="w-7 h-7 rounded-lg bg-[#FF00A8]/10 border-[#FF00A8]/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF00A8] animate-spin" />
                </div>
                <div className={`border rounded-xl rounded-tl-none p-3.5 text-xs flex items-center gap-1.5 font-mono transition-colors duration-300 ${
                  isDark 
                    ? "bg-neutral-900 border-neutral-850 text-gray-400" 
                    : "bg-slate-100 border-slate-200 text-slate-500"
                }`}>
                  <span>Pensando</span>
                  <span className="w-1.5 h-1.5 bg-[#FF00A8] rounded-full animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 bg-[#FF00A8] rounded-full animate-bounce delay-200" />
                  <span className="w-1.5 h-1.5 bg-[#FF00A8] rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form write input */}
          <form 
            onSubmit={handleFormSubmit}
            className={`p-3 border-t flex gap-2 items-center transition-colors duration-300 ${
              isDark ? "bg-[#121212] border-neutral-900" : "bg-slate-50 border-slate-200"
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Escribí tu consulta técnica acá..."
              disabled={isLoading}
              className={`flex-1 text-xs rounded-xl py-3 px-4 border focus:outline-none focus:border-[#FF00A8] disabled:opacity-50 font-sans transition-all duration-300 ${
                isDark 
                  ? "bg-neutral-950 border-neutral-800 text-white focus:bg-black" 
                  : "bg-white border-slate-200 text-slate-800 focus:bg-white"
              }`}
              id="chatbot-input"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="bg-[#FF00A8] hover:bg-[#d6008c] text-white p-2.5 rounded-xl transition-all disabled:opacity-50 disabled:bg-neutral-800 disabled:text-gray-500 shrink-0 select-none cursor-pointer flex items-center justify-center shadow-[0_4px_10px_rgba(255,0,168,0.2)]"
              aria-label="Enviar mensaje"
              id="chatbot-send-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Widget Launcher Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto bg-[#FF00A8] hover:bg-[#d6008c] text-white w-14 h-14 rounded-full shadow-[0_4px_20px_rgba(255,0,168,0.4)] hover:shadow-[0_4px_25px_rgba(255,0,168,0.65)] hover:scale-105 active:scale-95 flex items-center justify-center transition-all duration-300 relative select-none cursor-pointer"
        aria-label="Toggle Asistente Inteligente"
        id="chatbot-trigger-btn"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 animate-pulse" />
            {/* Visual notification badge */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-white text-[9px] text-[#FF00A8] font-bold items-center justify-center">1</span>
            </span>
          </>
        )}
      </button>

    </div>
  );
}
export type { Message };
