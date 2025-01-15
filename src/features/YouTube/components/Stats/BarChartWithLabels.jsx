import React from "react";
import { Bar } from "react-chartjs-2";
import styles from "../../styles/BarChartWithLabels.module.css";

const BarChartWithLabels = ({ labels, counts, chartConfig }) => (
  <div className={styles.container}>
    {labels.map((label, index) => (
      <div key={index} className={styles.statsItem}>
        {/* Bar Chart */}
        <div className={styles.barGraphContainer}>
          <div className={styles.barChartWrapper}>
            <div className={styles.barLine}>
              <Bar
                data={{
                  labels: [label],
                  datasets: [
                    {
                      data: [chartConfig.data.datasets[0].data[index]],
                      backgroundColor:
                        chartConfig.data.datasets[0].backgroundColor[index],
                      borderRadius: 10,
                      barThickness: 15,
                    },
                  ],
                }}
                options={chartConfig.options}
              />
            </div>
          </div>
          <div className={styles.label}>{counts[index]}</div>
        </div>
        <div className={styles.label}>{label}</div>
      </div>
    ))}
  </div>
);

export default BarChartWithLabels;
