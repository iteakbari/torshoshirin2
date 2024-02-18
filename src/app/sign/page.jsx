"use client";

import Login from "@/components/Login/Login";
import SwiperSlider from "@/components/Swiper/SwiperSlider";
import Image from "next/image";

const Sign = ({ searchParams }) => {
  return (
    <div className="container mx-auto pt-24">
      <div className="md:px-32 lg:px-10 xl:px-32 lg:py-20">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-3/6">
            <Image
              src="https://admin.torshoshirin.com/files/react-img/logo.png"
              width={270}
              height={150}
              alt="logo"
              className="hidden lg:block"
            />
            <h3 className="text-xl hidden lg:block lg:text-3xl font-bold pt-10 lg:py-10">
              خرید آسان و مطمئن
            </h3>
            <div className="mb-10 hidden lg:block">
              <SwiperSlider />
            </div>
          </div>
          <div className="w-full lg:w-3/6 py-16">
            <Login searchParams={searchParams} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sign;
