# CampusConnect - MVP v2 (Next.js + TypeScript + Tailwind + Neon/Postgres)

## What this project contains
- Next.js app-router scaffold (app/...) with TypeScript
- Tailwind CSS setup
- API route: `/api/listings` (GET and POST)
- PostgreSQL connection via `pg` (lib/db.ts)
- SQL init script at `sql/init.sql` to create the unified `listings` table
- Three post forms:
  - Find a Hostel -> role = 'find_hostel'
  - Find a Roommate -> role = 'find_roommate'
  - Post an Apartment -> role = 'post_apartment'

## Setup (local)
1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and paste your Neon (Postgres) connection string:
   ```
   DATABASE_URL=postgresql://...
   NEXT_PUBLIC_WA_DEFAULT=234803...
   ```

3. Initialize the database (run the SQL in `sql/init.sql`) using psql or the Neon dashboard.

4. Run the dev server:
   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`

## Notes
- No login; postings are public.
- WhatsApp connect button uses the `phone` field from the listing. If listing phone is empty, it will fallback to `NEXT_PUBLIC_WA_DEFAULT`.
- When deploying to Vercel, set `DATABASE_URL` and `NEXT_PUBLIC_WA_DEFAULT` in the project environment variables.
