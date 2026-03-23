# Personal Site

Starter Next.js app for rebuilding `milliewu.io` in code instead of WordPress.

## Commands

```bash
npm install
npm run dev
```

## Contact form setup

The contact form now posts to `/api/contact` and sends mail through Resend.

1. Copy `.env.example` to `.env.local`.
2. Add your `RESEND_API_KEY`.
3. Optional: set `CONTACT_FROM_EMAIL` to a verified sender on your domain.
4. Optional: set `CONTACT_TO_EMAIL` if you want submissions to go somewhere other than the email in `content/site.ts`.

If `RESEND_API_KEY` is missing, the form falls back to opening a prefilled email draft.

## What to edit first

- `content/site.ts`: your bio, links, and project cards
- `app/page.tsx`: homepage structure
- `app/globals.css`: visual design and layout

## Suggested next steps

1. Replace placeholder copy with your real intro, projects, and links.
2. Add images for your work and a proper headshot if you want one.
3. Add an `/about` page or `/projects/[slug]` pages for deeper case studies.
4. Deploy to Vercel, then point `milliewu.io` to the new site from Hostinger DNS.
