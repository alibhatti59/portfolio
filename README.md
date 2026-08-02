# Ali Bhatti — Portfolio

React + Vite + Three.js (via React Three Fiber) portfolio site. Hero features an
animated 3D node graph representing an automation pipeline (GHL → Vapi → Make → n8n).

## Run locally

```
npm install
npm run dev
```

Opens at http://localhost:5173

## Edit content

Site is now multi-page (React Router):
- `src/pages/Home.jsx` — hero, automation work, full-stack work, stack (`AUTOMATION_WORK`, `FULLSTACK_WORK`, `STACK_LAYERS`)
- `src/pages/About.jsx` — bio + certifications (`CERTIFICATIONS`)
- `src/pages/Contact.jsx` — links (`LINKS` — WhatsApp Business number still needs to be added here)
- `src/components/Nav.jsx` — top navigation

Colors and fonts are design tokens in `src/index.css` (`:root` variables).
The 3D hero scene is in `src/PipelineScene.jsx`.

## Deploy (free)

1. Push this repo to GitHub.
2. Go to vercel.com → sign in with GitHub → "Add New Project" → import this repo.
3. Vercel auto-detects Vite — leave build settings as default → Deploy.
4. Every future `git push` auto-deploys.
