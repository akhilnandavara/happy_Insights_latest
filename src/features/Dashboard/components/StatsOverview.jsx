import React from "react";
import styles from "../styles/StatsOverView.module.css";
import Icon from "../../../components/Icon";
import { FaArrowUp } from "react-icons/fa";
import { Text } from "../../../components/ui";
import { dashboardApiData } from "../../../data/dashboard";

const StatsOverView = ({ activeStatsOverview, onStatsOverviewSelect }) => {
  const { stats } = dashboardApiData.overview;
  return (
    <div className={styles.container}>
      {stats.map(({ platform, totalComments, change }, index) => (
        <div
          key={index}
          className={`${styles.card}  ${
            activeStatsOverview === platform.toLowerCase() ? styles.active : ""
          }`}
          onClick={onStatsOverviewSelect.bind(this, platform.toLowerCase())}
        >
          <div
            className={`${styles.header}  ${
              activeStatsOverview === platform ? styles.active : ""
            }`}
          >
            <Icon
              name={
                platform.toLowerCase() === "total"
                  ? "comments"
                  : platform.toLowerCase()
              }
              className={styles.icon}
            />
            <span className={styles.platformName}>{platform}</span>
          </div>
          <div className={styles.body}>
            <span className={styles.count}>
              {totalComments.toLocaleString()}
            </span>
            <div
              className={`${styles.updateTag} ${
                change.type === "up" ? styles.positive : styles.negative
              }`}
            >
              <FaArrowUp
                className={`${styles.updateTagIcon} ${
                  change.type === "down" && styles.rotate
                }`}
              />
              <Text as={"p"} className={styles.updateTagText}>
                {change.value}%
              </Text>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverView;
