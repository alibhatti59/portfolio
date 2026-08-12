# Ali Bhatti: Portfolio

React + Vite + Three.js (via React Three Fiber) single-page portfolio site.
Hero features an animated 3D AI Core scene with orbiting modules.

## Run locally

```
npm install
npm run dev
```

Opens at http://localhost:5173

## Edit content

Everything lives in `src/App.jsx`:
- `AUTOMATION_WORK`, `FULLSTACK_WORK`: project case studies
- `STACK_LAYERS`, `STACK_INTRO`: skills section
- `JOURNEY`: career path section
- `CERTIFICATIONS`: About page certifications list
- `CONTACT_LINKS`: contact icons (email, LinkedIn, GitHub, YouTube, Facebook, WhatsApp)

Colors and fonts are design tokens in `src/index.css` (`:root` variables).
The 3D hero scene is in `src/PipelineScene.jsx`.
The 3D skills visual is in `src/TechPlanet.jsx`.

## Deploy (free)

1. Push this repo to GitHub.
2. Go to vercel.com, sign in with GitHub, click "Add New Project," import this repo.
3. Vercel auto-detects Vite, leave build settings as default, click Deploy.
4. Every future `git push` auto-deploys.
