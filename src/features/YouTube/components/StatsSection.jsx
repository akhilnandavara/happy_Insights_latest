import React from "react";
import styles from "../styles/StatsSection.module.css";
import { Text } from "../../../components/ui";
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
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const row1Contents = [
  {
    id: 1,
    title: "Total Comments This Week",
    value: "1234",
  },
  {
    id: 2,
    title: "Total Views This Week",
    value: "21052",
  },
  {
    id: 3,
    title: "Total Likes Average This Week",
    value: "86.56",
  },
  {
    id: 4,
    title: "Total Dislike Average This Week",
    value: "13.44",
  },
];

// Sample data for charts
const lineChartData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Engagement",
      data: [100, 200, 150, 300, 400, 450, 500],
      borderColor: "#8884d8",
      backgroundColor: "rgba(136, 132, 216, 0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const pieChartData = {
  labels: ["Positive", "Neutral", "Negative"],
  datasets: [
    {
      data: [400, 300, 300],
      backgroundColor: ["#8884d8", "#82ca9d", "#ff7300"],
      hoverBackgroundColor: ["#7073b4", "#6cb785", "#cc5c00"],
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Days of the Week",
      },
    },
    y: {
      title: {
        display: true,
        text: "Engagement",
      },
      beginAtZero: true,
    },
  },
};

const StatsSection = () => {
  return (
    <div className={styles.gridContainer}>
      {/* row 1 */}
      {row1Contents.map((item) => (
        <div key={item.id} className={styles.card}>
          <Text size="sm" weight="bold" className={styles.cardTitle}>
            {item.title}
          </Text>
          <Text size="lg" weight="bold">
            {item.value}%
          </Text>
        </div>
      ))}

      {/* row 2 */}
      <div className={styles.card}>
        <Text as="p" className={styles.cardTitle}>
          Most Liked Comments
        </Text>
      </div>

      <div className={`${styles.card} ${styles.spanCol2}`}>
        <Text as="p" className={styles.cardTitle}>
          Most Liked Videos
        </Text>
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
      <div className={styles.card}>
        <Text as="p" className={styles.cardTitle}>
          Overall Sentiment Analysis
        </Text>
        <Pie data={pieChartData} />
      </div>

      {/* row 3 */}
      <div className={styles.card}>
        <Text as="p" className={styles.cardTitle}>
          Sentiment Categories
        </Text>
        <Pie data={pieChartData} />
      </div>

      <div className={`${styles.card} ${styles.spanCol3}`}>
        <Text as="p" className={styles.cardTitle}>
          Total Comments
        </Text>
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default StatsSection;
