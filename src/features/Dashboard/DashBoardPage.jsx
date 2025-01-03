import React, { useState } from "react";
import styles from "./DashBoard.module.css";
import { Heading, Text } from "../../components/ui";
import IntroSlider from "../../components/Carousel/IntroSlider";
import DashBoardHeaderLeftSlider from "../../components/Carousel/DashboardHeaderLeftSlider";
import { useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import FilterBar from "../../components/FilterBar";
import StatsOverView from "../../components/DashBoard/StatsOverview";
import CustomBarChart from "../../components/BarGraph";
import {
  dashboardBarChartData,
  dashboardDoughnutChartData,
} from "../../data/Dashboard";
import SentimentAnalysisSection from "../../components/DashBoard/SentimentAnalysisSection";
import SearchBar from "../../components/SearchBar";

export default function DashBoardPage() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatsOverview, setActiveStatsOverview] =
    useState("Total Comments");
  const { user } = useSelector((state) => state.profile);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const debouncedUser = useDebounce(
    user !== null ? user : JSON.parse(sessionStorage.getItem("user")),
    300
  );

  const { data, options } = dashboardBarChartData;
  const { chartData, sentimentData, sourcesData, averageSentiment } =
    dashboardDoughnutChartData;

  const methods = [
    "All Channels",
    "YouTube",
    "Facebook",
    "Instagram",
    "LinkedIn",
    "TikTok",
  ];

  const handleFilterSelect = (method) => {
    console.log("Selected Filter:", method);
  };
  const onStatsOverviewSelect = (platform) => {
    console.log("Selected Stats Overview:", platform);
    setActiveStatsOverview(platform);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
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
            <div className={styles.searchBarContainer}>
              <SearchBar value={searchTerm} onChange={handleSearchChange} />
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
        <FilterBar methods={methods} onSelect={handleFilterSelect} />

        {/* Stats Overview */}
        <StatsOverView
          activeStatsOverview={activeStatsOverview}
          onStatsOverviewSelect={onStatsOverviewSelect}
        />

        {/* Graph and Sentiment Analysis */}
        <div className={styles.graphContainer}>
          <div className={styles.barGraph}>
            <CustomBarChart data={data} options={options} />
          </div>
          <div className={styles.sentimentAnalysis}>
            <h3 className={styles.title}>Sentiment Analysis</h3>
            <SentimentAnalysisSection
              sentimentData={sentimentData}
              sourcesData={sourcesData}
              averageSentiment={averageSentiment}
            />
          </div>
        </div>
      </section>
      {showModal && <IntroSlider handleCloseModal={handleCloseModal} />}
    </div>
  );
}
