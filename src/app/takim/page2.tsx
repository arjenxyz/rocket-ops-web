'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Rocket, ArrowLeft, Shield, Cpu, Code, Users, X, Instagram, Github, Linkedin, Globe, Zap, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect, ReactNode } from 'react';
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

// --- IKON EŞLEŞTİRİCİ ---
const iconMap: Record<string, ReactNode> = {
  shield: <Shield size={14} className="text-red-500"/>,
  cpu: <Cpu size={14} className="text-blue-500"/>,
  rocket: <Rocket size={14} className="text-green-500"/>,
  code: <Code size={14} className="text-orange-500"/>,
  zap: <Zap size={14} className="text-yellow-500"/>,
  default: <Users size={14} className="text-slate-500"/>
};

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  
  // ÇÖZÜM: useMemo ile sadece bir kere oluşturulmasını sağlıyoruz
  // Köşeli parantezlere dikkat: [supabase]
const [supabase] = useState(() => createClient());

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
    <div className="min-h-screen bg-[#030305] text-white selection:bg-red-500/30 font-sans">
      
      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedMember && (
          <MemberModal 
            member={selectedMember} 
            onClose={() => setSelectedMember(null)} 
          />
        )}
      </AnimatePresence>

    {/* --- NAVBAR (DÜZELTİLDİ: Arkaplan ve Blur Eklendi) --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#030305]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-white/20 transition-all">
             <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-slate-400 group-hover:text-white"/>
             <span className="text-sm font-bold text-slate-400 group-hover:text-white">GERİ DÖN</span>
          </Link>

          <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 shadow-lg shadow-red-900/5">
            <div className="relative flex items-center justify-center">
                <Rocket size={16} className="text-red-500 transform -rotate-45 relative z-10" />
                <div className="absolute inset-0 bg-red-500/20 blur-md rounded-full"></div>
            </div>
            <span className="font-bold text-sm tracking-[0.2em] text-slate-200">ROCKET<span className="text-red-500">OPS</span></span>
          </div>
        </div>
      </nav>

      {/* --- ANA İÇERİK --- */}
      <main className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

         <div className="max-w-6xl mx-auto relative z-10">
            <AnimatedTitle />
            
            {loading ? (
               <div className="flex flex-col justify-center items-center h-64 gap-4">
                  <div className="w-12 h-12 border-4 border-white/10 border-t-red-500 rounded-full animate-spin"></div>
                  <div className="text-red-500 font-mono text-sm animate-pulse tracking-widest">VERİ TABANI BAĞLANTISI KURULUYOR...</div>
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
        © 2025 ROCKET OPS - TAKIM BİLGİ EKRANI
      </footer>
    </div>
  );
}

