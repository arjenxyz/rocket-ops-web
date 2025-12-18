-- ROCKET OPS: TELEMETRÝ VERÝTABANI
-- Uçuþ sýrasýnda veya testlerde sensörlerden gelen ham veriler

create table public.telemetry (
  id bigint generated always as identity primary key,
  mission_id bigint references public.mission_logs(id), -- Hangi göreve ait olduðu
  timestamp float, -- Uçuþ süresi (saniye) T+0.1, T+0.2 vb.
  altitude float, -- Ýrtifa (metre)
  velocity float, -- Hýz (m/s)
  acceleration float, -- Ývme (m/s^2)
  temperature float, -- Sýcaklýk (C)
  voltage float, -- Batarya voltajý
  created_at timestamp with time zone default timezone('utc'::text, now())
);
