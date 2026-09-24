alter table public.bookings add column if not exists provider_order_id text;
create unique index if not exists bookings_provider_order_id_unique on public.bookings(provider_order_id) where provider_order_id is not null;
create policy "bookings insert own rows" on public.bookings for insert with check (auth.uid() = user_id);
create policy "bookings update own rows" on public.bookings for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "booking passengers insert through booking owner" on public.booking_passengers for insert with check (exists (select 1 from public.bookings b where b.id = booking_id and b.user_id = auth.uid()));
create policy "flight updates insert own booking" on public.flight_updates for insert with check (exists (select 1 from public.bookings b where b.id = booking_id and b.user_id = auth.uid()));
create policy "flight updates update own booking" on public.flight_updates for update using (exists (select 1 from public.bookings b where b.id = booking_id and b.user_id = auth.uid())) with check (exists (select 1 from public.bookings b where b.id = booking_id and b.user_id = auth.uid()));