import React from "react";

interface LogoProps {
  className?: string; // Optional custom class for sizes, e.g. w-24 h-24
  textClassName?: string;
  showText?: boolean;
  theme?: "light" | "dark";
}

export default function Logo({ className = "w-16 h-16", showText = true, textClassName = "text-xl font-bold", theme = "light" }: LogoProps) {
  const isDark = theme === "dark";
  
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Visual Logo Ring using standard high-end SVG */}
      <div className={`relative ${className} shrink-0`}>
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full transition-transform duration-300 hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle imitating paint brush stroke */}
          <circle
            cx="100"
            cy="100"
            r="88"
            stroke="currentColor"
            strokeWidth="11"
            className={isDark ? "text-black" : "text-slate-900"}
          />
          
          <circle
            cx="100"
            cy="100"
            r="82"
            stroke="#FF00A8"
            strokeWidth="3"
            strokeDasharray="10 5"
            className="opacity-80"
          />

          {/* Upper semi-circle cap in solid Fuchsia */}
          <path
            d="M 33 80 A 72 72 0 0 1 167 80 Z"
            fill="#FF00A8"
          />

          {/* Inner Badge Background */}
          <circle
            cx="100"
            cy="103"
            r="60"
            fill="#FFFFFF"
          />

          {/* Central Bold Black "NN" letters */}
          <text
            x="100"
            y="126"
            fontFamily="'Inter', 'Arial Black', sans-serif"
            fontWeight="bold"
            fontSize="64"
            fill="#000000"
            textAnchor="middle"
            letterSpacing="-2"
          >
            NN
          </text>

          {/* Rotated "NANNU" stripe border & text on the Left */}
          <g transform="translate(18, 100) rotate(-90)">
            {/* Background pill */}
            <rect
              x="-45"
              y="-11"
              width="90"
              height="22"
              rx="4"
              fill="#000000"
            />
            {/* Text inside */}
            <text
              x="0"
              y="5"
              fontFamily="'Space Grotesk', sans-serif"
              fontWeight="900"
              fontSize="12"
              fill="#FF00A8"
              stroke="#000000"
              strokeWidth="0.5"
              textAnchor="middle"
              className="tracking-widest"
            >
              NANNU
            </text>
          </g>

          {/* Horizontal "DESING" at the base of the white circle */}
          <g transform="translate(100, 150)">
            <rect
              x="-40"
              y="-12"
              width="80"
              height="20"
              rx="3"
              fill="#000000"
            />
            <text
              x="0"
              y="3"
              fontFamily="'Space Grotesk', sans-serif"
              fontWeight="900"
              fontSize="11"
              fill="#FF00A8"
              textAnchor="middle"
              letterSpacing="1"
            >
              DESING
            </text>
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col select-none leading-none text-left">
          <span className={`${textClassName} tracking-tight font-black uppercase ${isDark ? "text-white" : "text-slate-900"}`}>
            Nannu <span className="text-[#FF00A8]">Desing</span>
          </span>
          <span className={`text-[10px] font-mono tracking-widest mt-1 ${isDark ? "text-gray-400" : "text-slate-500"}`}>
            IMPRENTA GRÁFICA PREMIUM
          </span>
        </div>
      )}
    </div>
  );
}
export type { LogoProps };
