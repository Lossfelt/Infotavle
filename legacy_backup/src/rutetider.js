import React, { useState, useEffect, useCallback } from "react";
import { GraphQLClient } from "graphql-request";
import { behandleRutetider } from "./funcRutetider";
import PresenterAvganger from "./PresenterAvganger";
import { handleSituations } from "./funcHandleSituations";
import { definerQuery } from "./funcQuery.js";
import Clock from "./clock";
import Strompriser from "./funcStrompriser.js";
import config from "./config";

const Rutetider = () => {
  const [motByen, setMotByen] = useState(null); // Initialize as null to handle loading state if needed
  const [fraByen, setFraByen] = useState(null);
  const [situations, setSituations] = useState("");

  const fetchData = useCallback(async () => {
    const { enturGraphQl, clientName } = config.api;

    const graphQLClient = new GraphQLClient(enturGraphQl, {
      headers: {
        "et-client-name": clientName
      }
    });

    const query = definerQuery();

    try {
      const data = await graphQLClient.request(query);
      const dataDeltITo = behandleRutetider(data.quay.estimatedCalls);

      setFraByen(dataDeltITo[0]);
      setMotByen(dataDeltITo[1]);

      const newSituations = handleSituations(dataDeltITo[1], dataDeltITo[0]);
      setSituations(newSituations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Optional: Set up an interval to refresh data periodically
    const interval = setInterval(fetchData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <div className="black-background">
      <Clock />
      <div className="grid-container2">
        <div className="liten_skrift">70/70E Nationl</div>
        <div className="liten_skrift">78A Østensjø</div>
        <div className="liten_skrift">Avvik</div>
        <div className="grid-item-last">
          <Strompriser />
        </div>
        <div>
          <PresenterAvganger avganger={motByen} />
        </div>
        <div>
          <PresenterAvganger avganger={fraByen} />
        </div>
        <div className="skrift_for_avvik">{situations}</div>
      </div>
    </div>
  );
};

export default Rutetider;
