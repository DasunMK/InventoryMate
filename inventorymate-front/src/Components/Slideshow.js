import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./Slideshow.css";

const Slideshow = () => {
    const images = [
        "/assets/images/1.jpeg",
        "/assets/images/2.jpeg",
        "/assets/images/3.jpeg",
        "/assets/images/4.jpeg",
        "/assets/images/5.jpeg",
        "/assets/images/6.jpeg",
        "/assets/images/7.jpeg",
        "/assets/images/8.jpeg",
        "/assets/images/9.jpeg",
        "/assets/images/10.jpeg",
    ];

    return (
        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="slideshow-container"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} alt={`Slide ${index + 1}`} className="slideshow-image" />
          </SwiperSlide>
        ))}
      </Swiper>
      
    );
};

export default Slideshow;
