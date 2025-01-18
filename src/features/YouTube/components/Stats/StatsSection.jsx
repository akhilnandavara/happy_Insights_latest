import React, { useEffect, useMemo, useState } from "react";
import StatCard from "./StatsCard";
import ChartCard from "./ChartCard";
import styles from "../../styles/StatsSection.module.css";
import { setShowStats } from "../../../../store/slices/youTubeSlice";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "../../../../components/FilterBar";
import { FaListUl } from "react-icons/fa6";
import Icon from "../../../../components/Icon";

const StatsSection = ({ charts, statsOverViewData }) => {
  const { commentsList, showStats } = useSelector((state) => state.youtube);
  const [isExiting, setIsExiting] = useState(false);
  const dispatch = useDispatch();

  const visibleCategories = useMemo(() => {
    if (!commentsList || !Array.isArray(commentsList)) {
      return { All: commentsList?.length || 0 }; // Handle edge case for empty or non-array commentsList
    }

    // Reduce the commentsList into a key-value pair object
    const categories = commentsList.reduce((acc, comment) => {
      const category = comment.comment_category || "Others"; // Default to "Others" if no category is defined
      acc[category] = (acc[category] || 0) + 1; // Increment count for each category
      return acc;
    }, {});

    // Return the "All" category with the total count + all other categories
    return {
      All: commentsList.length, // Adding "All" category with the total count
      ...categories, // Spread the categories into the object
    };
  }, [commentsList]);

  useEffect(() => {
    console.log("isExiting", isExiting);
    if (isExiting) {
      setTimeout(() => {
        dispatch(setShowStats(!showStats));
        setIsExiting(false);
      }, 300);
    }
  }, [isExiting]);

  console.log("showStats", showStats);
  return (
    <div
      className={`${styles.statsSectionWrapper} ${
        !isExiting && showStats ? styles.slideIn : styles.slideOut
      } `}
    >
      <CommentsHeader
        visibleCategories={visibleCategories}
        // onCategorySelect={handleCategorySelection}
        showStats={showStats}
        onToggleIsExiting={() => setIsExiting(true)}
      />

      <div className={`${styles.gridContainer} `}>
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
    </div>
  );
};

export default StatsSection;

const CommentsHeader = ({
  visibleCategories,
  onCategorySelect,
  showStats,
  onToggleIsExiting,
}) => (
  <div
    className={`${styles.commentsHeaderWrapper} ${
      showStats && styles.statsHeaderWrapper
    }`}
  >
    {/* Categories buttons section */}
    <FilterBar
      showStats={showStats}
      methods={visibleCategories}
      onSelect={onCategorySelect}
    />
    {/* Header Actions Section */}
    <div className={styles.statsToggleBtnContainer}>
      <ToggleOption
        showStats={!showStats}
        onClick={onToggleIsExiting}
        icon={<FaListUl className={styles.icon} />}
      />
      <ToggleOption
        showStats={showStats}
        icon={
          <Icon sprite="youtube" name={"stats-icon"} className={styles.icon} />
        }
      />
    </div>
  </div>
);

const ToggleOption = ({ showStats, onClick, icon }) => (
  <div
    className={`${styles.toggleOption} ${showStats && styles.active}`}
    onClick={onClick}
  >
    {icon}
  </div>
);
