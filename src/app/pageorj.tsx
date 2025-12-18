'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Rocket, ArrowRight, Github, Twitter, Linkedin, Terminal, Radio, Cpu, Wifi, Target, Zap } from 'lucide-react';
import { useRef, MouseEvent } from 'react';

export default function LandingPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] });
  
  // Hero animasyonları için değerler
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="relative min-h-screen bg-[#020203] text-white selection:bg-red-500/30 font-sans overflow-x-hidden">
      
      {/* --- BACKGROUND FX (Derin Uzay & Grid) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Hareketli Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* Ana Işık Kaynağı (Tepeden) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-red-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      {/* --- HUD DEKORASYONLARI (Askeri/Teknik His İçin) --- */}
      <div className="fixed top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-white/20 z-50 rounded-tl-lg"></div>
      <div className="fixed top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-white/20 z-50 rounded-tr-lg"></div>
      <div className="fixed bottom-16 left-6 w-8 h-8 border-l-2 border-b-2 border-white/20 z-50 rounded-bl-lg"></div>
      <div className="fixed bottom-16 right-6 w-8 h-8 border-r-2 border-b-2 border-white/20 z-50 rounded-br-lg"></div>

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Alanı */}
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg shadow-red-900/10">
            <div className="relative w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center border border-red-500/30 overflow-hidden">
               <div className="absolute inset-0 bg-red-400 animate-ping opacity-20"></div>
               <Rocket size={16} className="text-white fill-white transform -rotate-45 relative z-10" />
            </div>
            <span className="font-bold text-sm tracking-[0.2em] text-slate-200">ROCKET<span className="text-red-500">OPS</span></span>
          </div>

          {/* Menü Linkleri */}
          <div className="hidden md:flex items-center gap-1 bg-black/20 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/5">
            <NavLink href="#mission">Vizyon</NavLink>
            <NavLink href="#vehicles">Misyon</NavLink>
            <NavLink href="/partners">Partnerler</NavLink>
            <NavLink href="/team">Takım</NavLink>
          </div>

          {/* CTA Button */}
          <Link href="/dashboard">
            <button className="group relative flex items-center gap-2 px-6 py-2.5 bg-white text-black hover:bg-red-50 rounded-full font-bold text-xs tracking-widest transition-all shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] overflow-hidden">
               <span className="relative z-10 flex items-center gap-2">GÖREV KONTROL <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/></span>
            </button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section ref={targetRef} className="relative h-screen flex flex-col items-center justify-center text-center px-4 pt-20 perspective-1000">
        <motion.div style={{ opacity, scale, y }} className="space-y-8 max-w-5xl z-10 relative">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-950/20 text-[10px] font-mono tracking-widest text-red-300 backdrop-blur-sm shadow-[0_0_30px_rgba(220,38,38,0.15)]"
          >
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
             SİSTEM DURUMU: NOMİNAL
          </motion.div>
          
          {/* Main Title with Metallic Gradient */}
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-2xl">
            GELECEĞİ<br/> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-400 to-red-600 animate-gradient-x">ATEŞLİYORUZ</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-400 leading-relaxed font-light">
      Üniversite bünyesinde kurulan Rocket Ops,
