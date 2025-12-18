'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, ArrowLeft, Shield, Cpu, Code, Users, X, Instagram, Github, Linkedin, Globe, Zap, ChevronRight, ScanLine } from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';
import { createClient } from '../../supabase/client';

// --- TİP TANIMLAMALARI ---
type TeamMember = {
  id: string;
  name: string;
  role: string;
  specialty: string;
  icon_type: string;
  bio: string;
  image_url?: string;
  instagram_url?: string;
  github_url?: string;
  linkedin_url?: string;
  website_url?: string;
};

// --- İKON EŞLEŞTİRİCİ ---
const iconMap: Record<string, ReactNode> = {
  shield: <Shield size={14} className="text-blue-400"/>,
  cpu: <Cpu size={14} className="text-cyan-400"/>,
  rocket: <Rocket size={14} className="text-indigo-400"/>,
  code: <Code size={14} className="text-sky-400"/>,
  zap: <Zap size={14} className="text-yellow-400"/>,
  default: <Users size={14} className="text-slate-400"/>
};

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        if (data) setMembers(data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-[#020203] text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      
      <AnimatePresence>
        {selectedMember && (
          <MemberModal 
            member={selectedMember} 
            onClose={() => setSelectedMember(null)} 
          />
        )}
      </AnimatePresence>

      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out border-b
          ${isScrolled 
            ? 'bg-[#030305]/80 backdrop-blur-xl border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' 
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
            <span className="font-bold text-sm tracking-[0.2em] text-slate-200">ROCKET<span className="text-blue-500"> OPS</span></span>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 relative min-h-screen">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
         <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

         <div className="max-w-6xl mx-auto relative z-10">
            <AnimatedTitle />
            
            {loading ? (
               <div className="flex flex-col justify-center items-center h-64 gap-4">
                  <div className="w-12 h-12 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
                  <div className="text-blue-500 font-mono text-xs animate-pulse tracking-widest">VERİ TABANI BAĞLANTISI KURULUYOR...</div>
               </div>
            ) : members.length > 0 ? (
               <AnimatedList 
                  members={members} 
                  onSelect={(m) => setSelectedMember(m)} 
               />
            ) : (
               <div className="text-center text-slate-500 font-mono py-20 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                  SİSTEMDE KAYITLI PERSONEL BULUNAMADI
               </div>
            )}
         </div>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-xs font-mono">
        © 2025 ROCKET OPS - PERSONEL AĞI
      </footer>
    </div>
  );
}

function AnimatedTitle() {
  return (
    <div className="flex flex-col items-center text-center mb-20 relative z-10">
        
        {/* Dekoratif Arka Işık */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/20 blur-[80px] -z-10 pointer-events-none"></div>

        {/* 1. Üst Badge (Teknik Etiket) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[10px] font-mono tracking-[0.2em] uppercase mb-6 backdrop-blur-sm"
        >
            <ScanLine size={12} className="animate-pulse"/> 
            <span>TAKIM ÜYELERİ HAKKINDA BİLGİLER</span>
        </motion.div>
        
        {/* 2. Ana Başlık (Gradient ve Büyük) */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.9]"
        >
           Teşekkürler <br className="md:hidden" />
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">Rocket Ops</span> Ekibi.
        </motion.h1>
        
        {/* 3. Alt Açıklama */}
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-slate-400 max-w-2xl text-sm md:text-base font-light leading-relaxed px-4"
        >
          Üniversite bünyesinde, model roket ve uçuş sistemleri üzerine Ar-Ge yürüten ekibimizi yakından tanıyın.
        </motion.p>
 
        {/* 4. Alt Çizgi Süsü */}
        <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mt-8 rounded-full"
        ></motion.div>
    </div>
  );
}

function AnimatedList({ members, onSelect }: { members: TeamMember[], onSelect: (m: TeamMember) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member, index) => (
        <motion.div 
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
        >
           <TeamCard member={member} onClick={() => onSelect(member)} />
        </motion.div>
      ))}
    </div>
  );
}

