import React from "react";
import { Line } from "react-chartjs-2";

const StrompriserDiagram = ({ apiData }) => {
  const labels = apiData.map((entry) =>
    new Date(entry.time_start).toLocaleTimeString("no-NO", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const prices = apiData.map((entry) => entry.NOK_per_kWh);

  // Dynamisk fargelegging basert på pris
  const pointColors = prices.map((price) => {
    if (price < 1) {
      return "rgba(75, 192, 75, 1)"; // Grønn
    } else if (price >= 1 && price <= 5) {
      return "rgba(255, 205, 86, 1)"; // Gul
    } else {
      return "rgba(255, 99, 132, 1)"; // Rød
    }
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Strømpris (NOK/kWh)",
        data: prices,
        borderColor: "rgba(200, 200, 200, 0.5)", // Subtil grå linje
        backgroundColor: pointColors, // Farger punktene
        pointBackgroundColor: pointColors, // Gjør punktene tydelige
        pointBorderColor: pointColors, // Tydelig kant rundt punktene
        pointRadius: 5, // Øk punktstørrelse for synlighet
        pointHoverRadius: 7, // Øker punktstørrelse ved hover
        fill: false, // Ikke fyll under linjen
      },
    ],
  };

  const options = {
    legend: {
      display: false, // Skjuler legend
    },
    scales: {
      xAxes: [
        {
          display: true, // Holder x-aksen synlig
        },
      ],
      yAxes: [
        {
          display: true, // Holder y-aksen synlig
        },
      ],
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default StrompriserDiagram;
