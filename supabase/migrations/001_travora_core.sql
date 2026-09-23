create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.passengers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  date_of_birth date,
  nationality text,
  passport_number text,
  passport_expiry date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.flight_searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  trip_type text not null default 'round_trip' check (trip_type in ('round_trip','one_way','multi_city')),
  origin text not null,
  destination text not null,
  departure_date date not null,
  return_date date,
  travellers integer not null default 1 check (travellers > 0 and travellers <= 9),
  cabin_class text not null default 'economy',
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  booking_reference text not null unique,
  provider text,
  provider_booking_reference text,
  status text not null default 'pending' check (status in ('pending','confirmed','cancelled','completed','refunded')),
  currency text not null default 'NGN',
  total_amount numeric(14,2),
  itinerary jsonb not null default '{}'::jsonb,
  booked_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.booking_passengers (
  booking_id uuid not null references public.bookings(id) on delete cascade,
  passenger_id uuid not null references public.passengers(id) on delete restrict,
  primary key (booking_id, passenger_id)
);

create table if not exists public.flight_updates (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  flight_number text,
  status text,
  departure_gate text,
  arrival_gate text,
  scheduled_departure timestamptz,
  estimated_departure timestamptz,
  scheduled_arrival timestamptz,
  estimated_arrival timestamptz,
  updated_at timestamptz not null default now()
);

create index if not exists passengers_user_id_idx on public.passengers(user_id);
create index if not exists bookings_user_id_idx on public.bookings(user_id);
create index if not exists bookings_status_idx on public.bookings(status);
create index if not exists searches_user_id_idx on public.flight_searches(user_id);
create index if not exists flight_updates_booking_id_idx on public.flight_updates(booking_id);

alter table public.profiles enable row level security;
alter table public.passengers enable row level security;
alter table public.flight_searches enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_passengers enable row level security;
alter table public.flight_updates enable row level security;

create policy "profiles own row" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "passengers own rows" on public.passengers for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "searches own rows" on public.flight_searches for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "bookings own rows" on public.bookings for select using (auth.uid() = user_id);
create policy "booking passengers through booking owner" on public.booking_passengers for select using (
  exists (select 1 from public.bookings b where b.id = booking_id and b.user_id = auth.uid())
);
create policy "flight updates through booking owner" on public.flight_updates for select using (
  exists (select 1 from public.bookings b where b.id = booking_id and b.user_id = auth.uid())
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();