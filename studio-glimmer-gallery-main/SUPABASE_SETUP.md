# Supabase Setup

The site uses Supabase Auth for admin sign-in, Postgres for media metadata, and a private Supabase Storage bucket for photos, videos, and thumbnails. The browser only uses the public project URL and anon/publishable key. Authorization is based on the authenticated user's UUID in `public.admin_users` and requires `enabled = true`.

## 1. Create The Supabase Project

Create a project at [supabase.com](https://supabase.com). In **Authentication → Providers**, enable **Email**. Create the first user in **Authentication → Users** and confirm its email if confirmation is enabled.

## 2. Apply The Database Migrations

Apply these files, in order, using the Supabase SQL Editor:

1. `supabase/migrations/20261001000000_studio_media.sql`
2. `supabase/migrations/20261002000000_enabled_admin_access.sql`

Alternatively, link the Supabase CLI to the project and run `npx supabase db push`. These migrations create/reuse `public.admin_users`, `public.albums`, `public.media`, and the other studio tables; enable RLS; and create the private `studio-media` bucket and its policies. Do not disable RLS or replace admin write policies with unrestricted policies.

## 3. Authorize The First Admin

In **Authentication → Users**, copy the new user's UUID. Add that UUID to the existing authorization table from the SQL Editor:

```sql
insert into public.admin_users (id, display_name, enabled)
values ('AUTH_USER_UUID_HERE', 'Studio Admin', true);
```

The UUID must be the Supabase Auth user's `id`; an email match alone never grants access. To revoke an admin, set `enabled = false` for that UUID. Do not add an admin from browser code.

## 4. Configure Storage

The migrations create the private bucket named `studio-media` with a 500 MiB upload limit and image/video MIME restrictions. Keep the bucket private. Admin uploads, replacements, and deletes are allowed only when `public.is_admin()` confirms an enabled row for `auth.uid()`. Published media can be viewed through short-lived signed URLs; unpublished media remains admin-only.

The admin uploader stores photos and videos under a UUID-based user path and stores metadata in `public.media`. Public gallery queries return only published records. Admin media management supports listing, search, categories, previews, metadata edits, publishing, and deletion.

## 5. Set Local Environment Variables

Create or edit `.env.local` in the repository root:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

Use the project's **Project URL** and its **anon/public** key (including a `sb_publishable_...` key if shown). These two `VITE_` values are included in browser code and are public by design; RLS is what protects the database and storage. Never use or expose a `service_role` key, secret API key, database password, or private server key in a `VITE_` variable. `.env.local` is ignored by Git. Restart the dev server after changing it.

## 6. Configure Netlify

In **Netlify → Site configuration → Environment variables**, add these variables for the production deploy context:

- `VITE_SUPABASE_URL` = the Supabase Project URL
- `VITE_SUPABASE_ANON_KEY` = the Supabase anon/public key

Set the same variables for deploy previews if previews need Supabase access. Netlify does not read local `.env.local`. The repository's `netlify.toml` runs `npm run build` and the Vite Netlify plugin configures the TanStack Start deployment output. Save the variables and trigger a new deploy after adding or changing them.

For a CLI deployment, authenticate and link the Netlify site once, then run:

```sh
npm install
npm run build
npx netlify deploy --build --prod
```

## 7. Run Locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, then visit `/admin/login`. The admin dashboard remains protected until Supabase Auth succeeds and the user's UUID has an enabled `admin_users` row.

## 8. Verification Checklist

- Confirm `studio-media` exists and is private.
- Visit `/admin/login` with missing/placeholder variables and confirm the configuration message appears.
- Sign in with the Auth user whose UUID is enabled in `admin_users`.
- Confirm an authenticated user with no row, or with `enabled = false`, cannot access `/admin` or its sections.
- Upload a photo and a video; confirm progress, metadata, and storage objects persist after a reload.
- Edit, publish/unpublish, search, preview, and delete media; confirm deleted objects are removed from Storage.
- Confirm published media appears in the public gallery and unpublished media does not.
- Confirm anonymous users cannot insert, update, or delete media rows or Storage objects.
- Build and deploy after setting the Netlify environment variables.

## Database And Storage Names

- Admin authorization: `public.admin_users` (`id` references `auth.users.id`; `enabled` must be true).
- Media metadata: `public.media`.
- Album metadata: `public.albums`.
- Storage bucket: `studio-media` (private).
- Public browser variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.