// --- KOMPAKT KART TASARIMI (EFEKTLER EKLENDİ) ---
function TeamCard({ member, onClick }: { member: TeamMember, onClick: () => void }) {
   const IconComponent = iconMap[member.icon_type] || iconMap['default'];

   return (
      <button 
        onClick={onClick}
        className="w-full text-left group relative bg-[#0a0a0c] rounded-xl border border-white/10 overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 flex flex-col"
      >
         {/* 1. Görsel Alanı (Üst Kısım) */}
         <div className="relative w-full h-48 bg-slate-900 overflow-hidden border-b border-white/5">
            {/* Arkaplan Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
            
            {/* Fotoğraf */}
            {member.image_url ? (
               <Image 
                  src={member.image_url} 
                  alt={member.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
               />
            ) : (
               <div className="w-full h-full flex items-center justify-center">
                  <Users size={40} className="text-slate-600"/>
               </div>
            )}

            {/* --- EFEKTLER BURAYA EKLENDİ --- */}
            {/* Karartma Gradyanı */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-80 z-0"></div>
            
            {/* Mavi Hover Parlaması (Mix Blend) */}
            <div className="absolute inset-0 bg-blue-500/30 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

            {/* Hareketli Tarama Çizgisi (Scanline) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(59,130,246,0.5),transparent)] h-[200%] w-full -translate-y-full group-hover:translate-y-full transition-transform duration-[2s] ease-in-out pointer-events-none z-10"></div>
            {/* ------------------------------- */}

            {/* Badge (En üstte kalsın diye z-20) */}
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end z-20">
                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded backdrop-blur-sm">
                   {IconComponent}
                   <span className="text-blue-200 font-mono text-[10px] font-bold uppercase tracking-wider">{member.role.split(' ')[0]}</span>
                </div>
            </div>
         </div>

         {/* 2. Bilgi Alanı (Alt Kısım) */}
         <div className="p-5 relative">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors truncate mb-1">
               {member.name}
            </h3>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-wide truncate mb-3">
               {member.role}
            </p>
            
            <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2">
               <span className="text-[9px] text-slate-600 font-mono">ID: {member.id.substring(0, 6).toUpperCase()}</span>
               <div className="flex items-center gap-1 text-[9px] text-blue-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  Profili Görüntüle <ChevronRight size={15} />
               </div>
            </div>
         </div>

         {/* Köşe Süsleri */}
         <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20 group-hover:border-blue-500/50 transition-colors"></div>
         <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20 group-hover:border-blue-500/50 transition-colors"></div>
      </button>
   )
}

function MemberModal({ member, onClose }: { member: TeamMember, onClose: () => void }) {
  const IconComponent = iconMap[member.icon_type] || iconMap['default'];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/80 backdrop-blur-lg"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="bg-[#0e0e11] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden relative shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-gradient-to-r from-blue-900/30 to-[#0e0e11] border-b border-white/5 p-8 overflow-hidden">
           <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none"></div>
           
           <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white z-20 border border-white/5">
              <X size={20} />
           </button>
           
           <div className="flex flex-col md:flex-row items-center md:items-end gap-8 relative z-10">
              <div className="relative shrink-0">
                  <div className="w-32 h-32 rounded-2xl bg-[#0e0e11] border-2 border-white/10 overflow-hidden shadow-2xl relative group">
                      {member.image_url ? (
                        <Image src={member.image_url} alt={member.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Users size={32} className="text-slate-500"/></div>
                      )}
                  </div>
              </div>

              <div className="text-center md:text-left flex-grow pb-1">
                 <h2 className="text-4xl font-black text-white leading-tight mb-3 tracking-tight">{member.name}</h2>
                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <span className="px-3 py-1.5 rounded-md bg-blue-500/20 border border-blue-500/30 text-blue-300 font-mono text-xs font-bold flex items-center gap-2 uppercase tracking-wider">
                       {IconComponent} {member.role}
                    </span>
                 </div>
              </div>
           </div>
        </div>

        <div className="p-8 space-y-8 overflow-y-auto custom-scrollbar bg-[#0e0e11] relative">
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-0">
             <div className="md:col-span-2 space-y-8">
                <div>
                   <h3 className="text-blue-400 text-xs font-bold uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
                      <Shield size={14} className="text-blue-500"/> PERSONEL BİYOGRAFİSİ
                   </h3>
                   
                   <div className="text-slate-300 leading-relaxed font-light text-sm bg-white/[0.02] p-5 rounded-2xl border border-white/5 shadow-inner relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/30"></div>
                      {member.bio || "Sistemde kayıtlı biyografi verisi bulunmamaktadır."}
                   </div>
                </div>
             </div>

             <div className="space-y-8">
                <div>
                   <h3 className="text-blue-400 text-xs font-bold uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
                      <Cpu size={14} className="text-cyan-500"/> UZMANLIK
                   </h3>
                   <div className="bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 rounded-2xl p-5 text-white font-medium shadow-[inset_0_0_20px_rgba(59,130,246,0.1)] relative overflow-hidden group">
                      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {member.specialty}
                   </div>
                </div>

                <div>
                   <h3 className="text-blue-400 text-xs font-bold uppercase tracking-widest font-mono mb-4 flex items-center gap-2">
                      <Globe size={14} className="text-indigo-500"/> AĞ BAĞLANTILARI
                   </h3>
                   <div className="grid grid-cols-2 gap-3">
                       {member.github_url && <SocialButton href={member.github_url} icon={<Github size={16}/>} label="Git" color="purple" />}
                       {member.linkedin_url && <SocialButton href={member.linkedin_url} icon={<Linkedin size={16}/>} label="In" color="blue" />}
                       {member.instagram_url && <SocialButton href={member.instagram_url} icon={<Instagram size={16}/>} label="Insta" color="pink" />}
                       {member.website_url && <SocialButton href={member.website_url} icon={<Globe size={16}/>} label="Web" color="green" />}
                   </div>
                </div>
             </div>
           </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function SocialButton({ href, icon, label, color }: { href: string, icon: ReactNode, label: string, color: string }) {
  const colorMap: Record<string, string> = {
    purple: 'hover:bg-purple-500/20 hover:border-purple-500/40 hover:text-purple-300',
    blue: 'hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-blue-300',
    pink: 'hover:bg-pink-500/20 hover:border-pink-500/40 hover:text-pink-300',
    green: 'hover:bg-green-500/20 hover:border-green-500/40 hover:text-green-300'
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 px-3 py-3 bg-[#0a0a0c] border border-white/10 rounded-xl text-slate-400 transition-all text-xs font-bold group hover:shadow-lg ${colorMap[color]}`}
    >
      <span className="group-hover:scale-110 transition-transform opacity-70 group-hover:opacity-100">{icon}</span>
      {label}
    </a>
  )
}