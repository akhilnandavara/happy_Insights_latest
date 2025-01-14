import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "../styles/CompareSectionHeaderSwiper.module.css";
import { Heading, Img, Text } from "../../../components/ui";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSelector } from "react-redux";
import { IoCloseCircle } from "react-icons/io5";
import Icon from "../../../components/Icon";
import { formatViewCount } from "../utils";
import { IoMdEye } from "react-icons/io";

export default function CompareSectionHeaderSwiper({
  selectedVideo,
  setSelectedVideo,
  videoLabels,
  videoColors,
}) {
  const { videoList } = useSelector((state) => state.youtube);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const swiperInstanceRef = useRef(null); // Reference for the Swiper instance

  const videosToShow = useMemo(() => {
    return videoList[0].videos?.filter((video) =>
      selectedVideo?.some((item) => item.video_id === video.video_id)
    );
  }, [videoList, selectedVideo]);

  useEffect(() => {
    const handleResize = () => {
      if (!videosToShow || videosToShow.length === 1) {
        setSlidesPerView(1); // Full width for one video
      } else if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize(); // Call on initial render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [videosToShow]);

  // Update Swiper instance when slidesPerView changes
  useEffect(() => {
    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.update(); // Ensure Swiper updates
    }
  }, [slidesPerView, videosToShow]);

  const isNavigationDisabled = useMemo(() => {
    return !videosToShow || videosToShow.length <= slidesPerView;
  }, [videosToShow, slidesPerView]);

  return (
    <div className={styles.headerSwipper}>
      {/* Prev Btn */}
      <div
        className={`${styles.customPrevBtn} ${
          isNavigationDisabled ? styles.disabled : ""
        }`}
      >
        <HiChevronLeft className={styles.icon} />
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={slidesPerView}
        navigation={{
          nextEl: `.${styles.customNextBtn}`,
          prevEl: `.${styles.customPrevBtn}`,
          disabledClass: styles.disabled,
        }}
        onSwiper={(swiper) => {
          swiperInstanceRef.current = swiper; // Capture the Swiper instance
        }}
        className={styles.mySwiper}
      >
        {videosToShow?.map((video) => (
          <SwiperSlide key={video.video_id} className={`${styles.card}`}>
            <div className={styles.thumbnailContainer}>
              <Img
                className={styles.thumnailImg}
                src={video.thumbnail_url}
                alt={video.title}
              />
            </div>
            <div className={styles.cardInfoContainer}>
              <div className={styles.headerTitleContainer}>
                <div className={styles.titleContainer}>
                  <Heading className={styles.headerFavVideoTitleEllipsis}>
                    {video.title}
                  </Heading>
                  <Text
                    style={{
                      color: videoColors[video.video_id]?.hex,
                      background: videoColors[video.video_id]?.rgba(0.1),
                    }}
                    className={styles.videoTagLabel}
                  >
                    {videoLabels[video.video_id]}
                  </Text>
                </div>

                {/* Close cross Btn */}
                <div
                  onClick={() => setSelectedVideo(video.video_id)}
                  className={styles.crossIconContainer}
                >
                  <IoCloseCircle className={`${styles.icon}`} />
                </div>
              </div>

              <Text as={"p"} className={styles.descText}>
                {video.description}
              </Text>

              {/* Video Stats Container */}
              <div className={styles.videoStatsContainer}>
                <div className={styles.videoStats}>
                  <IoMdEye className={styles.icon} />
                  <Text as="p" className={styles.descText}>
                    {formatViewCount(video.view_count)}
                  </Text>
                </div>
                <div className={styles.videoStats}>
                  <Icon
                    sprite="youtube"
                    name="message"
                    className={styles.videoStatsIcon}
                  />
                  <Text as="p" className={styles.descText}>
                    {video.comment_count}
                  </Text>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Next Btn */}
      <div
        className={`${styles.customNextBtn} ${
          isNavigationDisabled ? styles.disabled : ""
        }`}
      >
        <HiChevronRight className={styles.icon} />
      </div>
    </div>
  );
}
