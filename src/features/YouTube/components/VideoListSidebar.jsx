import React, { useCallback, useMemo, useRef, useState } from "react";
import styles from "../styles/videoListSidebar.module.css";
import { Heading, Img, Text } from "../../../components/ui";
import FilterMenu from "./FilterMenu";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { IoMdEye } from "react-icons/io";
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
import SearchBar from "../../../components/SearchBar";
import ProfileAvatar from "../../../components/ProfileAvatar";

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
        {/* VideoItem Info */}
        <div className={classNames(styles.videoInfo)}>
          {/* Video Title */}
          <Heading as="h3" className={styles.videoTitle}>
            {title}
          </Heading>
          {/* Subtitle */}
          <Text as="p" className={styles.videoSubTitle}>
            {description}
          </Text>
          {/* Video Stats Container */}
          <div className={styles.videoStatsContainer}>
            <div className={styles.videoStats}>
              <IoMdEye className={styles.icon} />
              <Text as="p" className={styles.videoSubTitle}>
                {formatViewCount(view_count)}
              </Text>
            </div>
            <div className={styles.videoStats}>
              <Icon
                sprite="youtube"
                name="message"
                className={styles.videoStatsIcon}
              />
              <Text as="p" className={styles.videoSubTitle}>
                {comment_count}
              </Text>
            </div>
          </div>
        </div>
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
      <>
        {title && (
          <Heading as="h2" className={styles.videoTitle}>
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
      </>
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
  const [isSidebarOpen, setSidebarOpen] = useState(false);
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

  const channelData = {
    name: "Tamil Pokkisham",
    email: "tamil.pokkisham@gmail.com",
    profile_photo_url: "",
  };

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
        <div className={styles.headerChannelInfoContainer}>
          {/* Section 1 */}
          <div
            className={classNames(styles.channelNameContainer, {
              [styles.closedIcon]: !isSidebarOpen,
            })}
          >
            <ProfileAvatar
              name={channelData?.name}
              profilePhotoUrl={channelData?.profile_photo_url}
              className={classNames(styles.headerChannelLogo, {
                [styles.headerChannelLogoOpen]: isSidebarOpen,
                [styles.headerChannelLogoClosed]: !isSidebarOpen, // Keep this logic
              })}
            />
            <div className={styles.headerChannelInfo}>
              <Heading className={styles.headerChannelInfoTitle} as="h1">
                {channelData.name}
              </Heading>
              <Text
                as="p"
                size="sm"
                className={styles.headerChannelInfoSubTitle}
              >
                Channel Name
              </Text>
            </div>
          </div>

          {/* Section 2 */}
          <div className={styles.headerChannelStatsContainer}>
            <div className={styles.headerChannelStatsItem}>
              <Text as="p" className={styles.headerChannelInfoTitle}>
                1.4M
              </Text>
              <Text
                as="p"
                size="sm"
                className={styles.headerChannelInfoSubTitle}
              >
                Subscribers
              </Text>
            </div>
            <div className={styles.headerChannelStatsItem}>
              <Text as="p" className={styles.headerChannelInfoTitle}>
                254
              </Text>
              <Text
                as="p"
                size="sm"
                className={styles.headerChannelInfoSubTitle}
              >
                Videos
              </Text>
            </div>
          </div>
        </div>

        {/* Sidebar Toggle Button */}
        <ToggleSideBarBtn
          setSidebarOpen={setSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
      </div>

      <div className={styles.videoListContent}>
        {/* Search and Filters */}
        <div className={styles.videoListHeaderSection}>
          <SearchBar
            placeholder="Search "
            className={classNames(styles.videoListSearchBar)}
            customIconClasss={styles.searchIcon}
            onChange={handleSearchChange}
          />
          {/* Filter Button */}
          <div
            className={styles.filterIconWrapper}
            ref={filterBtnRef}
            onClick={() => setIsFilterVisible((prev) => !prev)}
          >
            <Icon
              sprite="youtube"
              name="menu-icon"
              className={styles.filterIcon}
            />
          </div>

          {isFilterVisible && (
            <FilterMenu
              ref={filterMenuRef}
              filterBtnRef={filterBtnRef}
              showDatePicker={showDatePicker}
              setShowDatePicker={setShowDatePicker}
              handleDateChange={handleDateChange}
              datePickerDate={
                selectedDate ? new Date(selectedDate) : new Date()
              }
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
    </div>
  );
}
