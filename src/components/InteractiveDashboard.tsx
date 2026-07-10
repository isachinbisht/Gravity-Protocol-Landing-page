import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Play, RotateCcw, TrendingUp, Wallet, Globe, ArrowUpRight } from "lucide-react";

export default function InteractiveDashboard() {
  const [allocation, setAllocation] = useState(60);
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "yearly">("weekly");
  const [isAnimating, setIsAnimating] = useState(true);
  const [navValue, setNavValue] = useState(124);

  // Chart data based on selected tab and allocation value
  const getDataPoints = () => {
    const factor = allocation / 60;
    switch (activeTab) {
      case "weekly":
        return [
          { x: 50, y: 180 },
          { x: 120, y: 150 * factor },
          { x: 190, y: 160 * factor },
          { x: 260, y: 110 * factor },
          { x: 330, y: 130 * factor },
          { x: 400, y: 80 * factor },
          { x: 470, y: 95 * factor },
          { x: 540, y: 55 * factor },
          { x: 610, y: 65 * factor },
          { x: 680, y: 40 * factor },
        ];
      case "monthly":
        return [
          { x: 50, y: 160 },
          { x: 120, y: 170 * factor },
          { x: 190, y: 130 * factor },
          { x: 260, y: 140 * factor },
          { x: 330, y: 95 * factor },
          { x: 400, y: 110 * factor },
          { x: 470, y: 70 * factor },
          { x: 540, y: 85 * factor },
          { x: 610, y: 45 * factor },
          { x: 680, y: 50 * factor },
        ];
      case "yearly":
        return [
          { x: 50, y: 190 },
          { x: 120, y: 160 * factor },
          { x: 190, y: 140 * factor },
          { x: 260, y: 150 * factor },
          { x: 330, y: 110 * factor },
          { x: 400, y: 100 * factor },
          { x: 470, y: 80 * factor },
          { x: 540, y: 65 * factor },
          { x: 610, y: 55 * factor },
          { x: 680, y: 35 * factor },
        ];
    }
  };

  const points = getDataPoints();
  
  // Create path command
  const pathData = points.reduce((acc, point, i) => {
    return i === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`;
  }, "");

  // Create gradient fill path command (goes to the bottom of chart)
  const fillPathData = `${pathData} L 680 220 L 50 220 Z`;

  // Auto animation for NAV value
  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setNavValue((prev) => {
        const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
        const next = prev + change;
        return Math.max(80, Math.min(200, next));
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Interactive Controls Panel */}
      <div className="w-full max-w-4xl bg-white rounded-2xl p-6 border border-[#EAE8E2] shadow-sm mb-8 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex-1 w-full space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-brand-charcoal/85 flex items-center gap-2">
              <Wallet className="h-4 w-4 text-brand-green" />
              Simulate Fund Allocation
            </span>
            <span className="text-lg font-mono font-bold text-brand-green">{allocation}% XLM</span>
          </div>
          <input
            type="range"
            min="20"
            max="80"
            value={allocation}
            onChange={(e) => setAllocation(Number(e.target.value))}
            className="w-full h-2 bg-brand-sand/40 rounded-lg appearance-none cursor-pointer accent-brand-green focus:outline-hidden"
          />
          <p className="text-xs text-brand-charcoal/50">
            Drag to adjust XLM vs USDC weight and see how portfolio performance shifts over time.
          </p>
        </div>

        <div className="flex gap-2 bg-[#F9F8F3] p-1 rounded-full border border-[#EAE8E2]">
          {(["weekly", "monthly", "yearly"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-brand-green text-white shadow-xs"
                  : "text-brand-charcoal/60 hover:text-brand-charcoal"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className={`p-2.5 rounded-full border text-xs font-medium transition-all flex items-center gap-2 cursor-pointer ${
              isAnimating
                ? "bg-[#EAF5EA] text-brand-green border-[#CDE5CD]"
                : "bg-brand-sand/10 text-brand-charcoal/60 border-[#EAE8E2]"
            }`}
            title={isAnimating ? "Pause Live NAV Tracker" : "Start Live NAV Tracker"}
          >
            <span className={`h-2 w-2 rounded-full ${isAnimating ? "bg-emerald-500 animate-pulse" : "bg-neutral-400"}`}></span>
            {isAnimating ? "Live NAV Tracker" : "NAV Paused"}
          </button>
          
          <button
            onClick={() => {
              setAllocation(60);
              setActiveTab("weekly");
            }}
            className="p-2.5 rounded-full border border-[#EAE8E2] bg-white text-brand-charcoal/60 hover:text-brand-charcoal transition-all hover:bg-[#F9F8F3] cursor-pointer"
            title="Reset Dashboard State"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Hero Visual Area: Laptop over Soft Sage Block */}
      <div className="relative w-full max-w-5xl px-4 select-none">
        {/* Soft Sage Background Block matching design */}
        <div className="absolute inset-x-0 top-12 bottom-0 bg-[#A3B18A]/30 rounded-3xl -z-10 transform scale-y-105 scale-x-102 blur-xs"></div>
        <div className="absolute inset-x-0 top-12 bottom-0 bg-[#A3B18A]/50 rounded-3xl -z-10"></div>

        {/* Laptop Container */}
        <div className="pt-8 pb-12 px-6 sm:px-12 md:px-20">
          <div className="relative bg-zinc-900 rounded-2xl pt-5 px-5 pb-4 shadow-2xl border-4 border-zinc-800">
            {/* Webcam Indicator */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1.5 items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-zinc-700"></div>
              <div className="h-1 w-1 rounded-full bg-emerald-500/80"></div>
            </div>

            {/* Screen Content */}
            <div className="bg-[#121410] rounded-lg p-6 min-h-[380px] text-zinc-300 relative overflow-hidden font-sans border border-zinc-800/80">
              
              {/* Subtle Ambient Glow */}
              <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-brand-light-green/10 blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-brand-green/20 blur-3xl pointer-events-none"></div>

              {/* Top Row */}
              <div className="flex justify-between items-start border-b border-zinc-800/60 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase">Fund Status</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <motion.span 
                      key={allocation}
                      initial={{ scale: 0.9, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-4xl md:text-5xl font-light font-sans text-white tracking-tight"
                    >
                      ${(navValue * 1000).toLocaleString()}
                    </motion.span>
                    <span className="text-xs md:text-sm text-zinc-400 font-medium">Total Value Locked</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                    Network: Stellar
                  </span>
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full text-[10px] font-mono bg-brand-green/20 text-brand-light-green border border-brand-green/30">
                    Balanced
                  </span>
                </div>
              </div>

              {/* Layout of Inner Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Left Mini Stats */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-zinc-900/50 p-3.5 rounded-xl border border-zinc-800/40">
                    <span className="text-[10px] font-mono text-zinc-500 block">FUND NAV</span>
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="text-xl font-mono text-zinc-100 font-semibold">${navValue.toFixed(2)}</span>
                      <span className="text-[10px] text-emerald-400 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-0.5" /> +3.2%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <motion.div 
                        className="bg-brand-light-green h-full"
                        animate={{ width: `${Math.min(100, navValue / 2)}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="bg-zinc-900/50 p-3.5 rounded-xl border border-zinc-800/40">
                    <span className="text-[10px] font-mono text-zinc-500 block">SHARE PRICE</span>
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="text-xl font-mono text-zinc-100 font-semibold">
                        ${(navValue / 100).toFixed(4)}
                      </span>
                      <span className="text-[10px] text-zinc-400">Per Token</span>
                    </div>
                    <div className="flex gap-1 mt-2.5">
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i} 
                          className="flex-1 h-3 rounded-xs bg-zinc-800"
                          style={{
                            backgroundColor: i < 8 ? "var(--color-brand-light-green)" : "rgb(39, 39, 42)"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Interactive Chart Grid */}
                <div className="lg:col-span-3 bg-zinc-900/20 rounded-xl border border-zinc-800/40 p-4 relative flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                      <Globe className="h-3.5 w-3.5 text-brand-light-green" />
                      Portfolio Performance
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">Live NAV Feed</span>
                  </div>

                  {/* SVG Chart */}
                  <div className="relative h-44 w-full mt-2">
                    {/* SVG Grid Lines */}
                    <svg className="absolute inset-0 w-full h-full text-zinc-800/30" xmlns="http://www.w3.org/2000/svg">
                      <line x1="50" y1="40" x2="680" y2="40" stroke="currentColor" strokeDasharray="3 3" />
                      <line x1="50" y1="100" x2="680" y2="100" stroke="currentColor" strokeDasharray="3 3" />
                      <line x1="50" y1="160" x2="680" y2="160" stroke="currentColor" strokeDasharray="3 3" />
                      
                      {/* Vertical ticks */}
                      <line x1="120" y1="20" x2="120" y2="210" stroke="currentColor" strokeDasharray="4 4" />
                      <line x1="260" y1="20" x2="260" y2="210" stroke="currentColor" strokeDasharray="4 4" />
                      <line x1="400" y1="20" x2="400" y2="210" stroke="currentColor" strokeDasharray="4 4" />
                      <line x1="540" y1="20" x2="540" y2="210" stroke="currentColor" strokeDasharray="4 4" />
                    </svg>

                    {/* Chart Paths */}
                    <svg 
                      viewBox="0 0 720 220" 
                      className="w-full h-full overflow-visible"
                    >
                      <defs>
                        <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#A3B18A" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#A3B18A" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Area Fill */}
                      <motion.path
                        d={fillPathData}
                        fill="url(#chartGlow)"
                        animate={{ d: fillPathData }}
                        transition={{ type: "spring", damping: 15 }}
                      />

                      {/* Line Path */}
                      <motion.path
                        d={pathData}
                        fill="none"
                        stroke="#A3B18A"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{ d: pathData }}
                        transition={{ type: "spring", damping: 15 }}
                      />

                      {/* Live flashing point at the end */}
                      {points.length > 0 && (
                        <motion.circle
                          cx={points[points.length - 1].x}
                          cy={points[points.length - 1].y}
                          r="6"
                          fill="#A3B18A"
                          animate={{ r: [5, 9, 5] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      )}
                      {points.length > 0 && (
                        <circle
                          cx={points[points.length - 1].x}
                          cy={points[points.length - 1].y}
                          r="3"
                          fill="#ffffff"
                        />
                      )}

                      {/* Data dots on path */}
                      {points.map((point, index) => (
                        <g key={index}>
                          <motion.circle
                            cx={point.x}
                            cy={point.y}
                            r="4"
                            className="fill-zinc-950 stroke-brand-light-green stroke-2 cursor-pointer hover:r-6"
                            whileHover={{ r: 6 }}
                          />
                        </g>
                      ))}
                    </svg>
                  </div>

                  {/* Horizontal Labels */}
                  <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-2 px-6">
                    <span>XLM</span>
                    <span>USDC</span>
                    <span>AQUA</span>
                    <span>yXLM</span>
                    <span>BLEND</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Laptop Base Stand */}
          <div className="relative w-[104%] -left-[2%] h-4 bg-zinc-800 rounded-b-xl border-t border-zinc-700 shadow-xl flex justify-center">
            <div className="w-16 h-1 bg-zinc-950 rounded-b-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
