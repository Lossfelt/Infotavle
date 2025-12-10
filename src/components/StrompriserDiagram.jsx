import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

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

  const now = new Date();
  const nowHour = now.getHours();
  const nowLabel = `${String(nowHour).padStart(2, "0")}:00`;

  const pointColors = prices.map((price) => {
    if (price < 1) return "rgba(75, 192, 75, 1)";
    if (price >= 1 && price <= 5) return "rgba(255, 205, 86, 1)";
    return "rgba(255, 99, 132, 1)";
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Strømpris (NOK/kWh)",
        data: prices,
        borderColor: "rgba(200, 200, 200, 0.5)",
        pointBackgroundColor: pointColors,
        pointBorderColor: pointColors,
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Strømpriser for: ${firstDate}`,
        align: "end",
        color: "gray",
        font: { size: 12, family: "Arial" }
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x',
            value: nowLabel,
            borderColor: 'rgba(255, 0, 0, 0.8)',
            borderWidth: 2,
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'rgba(255, 255, 255, 0.8)' }
      },
      y: {
        display: true,
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: 'white' }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default StrompriserDiagram;
