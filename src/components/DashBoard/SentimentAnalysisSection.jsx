import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "../../styles/components/SentimentAnalysisSection.module.css";
import { Heading, Text } from "../ui";

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentAnalysisSection = ({
  sentimentData,
  sourcesData,
  averageSentiment,
}) => {
  // Calculate proportional data based on the average sentiment
  const filledPercentage = averageSentiment; // Example: 70%
  const remainingPercentage = 100 - filledPercentage;

  // Proportionally divide the "filled" part among the sources
  const totalComments = sourcesData.reduce(
    (sum, source) => sum + source.count,
    0
  );
  const filledData = sourcesData.map((source) =>
    Math.round((source.count / totalComments) * filledPercentage)
  );

  // Add remaining white space
  const chartData = {
    labels: [...sourcesData.map((source) => source.label), "Remaining"],
    datasets: [
      {
        data: [...filledData, remainingPercentage],
        backgroundColor: [
          "#4caf50", // Facebook
          "#8bc34a", // YouTube
          "#cddc39", // Instagram
          "#ffc107", // LinkedIn
          "#ff5722", // TikTok
          "#e0e0e0", // Remaining (white/gray)
        ],
        hoverBackgroundColor: [
          "#388e3c",
          "#689f38",
          "#afb42b",
          "#ffa000",
          "#d84315",
          "#d6d6d6",
        ],
        borderWidth: 0,
      },
    ],
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

  return (
    <div className={styles.sentimentAnalysisContainer}>
      {/* Sentiment List */}
      <div className={styles.sentimentListContainer}>
        <h3 className={styles.title}>Sentiment Analysis</h3>
        <ul className={styles.sentimentList}>
          {sentimentData.map((item) => (
            <li className={styles.sentimentItem} key={item.label}>
              <div>
                <span className={styles.emoji}>{item.emoji}</span>
                {item.label}
              </div>
              <span className={styles.count}>{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Doughnut Chart */}
      <div className={styles.chartAndSourcesContainer}>
        <div className={styles.chartContainer}>
          <div className={styles.doughnutWrapper}>
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
        </div>

        {/* Sources List */}
        <div className={styles.sourcesContainer}>
          <h4 className={styles.sourcesTitle}>Sources</h4>
          <ul className={styles.sourcesList}>
            {sourcesData.map((source) => (
              <li className={styles.sourceItem} key={source.label}>
                <span>{source.label}</span>
                <span>{source.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysisSection;
