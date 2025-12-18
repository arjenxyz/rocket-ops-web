-- ROCKET OPS: GÖREV KAYITLARI (LOGBOOK)
-- Ana Dashboard'daki akýþ ve geçmiþ görevler

create table public.mission_logs (
  id bigint generated always as identity primary key,
  mission_name text not null, -- Örn: Düþük Ýrtifa Testi
  type text, -- Örn: Launch, Static Fire, Simülasyon
  status text check (status in ('success', 'warning', 'critical', 'pending')),
  personnel text, -- Görevden sorumlu kiþi/ekip
  details text, -- Ek açýklamalar
  mission_date timestamp with time zone default timezone('utc'::text, now())
);

-- Örnek Veri
insert into public.mission_logs (mission_name, type, status, personnel, details)
values
  ('Prototip-A Ateþleme', 'Static Fire', 'success', 'Ýtki Takýmý', 'Motor nominal deðerlerde çalýþtý.'),
  ('Paraþüt Açýlma Testi', 'Recovery', 'warning', 'Arjen', 'Gecikmeli açýlma gözlemlendi.');
