import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import climateData from "../../data/climateData.json";

Chart.register(LinearScale, PointElement, LineElement, Tooltip);

const Graph = ({ selectedLocation }) => {
  const [data, setData] = useState(climateData);

  const filteredData = data.filter(
    (item) =>
      selectedLocation &&
      item.Lat === selectedLocation.Lat &&
      item.Long === selectedLocation.Long
  );

  const groupedData = filteredData.reduce((acc, curr) => {
    if (!acc[curr.Year]) {
      acc[curr.Year] = { sum: 0, count: 0 };
    }
    acc[curr.Year].sum += curr["Risk Rating"];
    acc[curr.Year].count += 1;
    return acc;
  }, {});

  //initialize line graph with decadeData on the x-axis
  const decadeData = [2030, 2040, 2050, 2060, 2070];

  const chartData = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        label: "Risk Rating",
        data: data
          .filter(
            (item) =>
              selectedLocation &&
              item.Lat === selectedLocation.Lat &&
              item.Long === selectedLocation.Long
          )
          .map((item) => item["Risk Rating"]),
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "Year",
          font: {
            size: 22,
            style: "bold",
          },
        },
        ticks: {
          callback: function (value) {
            return value;
          },
          font: {
            size: 16,
            weight: "bold",
          },
          stepSize: 10, //this ensures the x-axis labels are in increments of 10
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Risk Rating",
          font: {
            size: 22,
            style: "bold",
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => `Year: ${context[0].label}`,
          label: (context) =>
            `Average Risk Rating: ${context.parsed.y.toFixed(2)}`,
          afterLabel: (context) => {
            const year = chartData.labels[context.dataIndex];
            const items = filteredData.filter(
              (item) => item.Year === Number(year)
            );
            const details = items.map(
              (item) =>
                `Asset: ${item["Asset Name"]}, Risk Rating: ${
                  item["Risk Rating"]
                }, Risk Factors: ${JSON.stringify(item["Risk Factors"])}`
            );
            return details;
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="chart-container">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Graph;
