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
import {
  dashboardStaticData,
  FilterBarData,
  dashboardBarChartData,
  dashboardDoughnutChartData,
} from "../data/Dashboard";
import DashBoardHeaderRightSlider from "../components/Carousel/DashboardHeaderRightSlider";

// Utility: Debounced User Data
const getDebouncedUser = (user) =>
  useDebounce(user || JSON.parse(sessionStorage.getItem("user")), 300);

// Header Section
function HeaderSection({
  welcomeMessage,
  debouncedUser,
  searchTerm,
  onSearchChange,
}) {
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
  onFilterSelect,
  barChartData,
  doughnutChartData,
}) {
  const [activeStatsOverview, setActiveStatsOverview] =
    useState("Total Comments");
  const onStatsOverviewSelect = (platform) => setActiveStatsOverview(platform);
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
          <Heading as={"h3"} className={styles.title}>
            Average Comments
          </Heading>

          <CustomBarChart
            data={barChartData.data}
            options={barChartData.options}
          />
        </div>
        <div className={styles.sentimentAnalysis}>
          <Heading as={"h3"} className={styles.title}>
            Sentiment Analysis
          </Heading>
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
  const handleFilterSelect = (method) =>
    console.log("Selected Filter:", method);
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
        filterMethods={FilterBarData.filterMethods}
        onFilterSelect={handleFilterSelect}
        barChartData={{ data, options }}
        doughnutChartData={{ sentimentData, sourcesData, averageSentiment }}
      />

      {/* Modal Section */}
      {showModal && <IntroSlider handleCloseModal={handleCloseModal} />}
    </div>
  );
}
