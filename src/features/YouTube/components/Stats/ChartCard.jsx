import React, { useMemo } from "react";
import { Line, Pie, Doughnut, Bar } from "react-chartjs-2";
import styles from "../../styles/ChartCard.module.css";
import { Text } from "../../../../components/ui";
import {
  barChartOptions,
  dottedLineChartOptions,
  doughnutChartOptions,
  lineChartOptions,
  pieChartOptions,
} from "../../../../data/chart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useChartConfig } from "../../hooks/useChartConfig";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const ChartCard = ({ title, chartType, chartData, customClasses = "" }) => {
  // Map chartType to Chart.js components
  const ChartComponent = {
    line: Line,
    pie: Pie,
    doughnut: Doughnut,
    bar: Bar,
    dottedLine: Line,
  }[chartType];

  // Memoized chart options based on chart type
  const chartOptions = useMemo(() => {
    const optionsMap = {
      line: lineChartOptions,
      pie: pieChartOptions,
      doughnut: doughnutChartOptions,
      bar: barChartOptions,
      dottedLine: dottedLineChartOptions,
    };

    return optionsMap[chartType] || {};
  }, [chartType]);

  // Ensure ChartComponent is valid before rendering
  if (!ChartComponent) {
    console.error(`Invalid chartType: ${chartType}`);
    return null;
  }

  return (
    <div className={`${styles.card} ${customClasses}`}>
      <Text as="p" className={styles.cardTitle}>
        {title || "Untitled Chart"}
      </Text>
      <div className={styles.chartContainer}>
        {chartData && (
          <ChartComponent
            data={useChartConfig(chartType, chartData)}
            options={chartOptions}
          />
        )}
      </div>
    </div>
  );
};

export default ChartCard;
