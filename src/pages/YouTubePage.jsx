import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/YouTubePage.module.css";
import { createSelector } from "reselect";
import { getYoutubeVideoList } from "../services/operations/Youtube";
import VideoListSidebar from "../features/YouTube/components/VideoListSidebar";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import SuggestionSection from "../features/YouTube/components/SuggestionSection";
import CommentSection from "../features/YouTube/components/CommentSection";
import CompareCommentsSection from "../features/YouTube/components/CompareCommentsSection";
import { setShowStats } from "../store/slices/youTubeSlice";
dayjs.extend(isBetween);

const selectFilteredVideos = createSelector(
  [
    (state) => state.filter,
    (state) => state.youtube.videoList[0] || { videos: [] },
  ],
  ({ selectedDate, showFavorites, showTop10 }, videoList) => {
    if (!videoList.videos || videoList.videos.length === 0) {
      return { dateVideos: [], extraVideos: [] };
    }

    let filteredVideos = [...videoList.videos];
    let dateVideos = [];
    let extraVideos = [];

    if (selectedDate) {
      const formattedSelectedDate = dayjs(selectedDate).format("YYYY-MM-DD");

      dateVideos = filteredVideos.filter((video) => {
        const sanitizedPublishTime = video.publish_time.replace(".0", "");
        return (
          dayjs(sanitizedPublishTime).format("YYYY-MM-DD") ===
          formattedSelectedDate
        );
      });

      const selectedDateInstance = dayjs(formattedSelectedDate);

      const isLastWeek = (video) => {
        const sanitizedPublishTime = video.publish_time.replace(".0", "");
        return dayjs(sanitizedPublishTime).isBetween(
          selectedDateInstance.subtract(7, "days").startOf("day"),
          selectedDateInstance.endOf("day")
        );
      };

      const isLastMonth = (video) => {
        const sanitizedPublishTime = video.publish_time.replace(".0", "");
        return dayjs(sanitizedPublishTime).isBetween(
          selectedDateInstance.subtract(30, "days").startOf("day"),
          selectedDateInstance.subtract(7, "days").endOf("day")
        );
      };

      extraVideos = [
        ...filteredVideos.filter(isLastWeek),
        ...filteredVideos.filter(isLastMonth),
      ];
    } else {
      if (showFavorites) {
        filteredVideos = filteredVideos.filter(
          (video) => video.favorite_marked
        );
      }
      if (showTop10) {
        filteredVideos = filteredVideos
          .sort((a, b) => b.view_count - a.view_count)
          .slice(0, 10);
      }
      dateVideos = [...filteredVideos];
    }

    return { dateVideos, extraVideos };
  }
);

export default function YouTubePage() {
  const dispatch = useDispatch();
  const { userConfig } = useSelector((state) => state.profile);

  const { channel_id, channel_name } = userConfig?.YouTube[0];
  const { videoList, showStats } = useSelector((state) => state.youtube);
  const { dateVideos, extraVideos } = useSelector(selectFilteredVideos);
  const [selectedVideoSingle, setSelectedVideoSingle] = useState(null); // For single video selection
  const [selectedVideosMulti, setSelectedVideosMulti] = useState([]); // For multi-video selection
  const [compareComments, setCompareComments] = useState(false);

  useEffect(() => {
    if (!videoList.length) {
      dispatch(getYoutubeVideoList([channel_id]));
    }
  }, [dispatch, channel_id, videoList.length]);

  useEffect(() => {
    if (dateVideos.length && !compareComments) {
      dispatch(setShowStats(false));
      setSelectedVideoSingle({ video_id: dateVideos[0].video_id }); // Default to the first video in single-selection mode
      setSelectedVideosMulti([{ video_id: dateVideos[0].video_id }]); // Default to the first video in mu-selection mode
    }
  }, [dateVideos, compareComments]);

  const handleVideoSelection = (videoId) => {
    if (compareComments) {
      setSelectedVideosMulti((prev) => {
        // Check if videoId exists in the array by comparing video_id property
        const isAlreadySelected = prev.some(
          (item) => item.video_id === videoId
        );

        // Prevent removal of the last selected video
        if (isAlreadySelected && prev.length > 1) {
          // Remove the video if it's already selected
          return prev.filter((item) => item.video_id !== videoId);
        } else if (!isAlreadySelected) {
          // Add the video if it's not selected
          return [...prev, { video_id: videoId }];
        }

        // If only one item is left in the array, prevent its removal
        return prev;
      });
    } else {
      // Single selection mode
      setSelectedVideoSingle({ video_id: videoId });
    }
  };

  const memoizedSelectedVideoSingle = useMemo(
    () => (selectedVideoSingle ? [selectedVideoSingle] : []),
    [selectedVideoSingle]
  );
  return (
    <div className={styles.wrapper}>
      {/* Video list Sidebar */}
      {!showStats && (
        <VideoListSidebar
          dateVideos={dateVideos}
          extraVideos={extraVideos}
          selectedVideo={
            compareComments ? selectedVideosMulti : [selectedVideoSingle]
          }
          onVideoSelect={handleVideoSelection}
          compareComments={compareComments}
        />
      )}
      <div className={styles.content}>
        <div className={`${styles.commentContainer} `}>
          {compareComments ? (
            <CompareCommentsSection
              selectedVideos={selectedVideosMulti}
              setSelectedVideo={handleVideoSelection}
              compareComments={compareComments}
              handleCompareComments={() => setCompareComments(!compareComments)}
              onClearSelection={() => setSelectedVideosMulti([])}
            />
          ) : (
            <CommentSection
              selectedVideo={memoizedSelectedVideoSingle}
              compareComments={compareComments}
              onVideoSelect={handleVideoSelection}
              handleCompareComments={() => setCompareComments(!compareComments)}
            />
          )}
        </div>

        {!compareComments === !showStats && (
          <div className={styles.suggestionContainer}>
            <SuggestionSection />
          </div>
        )}
      </div>
    </div>
  );
}
