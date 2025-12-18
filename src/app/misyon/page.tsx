'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, ArrowLeft, Target, Zap, Award, Microscope, Terminal, Crosshair, CalendarClock, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MissionPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll Takibi
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020203] text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b
          ${isScrolled 
            ? 'bg-[#030305]/90 backdrop-blur-xl border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="group relative overflow-hidden flex items-center gap-3 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
             <ArrowLeft size={18} className="text-slate-400 group-hover:-translate-x-1 group-hover:text-white transition-all duration-300"/>
             <div className="flex flex-col leading-none">
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-blue-400 uppercase tracking-widest transition-colors"></span>
                <span className="text-sm font-bold text-white">GERİ DÖN</span>
             </div>
          </Link>

          <div className="flex items-center gap-3 bg-[#0a0a0c] px-4 py-2 rounded-full border border-white/10 hover:border-blue-500/30 transition-colors shadow-lg shadow-blue-900/10">
            <div className="relative flex items-center justify-center">
                <Rocket size={16} className="text-blue-500 transform -rotate-45 relative z-10" />
                <div className="absolute inset-0 bg-blue-500/20 blur-md rounded-full animate-pulse"></div>
            </div>
            <span className="font-bold text-sm tracking-[0.2em] text-slate-200">ROCKET<span className="text-blue-500">OPS</span></span>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 relative min-h-screen">
         {/* Arkaplan Efektleri */}
         <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#020203,transparent_20%,#020203)] z-0 pointer-events-none"></div>
         <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
         
         <div className="max-w-5xl mx-auto px-6 relative z-10">
            
            {/* --- HERO: OPERASYON DURUMU --- */}
            <div className="text-center mb-24 space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-mono tracking-widest uppercase mb-4"
                >
                    <Target size={12} /> MISSION_STATUS: INITIALIZATION
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                  className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight"
                >
                   BAŞLANGIÇ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">NOKTASI.</span>
                </motion.h1>
                
                {/* --- DÜRÜSTLÜK PANELİ (Durum Raporu) --- */}
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    className="max-w-3xl mx-auto bg-blue-900/10 border border-blue-500/20 rounded-2xl p-6 text-left relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                    <div className="flex items-start gap-4">
                        <AlertCircle className="text-blue-400 shrink-0 mt-1" size={20} />
                        <div>
                            <h3 className="text-blue-200 font-bold text-sm uppercase tracking-wider mb-2">OPERASYONEL DURUM RAPORU</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Rocket Ops takımı şu anda <strong>Kuruluş ve Yapılanma (Faz-1)</strong> aşamasındadır. 
                                Envanterimizde henüz fırlatılmış bir roket veya kazanılmış bir kupa bulunmamaktadır. 
                                Şu anki tek ve en büyük misyonumuz; sıfırdan, tamamen kendi mühendislik aklımızla 
                                çalışan, güvenli ve yüksek performanslı ilk roketimizi tasarlamaktır.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* --- VAROLUŞ AMACI (MANIFESTO) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-white">Neden Buradayız?</h2>
                    <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
                    <p className="text-slate-400 leading-relaxed">
                        Üniversite sıralarında öğrendiğimiz diferansiyel denklemleri, aerodinamik teorileri ve 
                        yazılım algoritmalarını sadece kağıt üzerinde bırakmak istemiyoruz.
                    </p>
                    <p className="text-slate-400 leading-relaxed">
                        Amacımız, okulun atölyesini bir uzay üssüne dönüştürmek; hata yapmaktan korkmadan, 
                        deneyerek, yanılarak ve sonunda başararak <strong>gerçek mühendislik</strong> tecrübesi kazanmaktır.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ManifestoCard icon={<Microscope/>} title="AR-GE" desc="Kopyalamıyoruz, sıfırdan tasarlıyoruz." />
                    <ManifestoCard icon={<Terminal/>} title="KODLAMA" desc="Kendi uçuş bilgisayarımızı yazıyoruz." />
                    <ManifestoCard icon={<Zap/>} title="ÜRETİM" desc="Kompozit ve mekanik üretim yeteneği." />
                    <ManifestoCard icon={<Award/>} title="HEDEF" desc="TEKNOFEST'te dereceye girmek." />
                </div>
            </div>

            {/* --- STRATEJİK YOL HARİTASI (TIMELINE) --- */}
            <div className="relative mb-32">
               <div className="text-center mb-16">
                   <span className="text-xs font-mono text-blue-500 font-bold tracking-[0.3em] uppercase">Gelecek Projeksiyonu</span>
                   <h2 className="text-3xl md:text-4xl font-black text-white mt-2">YOL HARİTASI</h2>
               </div>

               <div className="space-y-8 relative">
                  {/* Timeline Çizgisi */}
                  <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-blue-500 via-white/10 to-transparent md:-translate-x-1/2"></div>

                  <TimelineItem 
                     phase="FAZ 1" 
                     title="KURULUŞ & TEMEL EĞİTİM" 
                     date="ŞU AN"
                     desc="Ekibin toplanması, görev dağılımı, temel roketçilik ve aviyonik eğitimlerinin tamamlanması."
                     status="active"
                     side="left"
                  />
                  <TimelineItem 
                     phase="FAZ 2" 
                     title="TASARIM & SİMÜLASYON" 
                     date="2025 Q1"
                     desc="OpenRocket üzerinde ilk modelin tasarlanması ve CFD analizlerinin yapılması."
                     status="pending"
                     side="right"
                  />
                  <TimelineItem 
                     phase="FAZ 3" 
                     title="PROTOTİP ÜRETİMİ" 
                     date="2025 Q2"
                     desc="Gövde üretimi, kurtarma sistemi testleri ve aviyonik sistem entegrasyonu."
                     status="pending"
                     side="left"
                  />
                  <TimelineItem 
                     phase="FAZ 4" 
                     title="İLK FIRLATMA (TEKNOFEST)" 
                     date="2025 YAZ"
                     desc="Tuz Gölü'nde ilk gerçek atışın yapılması ve görev yükünün başarıyla indirilmesi."
                     status="pending"
                     side="right"
                  />
                  <TimelineItem 
                     phase="FAZ 5" 
                     title="Duyuru" 
                     date="-"
                     desc="Fazlar adım adım belirlenip güncellenecektir."
                     status="pending"
                     side="left"
                  />
               </div>
            </div>

            {/* --- TEKNİK HEDEFLERİMİZ --- */}
            <div className="border border-white/10 bg-[#0a0a0c] rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
                
                <div className="flex items-center gap-3 mb-8">
                    <Crosshair className="text-blue-500" />
                    <h2 className="text-2xl font-bold text-white">TEKNİK HEDEF PARAMETRELERİ</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="text-slate-500 text-xs font-mono mb-2">HEDEF İRTİFA</div>
                        <div className="text-3xl font-black text-white flex items-end gap-2">
                            +15.000 <span className="text-lg text-blue-500 font-bold mb-1">Feet.</span>
                        </div>
                        <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                            Yüksek irtifa kategorisinde yarışmak istiyoruz.
                        </p>
                    </div>
                    <div>
                        <div className="text-slate-500 text-xs font-mono mb-2">FAYDALI YÜK</div>
                        <div className="text-3xl font-black text-white flex items-end gap-2">
                            - <span className="text-lg text-blue-500 font-bold mb-1">KG</span>
                        </div>
                        <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                            Bilimsel veri toplayan otonom görev yükü modülü.
                        </p>
                    </div>
                    <div>
                        <div className="text-slate-500 text-xs font-mono mb-2">HABERLEŞME</div>
                        <div className="text-3xl font-black text-white flex items-end gap-2">
                            - <span className="text-lg text-blue-500 font-bold mb-1">KM+</span>
                        </div>
                        <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                            - modülasyonu ile kesintisiz telemetri veri akışı.
                        </p>
                    </div>
                </div>
            </div>

         </div>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-xs font-mono">
        © 2025 ROCKET OPS - MİSYON PLANLAMA
      </footer>
    </div>
  );
}

