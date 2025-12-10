# Infotavle

En React-basert informasjonstavle optimalisert for nettbrett i landskapsmodus. Tavlen viser sanntidsinformasjon nyttig for hverdagen.

## Funksjonalitet

*   **Rutetider:** Sanntidsoppdateringer for busser fra Entur API (Ruter). Viser avganger mot sentrum og mot Østensjø.
    *   Håndterer forsinkelser, kanselleringer og avviksmeldinger.
*   **Vær:** Meteogram fra Yr.no som viser værvarsel for de neste timene.
*   **Strømpriser:** Dagens strømpriser (time for time) fra Hva Koster Strømmen API, vist som en graf med fargekoding (billig/dyr).
*   **Klokke:** Stor og tydelig klokke.

## Teknologier

*   [Vite](https://vitejs.dev/) - Byggverktøy og dev-server.
*   [React](https://reactjs.org/) - Frontend rammeverk.
*   [Tailwind CSS](https://tailwindcss.com/) - Styling.
*   [TanStack Query (React Query)](https://tanstack.com/query/latest) - Datahenting og caching.
*   [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/) - Graf for strømpriser.
*   [Entur API](https://developer.entur.org/) - Kollektivdata.

## Oppsett og Kjøring

1.  **Installer avhengigheter:**
    ```bash
    npm install
    ```

2.  **Start utviklingsserver:**
    ```bash
    npm run dev
    ```

3.  **Bygg for produksjon:**
    ```bash
    npm run build
    ```

## Konfigurasjon

Nøkkelverdier som stoppested (Quay ID), linjenummer og API-URLer kan endres i `src/config.js`.

## Deployment

Prosjektet er satt opp for automatisk deployment til **Netlify**.
*   `netlify.toml` styrer bygginnstillingene (`npm run build`, output til `dist`).
*   `.nvmrc` sikrer at Netlify bruker Node versjon 20.