const osloDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Europe/Oslo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const osloHourFormatter = new Intl.DateTimeFormat("no-NO", {
  timeZone: "Europe/Oslo",
  hour: "2-digit",
});

const POLLEN_NAMES = {
  bjork: "Bjørk",
  burot: "Burot",
  gress: "Gress",
  hassel: "Hassel",
  or: "Or",
  salix: "Salix",
};

const POLLEN_LEVELS = {
  0: "Ingen",
  1: "Beskjeden",
  2: "Moderat",
  3: "Kraftig",
};

const formatOsloDateKey = (date = new Date()) => {
  const parts = osloDateFormatter.formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
};

const roundToSingleDecimal = (value) => Math.round(value * 10) / 10;

export const formatOsloHour = (date) => osloHourFormatter.format(date);

export const getPollenLevelText = (level) => POLLEN_LEVELS[level] ?? "Ukjent";

export const getPollenBadgeClasses = (level) => {
  switch (level) {
    case 1:
      return "border-emerald-300 bg-emerald-500 text-white";
    case 2:
      return "border-yellow-300 bg-yellow-400 text-zinc-950";
    case 3:
      return "border-red-300 bg-red-500 text-white";
    default:
      return "border-zinc-600 bg-zinc-700/60 text-zinc-200";
  }
};

export const getPollenForecastEndpoint = () =>
  import.meta.env.DEV ? "/api/pollen-forecast" : "/.netlify/functions/pollen-forecast";

export const extractPollenPayload = (html) => {
  const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/);
  if (!match) {
    throw new Error("Fant ikke pollen-data i responsen");
  }

  return JSON.parse(match[1]);
};

export const mapPollenForecast = (payload, regionId, now = new Date()) => {
  const forecastData = payload?.props?.pageProps?.data?.forecastData;
  const regionsData = payload?.props?.pageProps?.data?.regionsData ?? [];
  if (!Array.isArray(forecastData)) {
    throw new Error("Ugyldig pollen-data");
  }

  const todayKey = formatOsloDateKey(now);
  const todayForecast = forecastData.find((forecast) => forecast.date === todayKey) ?? forecastData[0];
  const regionForecast = todayForecast?.regions?.find((region) => region.id === regionId);

  if (!regionForecast?.pollen) {
    throw new Error("Fant ikke pollen-varsel for regionen");
  }

  const active = Object.entries(regionForecast.pollen)
    .filter(([, level]) => Number(level) > 0)
    .map(([key, level]) => ({
      key,
      name: POLLEN_NAMES[key] ?? key,
      level: Number(level),
      label: getPollenLevelText(Number(level)),
    }))
    .sort((a, b) => b.level - a.level || a.name.localeCompare(b.name, "no"));

  const regionMeta = regionsData.find((region) => region.id === regionId);

  return {
    date: todayForecast.date,
    active,
    textForecast: regionMeta?.textForecast ?? "",
  };
};

export const mapUvForecast = (forecast, now = new Date()) => {
  const series = forecast?.properties?.timeseries
    ?.map((entry) => {
      const uvIndex = entry?.data?.instant?.details?.ultraviolet_index_clear_sky;
      if (typeof uvIndex !== "number") {
        return null;
      }

      return {
        time: new Date(entry.time),
        uvIndex: roundToSingleDecimal(uvIndex),
      };
    })
    .filter(Boolean);

  if (!series?.length) {
    throw new Error("Fant ikke UV-data i værvarselet");
  }

  const nowTime = now.getTime();
  const todayKey = formatOsloDateKey(now);
  const todaySeries = series.filter((entry) => formatOsloDateKey(entry.time) === todayKey);

  if (!todaySeries.length) {
    throw new Error("Fant ikke UV-data for i dag");
  }

  const current =
    [...todaySeries].reverse().find((entry) => entry.time.getTime() <= nowTime) ?? todaySeries[0];

  const max = todaySeries.reduce((highest, entry) =>
    entry.uvIndex > highest.uvIndex ? entry : highest
  );

  return {
    current: current.uvIndex,
    currentTime: current.time.toISOString(),
    max: max.uvIndex,
    maxTime: max.time.toISOString(),
  };
};
