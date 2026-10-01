# Admin media setup

The admin system uses Supabase Auth, Postgres with row-level security, and a private Supabase Storage bucket. No service-role key or database password belongs in the browser.

1. Create a Supabase project.
2. In the Supabase SQL editor, run `supabase/migrations/20261001000000_studio_media.sql`.
3. Create the owner in Supabase Authentication (email/password). Disable public sign-ups in Authentication settings.
4. Add the owner to `admin_users` from the SQL editor, replacing the email with the owner's login email:

   ```sql
   insert into public.admin_users (id, display_name)
   select id, 'Studio Admin' from auth.users where email = 'owner@example.com';
   ```

5. Copy `.env.example` to `.env.local` and set the Supabase project URL and publishable/anon key. These two `VITE_` values are public client configuration; never add a service-role key here.
6. In Netlify, add the same two `VITE_` values under the site's environment variables, then redeploy. Keep the service-role key and database password out of Netlify's frontend environment.
7. Restart the Vite server and open `/admin/login`.
8. Configure the Supabase Auth site's Site URL and redirect allow-list for local development and the deployed site. Add `/admin/reset` to the allowed redirect URLs.

Uploads are resumable and stored in the private `studio-media` bucket. Public pages can read signed URLs only for published media; authenticated admin writes are enforced by database and Storage RLS policies. Images are resized and converted to WebP in the browser before upload. Videos are limited to 500 MB and uploaded in resumable chunks.

The migration enables realtime updates for published media and the site's editable phone, email, address, and hours. Confirm `media` and `site_settings` are included in the `supabase_realtime` publication if you change the database publication settings.

The project is TanStack Start with server rendering, so its deployable site is not a plain static Vite `dist` app. `vite.config.ts` selects Nitro's Netlify preset; the build output is generated under `.output` and includes the server/function output plus `.output/public`. Deploy the Nitro-generated Netlify output, not a nonexistent `dist/client` directory. Supabase remains the separately hosted backend and persistent media store.