import { useQuery } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import Clock from "./Clock";
import Strompriser from "./Strompriser";
import PresenterAvganger from "./PresenterAvganger";
import EnvironmentStatus from "./EnvironmentStatus";
import { definerQuery } from "../utils/funcQuery";
import { behandleRutetider } from "../utils/funcRutetider";
import { handleSituations } from "../utils/funcHandleSituations";
import config from "../config";
import { Loader2 } from "lucide-react";

const fetchRutetider = async () => {
  const { enturGraphQl, clientName } = config.api;
  const graphQLClient = new GraphQLClient(enturGraphQl, {
    headers: { "et-client-name": clientName }
  });
  const query = definerQuery();
  return graphQLClient.request(query);
};

const flattenEstimatedCalls = (stopPlace) =>
  stopPlace?.quays?.flatMap((quay) =>
    quay.estimatedCalls.map((estimatedCall) => ({
      ...estimatedCall,
      quay: { id: quay.id },
    }))
  ) ?? [];

const Rutetider = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rutetider"],
    queryFn: fetchRutetider,
    refetchInterval: config.refetchIntervals.rutetider,
  });

  let departures = {
    line70National: [],
    line78Ostensjo: [],
    line79Asbraten: [],
    line79Grorud: [],
  };
  let situations = "";

  if (data) {
    const estimatedCalls = flattenEstimatedCalls(data.stopPlace);
    departures = behandleRutetider(estimatedCalls);
    situations = handleSituations(Object.values(departures));
  }

  const showStrompriser = config.ui.showStrompriser;
  const departureColumns = showStrompriser
    ? [
        { title: "70/70E National", avganger: departures.line70National },
        { title: "78A Østensjø", avganger: departures.line78Ostensjo },
      ]
    : [
        { title: "70/70E National", avganger: departures.line70National },
        { title: "78A Østensjø", avganger: departures.line78Ostensjo },
        { title: "79 Åsbråten", avganger: departures.line79Asbraten },
        { title: "79 Grorud T", avganger: departures.line79Grorud },
      ];

  const gridClassName = showStrompriser
    ? "grid grid-cols-[0.8fr_0.8fr_0.8fr_2.5fr] grid-rows-[auto_1fr] gap-2 h-full overflow-hidden pb-2"
    : "grid grid-cols-[0.9fr_0.9fr_0.9fr_0.9fr_1.35fr] grid-rows-[auto_1fr] gap-2 h-full overflow-hidden pb-2";

  const renderDeparturePanel = (avganger) => (
    <div className="bg-zinc-800 p-2 rounded text-center flex h-full flex-col justify-start overflow-hidden relative">
      {isLoading && !data && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800/80">
          <Loader2 className="animate-spin w-8 h-8 text-white" />
        </div>
      )}
      {error && (
        <div className="text-red-400 font-bold p-2">Feil ved henting</div>
      )}
      <PresenterAvganger avganger={avganger} />
    </div>
  );

  return (
    <div className="bg-zinc-900 h-full w-full flex flex-col p-2 text-white">
       <div className="flex min-h-20 shrink-0 items-center gap-6 px-4 py-2">
          <div className="pl-6 md:pl-10 lg:pl-14">
            <Clock className="shrink-0" />
          </div>
          <div className="ml-auto flex min-w-0 justify-end">
            <EnvironmentStatus />
          </div>
       </div>

       <div className={gridClassName}>
          {departureColumns.map((column) => (
            <div
              key={column.title}
              className="bg-zinc-800 p-2 rounded text-center font-bold text-lg md:text-xl flex items-center justify-center"
            >
              {column.title}
            </div>
          ))}

          <div className="bg-zinc-800 p-2 rounded text-center font-bold text-lg md:text-xl flex items-center justify-center">
            Avvik
          </div>

          {showStrompriser && (
            <div className="bg-zinc-800 p-2 rounded row-span-2 relative flex flex-col">
              <Strompriser />
            </div>
          )}

          {departureColumns.map((column) => (
            <div key={`${column.title}-panel`} className="h-full">
              {renderDeparturePanel(column.avganger)}
            </div>
          ))}

          <div className="bg-zinc-800 p-2 rounded text-center overflow-auto text-sm text-red-200 whitespace-pre-line font-medium">
             {situations}
          </div>
       </div>
    </div>
  );
};

export default Rutetider;
