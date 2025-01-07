import React, { useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import styles from "../features/Dashboard/Dashboard.module.css";
import { Heading } from "../components/ui";
import IntroSlider from "../components/Carousel/IntroSlider";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import CustomBarChart from "../components/BarGraph";
import StatsOverView from "../features/Dashboard/components/StatsOverview";
import SentimentAnalysisSection from "../features/Dashboard/components/SentimentAnalysisSection";
import { dashboardBarChartData, dashboardDoughnutChartData } from "../data/Dashboard";
import { dashboardStaticData } from "../data/Dashboard";
import DashBoardHeaderRightSlider from "../components/Carousel/DashboardHeaderRightSlider";

// Utility: Debounced User Data
const getDebouncedUser = (user) =>
  useDebounce(user || JSON.parse(sessionStorage.getItem("user")), 300);

// Filter Methods
const filterMethods = [
  "All Channels",
  "YouTube",
  "Facebook",
  "Instagram",
  "LinkedIn",
  "TikTok",
];

// Header Section
function HeaderSection({ welcomeMessage, debouncedUser, searchTerm, onSearchChange }) {
  return (
    <section className={styles.headerContainer}>
      <div className={styles.headerSection}>
        <div className={styles.welcomeContainer}>
          <Heading className={styles.welcomeTitle}>
            {welcomeMessage.title} {debouncedUser?.name}
          </Heading>
          <p className={styles.welcomeDescription}>{welcomeMessage.desc}</p>
          <div className={styles.searchBarContainer}>
            <SearchBar value={searchTerm} onChange={onSearchChange} />
            <button className={styles.searchButton}>Search</button>
          </div>
        </div>
        <div className={styles.imageContainer}></div>
      </div>
      <div className={styles.carouselSection}>
        <DashBoardHeaderRightSlider />
      </div>
    </section>
  );
}

// Stats and Filter Section
function StatsAndFilterSection({
  filterMethods,
  activeStatsOverview,
  onFilterSelect,
  onStatsOverviewSelect,
  barChartData,
  doughnutChartData,
}) {
  return (
    <section className={styles.statsSection}>
      {/* Filter Bar */}
      <FilterBar methods={filterMethods} onSelect={onFilterSelect} />

      {/* Stats Overview */}
      <StatsOverView
        activeStatsOverview={activeStatsOverview}
        onStatsOverviewSelect={onStatsOverviewSelect}
      />

      {/* Graph and Sentiment Analysis */}
      <div className={styles.graphContainer}>
        <div className={styles.barGraph}>
          <CustomBarChart data={barChartData.data} options={barChartData.options} />
        </div>
        <div className={styles.sentimentAnalysis}>
          <h3 className={styles.title}>Sentiment Analysis</h3>
          <SentimentAnalysisSection
            sentimentData={doughnutChartData.sentimentData}
            sourcesData={doughnutChartData.sourcesData}
            averageSentiment={doughnutChartData.averageSentiment}
          />
        </div>
      </div>
    </section>
  );
}

// Main Component
export default function DashBoardPage() {
  // State
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatsOverview, setActiveStatsOverview] =
    useState("Total Comments");

  // Redux Selector and Debounced User
  const { user } = useSelector((state) => state.profile);
  const debouncedUser = getDebouncedUser(user);

  // Data and Constants
  const { data, options } = dashboardBarChartData;
  const { sentimentData, sourcesData, averageSentiment } =
    dashboardDoughnutChartData;
  const welcomeMessage = dashboardStaticData.welcome_message;

  // Handlers
  const handleCloseModal = () => setShowModal(false);
  const handleFilterSelect = (method) => console.log("Selected Filter:", method);
  const onStatsOverviewSelect = (platform) => setActiveStatsOverview(platform);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className={styles.dashboardPage}>
      {/* Header Section */}
      <HeaderSection
        welcomeMessage={welcomeMessage}
        debouncedUser={debouncedUser}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      {/* Stats and Filter Section */}
      <StatsAndFilterSection
        filterMethods={filterMethods}
        activeStatsOverview={activeStatsOverview}
        onFilterSelect={handleFilterSelect}
        onStatsOverviewSelect={onStatsOverviewSelect}
        barChartData={{ data, options }}
        doughnutChartData={{ sentimentData, sourcesData, averageSentiment }}
      />

      {/* Modal Section */}
      {showModal && <IntroSlider handleCloseModal={handleCloseModal} />}
    </div>
  );
}
