import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Heading, Img, Text } from "../ui";

const CustomSwiper = ({ slides, config, customStyles }) => {
  return (
    <Swiper
      {...config}
      modules={[Navigation, Pagination,Autoplay]}
      className={customStyles?.swiperClass}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className={customStyles?.slide} >
          <div className={customStyles?.imgContainer}>
            <Img
              className={customStyles?.img}
              src={slide.img}
              alt={`Slide ${index + 1}`}
            />
          </div>
          <div className={customStyles?.textContainer}>
            <button className={customStyles.btn}>{slide?.btnText}</button>
            <Heading as={"h2"} className={customStyles?.title}>{slide.title}</Heading>
            <Text as={"p"} className={customStyles?.desc}>{slide.desc}</Text>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