// --- GELİŞTİRİLMİŞ MODAL TASARIMI ---
function MemberModal({ member, onClose }: { member: TeamMember, onClose: () => void }) {
  const IconComponent = iconMap[member.icon_type] || iconMap['default'];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-gradient-to-br from-[#0e0e11] to-[#0a0a0c] border border-white/10 w-full max-w-md rounded-2xl overflow-hidden relative shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.03)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-[shimmer_8s_ease-in-out_infinite]"></div>
        </div>

        {/* Close Button - Improved */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-red-500/20 rounded-full transition-all duration-300 text-slate-400 hover:text-red-400 z-20 border border-white/5 hover:border-red-500/30 group backdrop-blur-sm"
        >
          <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Header Section - Refined */}
        <div className="relative bg-gradient-to-b from-[#15151a]/80 to-transparent border-b border-white/5 p-6 overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex items-start gap-4 relative z-10">
            {/* Avatar - Enhanced */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-[#0a0a0c] border border-white/10 overflow-hidden flex items-center justify-center shadow-xl relative group">
                {member.image_url ? (
                  <Image
                    src={member.image_url}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    fill
                    sizes="80px"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <Users className="text-slate-500" size={32} />
                )}
              </div>
              {/* Status Indicator - Improved */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-[#0e0e11] rounded-full flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Name & Role - Enhanced Typography */}
            <div className="flex-grow min-w-0 pt-1">
              <h2 className="text-2xl font-bold text-white leading-tight mb-1.5 tracking-tight">{member.name}</h2>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-500/10 border border-red-500/20 rounded-md">
                {IconComponent}
                <span className="text-red-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                  {member.role}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body - Improved Layout */}
        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar bg-[#0a0a0c]/50">
          
          {/* Specialty Section - Card Style */}
          <div className="group">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-gradient-to-b from-red-500 to-orange-500 rounded-full"></div>
              <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest font-mono">Uzmanlık Alanı</h3>
            </div>
            <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 rounded-xl p-4 text-sm text-slate-200 font-medium backdrop-blur-sm group-hover:border-red-500/20 transition-colors">
              {member.specialty}
            </div>
          </div>

          {/* Bio Section - Enhanced */}
          <div className="group">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
              <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest font-mono">Personel Dosyası</h3>
            </div>
            <div className="relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] border border-white/5 rounded-xl p-4 backdrop-blur-sm group-hover:border-blue-500/20 transition-colors">
              <div className="absolute top-4 left-0 w-1 h-8 bg-gradient-to-b from-blue-500/50 to-transparent rounded-r"></div>
              <p className="text-slate-300 leading-relaxed text-sm pl-3">
                {member.bio || "Sistemde detaylı veri bulunamadı."}
              </p>
            </div>
          </div>

          {/* Social Links - Improved Design */}
          <div className="group">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
              <h3 className="text-slate-400 text-[10px] font-bold uppercase tracking-widest font-mono">Bağlantılar</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {member.github_url && <SocialButton href={member.github_url} icon={<Github size={16}/>} label="GitHub" color="purple" />}
              {member.linkedin_url && <SocialButton href={member.linkedin_url} icon={<Linkedin size={16}/>} label="LinkedIn" color="blue" />}
              {member.instagram_url && <SocialButton href={member.instagram_url} icon={<Instagram size={16}/>} label="Instagram" color="pink" />}
              {member.website_url && <SocialButton href={member.website_url} icon={<Globe size={16}/>} label="Website" color="green" />}
            </div>

            {!member.github_url && !member.linkedin_url && !member.instagram_url && !member.website_url && (
              <div className="text-center text-slate-600 text-xs italic py-4 bg-white/[0.01] rounded-lg border border-dashed border-white/5">
                Bağlantı bilgisi mevcut değil
              </div>
            )}
          </div>

        </div>

        {/* Footer - Enhanced */}
        <div className="bg-gradient-to-r from-[#0a0a0c] to-[#0e0e11] border-t border-white/5 px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Active</span>
          </div>
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">
            ID: {member.id.substring(0, 8).toUpperCase()}
          </span>
        </div>

      </motion.div>
    </motion.div>
  )
}

// --- REFINED COMPONENTS ---

function AnimatedTitle() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="flex flex-col items-center text-center mb-16 space-y-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/5 border border-red-500/20 rounded-full mb-4">
          <Users size={14} className="text-red-500" />
          <span className="text-red-500 font-mono text-xs tracking-[0.3em] uppercase font-bold">Ekip Kadrosu</span>
        </div>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight tracking-tight"
      >
        Omuz omuza,{' '}
        <span className="relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">
            gökyüzüne.
          </span>
          <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-500/20 via-orange-500/40 to-red-600/20 blur-sm"></div>
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed"
      >
        Her biri kendi alanında uzman, tutkulu ve yenilikçi bireylerden oluşan ekibimizle tanışın.
      </motion.p>
    </div>
  );
}

function AnimatedList({ members, onSelect }: { members: TeamMember[], onSelect: (m: TeamMember) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring" as const, bounce: 0.4, duration: 0.6 } 
    }
  };

  return (
    <motion.div 
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {members.map((member) => (
        <motion.div key={member.id} variants={cardVariants}>
          <TeamCard member={member} onClick={() => onSelect(member)} />
        </motion.div>
      ))}
    </motion.div>
  );
}

function TeamCard({ member, onClick }: { member: TeamMember, onClick: () => void }) {

  return (
    <button 
      onClick={onClick}
      className="w-full text-left group relative bg-gradient-to-br from-[#0a0a0c] to-[#060608] border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/5 active:scale-[0.98] flex flex-row"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      {/* Avatar Section */}
      <div className="relative shrink-0 w-28 md:w-32 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden flex items-center justify-center p-4">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Glow behind avatar */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Avatar */}
        <div className="relative w-20 h-20 rounded-2xl border-2 border-white/20 overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 group-hover:border-red-500/60 transition-all duration-500 group-hover:scale-105 shadow-2xl group-hover:shadow-red-500/20">
          {member.image_url ? (
            <Image
              src={member.image_url}
              alt={member.name}
              className="w-full h-full object-cover"
              fill
              sizes="80px"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
              <Users className="text-slate-400" size={32} />
            </div>
          )}
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow min-w-0 py-4 pr-3 flex flex-col justify-center gap-2.5">
        {/* Name */}
        <h4 className="text-xl md:text-2xl font-bold text-white group-hover:text-red-100 transition-colors line-clamp-1 tracking-tight">
          {member.name}
        </h4>

        {/* Role Badge - Redesigned */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500/15 to-orange-500/15 border border-red-500/30 rounded-lg backdrop-blur-sm group-hover:border-red-500/50 transition-colors">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">
              {member.role}
            </span>
          </div>
          
          
        </div>
      </div>

      {/* Right Side - Chevron */}
      <div className="shrink-0 flex items-center pr-5 md:pr-6">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-500/10 group-hover:border-red-500/30 transition-all">
          <ChevronRight size={20} className="text-slate-600 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/50 to-transparent w-0 group-hover:w-full transition-all duration-700"></div>
    </button>
  );
}

function SocialButton({ href, icon, label, color }: { href: string, icon: ReactNode, label: string, color: string }) {
  const colorMap: Record<string, string> = {
    purple: 'hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400',
    blue: 'hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400',
    pink: 'hover:bg-pink-500/10 hover:border-pink-500/30 hover:text-pink-400',
    green: 'hover:bg-green-500/10 hover:border-green-500/30 hover:text-green-400'
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 px-3 py-2.5 bg-white/[0.02] border border-white/5 rounded-lg text-slate-400 transition-all duration-300 text-xs font-medium group ${colorMap[color] || colorMap.green}`}
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      <span className="font-semibold">{label}</span>
    </a>
  );
}