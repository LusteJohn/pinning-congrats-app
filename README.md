# SUNN Pinning Day — React + Vite

A celebration page for a SUNN internship pinning and deployment.
Tap the SUNN logo pin, then tap the name tag.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Customize

- Course on the name tag: default is `BTLED-ICT` in `src/App.jsx`, or edit the Course box on the page.
- Names: edit the defaults in `src/App.jsx` (`useState('Zenneth Cellon')`) or type them into the boxes on the page.
- Report card lines: `src/components/ReportCard.jsx`
- Love letter: `src/components/Letter.jsx`
- Colors and fonts: CSS variables at the top of `src/styles.css`
- Logo: replace `src/assets/sunn-logo.png`