model roket teknolojileri üzerine çalışan bir öğrenci mühendislik takımıdır.
    </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <button className="group relative px-8 py-4 bg-red-600 text-white rounded-xl font-bold tracking-wide transition-all shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)] hover:shadow-[0_20px_60px_-10px_rgba(220,38,38,0.6)] hover:-translate-y-1 w-full md:w-auto overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">PROJELERİ BAŞLAT <Zap size={16} className="fill-white"/></span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shimmer"></div>
            </button>
            <button className="px-8 py-4 border border-white/10 hover:bg-white/5 hover:border-white/20 text-slate-300 hover:text-white rounded-xl font-bold tracking-wide transition-all w-full md:w-auto backdrop-blur-md flex items-center gap-2">
              <Target size={16}/> MİSYON DETAYLARI
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- MISSION & TECH (Spotlight Cards) --- */}
      <section id="mission" className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
             <div className="w-px h-16 bg-gradient-to-b from-transparent via-red-500 to-transparent"></div>
             <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">TEKNİK YETENEKLERİMİZ</h2>
             <p className="text-slate-400 max-w-2xl">Rocket Ops mühendislik ekibi, tasarımdan üretime tam kapsamlı bir Ar-Ge süreci yürütür.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {/* Spotlight Effect Cards */}
           <SpotlightCard icon={<Rocket className="text-red-500" size={32}/>} title="Mekanik" desc="Aerodinamik gövde tasarımı, kompozit üretim ve yapısal analizler." />
           <SpotlightCard icon={<Cpu className="text-blue-500" size={32}/>} title="Aviyonik" desc="STM32 tabanlı uçuş bilgisayarı ve sensör füzyon algoritmaları." />
           <SpotlightCard icon={<Radio className="text-green-500" size={32}/>} title="Telemetri" desc="LoRa teknolojisi ile 10km+ menzilli yer istasyonu haberleşmesi." />
           <SpotlightCard icon={<Terminal className="text-orange-500" size={32}/>} title="Yazılım" desc="Gerçek zamanlı veri görselleştirme ve görev kontrol arayüzleri." />
        </div>

        {/* TERMINAL SECTION */}
        <div className="mt-20 border border-white/10 rounded-2xl bg-[#050505] p-2 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
           <div className="flex gap-2 p-4 border-b border-white/5 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              <div className="ml-auto font-mono text-[10px] text-slate-500 flex items-center gap-2">
                 <Wifi size={10} className="text-green-500 animate-pulse"/> CONNECTED: 192.168.1.42
              </div>
           </div>
           <div className="p-6 font-mono text-sm text-slate-400 space-y-1 h-[300px] overflow-y-auto custom-scrollbar">
              <div className="flex gap-4"><span className="text-slate-600">09:41:00</span> <span className="text-blue-400">INFO</span> System initialization started...</div>
              <div className="flex gap-4"><span className="text-slate-600">09:41:02</span> <span className="text-blue-400">INFO</span> Loading flight parameters from EEPROM</div>
              <div className="flex gap-4"><span className="text-slate-600">09:41:05</span> <span className="text-green-400">SUCCESS</span> IMU Calibration complete (Gyro/Accel)</div>
              <div className="flex gap-4"><span className="text-slate-600">09:41:08</span> <span className="text-green-400">SUCCESS</span> GPS Lock acquired: 8 Satellites</div>
              <div className="flex gap-4"><span className="text-slate-600">09:41:12</span> <span className="text-yellow-400">WARN</span> Main parachute servo check... OK</div>
              <div className="flex gap-4"><span className="text-slate-600">09:41:15</span> <span className="text-blue-400">INFO</span> Establishing LoRa uplink...</div>
              <div className="flex gap-4 border-l-2 border-green-500 pl-4 my-2 text-green-300 bg-green-900/10 py-1">
                 {`> READY FOR LAUNCH SEQUENCE`}
                 <span className="inline-block w-2 h-4 ml-2 bg-green-500 animate-pulse align-middle"></span>
              </div>
           </div>
           {/* Scanline Effect */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-4 animate-scan pointer-events-none"></div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative py-12 pb-24 border-t border-white/5 bg-[#010101] mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="space-y-2">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-bold">R</div>
                  <span className="font-bold tracking-wider text-lg">ROCKET OPS</span>
              </div>
              <p className="text-xs text-slate-500 max-w-xs">Geleceğin mühendisleri, bugünün hayallerini inşa ediyor.</p>
           </div>
           <div className="flex gap-6 text-slate-500">
              <SocialLink icon={<Twitter size={18}/>} />
              <SocialLink icon={<Linkedin size={18}/>} />
              <SocialLink icon={<Github size={18}/>} />
           </div>
        </div>
      </footer>

      {/* --- TELEMETRİ BANDI (Sabit Alt) --- */}
      <div className="fixed bottom-0 left-0 w-full bg-[#050505]/80 border-t border-red-500/20 py-2 overflow-hidden z-[60] backdrop-blur-xl">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-[10px] font-mono font-medium tracking-widest text-red-400/90 uppercase">
           <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div> YER İSTASYONU: AKTİF</span>
           <span className="text-slate-600">|</span>
           <span>PİL: %98.4</span>
           <span className="text-slate-600">|</span>
           <span>T-0: 14 GÜN 03 SAAT</span>
           <span className="text-slate-600">|</span>
           <span className="flex items-center gap-2"><Wifi size={10}/> RSSI: -85 dBm</span>
           <span className="text-slate-600">|</span>
           <span>GPS: 41.0082° N, 28.9784° E</span>
           {/* Tekrar */}
           <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div> YER İSTASYONU: AKTİF</span>
           <span className="text-slate-600">|</span>
           <span>PİL: %98.4</span>
        </div>
      </div>

    </div>
  );
}

// --- GELİŞMİŞ BİLEŞENLER ---

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a href={href} className="px-4 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
      {children}
    </a>
  )
}

function SocialLink({ icon }: { icon: React.ReactNode }) {
   return (
      <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300">
         {icon}
      </a>
   )
}

// Spotlight Effect Card Component
function SpotlightCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      className="group relative border border-white/10 bg-white/[0.02] overflow-hidden rounded-xl px-8 py-10 transition-colors hover:border-red-500/30"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(220, 38, 38, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full flex flex-col">
        <div className="mb-4 p-3 bg-white/5 rounded-lg w-fit border border-white/5 group-hover:border-red-500/20 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
        
        {/* Dekoratif Köşe Çizgileri */}
        <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/10 group-hover:border-red-500/50 transition-colors"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/10 group-hover:border-red-500/50 transition-colors"></div>
      </div>
    </div>
  );
}