import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Img } from "../ui";

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
            <h1 className={customStyles?.title}>{slide.title}</h1>
            <p className={customStyles?.desc}>{slide.desc}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSwiper;
