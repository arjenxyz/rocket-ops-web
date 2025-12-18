'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Rocket, ShieldCheck, Zap, Cpu, ArrowRight, Filter, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';

// --- DATA: PARTNER VERİTABANI ---
const PARTNERS_DB: Partner[] = [
  { id: 1, name: "ASELSAN", tier: "PLATINUM", category: "MAIN", color: "blue", icon: <Cpu />, desc: "Aviyonik & Haberleşme" },
  { id: 2, name: "ROKETSAN", tier: "PLATINUM", category: "MAIN", color: "red", icon: <Rocket />, desc: "İtki & Kompozit Gövde" },
  { id: 3, name: "TUSAŞ", tier: "GOLD", category: "TECH", color: "cyan", icon: null, desc: "Yapısal Analiz" },
  { id: 4, name: "HAVELSAN", tier: "GOLD", category: "TECH", color: "blue", icon: null, desc: "Simülasyon Yazılımları" },
  { id: 5, name: "BAYKAR", tier: "GOLD", category: "TECH", color: "orange", icon: null, desc: "Otonom Sistemler" },
  { id: 6, name: "TÜBİTAK SAGE", tier: "GOLD", category: "TECH", color: "red", icon: null, desc: "Ar-Ge ve Test" },
  { id: 7, name: "TEI", tier: "SILVER", category: "SUPPORT", color: "slate", icon: null, desc: "Motor Parçaları" },
  { id: 8, name: "STM", tier: "SILVER", category: "SUPPORT", color: "slate", icon: null, desc: "Siber Güvenlik" },
];

