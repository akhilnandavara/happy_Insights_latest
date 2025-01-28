import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowStats } from "../../../../store/slices/youTubeSlice";
import StatCard from "./StatsCard";
import ChartCard from "./ChartCard";
import FilterBar from "../../../../components/FilterBar";
import Icon from "../../../../components/Icon";
import { FaListUl } from "react-icons/fa6";
import { statsApiData } from "../../../../data/statsPage";
import styles from "../../styles/StatsSection.module.css";

const StatsSection = () => {
  const dispatch = useDispatch();
  const { commentsList, showStats } = useSelector((state) => state.youtube);
  const { charts, statsOverview } = statsApiData || {};
  const [isExiting, setIsExiting] = useState(false);

  const visibleCategories = useMemo(() => {
    if (!Array.isArray(commentsList)) return { All: 0 };

    return commentsList.reduce(
      (acc, { comment_category = "Others" }) => ({
        ...acc,
        [comment_category]: (acc[comment_category] || 0) + 1,
      }),
      { All: commentsList.length }
    );
  }, [commentsList]);

  // Handle exit animation and toggle state
  const handleExit = useCallback(() => {
    setIsExiting(true);
  }, []);

  useEffect(() => {
    if (isExiting) {
      const timeout = setTimeout(() => {
        dispatch(setShowStats(!showStats));
        setIsExiting(false);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isExiting, dispatch, showStats]);

  // Render charts dynamically
  const renderCharts = useMemo(() => {
    if (!charts || !Array.isArray(charts)) return null;

    return charts.map((chart, index) => (
      <ChartCard
        key={index}
        title={chart.title || "Untitled Chart"}
        chartType={chart.type}
        chartData={chart}
        customClasses={
          chart.type === "dottedLine"
            ? styles.spanCol3
            : chart.type === "line"
            ? styles.spanCol2
            : styles.spanCol1
        }
      />
    ));
  }, [charts]);

  return (
    <div
      className={`${styles.statsSectionWrapper} ${
        showStats ? styles.slideIn : styles.slideOut
      }`}
    >
      <CommentsHeader
        visibleCategories={visibleCategories}
        showStats={showStats}
        onToggleExit={handleExit}
      />

      <div className={styles.gridContainer}>
        {statsOverview.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
        {renderCharts}
      </div>
    </div>
  );
};

export default StatsSection;

const CommentsHeader = ({ visibleCategories, showStats, onToggleExit }) => (
  <div
    className={`${styles.commentsHeaderWrapper} ${
      showStats ? styles.statsHeaderWrapper : ""
    }`}
  >
    <FilterBar showStats={showStats} methods={visibleCategories} />
    <div className={styles.statsToggleBtnContainer}>
      <ToggleOption
        showStats={!showStats}
        onClick={onToggleExit}
        icon={<FaListUl className={styles.icon} />}
      />
      <ToggleOption
        showStats={showStats}
        icon={
          <Icon sprite="youtube" name="stats-icon" className={styles.icon} />
        }
      />
    </div>
  </div>
);

const ToggleOption = React.memo(({ showStats, onClick, icon }) => (
  <div
    className={`${styles.toggleOption} ${showStats ? styles.active : ""}`}
    onClick={onClick}
  >
    {icon}
  </div>
));
