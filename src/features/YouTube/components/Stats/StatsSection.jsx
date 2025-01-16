import React from "react";
import { CSSTransition } from "react-transition-group"; // Import the CSSTransition component
import StatCard from "./StatsCard";
import ChartCard from "./ChartCard";
import styles from "../../styles/StatsSection.module.css";

const StatsSection = ({
  charts,
  statsOverViewData,
  showStats,
  duration = 1000,
}) => {
  console.log("StatsSection -> showStats", showStats);
  return (
    <CSSTransition
      in={showStats} // Controls whether the component should be in the DOM
      timeout={1000} // Duration of the animation
      classNames={{
        enter: styles.slideEnter,
        enterActive: styles.slideEnterActive,
        exit: styles.slideExit,
        exitActive: styles.slideExitActive,
      }}
      unmountOnExit // Ensures component is removed after exit animation
    >
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
    </CSSTransition>
  );
};

export default StatsSection;
