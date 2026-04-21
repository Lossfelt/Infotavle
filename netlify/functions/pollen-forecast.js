export async function handler() {
  try {
    const response = await fetch("https://pollenvarsel.naaf.no/charts/forecast", {
      headers: {
        Accept: "text/html",
        "User-Agent": "lossfelt-tavle/2.0",
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: `Feil fra pollen-kilde: ${response.status}`,
      };
    }

    const html = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
      },
      body: html,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error instanceof Error ? error.message : "Ukjent feil ved pollen-henting",
    };
  }
}
