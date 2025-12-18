'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Rocket, ArrowRight, Github, Twitter, Linkedin, Terminal, Radio, Cpu, Wifi, Target, Zap } from 'lucide-react';
import { useRef, MouseEvent, useState, useEffect } from 'react';

export default function LandingPage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] });
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll Takibi (Navbar için)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Hero animasyonları
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="relative min-h-screen bg-[#020203] text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      
      {/* --- BACKGROUND FX (Mavi Uzay Teması) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Hareketli Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* Ana Işık Kaynağı (Mavi/Indigo) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      {/* --- HUD DEKORASYONLARI --- */}
      <div className="fixed top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-blue-500/20 z-50 rounded-tl-lg"></div>
      <div className="fixed top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-blue-500/20 z-50 rounded-tr-lg"></div>
      <div className="fixed bottom-16 left-6 w-8 h-8 border-l-2 border-b-2 border-blue-500/20 z-50 rounded-bl-lg"></div>
      <div className="fixed bottom-16 right-6 w-8 h-8 border-r-2 border-b-2 border-blue-500/20 z-50 rounded-br-lg"></div>

      {/* --- GELİŞMİŞ NAVBAR --- */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b
          ${isScrolled 
            ? 'bg-[#030305]/80 backdrop-blur-xl border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent py-6'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Sol: Logo */}
          <div className="flex items-center gap-3">
             <div className={`relative w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-500 ${isScrolled ? 'bg-blue-600 border-blue-400' : 'bg-white/5 border-white/10'}`}>
                {isScrolled && <div className="absolute inset-0 bg-blue-400 animate-ping opacity-20 rounded-full"></div>}
                <Rocket size={18} className={`transform -rotate-45 relative z-10 transition-colors ${isScrolled ? 'text-white' : 'text-blue-500'}`} />
             </div>
             <span className="font-bold text-sm tracking-[0.2em] text-slate-200">
                ROCKET<span className="text-blue-500">OPS</span>
             </span>
          </div>

          {/* Orta: Linkler (Sadece Masaüstü) */}
          <div className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full border transition-all duration-500 ${isScrolled ? 'bg-black/40 border-white/10' : 'bg-white/5 border-white/5'}`}>
            <NavLink href="/vizyon">Vizyon</NavLink>
            <NavLink href="/misyon">Misyon</NavLink>
            <NavLink href="/partnerler">Partnerler</NavLink>
            <NavLink href="/takim">Takım</NavLink>
          </div>

          {/* Sağ: CTA ve Durum */}
          <div className="flex items-center gap-4">
             {/* Durum Göstergesi */}
             <div className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 transition-all duration-500 ${isScrolled ? 'bg-black/40' : 'bg-white/5'}`}>
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                <span className="text-[10px] font-mono text-slate-400 tracking-widest">SYSTEM: ONLINE</span>
             </div>

             <Link href="/dashboard">
                <button className="group relative flex items-center gap-2 px-5 py-2 bg-white text-black hover:bg-blue-50 rounded-full font-bold text-[10px] tracking-widest transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] overflow-hidden">
                   <span className="relative z-10 flex items-center gap-2">GÖREV KONTROL <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/></span>
                </button>
             </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section ref={targetRef} className="relative h-screen flex flex-col items-center justify-center text-center px-4 pt-20 perspective-1000">
        <motion.div style={{ opacity, scale, y }} className="space-y-8 max-w-5xl z-10 relative">
          
          {/* Status Badge (Blue Theme) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-950/20 text-[10px] font-mono tracking-widest text-blue-300 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.15)]"
          >
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
             SİSTEM DURUMU: NOMİNAL
          </motion.div>
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-200 to-slate-500 drop-shadow-2xl">
            GELECEĞİ<br/> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 animate-gradient-x">ATEŞLİYORUZ</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-400 leading-relaxed font-light max-w-2xl mx-auto">
             Üniversite bünyesinde kurulan Rocket Ops, model roket teknolojileri ve ileri aviyonik sistemler üzerine çalışan yeni nesil bir mühendislik takımıdır.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <button className="group relative px-8 py-4 bg-blue-600 text-white rounded-xl font-bold tracking-wide transition-all shadow-[0_10px_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_20px_60px_-10px_rgba(59,130,246,0.6)] hover:-translate-y-1 w-full md:w-auto overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">PROJELERİ BAŞLAT <Zap size={16} className="fill-white"/></span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shimmer"></div>
            </button>
            <button className="px-8 py-4 border border-white/10 hover:bg-white/5 hover:border-blue-500/30 text-slate-300 hover:text-white rounded-xl font-bold tracking-wide transition-all w-full md:w-auto backdrop-blur-md flex items-center gap-2 group">
              <Target size={16} className="group-hover:text-blue-400 transition-colors"/> MİSYON DETAYLARI
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- MISSION & TECH (Spotlight Cards - Blue) --- */}
      <section id="mission" className="py-24 max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
             <div className="w-px h-16 bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
             <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">TEKNİK YETENEKLERİMİZ</h2>
             <p className="text-slate-400 max-w-2xl">Rocket Ops mühendislik ekibi, tasarımdan üretime tam kapsamlı bir Ar-Ge süreci yürütür.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           {/* Spotlight Effect Cards */}
           <SpotlightCard icon={<Rocket className="text-blue-500" size={32}/>} title="Mekanik" desc="Aerodinamik gövde tasarımı, kompozit üretim ve yapısal analizler." />
           <SpotlightCard icon={<Cpu className="text-indigo-500" size={32}/>} title="Aviyonik" desc="STM32 tabanlı uçuş bilgisayarı ve sensör füzyon algoritmaları." />
           <SpotlightCard icon={<Radio className="text-cyan-500" size={32}/>} title="Telemetri" desc="LoRa teknolojisi ile 10km+ menzilli yer istasyonu haberleşmesi." />
           <SpotlightCard icon={<Terminal className="text-sky-500" size={32}/>} title="Yazılım" desc="Gerçek zamanlı veri görselleştirme ve görev kontrol arayüzleri." />
        </div>

        {/* TERMINAL SECTION (Blue Theme) */}
        <div className="mt-20 border border-white/10 rounded-2xl bg-[#050505] p-2 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
           <div className="flex gap-2 p-4 border-b border-white/5 bg-white/[0.02]">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              <div className="ml-auto font-mono text-[10px] text-slate-500 flex items-center gap-2">
                 <Wifi size={10} className="text-blue-500 animate-pulse"/> CONNECTION_ID: 884-XJ
              </div>
           </div>
           <div className="p-6 font-mono text-sm text-slate-400 space-y-1 h-[300px] overflow-y-auto custom-scrollbar">
              <div className="flex gap-4"><span className="text-slate-600">09:41:00</span> <span className="text-blue-400">INFO</span> System initialization started...</div>
              <div className="flex gap-4"><span className="text-slate-600">09:41:02</span> <span className="text-blue-400">INFO</span> Loading flight parameters from EEPROM</div>
              <div className="flex gap-4"><span className="text-slate-600">09:41:05</span> <span className="text-green-400">SUCCESS</span> IMU Calibration complete (Gyro/Accel)</div>
              <div className="flex gap-4"><span className="text-slate-600">09:41:08</span> <span className="text-green-400">SUCCESS</span> GPS Lock acquired: 8 Satellites</div>
              <div className="flex gap-4"><span className="text-slate-600">09:41:12</span> <span className="text-yellow-400">WARN</span> Main parachute servo check... OK</div>
              <div className="flex gap-4"><span className="text-slate-600">09:41:15</span> <span className="text-blue-400">INFO</span> Establishing LoRa uplink...</div>
              <div className="flex gap-4 border-l-2 border-blue-500 pl-4 my-2 text-blue-300 bg-blue-900/10 py-1">
                 {`> READY FOR LAUNCH SEQUENCE`}
                 <span className="inline-block w-2 h-4 ml-2 bg-blue-500 animate-pulse align-middle"></span>
              </div>
           </div>
           {/* Scanline Effect */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-4 animate-scan pointer-events-none"></div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative py-12 pb-24 border-t border-white/5 bg-[#010101] mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="space-y-2">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-bold">R</div>
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

      {/* --- TELEMETRİ BANDI (Blue Theme) --- */}
      <div className="fixed bottom-0 left-0 w-full bg-[#050505]/80 border-t border-blue-500/20 py-2 overflow-hidden z-[60] backdrop-blur-xl">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-[10px] font-mono font-medium tracking-widest text-blue-400/90 uppercase">
           <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div> YER İSTASYONU: AKTİF</span>
           <span className="text-slate-600">|</span>
           <span>PİL: %98.4</span>
           <span className="text-slate-600">|</span>
           <span>T-0: 14 GÜN 03 SAAT</span>
           <span className="text-slate-600">|</span>
           <span className="flex items-center gap-2"><Wifi size={10}/> RSSI: -85 dBm</span>
           <span className="text-slate-600">|</span>
           <span>GPS: 41.0082° N, 28.9784° E</span>
           {/* Tekrar */}
           <span className="text-slate-600">|</span>
           <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div> YER İSTASYONU: AKTİF</span>
        </div>
      </div>

    </div>
  );
}

// --- YARDIMCI BİLEŞENLER ---

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="px-4 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
      {children}
    </Link>
  )
}

function SocialLink({ icon }: { icon: React.ReactNode }) {
   return (
      <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all duration-300">
         {icon}
      </a>
   )
}

// Spotlight Effect Card Component (Blue Glow)
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
      className="group relative border border-white/10 bg-white/[0.02] overflow-hidden rounded-xl px-8 py-10 transition-colors hover:border-blue-500/30"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full flex flex-col">
        <div className="mb-4 p-3 bg-white/5 rounded-lg w-fit border border-white/5 group-hover:border-blue-500/20 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
        
        {/* Dekoratif Köşe Çizgileri */}
        <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/10 group-hover:border-blue-500/50 transition-colors"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/10 group-hover:border-blue-500/50 transition-colors"></div>
      </div>
    </div>
  );
}