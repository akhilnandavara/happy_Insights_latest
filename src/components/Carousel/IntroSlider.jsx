import React, { useRef, useState } from "react";
import CustomSwiper from "./CustomSwiper";
import styles from "./styles/IntroSlider.module.css";
import { introSlides, introConfig } from "./swiperConfig";

const IntroSlider = ({ handleCloseModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex = introSlides.length - 1;

  // Ref for Swiper instance
  const swiperRef = useRef(null);

  const handlePrevClick = () => {
    if (currentIndex === 0) {
      handleCloseModal(); // Close modal on "Skip"
    } else {
      setCurrentIndex((prev) => prev - 1);
      swiperRef.current?.slideTo(currentIndex - 1); // Move to the previous slide
    }
  };

  const handleNextClick = () => {
    if (currentIndex === lastIndex) {
      handleCloseModal(); // Close modal on "Start"
    } else if (currentIndex < lastIndex) {
      setCurrentIndex((prev) => prev + 1);
      swiperRef.current?.slideTo(currentIndex + 1); // Move to the next slide
    }
  };

  return (
    <div className={`${styles.modalOverlay} ${styles.modalVisible}`}>
      <div
        className={`${styles.contentArea} ${styles.introModal}`}
        onClick={(e) => e.stopPropagation()}
      >
        <CustomSwiper
          slides={introSlides}
          config={{
            ...introConfig,
            onBeforeInit: (swiper) => (swiperRef.current = swiper),
            initialSlide: 0,
          }}
          customStyles={styles}
        />
        {/* Custom navigation */}
        <div className={styles.introBtns}>
          <button
            className={`${styles.customPrevBtn} customPrevBtn`}
            onClick={handlePrevClick}
          >
            {currentIndex === 0 ? "Skip" : "Back"}
          </button>
          <div className={`${styles.customPagination} customPagination`}></div>
          <button
            className={`${styles.customNextBtn} customNextBtn`}
            onClick={handleNextClick}
          >
            {currentIndex === lastIndex ? "Start" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroSlider;