// --- BİLEŞENLER ---

function ManifestoCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
   return (
      <div className="bg-white/[0.03] p-5 rounded-xl border border-white/5 hover:bg-white/[0.05] transition-colors">
         <div className="text-blue-400 mb-3">{icon}</div>
         <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
         <p className="text-slate-500 text-xs">{desc}</p>
      </div>
   )
}

function TimelineItem({ phase, title, date, desc, status, side }: { phase: string, title: string, date: string, desc: string, status: 'active' | 'pending', side: 'left' | 'right' }) {
   const isLeft = side === 'left';
   
   return (
      <div className={`flex md:items-center justify-between w-full group ${isLeft ? 'flex-row' : 'md:flex-row-reverse'}`}>
         {/* İçerik */}
         <div className="w-full md:w-[45%] pl-12 md:pl-0">
            <motion.div 
               initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className={`bg-[#0a0a0c] border p-6 rounded-2xl relative transition-all duration-300 ${status === 'active' ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-white/10 opacity-60'}`}
            >
               <div className="flex justify-between items-start mb-2">
                   <div className={`text-xs font-bold px-2 py-1 rounded ${status === 'active' ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-400'}`}>{phase}</div>
                   <div className="text-xs font-mono text-slate-500 flex items-center gap-1"><CalendarClock size={10}/> {date}</div>
               </div>
               <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
               <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
            </motion.div>
         </div>

         {/* Nokta */}
         <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#020203] border-2 border-white/20 z-10 flex items-center justify-center mt-6 md:mt-0">
            <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-blue-500 animate-pulse' : 'bg-slate-700'}`}></div>
         </div>

         {/* Boşluk (Denge için) */}
         <div className="hidden md:block w-[45%]"></div>
      </div>
   )
}