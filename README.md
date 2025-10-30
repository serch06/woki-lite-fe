# Woki Lite — Frontend

Frontend web app for the **Woki Lite restaurant reservation system**, built for the Appeiron Global Solutions take-home challenge.  
It consumes the public REST API and displays daily reservations per restaurant.

## Tech Stack
- **Next.js 14 (App Router)**
- **TypeScript**
- **TailwindCSS / Nebular UI**
- **Deployed on Vercel:** https://woki-lite-fe.vercel.app/
- **Backend API:** https://woki-lite-be.onrender.com/api/

## Features
✅ View reservations by date  
✅ Paginate between days (Prev / Next)  
✅ Error handling and loading states  
✅ Fully responsive  
✅ Connected to live backend

## Quick Setup
1. Clone the repo and `cd` into `woki-lite-fe/`.
2. Copy the env template: `cp .env.example .env.local` (or create `.env.local`) and set `NEXT_PUBLIC_API_URL=http://localhost:8080/api`.
3. Install dependencies: `pnpm install`.
4. Start the dev server: `pnpm dev` and open `http://localhost:3000`.

## Useful Scripts
- `pnpm dev` — run the Next.js dev server.
- `pnpm build` — build for production.
- `pnpm start` — serve the production build.
- `pnpm lint` — run ESLint.

## Notes
- The frontend depends on the Woki Lite backend; make sure it’s running and that `NEXT_PUBLIC_API_URL` points to the correct API endpoint.
- The main view lives in `app/page.tsx` and uses SWR to fetch `/reservations/day`.
