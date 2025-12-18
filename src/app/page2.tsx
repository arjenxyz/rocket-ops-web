'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Target, Users, Zap, ChevronDown, Github, Twitter, Instagram } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500/30 font-sans overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
               <Rocket size={18} className="text-white fill-white" />
            </div>
            <span className="font-bold text-xl tracking-wider">ROCKET OPS</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <Link href="#about" className="hover:text-white transition-colors">Hakkımızda</Link>
            <Link href="#projects" className="hover:text-white transition-colors">Projeler</Link>
            <Link href="#team" className="hover:text-white transition-colors">Ekip</Link>
            <Link href="#contact" className="hover:text-white transition-colors">İletişim</Link>
          </div>

          <Link href="/dashboard">
            <button className="flex items-center gap-2 px-5 py-2 bg-white text-black hover:bg-slate-200 rounded-full font-bold text-xs tracking-wide transition-all transform hover:scale-105">
               GÖREV KONTROL <ArrowRight size={14}/>
            </button>
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Arka Plan Efektleri */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-red-400 mb-4">
             <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
             TEKNOFEST 2026 HAZIRLIKLARI BAŞLADI
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            GÖKYÜZÜ SINIR DEĞİL, <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">SADECE BAŞLANGIÇ.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Yüksek irtifa roket sistemleri geliştiren, mühendislik tutkusuyla çalışan, 
            geleceğin havacılık teknolojilerini bugünden tasarlayan Ar-Ge takımı.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
            <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(220,38,38,0.3)] w-full md:w-auto">
              PROJELERİMİZİ İNCELE
            </button>
            <button className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white rounded-lg font-bold tracking-wide transition-all w-full md:w-auto">
              EKİBE KATIL
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 animate-bounce text-slate-500"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
           <StatItem number="3000m" label="HEDEF İRTİFA" />
           <StatItem number="1.2" label="MACH HIZI" />
           <StatItem number="15+" label="TAKIM ÜYESİ" />
           <StatItem number="%100" label="YERLİ TASARIM" />
        </div>
      </section>

      {/* --- ABOUT / MISSION --- */}
      <section id="about" className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
              <h2 className="text-4xl font-bold">Mühendislik ve Tutku Bir Arada.</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Rocket Ops, üniversite öğrencilerinden oluşan multidisipliner bir teknoloji takımıdır. 
                Amacımız, ülkemizin havacılık ve uzay çalışmalarına katkı sağlamak, kendi aviyonik 
                sistemlerimizi ve itki teknolojilerimizi geliştirmektir.
              </p>
              <div className="space-y-4">
                 <FeatureRow icon={<Target className="text-red-500"/>} title="Yüksek İrtifa Sistemleri" desc="3km ve üzeri irtifalara ulaşabilen kompozit gövdeli araçlar." />
                 <FeatureRow icon={<Zap className="text-yellow-500"/>} title="Gelişmiş Aviyonik" desc="Kendi tasarladığımız uçuş bilgisayarı ve yer istasyonu yazılımları." />
                 <FeatureRow icon={<Users className="text-blue-500"/>} title="Takım Ruhu" desc="Birlikte öğrenen, hata yapan ve başaran dinamik bir ekip." />
              </div>
           </div>
           
           {/* Görsel Alanı (Placeholder) */}
           <div className="relative h-[500px] bg-slate-800 rounded-3xl overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent z-10"></div>
              {/* Buraya gerçek bir roket fotosu gelecek */}
              <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-mono text-sm">
                 [ROKET FIRLATMA FOTOĞRAFI]
              </div>
              
              {/* Dekoratif Kod Bloğu */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur border border-white/10 p-4 rounded-xl z-20 font-mono text-xs text-green-400">
                 <p>{`> System.init(ROCKET_V1);`}</p>
                 <p>{`> Checking sensors... OK`}</p>
                 <p>{`> GPS Lock: ACQUIRED`}</p>
                 <p className="animate-pulse">{`> Ready for Launch...`}</p>
              </div>
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/10 bg-[#020202]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                 <Rocket size={16} className="text-white fill-white" />
              </div>
              <span className="font-bold tracking-wider">ROCKET OPS</span>
           </div>
           
           <div className="flex gap-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20}/></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20}/></a>
              <a href="#" className="hover:text-white transition-colors"><Github size={20}/></a>
           </div>

           <p className="text-slate-600 text-sm">
             © 2025 Rocket Ops Team. Tüm hakları saklıdır.
           </p>
        </div>
      </footer>

    </div>
  );
}

// --- ALT BİLEŞENLER ---

function StatItem({ number, label }: { number: string, label: string }) {
  return (
    <div>
      <h3 className="text-4xl md:text-5xl font-black text-white mb-2">{number}</h3>
      <p className="text-xs font-bold text-slate-500 tracking-widest uppercase">{label}</p>
    </div>
  )
}

interface FeatureRowProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function FeatureRow({ icon, title, desc }: FeatureRowProps) {
   return (
      <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
         <div className="p-2 bg-white/5 rounded-lg border border-white/5 shrink-0">
            {icon}
         </div>
         <div>
            <h4 className="font-bold text-white mb-1">{title}</h4>
            <p className="text-sm text-slate-400">{desc}</p>
         </div>
      </div>
   )
}