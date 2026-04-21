# Infotavle

En React-basert informasjonstavle optimalisert for nettbrett i landskapsmodus. Tavlen viser sanntidsinformasjon som er nyttig i hverdagen.

## Funksjonalitet

- **Rutetider:** Sanntidsoppdateringer for bussavganger fra Entur API.
  Viser i dagens oppsett linje 70/70E, 78A og 79 i egne kolonner.
- **Avvik:** Samler og viser avviksmeldinger knyttet til avgangene.
- **Vær:** Meteogram fra Yr.no for Oslo.
- **UV-status:** Kompakt visning av UV-nivå nå og forventet topp for dagen, hentet fra MET sitt `locationforecast`-API.
- **Pollenstatus:** Fargekodede pollenetiketter for aktive pollentyper i Oslo-området.
  Data hentes via en Netlify-funksjon som leser NAAF sitt pollenvarsel.
- **Klokke:** Stor klokke i toppraden.
- **Strømpriser:** Koden for strømpriser er fortsatt i prosjektet, men vises ikke i dagens layout.

## Teknologier

- [Vite](https://vitejs.dev/) - Byggverktøy og dev-server.
- [React](https://react.dev/) - Frontend-rammeverk.
- [Tailwind CSS](https://tailwindcss.com/) - Styling.
- [TanStack Query](https://tanstack.com/query/latest) - Datahenting og caching.
- [graphql-request](https://www.npmjs.com/package/graphql-request) - Kall mot Entur GraphQL.
- [Entur API](https://developer.entur.org/) - Kollektivdata.
- [MET Locationforecast](https://api.met.no/weatherapi/locationforecast/2.0/documentation) - UV-data.
- [Netlify Functions](https://docs.netlify.com/functions/overview/) - Proxy for pollenhenting.

## Oppsett og kjøring

1. Installer avhengigheter:
   ```bash
   npm install
   ```

2. Start utviklingsserver:
   ```bash
   npm run dev
   ```

3. Kjør lint:
   ```bash
   npm run lint
   ```

4. Bygg for produksjon:
   ```bash
   npm run build
   ```

## Konfigurasjon

Nøkkelverdier som sted, stoppested, linjer og oppdateringsintervaller ligger i `src/config.js`.

## Pollenkilde

Pollen hentes ikke direkte fra nettleseren. I utvikling brukes Vite-proxyen `/api/pollen-forecast`, og i produksjon brukes Netlify-funksjonen `/.netlify/functions/pollen-forecast`.

Hvis pollenkilden ikke svarer eller blokkerer forespørsler, viser tavlen en tydelig fallback i stedet for pollenetikettene.

## Deployment

Prosjektet er satt opp for automatisk deployment til **Netlify**.

- `netlify.toml` styrer bygginnstillingene med `npm run build` og publisering fra `dist`.
- `.nvmrc` sikrer at Netlify bruker Node 20.
- `netlify/functions/pollen-forecast.js` brukes for pollenhenting i produksjon.
