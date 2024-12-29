import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-annotation"; // Importer plugin for å legge til annotasjoner

const StrompriserDiagram = ({ apiData }) => {
  const firstDate = apiData[0]
  ? new Date(apiData[0].time_start).toLocaleDateString("no-NO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  : "Ukjent dato";

  const labels = apiData.map((entry) =>
    new Date(entry.time_start).toLocaleTimeString("no-NO", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const prices = apiData.map((entry) => entry.NOK_per_kWh);

  // Beregn nåværende tid for vertikal linje
  const now = new Date();
  const nowHour = now.getHours(); // Henter nåværende time
  const nowLabel = `${String(nowHour).padStart(2, "0")}:00`; // Formatter som "hh:00"

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
    title: {
      display: true,
      text: `Strømpriser for: ${firstDate}`,
      align: "end", // Plasser teksten nederst til høyre
      font: {
        size: 12,
        family: "Arial",
        weight: "normal",
      },
      color: "gray",
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
          ticks: {
            fontColor: "rgba(255, 255, 255, 0.8)", // Hvit farge på tallene
          },
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0", // Må matche ID-en til x-aksen
          value: nowLabel, // Tidspunktet du vil markere
          borderColor: "rgba(255, 0, 0, 0.8)", // Rød linje
          borderWidth: 2, // Tykkelse på linjen
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
