import React from "react";
import styles from "../styles/StatsOverView.module.css";
import { statsOverViewData } from "../../../data/Dashboard";
import Icon from "../../../components/Icon";
import { FaArrowUp } from "react-icons/fa";
import { Text } from "../../../components/ui";

const StatsOverView = ({ activeStatsOverview, onStatsOverviewSelect }) => {
  const { platforms } = statsOverViewData;
  return (
    <div className={styles.container}>
      {platforms.map(({ name, comments, change, changeType }, index) => (
        <div
          key={index}
          className={`${styles.card}  ${
            activeStatsOverview === name ? styles.active : ""
          }`}
          onClick={onStatsOverviewSelect.bind(this, name)}
        >
          <div
            className={`${styles.header}  ${
              activeStatsOverview === name ? styles.active : ""
            }`}
          >
            <Icon
              name={
                name.toLowerCase() === "total comments"
                  ? "comments"
                  : name.toLowerCase()
              }
              className={styles.icon}
            />
            <span className={styles.platformName}>{name}</span>
          </div>
          <div className={styles.body}>
            <span className={styles.count}>{comments.toLocaleString()}</span>
            <div
              className={`${styles.updateTag} ${
                changeType === "up" ? styles.positive : styles.negative
              }`}
            >
              <FaArrowUp
                className={`${styles.updateTagIcon} ${
                  changeType === "down" && styles.rotate
                }`}
              />
              <Text as={"p"} className={styles.updateTagText}>
                {change}%
              </Text>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverView;
