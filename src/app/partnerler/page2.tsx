'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Rocket, ArrowRight, ShieldCheck, Zap, Cpu } from 'lucide-react';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#030305] text-white selection:bg-blue-500/30 font-sans">
      
      {/* --- NAVBAR (Alt Sayfa Standardı) --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <Link href="/" className="group flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:border-white/20 transition-all">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-slate-400 group-hover:text-white"/>
             <span className="text-sm font-bold text-slate-400 group-hover:text-white">ANA ÜS&#39;SE DÖN</span>
          </Link>

          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <Rocket size={16} className="text-blue-500 transform -rotate-45" />
            <span className="font-bold text-sm tracking-[0.2em] text-slate-200">ROCKET<span className="text-blue-500">OPS</span></span>
          </div>
        </div>
      </nav>

      {/* --- ANA İÇERİK --- */}
      <main className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen">
         
         {/* Arkaplan Efektleri (Radar Teması) */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] pointer-events-none"></div>
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] pointer-events-none"></div>
         
         <div className="max-w-6xl mx-auto relative z-10">
            
            {/* BAŞLIK */}
            <div className="text-center mb-24 space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full bg-white/5 backdrop-blur-md"
                >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
                    <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">Ecosystem_V2.0</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-5xl md:text-7xl font-black text-white tracking-tight"
                >
                   STRATEJİK <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">İTTİFAK.</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed"
                >
                   Yüksek irtifa hedeflerimize ulaşmamızda bize güç veren, savunma sanayii ve teknoloji devleri.
                </motion.p>
            </div>

            {/* --- PLATINUM PARTNERS (Ana Yükleniciler) --- */}
            <div className="mb-24">
                <div className="flex items-center gap-4 mb-10">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-grow"></div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                        <ShieldCheck size={12} className="text-blue-500"/> ANA YÜKLENİCİLER
                    </span>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-grow"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PartnerCard 
                        size="large" name="ASELSAN" tier="PLATINUM" color="blue" 
                        icon={<Cpu size={40} className="text-blue-500/50 mb-4 group-hover:text-blue-400 transition-colors"/>}
                        desc="Aviyonik sistemler ve haberleşme teknolojileri konusunda donanım ve mentorluk desteği." 
                    />
                    <PartnerCard 
                        size="large" name="ROKETSAN" tier="PLATINUM" color="red" 
                        icon={<Rocket size={40} className="text-red-500/50 mb-4 group-hover:text-red-400 transition-colors"/>}
                        desc="Kompozit gövde üretimi ve itki sistemleri test altyapısı sağlayıcısı." 
                    />
                </div>
            </div>

            {/* --- GOLD PARTNERS (Teknoloji) --- */}
            <div className="mb-24">
                <div className="flex items-center gap-4 mb-10">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-grow"></div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2">
                        <Zap size={12} className="text-yellow-500"/> TEKNOLOJİ PARTNERLERİ
                    </span>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-grow"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <PartnerCard size="small" name="TUSAŞ" tier="GOLD" color="cyan" />
                    <PartnerCard size="small" name="HAVELSAN" tier="GOLD" color="blue" />
                    <PartnerCard size="small" name="BAYKAR" tier="GOLD" color="orange" />
                    <PartnerCard size="small" name="TÜBİTAK" tier="GOLD" color="red" />
                    
                    <PartnerCard size="small" name="TEI" tier="SILVER" color="slate" />
                    <PartnerCard size="small" name="STM" tier="SILVER" color="slate" />
                    
                    {/* SPONSOR OL KUTUSU */}
                    <div className="col-span-2 group relative overflow-hidden rounded-xl border border-dashed border-white/20 hover:border-blue-500/50 bg-white/[0.01] hover:bg-blue-500/[0.02] transition-all duration-300 cursor-pointer h-32 flex flex-col items-center justify-center gap-3">
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(59,130,246,0.01)_10px,rgba(59,130,246,0.01)_20px)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-300">
                           <ArrowRight size={18} className="text-slate-400 group-hover:text-white" />
                        </div>
                        <div className="text-center relative z-10">
                            <span className="block text-xs font-bold text-slate-500 group-hover:text-white tracking-widest uppercase transition-colors">BURADA YER ALIN</span>
                            <span className="text-[9px] text-slate-600 group-hover:text-blue-300 font-mono">sponsor@rocketops.com</span>
                        </div>
                    </div>
                </div>
            </div>

         </div>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-xs font-mono">
        © 2025 ROCKET OPS - PARTNER AĞI
      </footer>
    </div>
  );
}

// --- PARTNER KARTI BİLEŞENİ ---
type PartnerProps = {
    size: 'large' | 'small';
    name: string;
    tier: string;
    color: string;
    icon?: React.ReactNode;
    desc?: string;
};

function PartnerCard({ size, name, tier, color, icon, desc }: PartnerProps) {
  const colorStyles: Record<string, string> = {
    blue: 'group-hover:border-blue-500/30 text-blue-500',
    red: 'group-hover:border-red-500/30 text-red-500',
    cyan: 'group-hover:border-cyan-500/30 text-cyan-500',
    orange: 'group-hover:border-orange-500/30 text-orange-500',
    slate: 'group-hover:border-white/20 text-slate-400'
  };

  const isLarge = size === 'large';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative bg-[#0a0a0c] border border-white/5 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:bg-[#0f0f12] hover:shadow-2xl ${isLarge ? 'h-64 p-8' : 'h-32 p-4'} ${colorStyles[color]}`}
    >
       {/* Arkaplan Parlaması */}
       <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-white/10 to-transparent transition-opacity duration-500"></div>
       
       <div className={`relative z-10 flex flex-col items-center justify-center h-full text-center ${isLarge ? '' : ''}`}>
          
          {/* Varsa İkon (Sadece Large kartlarda gösteriyoruz) */}
          {isLarge && icon}

          <span className={`font-black tracking-tighter text-slate-700 group-hover:text-white transition-colors duration-300 ${isLarge ? 'text-4xl' : 'text-xl'}`}>
             {name}
          </span>
          
          {/* Açıklama (Sadece Large) */}
          {isLarge && desc && (
              <p className="mt-4 text-sm text-slate-500 font-light leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  {desc}
              </p>
          )}
          
          {/* Tier Badge */}
          <span className={`absolute bottom-4 text-[9px] font-mono tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100 transition-all duration-500 ${isLarge ? '' : 'group-hover:translate-y-0'}`}>
             {tier} PARTNER
          </span>
       </div>

       {/* Dekoratif Köşeler */}
       <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/10 group-hover:border-white/30 transition-colors"></div>
       <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/10 group-hover:border-white/30 transition-colors"></div>
    </motion.div>
  )
}