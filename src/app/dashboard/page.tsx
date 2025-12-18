'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, Box, Activity, ClipboardCheck, FlaskConical, 
  MessageSquare, X, Send, Bell, Menu, 
  ArrowUpRight, RefreshCw, Plus, Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// --- TİP TANIMLAMALARI ---
type Message = { role: string; content: string };
type MissionLog = { id: string; mission: string; type: string; status: 'success' | 'warning' | 'critical' | 'pending'; date: string; personnel: string };

export default function MissionControl() {
  // --- STATE ---
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [] = useState('missions');
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- EFEKTLER ---
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isChatOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen]);

  // --- MOCK VERİLER (Roket Takımı İçin) ---
  const logs: MissionLog[] = [
    { id: 'FLT-004', mission: 'Düşük İrtifa Testi (Test-C)', type: 'Launch', status: 'success', date: 'Bugün, 09:00', personnel: 'Takım A' },
    { id: 'INV-102', mission: 'Lipo Pil Stok Sayımı', type: 'Envanter', status: 'warning', date: 'Dün, 14:30', personnel: 'Depo Sorumlusu' },
    { id: 'RND-099', mission: 'Burun Konisi CFD Analizi', type: 'Ar-Ge', status: 'pending', date: '16 Ara', personnel: 'Aerodinamik' },
    { id: 'ENG-551', mission: 'Motor Ateşleme (Static Fire)', type: 'Test', status: 'critical', date: '15 Ara', personnel: 'İtki Birimi' },
  ];

  // --- CHAT FONKSİYONU ---
  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `(Bağlam: Roket Takımı Yönetim Paneli) ${userMsg.content}` }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.content }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', content: "Bağlantı hatası. Telemetri verisi alınamıyor." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#09090b] text-slate-300 font-sans overflow-hidden selection:bg-red-500/30">
      
      {/* --- SIDEBAR --- */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-[#050505] border-r border-white/[0.08] transition-all duration-300 flex flex-col z-20`}>
        <div className="h-16 flex items-center px-6 border-b border-white/[0.08]">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            <Rocket size={18} className="text-white fill-white" />
          </div>
          {isSidebarOpen && (
             <div className="ml-3 flex flex-col justify-center animate-in fade-in duration-300">
                <span className="font-bold text-white tracking-wider text-sm">ROCKET OPS</span>
                <span className="text-[10px] text-slate-500 font-mono">Mission Control</span>
             </div>
          )}
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          <div className={`px-3 mb-2 text-[10px] font-bold text-red-500/80 uppercase tracking-widest ${!isSidebarOpen && 'hidden'}`}>Operasyon</div>
          
          <Link href="/">
             <NavItem icon={<LayoutDashboard size={18}/>} label="Görev Kontrol" isOpen={isSidebarOpen} active />
          </Link>
          <Link href="/inventory">
             <NavItem icon={<Box size={18}/>} label="Envanter & Depo" isOpen={isSidebarOpen} />
          </Link>
          <Link href="/telemetry">
             <NavItem icon={<Activity size={18}/>} label="Telemetri Verisi" isOpen={isSidebarOpen} />
          </Link>
          <Link href="/checklist">
             <NavItem icon={<ClipboardCheck size={18}/>} label="Checklist (Go/No-Go)" isOpen={isSidebarOpen} />
          </Link>
          <Link href="/lab">
             <NavItem icon={<FlaskConical size={18}/>} label="R&D Laboratuvarı" isOpen={isSidebarOpen} />
          </Link>
        </nav>

        {/* Alt Bilgi */}
        <div className="p-4 border-t border-white/[0.08] bg-white/[0.02]">
           <div className={`flex items-center gap-3 ${!isSidebarOpen && 'justify-center'}`}>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              {isSidebarOpen && <span className="text-xs font-mono text-green-500">SYSTEM ONLINE</span>}
           </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#09090b] relative">
        
        {/* Header */}
        <header className="h-16 bg-[#09090b]/90 backdrop-blur border-b border-white/[0.08] flex justify-between items-center px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4 text-sm text-slate-500">
             <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded transition-colors text-slate-400 hover:text-white">
                <Menu size={18}/>
             </button>
             <div className="h-4 w-px bg-white/10"></div>
             <span className="text-white font-medium tracking-wide">GÖREV KONTROL</span>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-6 px-4 py-1.5 bg-red-900/10 border border-red-500/20 rounded text-xs font-mono">
                <span className="flex items-center gap-2 text-red-200"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>Hava Sahası: KAPALI</span>
                <span className="flex items-center gap-2 text-slate-300">Rüzgar: 12 km/h K</span>
             </div>
             <button className="p-2 hover:bg-white/5 rounded-full relative group">
                <Bell size={18} className="text-slate-400 group-hover:text-white"/>
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
             </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Üst Başlık & Aksiyonlar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/[0.05] pb-6">
               <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                     HOŞGELDİN, KAPTAN
                  </h1>
                  <p className="text-sm text-slate-500 mt-2 font-mono">Bir sonraki fırlatma penceresine: <span className="text-red-400">14 Gün 03 Saat</span></p>
               </div>
               <div className="flex items-center gap-3">
                  <div className="hidden md:flex flex-col items-end mr-4 border-r border-white/10 pr-4">
                     <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">T-MINUS</span>
                     <span className="text-xl font-mono text-white">{currentTime}</span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-slate-200 rounded font-bold text-sm transition-colors">
                     <Plus size={16} />
                     <span>Yeni Görev</span>
                  </button>
               </div>
            </div>

            {/* İstatistikler (KPI) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               <StatCard title="APOGEE HEDEFİ" value="3000m" sub="Son Test: 2850m" icon={<ArrowUpRight size={20} className="text-blue-400"/>} />
               <StatCard title="ENVANTER DURUMU" value="%85" sub="3 Kritik Parça Eksik" icon={<Box size={20} className="text-orange-400"/>} warning />
               <StatCard title="AKTİF ROKET" value="2 Adet" sub="Alpha-1 & Beta-X" icon={<Rocket size={20} className="text-red-400"/>} />
               <StatCard title="SİSTEM SAĞLIĞI" value="NOMINAL" sub="Telemetri Hazır" icon={<Activity size={20} className="text-green-400"/>} />
            </div>

            {/* Ana Tablo */}
            <div className="bg-[#0c0c0e] border border-white/[0.08] rounded overflow-hidden">
               <div className="px-6 py-4 border-b border-white/[0.08] flex justify-between items-center bg-[#0e0e11]">
                  <div className="flex gap-6 text-sm font-medium">
                     <button className="text-white border-b-2 border-red-500 pb-4 -mb-4">Son Kayıtlar</button>
                     <button className="text-slate-500 hover:text-slate-300 transition-colors">Fırlatma Geçmişi</button>
                  </div>
                  <button className="text-xs text-slate-500 hover:text-white flex items-center gap-1"><RefreshCw size={12}/> Yenile</button>
               </div>

               <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                     <thead>
                        <tr className="bg-white/[0.02] border-b border-white/[0.05] text-[10px] uppercase tracking-widest text-slate-500 font-mono">
                           <th className="px-6 py-4">Operasyon ID</th>
                           <th className="px-6 py-4">Görev Adı</th>
                           <th className="px-6 py-4">Tip</th>
                           <th className="px-6 py-4">Durum</th>
                           <th className="px-6 py-4">Personel</th>
                           <th className="px-6 py-4 text-right">Zaman</th>
                        </tr>
                     </thead>
                     <tbody className="text-sm divide-y divide-white/[0.05]">
                        {logs.map((log) => (
                           <tr key={log.id} className="group hover:bg-white/[0.02] transition-colors">
                              <td className="px-6 py-4 font-mono text-slate-500 text-xs">{log.id}</td>
                              <td className="px-6 py-4 font-medium text-slate-200 group-hover:text-white">{log.mission}</td>
                              <td className="px-6 py-4 text-slate-400 text-xs uppercase tracking-wider">{log.type}</td>
                              <td className="px-6 py-4"><StatusBadge status={log.status} /></td>
                              <td className="px-6 py-4 text-slate-400 text-xs">{log.personnel}</td>
                              <td className="px-6 py-4 text-right text-slate-500 font-mono text-xs">{log.date}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

          </div>
        </div>
      </main>

      {/* --- AI ASİSTAN BUTONU --- */}
      <button 
         onClick={() => setIsChatOpen(true)}
         className="fixed bottom-6 right-6 w-14 h-14 bg-red-600 hover:bg-red-500 text-white rounded shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center justify-center transition-transform hover:scale-105 z-30 border border-white/10"
      >
         <MessageSquare size={24} />
      </button>

      {/* --- SLIDE-OVER AI PANEL --- */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsChatOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"/>
            <motion.div 
               initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }}
               className="fixed right-0 top-0 bottom-0 w-full md:w-[450px] bg-[#0c0c0e] border-l border-white/10 z-50 flex flex-col shadow-2xl"
            >
               <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#09090b]">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                     <span className="font-bold text-white text-sm tracking-wide">AI COPILOT</span>
                  </div>
                  <button onClick={() => setIsChatOpen(false)}><X size={20} className="text-slate-400 hover:text-white"/></button>
               </div>

               <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#050505]">
                  {messages.length === 0 && (
                     <div className="mt-20 text-center space-y-4">
                        <div className="w-16 h-16 bg-white/5 rounded mx-auto flex items-center justify-center"><Rocket className="text-red-500" size={30}/></div>
                        <p className="text-slate-500 text-sm">Roket sistemleri, envanter veya fizik hesaplamaları hakkında soru sorabilirsiniz.</p>
                     </div>
                  )}
                  {messages.map((m, i) => (
                     <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-3 text-sm border ${m.role === 'user' ? 'bg-red-600/10 border-red-500/20 text-red-100 rounded-tr-none' : 'bg-[#151518] border-white/10 text-slate-300 rounded-tl-none'} rounded-lg`}>
                           {m.content}
                        </div>
                     </div>
                  ))}
                  {loading && <div className="text-xs text-slate-500 animate-pulse ml-2">Veri işleniyor...</div>}
                  <div ref={messagesEndRef} />
               </div>

               <div className="p-4 border-t border-white/10 bg-[#09090b]">
                  <form onSubmit={sendMessage} className="flex gap-2">
                     <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Komut girin..." className="flex-1 bg-[#151518] border border-white/10 rounded px-4 py-3 text-sm focus:border-red-500/50 outline-none text-white"/>
                     <button type="submit" disabled={loading} className="px-4 bg-red-600 hover:bg-red-500 text-white rounded font-medium disabled:opacity-50"><Send size={18}/></button>
                  </form>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- YARDIMCI BİLEŞENLER ---
type NavItemProps = {
   icon: React.ReactNode;
   label: string;
   isOpen: boolean;
   active?: boolean;
};

function NavItem({ icon, label, isOpen, active }: NavItemProps) {
   return (
      <div className={`flex items-center gap-3 px-3 py-3 rounded cursor-pointer transition-all group ${active ? 'bg-red-600/10 border border-red-600/20 text-red-400' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}>
         <span>{icon}</span>
         {isOpen && <span className="text-sm font-medium tracking-wide">{label}</span>}
      </div>
   )
}

type StatCardProps = {
   title: string;
   value: string;
   sub: string;
   icon: React.ReactNode;
   warning?: boolean;
};

function StatCard({ title, value, sub, icon, warning }: StatCardProps) {
   return (
      <div className={`bg-[#0c0c0e] border ${warning ? 'border-orange-500/20 bg-orange-500/5' : 'border-white/[0.08]'} p-5 rounded hover:border-white/[0.15] transition-colors group`}>
         <div className="flex justify-between items-start mb-3">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{title}</p>
            <div className="text-slate-500 group-hover:text-white transition-colors">{icon}</div>
         </div>
         <h3 className="text-2xl font-bold text-white font-mono tracking-tight">{value}</h3>
         <p className={`text-xs mt-1 ${warning ? 'text-orange-400' : 'text-slate-600'}`}>{sub}</p>
      </div>
   )
}

function StatusBadge({ status }: { status: string }) {
   const styles: Record<string, { color: string; bg: string; text: string }> = {
      success: { color: 'text-green-400', bg: 'bg-green-400/10', text: 'BAŞARILI' },
      warning: { color: 'text-orange-400', bg: 'bg-orange-400/10', text: 'DİKKAT' },
      critical: { color: 'text-red-400', bg: 'bg-red-400/10', text: 'KRİTİK' },
      pending: { color: 'text-blue-400', bg: 'bg-blue-400/10', text: 'BEKLİYOR' },
   };
   const s = styles[status];
   return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold tracking-wider border border-white/5 ${s.bg} ${s.color}`}>
         {s.text}
      </span>
   )
}