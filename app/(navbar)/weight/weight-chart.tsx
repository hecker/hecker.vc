"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  ChartOptions,
  Scale,
  CoreScaleOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { WeightEntry } from "lib/weight-metrics";
import "chartjs-adapter-date-fns";
import { format } from "date-fns";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
);

interface WeightChartProps {
  weights: WeightEntry[];
}

export default function WeightChart({ weights }: WeightChartProps) {
  const parsedData = weights.map((entry) => {
    const dateStr = entry.timestamp
      .replace("Date: ", "")
      .replace(" at ", " ")
      .replace("AM", " AM")
      .replace("PM", " PM");
    return {
      x: new Date(dateStr),
      y: entry.weight,
      fatPercent: parseFloat(entry.fatMassPercent),
    };
  });

  const data = {
    datasets: [
      {
        label: "Weight",
        data: parsedData.map((d) => ({ x: d.x, y: d.y })),
        borderColor: "rgb(115, 115, 115)",
        backgroundColor: "rgba(115, 115, 115, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(115, 115, 115)",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
        yAxisID: "y",
      },
      {
        label: "Fat %",
        data: parsedData.map((d) => ({ x: d.x, y: d.fatPercent })),
        borderColor: "rgba(115, 115, 115, 0.5)",
        backgroundColor: "transparent",
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(115, 115, 115, 0.5)",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
        yAxisID: "y1",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: {
          size: 13,
          family: "system-ui, sans-serif",
        },
        bodyFont: {
          size: 12,
          family: "system-ui, sans-serif",
        },
        padding: 10,
        displayColors: false,
        mode: "index",
        intersect: false,
        callbacks: {
          title(items: any) {
            if (!items.length) return "";
            return format(new Date(items[0].raw.x), "MMMM d, yyyy");
          },
          label(item: any) {
            const dataset = item.dataset;
            if (dataset.label === "Weight") {
              return `Weight: ${item.raw.y} kg`;
            } else {
              return `Body Fat: ${item.raw.y}%`;
            }
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          displayFormats: {
            month: "MMM yyyy",
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "system-ui, sans-serif",
          },
          maxRotation: 0,
        },
      },
      y: {
        min: Math.floor(Math.min(...weights.map((w) => w.weight)) - 1),
        max: Math.ceil(Math.max(...weights.map((w) => w.weight)) + 1),
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "system-ui, sans-serif",
          },
          callback: function (
            this: Scale<CoreScaleOptions>,
            tickValue: string | number,
          ) {
            return `${Number(tickValue)} kg`;
          },
        },
        position: "left",
      },
      y1: {
        min: Math.floor(
          Math.min(...weights.map((w) => parseFloat(w.fatMassPercent))) - 1,
        ),
        max: Math.ceil(
          Math.max(...weights.map((w) => parseFloat(w.fatMassPercent))) + 1,
        ),
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            family: "system-ui, sans-serif",
          },
          callback: function (
            this: Scale<CoreScaleOptions>,
            tickValue: string | number,
          ) {
            return `${Number(tickValue)}%`;
          },
        },
        position: "right",
      },
    },
    interaction: {
      intersect: false,
      mode: "nearest",
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Line data={data} options={options} />
    </div>
  );
}
