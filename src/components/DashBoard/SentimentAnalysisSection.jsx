import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "../../styles/components/SentimentAnalysisSection.module.css";
import { Heading, Text } from "../ui";

ChartJS.register(ArcElement, Tooltip, Legend);

const calculateAverageSentiment = (data, positiveLabels) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  if (total === 0) return 0;

  const positiveCount = data
    .filter((item) => positiveLabels.includes(item.label))
    .reduce((sum, item) => sum + item.count, 0);

  return Math.round((positiveCount / total) * 100);
};

const processChartData = (sourcesData, selectedSentiment, averageSentiment) => {
  // Calculate total counts for the selected sentiment across all sources
  const totalComments = sourcesData.reduce(
    (sum, source) => sum + source.counts[selectedSentiment],
    0
  );

  // Calculate the filled percentages for each source
  const filledData = sourcesData.map((source) => {
    const sourceCount = source.counts[selectedSentiment];
    return Math.round((sourceCount / totalComments) * averageSentiment);
  });

  // Calculate remaining percentage
  const remainingPercentage =
    100 - filledData.reduce((sum, value) => sum + value, 0);

  // Return dynamic chart data
  return {
    labels: [...sourcesData.map((source) => source.label), "Remaining"],
    datasets: [
      {
        data: [...filledData, remainingPercentage],
        backgroundColor: [
          ...sourcesData.map((source) => source.color),
          "#e0e0e0", // Remaining
        ],
        hoverBackgroundColor: [
          ...sourcesData.map((source) => source.color),
          "#d6d6d6", // Remaining hover
        ],
        borderWidth: 0,
      },
    ],
  };
};

const chartOptions = {
  cutout: "70%", // Creates the doughnut shape
  circumference: 180, // Half-circle
  rotation: -90, // Start at the top
  plugins: {
    legend: { display: false }, // Hide the legend
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}%`;
        },
      },
    },
  },
};

const SentimentList = ({ sentimentData, selectedSentiment, onSelect }) => (
  <ul className={styles.sentimentList}>
    <div className={styles.sourcesHeader}>
      <Heading as={"h4"} className={styles.sourcesTitle}>
        Sources
      </Heading>
      <Heading as={"h4"} className={styles.sourcesTitle}>
        comments
      </Heading>
    </div>
    {sentimentData.map((item) => (
      <li
        className={`${styles.sentimentItem} ${
          selectedSentiment === item.label && styles.selected
        }`}
        onClick={() => onSelect(item.label)}
        key={item.label}
      >
        <div>
          <span className={styles.emoji}>{item.emoji}</span>
          {item.label}
        </div>
        <span className={styles.count}>{item.count}</span>
      </li>
    ))}
  </ul>
);

const DoughnutChart = ({ chartData, averageSentiment }) => (
  <div className={styles.chartContainer}>
    <Doughnut data={chartData} options={chartOptions} />
    <div className={styles.percentage}>
      <Heading as="h2" className={styles.averageSentimentTitle}>
        {averageSentiment}%
      </Heading>
      <Text as="p" className={styles.averageSentimentSubTitle}>
        Average Sentiment
      </Text>
    </div>
  </div>
);

const SourcesList = ({ sourcesData, selectedSentiment }) => (
  <ul className={styles.sourcesList}>
    <div className={styles.sourcesHeader}>
      <Heading as={"h4"} className={styles.sourcesTitle}>
        Sources
      </Heading>
      <Heading as={"h4"} className={styles.sourcesTitle}>
        comments
      </Heading>
    </div>
    {sourcesData.map((source) => (
      <li className={styles.sourceItem} key={source.label}>
        <div className={styles.sourceLabelContainer}>
          <span
            className={styles.sourceColor}
            style={{ backgroundColor: source.color }}
          />
          <span className={styles.sourceLabel}>{source.label}</span>
        </div>
        <span>{source.counts[selectedSentiment]}</span>
      </li>
    ))}
  </ul>
);

const SentimentAnalysisSection = ({ sentimentData, sourcesData }) => {
  const [selectedSentiment, setSelectedSentiment] =
    React.useState("Happy Words");
  const averageSentiment = calculateAverageSentiment(sentimentData, [
    "Happy Words",
    "Greets Words",
  ]);
  const chartData = processChartData(
    sourcesData,
    selectedSentiment,
    averageSentiment
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
        <SourcesList
          sourcesData={sourcesData}
          selectedSentiment={selectedSentiment}
        />
      </div>
    </div>
  );
};

export default SentimentAnalysisSection;
