import { useQuery } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import Clock from "./Clock";
import Strompriser from "./Strompriser";
import PresenterAvganger from "./PresenterAvganger";
import { definerQuery } from "../utils/funcQuery";
import { behandleRutetider } from "../utils/funcRutetider";
import { handleSituations } from "../utils/funcHandleSituations";
import config from "../config";

const fetchRutetider = async () => {
  const { enturGraphQl, clientName } = config.api;
  const graphQLClient = new GraphQLClient(enturGraphQl, {
    headers: { "et-client-name": clientName }
  });
  const query = definerQuery();
  return graphQLClient.request(query);
};

const Rutetider = () => {
  const { data, error } = useQuery({
    queryKey: ["rutetider"],
    queryFn: fetchRutetider,
    refetchInterval: 60000,
  });

  const processedData = data ? behandleRutetider(data.quay.estimatedCalls) : [[], []];
  const [fraByen, motByen] = processedData; // behandleRutetider returns [fra, mot]
  const situations = data ? handleSituations(motByen, fraByen) : "";

  return (
    <div className="bg-zinc-900 h-full w-full flex flex-col p-2 text-white">
       <div className="flex justify-center items-center h-16 shrink-0">
          <Clock />
       </div>

       <div className="grid grid-cols-[0.8fr_0.8fr_0.8fr_2.5fr] grid-rows-[auto_1fr] gap-2 h-full overflow-hidden pb-2">
          {/* Headers */}
          <div className="bg-zinc-800 p-2 rounded text-center font-bold text-lg md:text-xl flex items-center justify-center">
            70/70E National
          </div>
          <div className="bg-zinc-800 p-2 rounded text-center font-bold text-lg md:text-xl flex items-center justify-center">
            78A Østensjø
          </div>
          <div className="bg-zinc-800 p-2 rounded text-center font-bold text-lg md:text-xl flex items-center justify-center">
            Avvik
          </div>
          
          {/* Strompriser - Spans 2 rows (header + content) */}
          <div className="bg-zinc-800 p-2 rounded row-span-2 relative flex flex-col">
             <Strompriser />
          </div>

          {/* Content */}
          <div className="bg-zinc-800 p-2 rounded text-center flex flex-col justify-start overflow-hidden">
             <PresenterAvganger avganger={motByen} />
          </div>
          <div className="bg-zinc-800 p-2 rounded text-center flex flex-col justify-start overflow-hidden">
             <PresenterAvganger avganger={fraByen} />
          </div>
          <div className="bg-zinc-800 p-2 rounded text-left overflow-auto text-sm text-red-200 whitespace-pre-line font-medium">
             {situations}
          </div>
       </div>
    </div>
  );
};

export default Rutetider;
