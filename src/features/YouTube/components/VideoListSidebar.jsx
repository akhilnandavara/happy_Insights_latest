import React, { useCallback, useMemo, useRef, useState } from "react";
import styles from "../Insights.module.css";
import { Heading, Img, Text } from "../../../components/ui";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";

import { CiSearch } from "react-icons/ci";
import FilterMenu from "./FilterMenu";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { IoMdEye } from "react-icons/io";
import { TbAdjustmentsFilled } from "react-icons/tb";
import { formatViewCount } from "../utils";
import Icon from "../../../components/Icon";
import classNames from "classnames";
import ToggleSideBarBtn from "../../../components/ToggleSideBarBtn";
import {
  resetFilters,
  setSelectedDate,
  toggleFavorites,
  toggleTop10,
} from "../../../store/slices/filterSlice";

const VideoItem = React.memo(
  ({ video, isSidebarOpen, isSelected, onSelect }) => {
    const {
      video_id,
      thumbnail_url,
      title,
      description,
      comment_count,
      view_count,
    } = video;

    return (
      <div
        onClick={onSelect}
        className={classNames(styles.videoItem, {
          [styles.videoItemClosed]: !isSidebarOpen,
          [styles.active]: isSelected,
        })}
      >
        <div className={styles.thumbnailContainer}>
          <Img
            src={thumbnail_url}
            alt={title}
            className={styles.thumbnailImg}
          />
        </div>
        {isSidebarOpen && (
          <div className={styles.videoInfo}>
            <Heading as="h3" className={styles.videoTitle}>
              {title}
            </Heading>
            <Text as="p" className={styles.headerFavVideoSubTitle}>
              {description}
            </Text>
            <div className={styles.videoStatsContainer}>
              <div className={styles.videoStats}>
                <IoMdEye className={styles.icon} />
                <Text as="p" className={styles.videoStatsText}>
                  {formatViewCount(view_count)}
                </Text>
              </div>
              <div className={styles.videoStats}>
                <Icon
                  sprite="youtube"
                  name="message"
                  className={styles.videoStatsIcon}
                />
                <Text as="p" className={styles.videoStatsText}>
                  {comment_count}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

const VideoSection = React.memo(
  ({ videos, title, isSidebarOpen, selectedVideo, onVideoSelect }) => {
    if (!videos.length) {
      return <Text as="p">No videos found</Text>;
    }

    return (
      <div className={styles.videoSection}>
        {title && (
          <Heading as="h2" className={styles.videoSectionTitle}>
            {title}
          </Heading>
        )}
        {videos.map((video) => (
          <VideoItem
            key={video.video_id}
            video={video}
            isSidebarOpen={isSidebarOpen}
            isSelected={selectedVideo.some(
              (v) => v?.video_id === video.video_id
            )}
            onSelect={() => onVideoSelect(video.video_id)}
          />
        ))}
      </div>
    );
  }
);

export default function VideoListSidebar({
  dateVideos,
  extraVideos,
  selectedVideo,
  onVideoSelect,
  compareComments,
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filterBtnRef = useRef(null);
  const filterMenuRef = useRef(null);
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state) => state.filter);

  const handleDateChange = useCallback(
    (date) => {
      if (date) {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        dispatch(setSelectedDate(formattedDate));
        setShowDatePicker(false);
        setIsFilterVisible(false);
      }
    },
    [dispatch]
  );

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const filteredDateVideos = useMemo(() => {
    return dateVideos?.filter((video) =>
      video?.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [dateVideos, searchTerm]);

  const filteredExtraVideos = useMemo(() => {
    return extraVideos.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [extraVideos, searchTerm]);
  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div
      className={classNames(styles.videoListSidebar, {
        [styles.videoListSidebarOpen]: isSidebarOpen,
        [styles.videoListSidebarClosed]: !isSidebarOpen,
      })}
    >
      {/* Header: Channel Info */}
      <div
        className={classNames(styles.headerChannelInfoWrapper, {
          [styles.headerChannelInfoOpen]: isSidebarOpen,
        })}
      >
        <Img
          className={classNames(styles.headerChannelLogo, {
            [styles.headerChannelLogoOpen]: isSidebarOpen,
            [styles.headerChannelLogoClosed]: !isSidebarOpen,
          })}
          src="https://placehold.co/20x20"
          alt="Channel Logo"
        />
        {isSidebarOpen && (
          <div className={styles.headerChannelInfo}>
            <Heading className={styles.headerChannelInfoTitle} as="h1">
              Channel Name
            </Heading>
            <div className={styles.headerChannelInfoSubTitle}>
              <div className={styles.headerChannelInfoSubTitleItem}>
                <Text as="p" className={styles.ChannelInfoSubHeading}>
                  1.4M
                </Text>
                <Text as="p" size="sm">
                  Subscribers
                </Text>
              </div>
              <div className={styles.headerChannelInfoSubTitleItem}>
                <Text as="p" className={styles.ChannelInfoSubHeading}>
                  890
                </Text>
                <Text as="p" size="sm">
                  Videos
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Sidebar Toggle Button */}

      <ToggleSideBarBtn
        setSidebarOpen={setSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Search and Filters */}
      <div className={styles.videoListHeader}>
        <div
          className={classNames(
            styles.commentSearchBox,
            styles.videoListSearchBar
          )}
        >
          <CiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search Videos..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
        </div>
        <div
          className={styles.filterIconWrapper}
          ref={filterBtnRef}
          onClick={() => setIsFilterVisible((prev) => !prev)}
        >
          <TbAdjustmentsFilled
            className={classNames(styles.icon, styles.filterIcon)}
          />
        </div>
        {isFilterVisible && (
          <FilterMenu
            ref={filterMenuRef}
            filterBtnRef={filterBtnRef}
            showDatePicker={showDatePicker}
            setShowDatePicker={setShowDatePicker}
            handleDateChange={handleDateChange}
            datePickerDate={selectedDate ? new Date(selectedDate) : new Date()}
            toggleFavorites={() => dispatch(toggleFavorites())}
            toggleTop10={() => dispatch(toggleTop10())}
            resetFilter={() => dispatch(resetFilters())}
            isFilterVisible={isFilterVisible}
            setIsFilterVisible={setIsFilterVisible}
          />
        )}
      </div>
      {/* Video Sections */}
      <div className={styles.videoListContainer}>
        <VideoSection
          videos={filteredDateVideos}
          isSidebarOpen={isSidebarOpen}
          selectedVideo={selectedVideo}
          onVideoSelect={onVideoSelect}
          compareComments={compareComments}
        />
        {extraVideos.length > 0 && (
          <VideoSection
            videos={filteredExtraVideos}
            title="Recent Videos"
            isSidebarOpen={isSidebarOpen}
            selectedVideo={selectedVideo}
            onVideoSelect={onVideoSelect}
            compareComments={compareComments}
          />
        )}
      </div>
    </div>
  );
}
