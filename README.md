# Woki Lite Frontend

Next.js dashboard for browsing daily reservations.

## Requirements
- Node.js 18+ (LTS recommended)
- PNPM 8+

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
