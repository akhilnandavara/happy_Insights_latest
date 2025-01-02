import React, { useState } from "react";
import styles from "./DashBoard.module.css";
import { Heading, Text } from "../../components/ui";
import IntroSlider from "../../components/Carousel/IntroSlider";
import DashBoardHeaderLeftSlider from "../../components/Carousel/DashboardHeaderLeftSlider";
import { useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";

export default function DashBoardPage() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const debouncedUser = useDebounce(
    user !== null ? user : JSON.parse(sessionStorage.getItem("user")),
    300
  );

  return (
    <div className={styles.dashboardPage}>
      <section className={styles.headerContainer}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.welcomeContainer}>
            <Heading className={styles.welcomeTitle}>
              Hi Welcome! 👋 {debouncedUser?.name}
            </Heading>
            <p className={styles.welcomeDescription}>
              Explore Happy Insights to effortlessly manage your channels using
              AI. It helps you analyze comments, likes, and feedback (positive
              or negative) while automating short replies for better engagement.
              Gain valuable insights to refine your content strategy and boost
              audience interaction.
            </p>
            <div className={styles.searchBar}>
              <input
                type="text"
                placeholder="Enter ..."
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>Search</button>
            </div>
          </div>
          <div className={styles.imageContainer}></div>
        </div>

        {/* Carousel Section */}
        <div className={styles.carouselSection}>
          <DashBoardHeaderLeftSlider />
        </div>
      </section>

      {/* Filter and Stats Section */}
      <section className={styles.statsSection}>
        {/* Filters */}
        <div className={styles.filterContainer}>
          <button className={styles.filterButton}>All Channels</button>
          <button className={styles.filterButton}>Facebook</button>
          <button className={styles.filterButton}>YouTube</button>
          <button className={styles.filterButton}>Instagram</button>
          <button className={styles.filterButton}>LinkedIn</button>
          <button className={styles.filterButton}>TikTok</button>
          <div className={styles.dateFilter}>
            <input
              type="date"
              className={styles.dateInput}
              placeholder="Start date"
            />
            <input
              type="date"
              className={styles.dateInput}
              placeholder="End date"
            />
            <button className={styles.filterButton}>Filter</button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className={styles.statsOverview}>
          <div className={styles.statCard}>Total Comments: 12,635</div>
          <div className={styles.statCard}>Facebook: 2,354</div>
          <div className={styles.statCard}>YouTube: 3,276</div>
          <div className={styles.statCard}>Instagram: 1,804</div>
          <div className={styles.statCard}>LinkedIn: 2,719</div>
          <div className={styles.statCard}>TikTok: 2,482</div>
        </div>

        {/* Graph and Sentiment Analysis */}
        <div className={styles.graphContainer}>
          <div className={styles.barGraph}></div>
          <div className={styles.sentimentAnalysis}>
            <h3 className={styles.sentimentTitle}>Sentiment Analysis</h3>
            <ul className={styles.sentimentList}>
              <li className={styles.sentimentItem}>Happy Words: 2,559</li>
              <li className={styles.sentimentItem}>Sad Words: 1,471</li>
              <li className={styles.sentimentItem}>Greets Words: 865</li>
              <li className={styles.sentimentItem}>Neutral Words: 865</li>
            </ul>
            <div className={styles.averageSentiment}>
              Average Sentiment: 77%
            </div>
          </div>
        </div>
      </section>
      {showModal && <IntroSlider handleCloseModal={handleCloseModal} />}
    </div>
  );
}
