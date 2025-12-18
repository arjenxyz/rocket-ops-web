-- ROCKET OPS: UÇUÞ ÖNCESÝ KONTROL LÝSTESÝ
-- Fýrlatma öncesi güvenlik prosedürleri

create table public.checklist (
  id bigint generated always as identity primary key,
  item_text text not null, -- Örn: 'Motor igniter baðlantýsýný kontrol et'
  category text, -- Örn: 'Avionics', 'Safety', 'Propulsion'
  is_checked boolean default false,
  checked_by text, -- Kontrolü yapan kiþi
  checked_at timestamp with time zone
);

-- Varsayýlan Kontrol Listesi
insert into public.checklist (item_text, category)
values
  ('Batarya voltajý > 11.1V', 'Avionics'),
  ('SD Kart takýlý ve boþ', 'Avionics'),
  ('Motor montaj vidalarý sýký', 'Propulsion'),
  ('Kurtarma sistemi pimi takýlý', 'Safety'),
  ('Rüzgar hýzý < 20 km/h', 'Safety');
