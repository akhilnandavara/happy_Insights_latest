import React from "react";
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
import BarChartWithLabels from "./BarChartWithLabels";
import styles from "../../styles/ChartCard.module.css";
import { Text } from "../../../../components/ui";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartCard = ({ title, chartType, chartConfig, customClasses }) => {
  const isBarChart = chartType === "bar";
  const labels = chartConfig.data.labels || [];
  const counts = chartConfig.data.datasets[0].data || [];

  return (
    <div className={`${styles.card} ${customClasses}`}>
      <Text as="p" className={styles.cardTitle}>
        {title}
      </Text>
      {isBarChart ? (
        <BarChartWithLabels
          labels={labels}
          counts={counts}
          chartConfig={chartConfig}
        />
      ) : (
        <div className={styles.chartContainer}>
          {chartType === "line" ? (
            <Line data={chartConfig.data} options={chartConfig.options} />
          ) : chartType === "pie" ? (
            <Pie data={chartConfig.data} options={chartConfig.options} />
          ) : chartType === "doughnut" ? (
            <Doughnut data={chartConfig.data} options={chartConfig.options} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ChartCard;
