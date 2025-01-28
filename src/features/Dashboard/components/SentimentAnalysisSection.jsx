import React, { useState, useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "../styles/SentimentAnalysisSection.module.css";
import { Heading, Text } from "../../../components/ui";
import { sentimentDataColor } from "../../../data/chart";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Function to process chart data
const processChartData = (
  sentimentData,
  sourcesData,
  selectedSentiment,
  averageSentiment
) => {
  const totalComments = sourcesData.reduce(
    (sum, source) => sum + (source.breakdown[selectedSentiment] || 0),
    0
  );

  if (totalComments === 0) {
    return { chartData: {}, dataForChart: [] }; // Avoid divide by zero errors
  }

  const filledData = sourcesData.map((source) => {
    const sourceCount = source.breakdown[selectedSentiment] || 0;
    return Math.round((sourceCount / totalComments) * averageSentiment);
  });

  const remainingPercentage =
    100 - filledData.reduce((sum, value) => sum + value, 0);

  const sentiment = sentimentData.find(
    (s) => s.type.toLowerCase() === selectedSentiment.toLowerCase()
  );

  if (!sentiment) {
    console.error(`Sentiment "${selectedSentiment}" not found in data.`);
    return { chartData: {}, dataForChart: [] };
  }

  const dataForChart = sourcesData.map((source, index) => ({
    label: source.platform,
    color:
      sentimentDataColor[selectedSentiment]?.[
        index % sentimentDataColor[selectedSentiment]?.length
      ] || "#000", // Default color if undefined
    count: source.breakdown[selectedSentiment] || 0,
  }));

  return {
    chartData: {
      labels: [...sourcesData.map((source) => source.platform), "Remaining"],
      datasets: [
        {
          data: [...filledData, remainingPercentage],
          backgroundColor: [
            ...dataForChart.map((item) => item.color),
            "#d6d6d6",
          ],
          hoverBackgroundColor: [
            ...dataForChart.map((item) => item.color),
            "#d6d6d6", // Remaining hover color
          ],
          borderWidth: 0,
        },
      ],
    },
    dataForChart,
  };
};

// Chart options for Doughnut chart
const chartOptions = {
  cutout: "80%",
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}%`;
        },
      },
    },
  },
};

// Component to render the list of sentiments
const SentimentList = ({ sentimentData, selectedSentiment, onSelect }) => (
  <ul className={styles.sentimentList}>
    <div className={styles.sourcesHeader}>
      <Heading as="h4" className={styles.sourcesTitle}>
        Sentiments
      </Heading>
      <Heading as="h4" className={styles.sourcesTitle}>
        Comments
      </Heading>
    </div>
    {sentimentData.map((item) => (
      <li
        key={item.type}
        className={`${styles.sentimentItem} ${
          selectedSentiment === item.type && styles.selected
        }`}
        onClick={() => onSelect(item.type)}
      >
        <div className={styles.sentimentLabel}>
          <Text as="p" className={styles.emoji}>
            {item?.icon}
          </Text>
          <Text as="p" className={styles.labelText}>
            {item.type}
          </Text>
        </div>
        <Text as="p" className={styles.count}>
          {item.count}
        </Text>
      </li>
    ))}
  </ul>
);

// Component to render the Doughnut chart
const DoughnutChart = ({ chartData, averageSentiment }) => (
  <div className={styles.chartContainer}>
    <Doughnut data={chartData} options={chartOptions} />
    <div className={styles.averageValueContainer}>
      <Heading as="h2" className={styles.averageSentimentTitle}>
        {averageSentiment}%
      </Heading>
      <Text as="p" className={styles.averageSentimentSubTitle}>
        Average Sentiment
      </Text>
    </div>
  </div>
);

// Component to render the list of sources
const SourcesList = ({ sourcesData }) => (
  <ul className={styles.sourcesList}>
    <div className={styles.sourcesHeader}>
      <Heading as="h4" className={styles.sourcesTitle}>
        Sources
      </Heading>
      <Heading as="h4" className={styles.sourcesTitle}>
        Comments
      </Heading>
    </div>
    {sourcesData.map((source) => (
      <li key={source.label} className={styles.sourceItem}>
        <div className={styles.sourceLabel}>
          <span
            className={styles.sourceColor}
            style={{ backgroundColor: source.color }}
          />
          <span className={styles.labelText}>{source.label}</span>
        </div>
        <Text as="p" className={styles.count}>
          {source.count}
        </Text>
      </li>
    ))}
  </ul>
);

// Main component for Sentiment Analysis Section
const SentimentAnalysisSection = ({
  sentimentData,
  sourcesData,
  averageSentiment,
}) => {
  const [selectedSentiment, setSelectedSentiment] = useState(
    sentimentData[0]?.type|| ""
  );

  // Process chart data using useMemo for performance optimization
  const { chartData, dataForChart } = useMemo(
    () =>
      processChartData(
        sentimentData,
        sourcesData,
        selectedSentiment,
        averageSentiment
      ),
    [sentimentData,sourcesData, selectedSentiment, averageSentiment]
  );

  return (
    <div className={styles.sentimentAnalysisContainer}>
      <div className={styles.sentimentListContainer}>
        <SentimentList
          sentimentData={sentimentData}
          selectedSentiment={selectedSentiment}
          onSelect={setSelectedSentiment}
        />
      </div>
      <div className={styles.chartAndSourcesContainer}>
        <DoughnutChart
          chartData={chartData}
          averageSentiment={averageSentiment}
        />
        <SourcesList sourcesData={dataForChart} />
      </div>
    </div>
  );
};

export default SentimentAnalysisSection;
