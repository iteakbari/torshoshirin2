"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

const IntroSwiper = () => {
  return (
    <Swiper
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        650: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1100: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      modules={[Autoplay]}
      className="w-full"
    >
      <SwiperSlide>
        <div className="grid justify-center">
          <Image
            width={200}
            height={200}
            alt=""
            src="https://admin.torshoshirin.com/files/react-img/Peach_3D.png"
            className="w-36"
          />
          <p className="text-center text-4xl mt-4">تازه</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="grid justify-center">
          <Image
            width={200}
            height={200}
            alt=""
            src="https://admin.torshoshirin.com/files/react-img/Lemon_3D.png"
            className="w-36"
          />
          <p className="text-center text-4xl mt-4">معطر</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="grid justify-center">
          <Image
            width={200}
            height={200}
            alt=""
            src="https://admin.torshoshirin.com/files/react-img/Avocado_3D.png"
            className="w-36"
          />
          <p className="text-center text-4xl mt-4">متنوع</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="grid justify-center">
          <Image
            width={200}
            height={200}
            alt=""
            src="https://admin.torshoshirin.com/files/react-img/Bucker Cart.png"
            className="w-36"
          />
          <p className="text-center text-4xl mt-4">خرید آسان</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default IntroSwiper;
