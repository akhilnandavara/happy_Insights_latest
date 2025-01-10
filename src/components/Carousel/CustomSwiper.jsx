import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Heading, Img, Text } from "../ui";

const CustomSwiper = ({ slides, config, customStyles }) => {
  const [buttonWidth, setButtonWidth] = useState("fit-content"); // Track button width

  const handleSlideChange = (swiper) => {
    // Get the width for the current slide
    const newWidth = slides[swiper.realIndex].btnWidth; // Use btnWidth from the current slide
    setButtonWidth(newWidth); // Set the new width for the button
  };

  useEffect(() => {
    // Optionally set the initial width (you can skip this if your slides are already loaded with the right width)
    const initialWidth = slides[0].btnWidth || "fit-content"; // Set initial width from the first slide
    setButtonWidth(initialWidth); // Set the initial button width

    // Reset width transition or other effects if needed
    const timeout = setTimeout(() => {
      setButtonWidth(slides[0].btnWidth || "50%"); // Reset to initial width after some delay
    }, 1000);

    return () => clearTimeout(timeout); // Clean up timeout on component unmount
  }, [slides]); // Re-run if `slides` change

  return (
    <Swiper
      {...config}
      modules={[Navigation, Pagination, Autoplay]}
      className={customStyles?.swiperClass}
      onSlideChange={handleSlideChange} // Trigger width change on slide change
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className={customStyles?.slide}>
          <div className={customStyles?.imgContainer}>
            <Img
              className={customStyles?.img}
              src={slide.img}
              alt={`Slide ${index + 1}`}
            />
          </div>
          <div className={customStyles?.contentContainer}>
            <button
              className={customStyles.btn}
              style={{
                width: buttonWidth, // Dynamically update width based on state
              }}
            >
              {slide?.btnText}
            </button>

            <Heading as={"h2"} className={customStyles?.title}>
              {slide.title}
            </Heading>
            <Text as={"p"} className={customStyles?.desc}>
              {slide.desc}
            </Text>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
