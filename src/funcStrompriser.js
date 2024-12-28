import React, { useEffect, useState } from "react";
import StrompriserDiagram from "./funcStrompriserDiagram";

const Strompriser = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(today.getDate()).padStart(2, '0');
      const url = `https://www.hvakosterstrommen.no/api/v1/prices/${year}/${month}-${day}_NO1.json`;
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Feil ved henting av data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <StrompriserDiagram apiData={data} />
      ) : (
        <p>Laster strømpriser...</p>
      )}
    </div>
  );
};

export default Strompriser;
