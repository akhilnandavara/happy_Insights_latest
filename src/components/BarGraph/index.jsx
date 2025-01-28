import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CustomBarChart = ({ data, options }) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CustomBarChart;
