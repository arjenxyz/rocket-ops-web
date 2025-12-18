'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // Az önce oluşturduğumuz bağlantı dosyası
import { Box, Search, Filter, AlertTriangle, Package, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// Veri Tipi Tanımlaması (Typescript için)
type Item = {
  id: number;
  item_name: string;
  category: string;
  stock: number;
  min_required: number;
  location: string;
  status: string;
};

export default function InventoryPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  // Verileri Supabase'den Çeken Fonksiyon
  async function fetchInventory() {
    setLoading(true);
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .order('id', { ascending: true });

    if (error) console.error('Hata:', error);
    else setItems(data || []);
    setLoading(false);
  }

  // Sayfa açılınca çalıştır
  useEffect(() => {
    const fetchData = async () => {
      await fetchInventory();
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-300 font-sans p-8">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <Link href="/" className="text-slate-500 hover:text-white text-xs uppercase tracking-widest font-bold">← Görev Kontrol</Link>
          </div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Box className="text-orange-500" size={32} />
            ENVANTER YÖNETİMİ
          </h1>
          <p className="text-slate-500 mt-1">Lojistik ve Parça Takip Sistemi</p>
        </div>

        <div className="flex gap-3">
            <button onClick={fetchInventory} className="p-2 border border-white/10 rounded hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <button className="bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded font-medium transition-colors shadow-lg shadow-orange-900/20">
                + Yeni Parça Ekle
            </button>
        </div>
      </div>

      {/* İSTATİSTİK KARTLARI */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
         <div className="bg-[#0c0c0e] border border-white/10 p-5 rounded flex items-center justify-between">
            <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">TOPLAM PARÇA</p>
                <p className="text-2xl font-mono text-white font-bold">{items.reduce((acc, item) => acc + item.stock, 0)}</p>
            </div>
            <Package className="text-slate-600" size={24}/>
         </div>
         <div className="bg-[#0c0c0e] border border-white/10 p-5 rounded flex items-center justify-between">
            <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">KRİTİK STOK</p>
                <p className="text-2xl font-mono text-red-500 font-bold">
                    {items.filter(i => i.stock < i.min_required).length}
                </p>
            </div>
            <AlertTriangle className="text-red-900" size={24}/>
         </div>
         <div className="bg-[#0c0c0e] border border-white/10 p-5 rounded flex items-center justify-between">
             {/* Buraya bütçe veya başka metrik gelebilir */}
             <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">KATEGORİ</p>
                <p className="text-2xl font-mono text-white font-bold">3</p>
            </div>
            <Filter className="text-slate-600" size={24}/>
         </div>
      </div>

      {/* TABLO */}
      <div className="max-w-7xl mx-auto bg-[#0c0c0e] border border-white/10 rounded overflow-hidden">
        {/* Filtre Barı */}
        <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-white/[0.02]">
            <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 text-slate-500" size={16}/>
                <input placeholder="Parça adı veya ID ara..." className="w-full bg-[#151518] border border-white/10 rounded py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-orange-500/50 text-white"/>
            </div>
            <div className="hidden md:flex gap-2">
                <select className="bg-[#151518] border border-white/10 rounded px-3 py-2 text-sm text-slate-300 focus:outline-none">
                    <option>Tüm Kategoriler</option>
                    <option>Elektronik</option>
                    <option>Mekanik</option>
                </select>
            </div>
        </div>

        {/* Liste */}
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-black/20 border-b border-white/5 text-[10px] uppercase tracking-widest text-slate-500 font-mono">
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Parça Adı</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4 text-center">Stok Durumu</th>
                    <th className="px-6 py-4">Konum</th>
                    <th className="px-6 py-4 text-right">Durum</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
                {loading ? (
                    <tr><td colSpan={6} className="p-8 text-center text-slate-500 animate-pulse">Veriler yükleniyor...</td></tr>
                ) : items.map((item) => (
                    <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-6 py-4 font-mono text-slate-600 text-xs">#{item.id}</td>
                        <td className="px-6 py-4 font-medium text-slate-200 group-hover:text-white">{item.item_name}</td>
                        <td className="px-6 py-4 text-slate-400">
                            <span className="px-2 py-1 bg-white/5 rounded text-xs border border-white/5">{item.category}</span>
                        </td>
                        <td className="px-6 py-4 text-center font-mono">
                            <span className={`text-lg font-bold ${item.stock < item.min_required ? 'text-red-500' : 'text-green-500'}`}>{item.stock}</span>
                            <span className="text-slate-600 text-xs ml-1">/ {item.min_required}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-500 text-xs">{item.location}</td>
                        <td className="px-6 py-4 text-right">
                           <StatusBadge status={item.status} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

    </div>
  );
}

// Yardımcı Badge
function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, { color: string; bg: string; text: string }> = {
       nominal: { color: 'text-green-400', bg: 'bg-green-400/10', text: 'YETERLİ' },
       critical: { color: 'text-red-400', bg: 'bg-red-400/10', text: 'KRİTİK SEVİYE' },
       ordering: { color: 'text-orange-400', bg: 'bg-orange-400/10', text: 'SİPARİŞTE' },
    };
    const s = styles[status] || styles.nominal;
    return (
       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider border border-white/5 ${s.bg} ${s.color}`}>
          {s.text === 'KRİTİK SEVİYE' && <AlertTriangle size={10} />}
          {s.text}
       </span>
    )
 }