import React from "react";
import { FaArrowUp } from "react-icons/fa";
import styles from "../../styles/StatsCard.module.css";
import { Text } from "../../../../components/ui";

const getChangeClass = (changeType) =>
  `${styles.updateTag} ${
    changeType === "up" ? styles.positive : styles.negative
  }`;

const StatsCard = ({ title, value, change, changeType }) => (
  <div className={styles.card}>
    <Text size="sm" weight="bold" className={styles.cardTitle}>
      {title}
    </Text>
    <div className={styles.cardSubTitleContainer}>
      <Text as="p" className={styles.cardSubTitle}>
        {value.toLocaleString()}
      </Text>
      <div className={getChangeClass(changeType)}>
        <FaArrowUp
          className={`${styles.updateTagIcon} ${
            changeType === "down" && styles.rotate
          }`}
        />
        <Text as="p" className={styles.updateTagText}>
          {change}%
        </Text>
      </div>
    </div>
  </div>
);

export default StatsCard;
