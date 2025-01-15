import React from "react";
import StatCard from "./StatsCard";
import ChartCard from "./ChartCard";
import styles from "../../styles/StatsSection.module.css";

const StatsSection = ({ charts, statsOverViewData }) => (
  <div className={styles.gridContainer}>
    {/* Row 1: Stat Cards */}
    {statsOverViewData.map(({ id, title, value, change, changeType }) => (
      <StatCard
        key={id}
        title={title}
        value={value}
        change={change}
        changeType={changeType}
      />
    ))}

    {/* Row 2: Charts */}
    <ChartCard
      title="Most Liked Comments"
      chartType="bar"
      chartConfig={charts.barChart}
    />
    <ChartCard
      title="Most Liked Videos"
      chartType="line"
      chartConfig={charts.lineChart}
      customClasses={styles.spanCol2}
    />
    <ChartCard
      title="Overall Sentiment Analysis"
      chartType="pie"
      chartConfig={charts.doughnut}
    />

    {/* Row 3: Charts */}
    <ChartCard
      title="Sentiment Categories"
      chartType="pie"
      chartConfig={charts.pieChart}
    />
    <ChartCard
      title="Total Comments"
      chartType="line"
      chartConfig={charts.lineChart}
      customClasses={styles.spanCol3}
    />
  </div>
);

export default StatsSection;
