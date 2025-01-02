import React from "react";
import styles from "../../styles/components/StatsOverView.module.css"; // Assuming you save styles in this file
import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { MdChatBubble } from "react-icons/md";

const platformData = [
  { platform: "Total Comments", count: 12635, change: 12, icon: <MdChatBubble />, color: "primary" },
  { platform: "Facebook", count: 2354, change: 5, icon: <FaFacebook />, color: "#1877F2" },
  { platform: "YouTube", count: 3276, change: 21, icon: <FaYoutube />, color: "#FF0000" },
  { platform: "Instagram", count: 1804, change: -3, icon: <FaInstagram />, color: "#C13584" },
  { platform: "LinkedIn", count: 2719, change: -1, icon: <FaLinkedin />, color: "#0077B5" },
  { platform: "TikTok", count: 2482, change: 8, icon: <FaTiktok />, color: "#010101" },
];

const StatsOverView = ({activeStatsOverview,onStatsOverviewSelect}) => {
    
  return (
    <div className={styles.container}>
      {platformData.map(({ platform, count, change, icon, color }, index) => (
        <div key={index} className={`${styles.card}  ${activeStatsOverview === platform ? styles.active : ""}`} onClick={onStatsOverviewSelect.bind(this, platform)}>
          <div className={styles.header}>
            <span className={styles.icon} style={{ color }}>
              {icon}
            </span>
            <span className={styles.platform}>{platform}</span>
          </div>
          <div className={styles.body}>
            <span className={styles.count}>{count.toLocaleString()}</span>
            <span
              className={`${styles.change} ${change >= 0 ? styles.positive : styles.negative}`}
            >
              {change >= 0 ? `↑ ${change}%` : `↓ ${Math.abs(change)}%`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverView;
