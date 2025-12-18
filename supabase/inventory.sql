-- ROCKET OPS: ENVANTER YÖNETÝMÝ
-- Parçalarýn stok takibi ve konum bilgisi

create table public.inventory (
  id bigint generated always as identity primary key,
  item_name text not null,
  category text, -- Örn: Elektronik, Mekanik, Ýtki
  stock int default 0,
  min_required int default 1, -- Kritik seviye uyarýsý için
  location text, -- Örn: Raf A1
  status text check (status in ('nominal', 'critical', 'ordering')),
  last_updated timestamp with time zone default timezone('utc'::text, now())
);

-- Örnek Veri
insert into public.inventory (item_name, category, stock, min_required, location, status)
values
  ('LiPo Pil 4S 1500mAh', 'Elektronik', 2, 5, 'Kutu E-1', 'critical'),
  ('BME280 Sensör', 'Elektronik', 8, 4, 'Çekmece 2', 'nominal'),
  ('Fiber Gövde Borusu', 'Mekanik', 3, 2, 'Raf M-1', 'nominal');
