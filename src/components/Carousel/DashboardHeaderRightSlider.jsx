import React, { useRef } from "react";
import CustomSwiper from "./CustomSwiper";
import styles from "./styles/DashboardHeaderRightSlider.module.css";
import {
  DashBoardHeaderLeftConfig,
  DashBoardHeaderRightSlides,
} from "./swiperConfig";

const DashBoardHeaderRightSlider = () => {
  // Ref for Swiper instance
  const swiperRef = useRef(null);

  const handlePrevClick = () => {
    swiperRef.current?.slideTo(currentIndex - 1); // Move to the previous slide
  };

  const handleNextClick = () => {
    swiperRef.current?.slideTo(currentIndex + 1); // Move to the next slide
  };

  return (
    <>
      <CustomSwiper
        slides={DashBoardHeaderRightSlides}
        config={DashBoardHeaderLeftConfig}
        customStyles={styles}
      />
      <div className={styles.customNavContainer}>
        <div className={`${styles.customPagination} customPagination`}></div>
        <div className={styles.navBtnsContainer}>
          <button
            className={`${styles.customPrevBtn} customPrevBtn`}
            onClick={handlePrevClick}
          >
            {"<"}
          </button>
          <button
            className={`${styles.customNextBtn} customNextBtn`}
            onClick={handleNextClick}
          >
            {">"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DashBoardHeaderRightSlider;
