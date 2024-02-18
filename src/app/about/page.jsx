"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const About = () => {
  return (
    <div className="container lg:px-10 2xl:px-0 mx-auto pt-24">
      <div className="py-16">
        <div className="px-5 md:px-0">
          <div className="rounded-lg overflow-hidden ">
            <div className="bg-orange text-white text-center py-5 text-3xl">
              درباره ما
            </div>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="w-full aboutSwiper "
            >
              <SwiperSlide>
                <Image
                  alt="blog slider"
                  layout="fill"
                  objectFit="cover"
                  src="https://admin.torshoshirin.com/files/react-img/aboutSlide1.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  alt="blog slider"
                  layout="fill"
                  objectFit="cover"
                  src="https://admin.torshoshirin.com/files/react-img/aboutSlide1.png"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  alt="blog slider"
                  layout="fill"
                  objectFit="cover"
                  src="https://admin.torshoshirin.com/files/react-img/aboutSlide1.png"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="my-12 py-10">
            <p className="2xl:text-xl text-justify leading-loose">
              وبسایت ترش‌وشیرین، از سال ۱۳۹۹ فعالیت خود را آغاز کرده است. <br />{" "}
              در ترش‌وشیرین، ما به ارائه بهترین محصولات با کیفیت بالا و قیمت‌های
              منصفانه متعهد هستیم. تمام میوه‌ها با کنترل کیفیت دقیق جمع‌آوری
              می‌شوند تا شما بتوانید تازگی و لذت طعم میوه‌ها را در هر خرید تجربه
              کنید.
            </p>
          </div>
        </div>

        <div className="bg-color-gray p-10 xl:p-14 rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-30px p-10 lg:p-8 2xl:p-10 flex flex-col justify-center items-center gap-12">
            <div className="h-20 flex items-center">
              <Image
                src="https://admin.torshoshirin.com/files/react-img/clock2.svg"
                width={90}
                height={90}
                alt="clock"
              />
            </div>
            <p className="text-2xl lg:text-xl 2xl:text-2xl">
              <span className="text-orange">&quot;</span> ساعات کاری{" "}
              <span className="text-orange">&quot;</span>
            </p>
            <p className="">8صبح تا12شب</p>
          </div>
          <div className="bg-white rounded-30px p-10 lg:p-8 2xl:p-10 flex flex-col justify-center items-center gap-12">
            <div className="h-20 flex items-center">
              <Image
                src="https://admin.torshoshirin.com/files/react-img/refresh.svg"
                width={90}
                height={90}
                alt="refresh icon"
              />
            </div>

            <p className="text-2xl lg:text-xl 2xl:text-2xl">
              <span className="text-orange">&quot;</span> ضمانت بازگشت{" "}
              <span className="text-orange">&quot;</span>
            </p>
            <p className="">بی‌قید و شرط</p>
          </div>
          <div className="bg-white rounded-30px p-10 lg:p-8 2xl:p-10 flex flex-col justify-center items-center gap-12">
            <div className="h-20 flex items-center">
              <Image
                src="https://admin.torshoshirin.com/files/react-img/sandwatch.svg"
                width={60}
                height={83}
                alt="sandwatch icon"
              />
            </div>

            <p className="text-2xl lg:text-xl 2xl:text-2xl">
              <span className="text-orange">&quot;</span> ارسال فوری{" "}
              <span className="text-orange">&quot;</span>
            </p>
            <p className="">به شهر ساری</p>
          </div>
          <div className="bg-white rounded-30px p-10 lg:p-8 2xl:p-10 flex flex-col justify-center items-center gap-12">
            <div className="h-20 flex items-center">
              <Image
                src="https://admin.torshoshirin.com/files/react-img/creditcard.svg"
                width={90}
                height={90}
                alt="creditcard icon"
              />
            </div>
            <p className="text-2xl lg:text-xl 2xl:text-2xl">
              <span className="text-orange">&quot;</span> پرداخت در محل{" "}
              <span className="text-orange">&quot;</span>
            </p>
            <p className="">در محدوده شهر ساری</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
