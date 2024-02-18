import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import Image from "next/image";

const SwiperSlider = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="flex items-center gap-5">
            <Image
              src="https://admin.torshoshirin.com/files/react-img/s1.png"
              alt=""
              width={220}
              height={220}
            />
            <p className="text-xl">
              به سادگی سوابق خرید و فعالیت‌های خودتون رو مدیریت کنین.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center gap-5">
            <Image
              src="https://admin.torshoshirin.com/files/react-img/s1.png"
              alt=""
              width={220}
              height={220}
            />
            <p className="text-xl">
              به سادگی سوابق خرید و فعالیت‌های خودتون رو مدیریت کنین.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex items-center gap-5">
            <Image
              src="https://admin.torshoshirin.com/files/react-img/s1.png"
              alt=""
              width={220}
              height={220}
            />
            <p className="text-xl">
              به سادگی سوابق خرید و فعالیت‌های خودتون رو مدیریت کنین.
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SwiperSlider;
