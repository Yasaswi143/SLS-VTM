create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  category text not null default 'Other',
  event_date date,
  cover_path text,
  is_published boolean not null default false,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  original_filename text not null,
  file_path text not null unique,
  thumbnail_path text,
  media_type text not null check (media_type in ('photo', 'video')),
  category text not null default 'Other',
  album_id uuid references public.albums(id) on delete set null,
  tags text[] not null default '{}',
  event_date date,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  uploaded_by uuid not null references auth.users(id),
  file_size bigint not null default 0 check (file_size >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists media_public_gallery_idx on public.media (is_published, media_type, created_at desc);
create index if not exists media_album_idx on public.media (album_id);
create index if not exists albums_public_idx on public.albums (is_published, created_at desc);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null default '',
  event_type text not null default '',
  service text not null default '',
  event_date date,
  location text not null default '',
  message text not null default '',
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id integer primary key default 1 check (id = 1),
  phone text not null default '+919133418773',
  email text not null default 'kemasaivenkatayasaswi@gmail.com',
  address text not null default 'Chirala Road, Vetapalem, near Venkateswara Temple, Andhra Pradesh',
  hours text not null default 'Mon – Sat · 9:00 AM – 9:00 PM',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values (1) on conflict (id) do nothing;

alter table public.admin_users enable row level security;
alter table public.albums enable row level security;
alter table public.media enable row level security;
alter table public.enquiries enable row level security;
alter table public.site_settings enable row level security;

create policy "admins can read their own admin record" on public.admin_users
  for select to authenticated using (id = (select auth.uid()));
create policy "admins can update their own profile" on public.admin_users
  for update to authenticated using (id = (select auth.uid()) and (select public.is_admin()))
  with check (id = (select auth.uid()) and (select public.is_admin()));

create policy "public reads published albums" on public.albums
  for select to anon, authenticated using (is_published or (select public.is_admin()));
create policy "admins manage albums" on public.albums
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "public reads published media" on public.media
  for select to anon, authenticated using (is_published or (select public.is_admin()));
create policy "admins manage media" on public.media
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "visitors can submit enquiries" on public.enquiries
  for insert to anon, authenticated with check (
    char_length(name) between 1 and 160 and
    char_length(phone) between 7 and 40 and
    char_length(email) <= 254 and
    char_length(message) <= 5000
  );
create policy "admins manage enquiries" on public.enquiries
  for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create policy "public reads website contact settings" on public.site_settings
  for select to anon, authenticated using (true);
create policy "admins update website settings" on public.site_settings
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'studio-media',
  'studio-media',
  false,
  524288000,
  array['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "read published media objects" on storage.objects
  for select to anon, authenticated using (
    bucket_id = 'studio-media' and (
      (select public.is_admin()) or
      exists (
        select 1 from public.media m
        where (m.file_path = name or m.thumbnail_path = name) and m.is_published
      ) or
      exists (
        select 1 from public.albums a
        where a.cover_path = name and a.is_published
      )
    )
  );
create policy "admins upload media objects" on storage.objects
  for insert to authenticated with check (bucket_id = 'studio-media' and (select public.is_admin()));
create policy "admins update media objects" on storage.objects
  for update to authenticated using (bucket_id = 'studio-media' and (select public.is_admin()))
  with check (bucket_id = 'studio-media' and (select public.is_admin()));
create policy "admins delete media objects" on storage.objects
  for delete to authenticated using (bucket_id = 'studio-media' and (select public.is_admin()));

do $$
begin
  alter publication supabase_realtime add table public.media;
exception when duplicate_object then
  null;
end;
$$;

do $$
begin
  alter publication supabase_realtime add table public.site_settings;
exception when duplicate_object then
  null;
end;
$$;