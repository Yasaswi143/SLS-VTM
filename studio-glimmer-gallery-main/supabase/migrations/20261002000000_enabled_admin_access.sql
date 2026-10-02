alter table public.admin_users
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
    from public.admin_users
    where id = (select auth.uid())
      and enabled = true
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

revoke all on public.admin_users from anon;
grant select on public.admin_users to authenticated;
revoke update on public.admin_users from authenticated;
grant update (display_name) on public.admin_users to authenticated;

drop policy if exists "admins can read their own admin record" on public.admin_users;
create policy "admins can read their own admin record" on public.admin_users
  for select to authenticated
  using (id = (select auth.uid()) and enabled = true);

drop policy if exists "admins can update their own profile" on public.admin_users;
create policy "admins can update their own profile" on public.admin_users
  for update to authenticated
  using (id = (select auth.uid()) and (select public.is_admin()))
  with check (id = (select auth.uid()) and (select public.is_admin()));

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
