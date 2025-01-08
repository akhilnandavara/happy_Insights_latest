import React, { useState, useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "../styles/SentimentAnalysisSection.module.css";
import { Heading, Text } from "../../../components/ui";
import { dashboardDoughnutChartData } from "../../../data/dashboard";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Function to calculate average sentiment
const calculateAverageSentiment = (sentimentData, positiveLabels) => {
  const total = sentimentData.reduce((sum, item) => sum + item.count, 0);
  if (total === 0) return 0;

  const positiveCount = sentimentData.reduce(
    (sum, item) =>
      positiveLabels.includes(item.label) ? sum + item.count : sum,
    0
  );

  return Math.round((positiveCount / total) * 100);
};

// Function to process chart data
const processChartData = (sourcesData, selectedSentiment, averageSentiment) => {
  const totalComments = sourcesData.reduce(
    (sum, source) => sum + (source.counts[selectedSentiment] || 0),
    0
  );

  if (totalComments === 0) {
    return { chartData: {}, dataForChart: [] }; // Avoid divide by zero errors
  }

  const filledData = sourcesData.map((source) => {
    const sourceCount = source.counts[selectedSentiment] || 0;
    return Math.round((sourceCount / totalComments) * averageSentiment);
  });

  const remainingPercentage =
    100 - filledData.reduce((sum, value) => sum + value, 0);

  const sentiment = dashboardDoughnutChartData.sentimentData.find(
    (s) => s.label.toLowerCase() === selectedSentiment.toLowerCase()
  );

  if (!sentiment) {
    console.error(`Sentiment "${selectedSentiment}" not found in data.`);
    return { chartData: {}, dataForChart: [] };
  }

  const dataForChart = sourcesData.map((source, index) => ({
    label: source.label,
    color: sentiment.colors[index % sentiment.colors.length],
    count: source.counts[selectedSentiment] || 0,
  }));

  return {
    chartData: {
      labels: [...sourcesData.map((source) => source.label), "Remaining"],
      datasets: [
        {
          data: [...filledData, remainingPercentage],
          backgroundColor:[ ...dataForChart.map((item) => item.color),"#d6d6d6"],
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
        key={item.label}
        className={`${styles.sentimentItem} ${
          selectedSentiment === item.label && styles.selected
        }`}
        onClick={() => onSelect(item.label)}
      >
        <div className={styles.sentimentLabel}>
          <Text as="p" className={styles.emoji}>
            {item.emoji}
          </Text>
          <Text as="p" className={styles.labelText}>
            {item.label}
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
const SentimentAnalysisSection = ({ sentimentData, sourcesData }) => {
  const [selectedSentiment, setSelectedSentiment] = useState(
    sentimentData[0]?.label || ""
  );

  // Calculate average sentiment using useMemo for performance optimization
  const averageSentiment = useMemo(
    () =>
      calculateAverageSentiment(sentimentData, ["Happy Words", "Greets Words"]),
    [sentimentData]
  );

  // Process chart data using useMemo for performance optimization
  const { chartData, dataForChart } = useMemo(
    () => processChartData(sourcesData, selectedSentiment, averageSentiment),
    [sourcesData, selectedSentiment, averageSentiment]
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