export default function PartnersPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll Takibi
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtreleme Mantığı
  const filteredPartners = activeFilter === 'ALL' 
    ? PARTNERS_DB 
    : PARTNERS_DB.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#030305] text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      
      {/* --- NAVBAR (GELİŞMİŞ: Scroll Duyarlı) --- */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b
          ${isScrolled 
            ? 'bg-[#030305]/80 backdrop-blur-xl border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Sol: Geri Dön Butonu */}
          <Link href="/" className="group relative overflow-hidden flex items-center gap-3 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
             <ArrowLeft size={18} className="text-slate-400 group-hover:-translate-x-1 group-hover:text-white transition-all duration-300"/>
             <div className="flex flex-col leading-none">
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-400 uppercase tracking-widest transition-colors"></span>
                <span className="text-sm font-bold text-white">GERİ DÖN</span>
             </div>
          </Link>

          {/* Sağ: Logo ve Durum */}
          <div className="flex items-center gap-4">
            
            {/* Durum Göstergesi */}
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 transition-all duration-500 ${isScrolled ? 'bg-black/40' : 'bg-white/5'}`}>
               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
               <span className="text-[10px] font-mono text-slate-400 tracking-widest">NETWORK: ACTIVE</span>
            </div>

            {/* Logo */}
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-900 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
               <div className="relative flex items-center gap-3 px-5 py-2 bg-[#0a0a0c] rounded-full border border-white/10 hover:border-blue-500/50 transition-colors">
                  <Rocket size={18} className="text-blue-500 transform -rotate-45" />
                  <span className="font-bold text-sm tracking-[0.2em] text-slate-200">
                    ROCKET<span className="text-blue-500">OPS</span>
                  </span>
               </div>
            </div>

          </div>
        </div>
      </nav>

      {/* --- ANA İÇERİK --- */}
      <main className="pt-32 pb-20 px-6 relative min-h-screen flex flex-col items-center">
         
         {/* RADAR TARAMA EFEKTİ */}
         <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            <div className="absolute w-[150vw] h-[150vw] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_340deg,rgba(59,130,246,0.05)_360deg)] animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>
         </div>
         
         <div className="w-full max-w-7xl relative z-10">
            
            {/* BAŞLIK VE İSTATİSTİKLER */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-white/10 pb-8">
                <div>
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 mb-4"
                    >
                        <div className="px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono font-bold tracking-widest flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                            ECOSYSTEM_V2.0
                        </div>
                    </motion.div>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tight"
                    >
                        STRATEJİK <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">İTTİFAK</span>
                    </motion.h1>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    className="flex gap-8 text-right"
                >
                    <div>
                        <div className="text-3xl font-bold text-white font-mono">{PARTNERS_DB.length}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest">Aktif Partner</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-white font-mono">3</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest">Kategori</div>
                    </div>
                </motion.div>
            </div>

            {/* --- FİLTRE PANELİ --- */}
            <div className="flex flex-wrap gap-2 mb-12">
                <FilterButton label="TÜM AĞ" active={activeFilter === 'ALL'} onClick={() => setActiveFilter('ALL')} icon={<Filter size={14}/>} />
                <FilterButton label="ANA YÜKLENİCİLER" active={activeFilter === 'MAIN'} onClick={() => setActiveFilter('MAIN')} icon={<ShieldCheck size={14}/>} />
                <FilterButton label="TEKNOLOJİ" active={activeFilter === 'TECH'} onClick={() => setActiveFilter('TECH')} icon={<Zap size={14}/>} />
                <FilterButton label="LOJİSTİK & DESTEK" active={activeFilter === 'SUPPORT'} onClick={() => setActiveFilter('SUPPORT')} icon={<Radio size={14}/>} />
            </div>

            {/* --- PARTNER GRID --- */}
            <motion.div 
                layout 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredPartners.map((partner) => (
                        <PartnerCard key={partner.id} data={partner} />
                    ))}
                    
                    <BecomePartnerCard />
                </AnimatePresence>
            </motion.div>

         </div>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-xs font-mono relative z-10 bg-[#030305]">
        © 2025 ROCKET OPS - SAVUNMA SANAYİİ AĞI
      </footer>
    </div>
  );
}

// --- YARDIMCI BİLEŞENLER ---

interface FilterButtonProps {
    label: string;
    active: boolean;
    onClick: () => void;
    icon: React.ReactNode;
}

function FilterButton({ label, active, onClick, icon }: FilterButtonProps) {
    return (
        <button 
            onClick={onClick}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg border transition-all duration-300 text-xs font-bold tracking-widest ${
                active 
                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105' 
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
        >
            {icon} {label}
        </button>
    )
}

interface Partner {
    id: number;
    name: string;
    tier: 'PLATINUM' | 'GOLD' | 'SILVER';
    category: 'MAIN' | 'TECH' | 'SUPPORT';
    color: 'blue' | 'red' | 'cyan' | 'orange' | 'slate';
    icon: React.ReactNode | null;
    desc: string;
}

function PartnerCard({ data }: { data: Partner }) {
    const isMain = data.category === 'MAIN';
    
    const colorStyles: Record<Partner['color'], string> = {
        blue: 'hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]',
        red: 'hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]',
        cyan: 'hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]',
        orange: 'hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]',
        slate: 'hover:border-slate-400/50 hover:shadow-[0_0_30px_rgba(148,163,184,0.1)]'
    };

    const textColor: Record<Partner['color'], string> = {
        blue: 'group-hover:text-blue-400',
        red: 'group-hover:text-red-400',
        cyan: 'group-hover:text-cyan-400',
        orange: 'group-hover:text-orange-400',
        slate: 'group-hover:text-slate-300'
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`group relative bg-[#0a0a0c] border border-white/10 overflow-hidden transition-all duration-500 ${isMain ? 'col-span-1 md:col-span-2 row-span-2 h-80' : 'col-span-1 h-60'} rounded-2xl ${colorStyles[data.color]}`}
        >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                {data.icon && (
                    <div className={`mb-4 p-3 rounded-full bg-white/5 border border-white/10 ${textColor[data.color]} transition-colors`}>
                        {data.icon}
                    </div>
                )}

                <h3 className={`font-black tracking-tight text-white transition-all duration-300 ${isMain ? 'text-4xl md:text-5xl' : 'text-2xl'}`}>
                    {data.name}
                </h3>

                <p className="mt-2 text-xs text-slate-500 font-mono max-w-xs opacity-60 group-hover:opacity-100 transition-opacity">
                    {data.desc}
                </p>

                <div className="absolute bottom-4 left-0 w-full px-6 flex justify-between text-[8px] font-mono text-slate-600 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <span>LAT: 12ms</span>
                    <span>SEC: ENCRYPTED</span>
                    <span>VER: 4.2</span>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-white/20 rounded-tl-lg"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-white/20 rounded-br-lg"></div>
        </motion.div>
    )
}

function BecomePartnerCard() {
    return (
        <motion.div
            layout
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="group relative h-60 bg-gradient-to-br from-blue-900/10 to-transparent border border-dashed border-blue-500/30 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-blue-900/20 transition-all duration-500"
        >
            <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-300">
                <ArrowRight className="text-blue-400 group-hover:text-white" />
            </div>
            <div className="text-center">
                <span className="block text-sm font-bold text-white tracking-widest uppercase">BURADA YER ALIN</span>
                <span className="text-[10px] text-blue-400 font-mono mt-1 block">sponsor@rocketops.com</span>
            </div>
            
            <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/30 transition-all duration-500 animate-pulse"></div>
        </motion.div>
    )
}