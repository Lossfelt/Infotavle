import { useQuery } from "@tanstack/react-query";
import { Leaf, Loader2, SunMedium } from "lucide-react";
import config from "../config";
import {
  extractPollenPayload,
  formatOsloHour,
  getPollenBadgeClasses,
  getPollenForecastEndpoint,
  mapPollenForecast,
  mapUvForecast,
} from "../utils/environment";

const fetchUvStatus = async () => {
  const { latitude, longitude } = config.location;
  const url = `${config.urls.metForecast}?lat=${latitude}&lon=${longitude}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`UV-feil ${response.status}`);
  }

  const forecast = await response.json();
  return mapUvForecast(forecast);
};

const fetchPollenStatus = async () => {
  const response = await fetch(getPollenForecastEndpoint());
  if (!response.ok) {
    throw new Error(`Pollen-feil ${response.status}`);
  }

  const html = await response.text();
  const payload = extractPollenPayload(html);
  return mapPollenForecast(payload, config.location.pollenRegionId);
};

const EnvironmentStatus = () => {
  const {
    data: uvStatus,
    isLoading: isLoadingUv,
    error: uvError,
  } = useQuery({
    queryKey: ["uv-status", config.location.latitude, config.location.longitude],
    queryFn: fetchUvStatus,
    refetchInterval: config.refetchIntervals.uv,
  });

  const {
    data: pollenStatus,
    isLoading: isLoadingPollen,
    error: pollenError,
  } = useQuery({
    queryKey: ["pollen-status", config.location.pollenRegionId],
    queryFn: fetchPollenStatus,
    refetchInterval: config.refetchIntervals.pollen,
  });

  return (
    <div className="flex min-w-0 items-center justify-end gap-2">
      <div className="flex min-w-[11rem] items-center gap-2 rounded-lg border border-amber-400/30 bg-zinc-800 px-3 py-1">
        <SunMedium className="h-[1.35rem] w-[1.35rem] shrink-0 text-amber-300" />

        {isLoadingUv && !uvStatus ? (
          <Loader2 className="h-4 w-4 animate-spin text-zinc-300" />
        ) : uvError ? (
          <span className="text-xs font-medium text-zinc-400">UV utilgjengelig</span>
        ) : (
          <div className="leading-tight">
            <div className="flex flex-wrap items-center gap-1 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-amber-200">
              <span>UV</span>
              <span className="text-zinc-400">lav 0-2</span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-400">moderat 3-5</span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-400">høy 6+</span>
            </div>
            <div className="text-xs font-semibold text-white">
              Nå {uvStatus.current.toFixed(1)}
              <span className="ml-2 text-[0.65rem] font-medium text-zinc-300">
                maks {uvStatus.max.toFixed(1)} kl {formatOsloHour(new Date(uvStatus.maxTime))}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex min-w-0 items-center gap-2 rounded-lg border border-emerald-400/20 bg-zinc-800 px-3 py-1">
        <Leaf className="h-5 w-5 shrink-0 text-emerald-300" />

        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-emerald-200">
            Pollen
          </span>

          {isLoadingPollen && !pollenStatus ? (
            <Loader2 className="h-4 w-4 animate-spin text-zinc-300" />
          ) : pollenError ? (
            <span
              className="rounded-md border border-zinc-600 bg-zinc-900/70 px-2 py-1 text-xs font-medium text-zinc-300"
              title="Pollenkilden svarte ikke eller er ikke tilgjengelig"
            >
              Kilde utilgjengelig
            </span>
          ) : pollenStatus.active.length ? (
            pollenStatus.active.map((pollen) => (
              <span
                key={pollen.key}
                title={`${pollen.name}: ${pollen.label}`}
                className={`rounded-md border px-2 py-1 text-xs font-semibold ${getPollenBadgeClasses(
                  pollen.level
                )}`}
              >
                {pollen.name}
              </span>
            ))
          ) : (
            <span className="text-xs font-medium text-zinc-400">Ingen spredning</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentStatus;
