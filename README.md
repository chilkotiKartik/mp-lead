# MP LEAD

Legislative Exposure & Administrative Development Fellowship — a Next.js
(App Router) site with real, working functionality: an animated public
site, a fellow portal dashboard, and an admin command centre that reads
live application data.

## Stack

- Next.js 16 (App Router, Server Actions)
- Tailwind CSS v4
- `motion` (Framer Motion) for animation
- A lightweight file-backed store (`src/lib/applications.ts`) for the
  application pipeline — swap for a real database before production.

## Develop

```bash
npm install
npm run dev
```

## Structure

- `src/app/(marketing pages)` — homepage, fellowship, journey, fellows,
  projects, alumni, contact, media
- `src/app/apply` — multi-step application form (Server Action-backed,
  persists to disk) + `/apply/track` status lookup
- `src/app/portal` — fellow portal dashboard (static demo data)
- `src/app/admin` — admin command centre (reads live application data)
- `src/lib/data.ts` — public content (stats, journey stages, fellows,
  projects)
- `design/` — earlier static design-canvas concept exploration

## Honest scope notes

This is a real full-stack app (working forms, persistence, live
dashboards) but not the complete production system described in the
original brief — there is no authentication/RBAC, mentor/reviewer
portals, CMS, or real database yet. Photography is placeholder
color-blocked treatment pending cleared real photography.
