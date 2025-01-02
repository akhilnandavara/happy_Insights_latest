import React, { useRef } from "react";
import CustomSwiper from "./CustomSwiper";
import styles from "./styles/DashboardHeaderLeftSlider.module.css";
import {
  DashBoardHeaderLeftConfig,
  DashBoardHeaderLeftSlides,
} from "./swiperConfig";

const DashBoardHeaderLeftSlider = () => {
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
        slides={DashBoardHeaderLeftSlides}
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

export default DashBoardHeaderLeftSlider;
