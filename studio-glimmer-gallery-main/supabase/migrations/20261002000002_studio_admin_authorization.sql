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

alter table public.studio_admins enable row level security;
revoke all on table public.studio_admins from anon, public;
grant select on table public.studio_admins to authenticated;
grant update (name) on table public.studio_admins to authenticated;

drop policy if exists "Admins can read their own record" on public.studio_admins;
create policy "Admins can read their own record" on public.studio_admins
  for select to authenticated
  using (id = (select auth.uid()));

drop policy if exists "Admins can update their own name" on public.studio_admins;
create policy "Admins can update their own name" on public.studio_admins
  for update to authenticated
  using (id = (select auth.uid()) and enabled = true and role = 'admin')
  with check (id = (select auth.uid()) and enabled = true and role = 'admin');