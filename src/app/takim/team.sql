-- 1. Önce eski tablo varsa temizleyelim (Hata almamak için)
drop table if exists team_members;

-- 2. Yeni, temiz tabloyu oluşturalım
create table team_members (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  role text not null,         -- Örn: Takım Kaptanı
  specialty text,             -- Örn: İtki Sistemleri
  bio text,                   -- Detaylı açıklama
  icon_type text,             -- İkon türü: 'shield', 'cpu', 'rocket', 'code', 'zap'
  image_url text,             -- Profil fotoğrafı linki
  
  -- Sosyal Medya Linkleri
  instagram_url text,
  github_url text,
  linkedin_url text,
  website_url text
);

-- 3. Test için örnek veri ekleyelim (Senin ve hayali bir arkadaşının verisi)
insert into team_members 
(name, role, specialty, bio, icon_type, instagram_url, github_url, linkedin_url, website_url)
values 
(
  'Arjen [Soyadın]', 
  'Takım Kaptanı', 
  'Proje Yönetimi • İtki Sistemleri', 
  'Havacılık tutkusu çocukluktan gelen Arjen, takımın kurucu lideridir. Sistem mimarisi ve roket motoru tasarımı üzerine 4 yıllık deneyime sahip.', 
  'shield',
  'https://instagram.com/arjen',
  'https://github.com/arjen',
  'https://linkedin.com/in/arjen',
  'https://arjen.dev'
),
(
  'Mehmet Yılmaz', 
  'Aviyonik Lideri', 
  'Gömülü Yazılım • PCB Tasarım', 
  'STM32 mikrodenetleyiciler ve Altium Designer konusunda uzman. Takımın uçuş bilgisayarı kartlarını tasarlıyor.', 
  'cpu',
  null, -- Instagram yok
  'https://github.com/mehmet',
  'https://linkedin.com/in/mehmet',
  null
);