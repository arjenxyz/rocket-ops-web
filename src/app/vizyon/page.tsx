'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, ArrowLeft, Telescope, Globe, Sparkles, GraduationCap, Mountain, Orbit } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function VisionPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll Takibi
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020203] text-white selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b
          ${isScrolled 
            ? 'bg-[#030305]/90 backdrop-blur-xl border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="group relative overflow-hidden flex items-center gap-3 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
             <ArrowLeft size={18} className="text-slate-400 group-hover:-translate-x-1 group-hover:text-white transition-all duration-300"/>
             <div className="flex flex-col leading-none">
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-indigo-400 uppercase tracking-widest transition-colors"></span>
                <span className="text-sm font-bold text-white">GERİ DÖN</span>
             </div>
          </Link>

          <div className="flex items-center gap-3 bg-[#0a0a0c] px-4 py-2 rounded-full border border-white/10 hover:border-indigo-500/30 transition-colors shadow-lg shadow-indigo-900/10">
            <div className="relative flex items-center justify-center">
                <Rocket size={16} className="text-indigo-500 transform -rotate-45 relative z-10" />
                <div className="absolute inset-0 bg-indigo-500/20 blur-md rounded-full animate-pulse"></div>
            </div>
            <span className="font-bold text-sm tracking-[0.2em] text-slate-200">ROCKET<span className="text-indigo-500">OPS</span></span>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 relative min-h-screen">
         {/* Arkaplan Efektleri (Uzay Teması) */}
         <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#020203,transparent_20%,#020203)] z-0 pointer-events-none"></div>
         <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
         {/* Mor/Indigo Nebula Efekti */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none"></div>

         <div className="max-w-6xl mx-auto px-6 relative z-10">
            
            {/* --- HERO: UZUN VADELİ HEDEF --- */}
            <div className="text-center mb-32 space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-300 text-[10px] font-mono tracking-widest uppercase mb-4"
                >
                    <Telescope size={12} /> PROJECT: HORIZON_2030
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                  className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight"
                >
                   SINIRLARIN <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-600">ÖTESİ.</span>
                </motion.h1>
                
                <motion.p 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                   className="text-slate-400 max-w-2xl mx-auto text-lg font-light leading-relaxed"
                >
                   Bugün bir atölyede kıvılcımını yaktığımız bu hareketin, yarın ülkemizin uzay programına güç veren bir 
                   <span className="text-white font-medium"> mühendislik ekolüne</span> dönüşmesini hedefliyoruz.
                </motion.p>
            </div>

            {/* --- 3 BÜYÜK HEDEF (THE BIG THREE) --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
                <VisionCard 
                    icon={<Mountain size={32} className="text-indigo-400"/>}
                    title="İRTİFA REKORLARI"
                    subtitle="HEDEF: 20.000+ FT"
                    desc="Sadece yarışma sınırlarında kalmayıp, hibrit motor teknolojileriyle yüksek irtifa sondaj roketleri geliştirmek."
                    delay={0.1}
                />
                <VisionCard 
                    icon={<Globe size={32} className="text-purple-400"/>}
                    title="GLOBAL ARENA"
                    subtitle="HEDEF: IREC (USA)"
                    desc="Dünyanın en prestijli roket yarışması IREC'te (Spaceport America Cup) ülkemizi ve üniversitemizi temsil etmek."
                    delay={0.2}
                />
                <VisionCard 
                    icon={<GraduationCap size={32} className="text-cyan-400"/>}
                    title="EKOL OLMAK"
                    subtitle="HEDEF: 100+ MÜHENDİS"
                    desc="Sektöre hazır, tecrübeli, 'yaparak öğrenmiş' mühendisler yetiştiren bir akademi gibi çalışmak."
                    delay={0.3}
                />
            </div>

            {/* --- GELECEK PROJEKSİYONU (GÖRSEL ALAN) --- */}
            <div className="relative border border-white/10 bg-[#0a0a0c] rounded-3xl p-8 md:p-16 overflow-hidden text-center mb-32">
                {/* Dekoratif Yörüngeler */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-spin-slow pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full animate-spin-reverse-slow pointer-events-none"></div>
                
                <div className="relative z-10 space-y-8">
                    <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto text-2xl font-bold shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                        <Orbit size={32} className="animate-spin-slow" />
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-black text-white">MİLLİ UZAY PROGRAMI</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Vizyonumuzun nihai noktası; Türkiye&#39;nin Ay Görevi ve Milli Uydu projelerinde aktif rol alacak, 
                        yerli alt sistemleri tasarlayacak yetkinliğe ulaşmaktır. Biz sadece roket yapmıyoruz, 
                        <span className="text-indigo-400 font-bold"> geleceği inşa ediyoruz.</span>
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 pt-8">
                        <Tag text="YERLİ İTKİ SİSTEMLERİ" />
                        <Tag text="OTONOM YER İSTASYONU" />
                        <Tag text="BİYOLOJİK GÖREV YÜKÜ" />
                        <Tag text="DERİN ÖĞRENME" />
                    </div>
                </div>
            </div>

            {/* --- MOTİVASYON (QUOTE) --- */}
            <div className="text-center max-w-4xl mx-auto mb-20">
                <Sparkles className="w-8 h-8 text-indigo-500 mx-auto mb-6" />
                <blockquote className="text-2xl md:text-3xl font-light text-white italic leading-relaxed">
                    &quot;Hayal gücü, bilgiden daha önemlidir. Çünkü bilgi sınırlıdır, hayal gücü ise tüm dünyayı kapsar.&quot;
                </blockquote>
                <div className="mt-6 text-sm font-bold text-slate-500 tracking-widest uppercase">— ALBERT EINSTEIN</div>
            </div>

         </div>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-xs font-mono">
        © 2025 ROCKET OPS - GELECEK VİZYONU
      </footer>
    </div>
  );
}

// --- BİLEŞENLER ---

function VisionCard({ icon, title, subtitle, desc, delay }: { icon: React.ReactNode, title: string, subtitle: string, desc: string, delay: number }) {
   return (
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay, duration: 0.5 }}
         className="group bg-[#0a0a0c] border border-white/10 p-8 rounded-3xl relative overflow-hidden hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-2"
      >
         {/* Hover Glow */}
         <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
         
         <div className="relative z-10">
             <div className="flex justify-between items-start mb-6">
                 <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500">
                     {icon}
                 </div>
                 <div className="text-[10px] font-mono font-bold text-slate-500 bg-white/5 px-2 py-1 rounded border border-white/5 group-hover:text-white group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors">
                     {subtitle}
                 </div>
             </div>
             
             <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
             <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                 {desc}
             </p>
         </div>
      </motion.div>
   )
}

function Tag({ text }: { text: string }) {
    return (
        <div className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-[10px] font-bold tracking-widest text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
            {text}
        </div>
    )
}