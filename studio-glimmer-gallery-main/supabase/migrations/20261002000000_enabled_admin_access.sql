alter table public.studio_admins
  add column if not exists enabled boolean not null default true;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.studio_admins
    where id = (select auth.uid())
      and enabled = true
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

revoke all on public.studio_admins from anon, public;
grant select on public.studio_admins to authenticated;
revoke update on public.studio_admins from authenticated;
grant update (name) on public.studio_admins to authenticated;

drop policy if exists "Admins can read their own record" on public.studio_admins;
create policy "Admins can read their own record" on public.studio_admins
  for select to authenticated
  using (id = (select auth.uid()));

drop policy if exists "Admins can update their own name" on public.studio_admins;
create policy "Admins can update their own name" on public.studio_admins
  for update to authenticated
  using (id = (select auth.uid()) and enabled = true and role = 'admin')
  with check (id = (select auth.uid()) and enabled = true and role = 'admin');

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

drop policy if exists "read published media objects" on storage.objects;
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

drop policy if exists "admins upload media objects" on storage.objects;
create policy "admins upload media objects" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'studio-media' and (select public.is_admin()));

drop policy if exists "admins update media objects" on storage.objects;
create policy "admins update media objects" on storage.objects
  for update to authenticated
  using (bucket_id = 'studio-media' and (select public.is_admin()))
  with check (bucket_id = 'studio-media' and (select public.is_admin()));

drop policy if exists "admins delete media objects" on storage.objects;
create policy "admins delete media objects" on storage.objects
  for delete to authenticated
  using (bucket_id = 'studio-media' and (select public.is_admin()));
