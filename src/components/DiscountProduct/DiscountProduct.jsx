"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Product from "../Product/Product";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "@/context/shopContext";
import useDiscounted from "@/hooks/useDiscounted";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

const DiscountProduct = () => {
  const [cartList, setCartList] = useState(null);
  const { cartItems } = useContext(ShopContext);
  const pageSize = 30;
  const { data } = useDiscounted({
    step: 1,
    pageSize,
    keyWord: "",
  });

  console.log(data);

  useEffect(() => {
    setCartList(cartItems);
  }, [cartItems]);

  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          navigation: false,
          navigation: {
            enabled: false,
          },
        },
        370: {
          slidesPerView: 1.1,
          spaceBetween: 10,
          navigation: false,
          navigation: {
            enabled: false,
          },
        },
        420: {
          slidesPerView: 1.2,
          spaceBetween: 10,
          navigation: false,
          navigation: {
            enabled: false,
          },
        },
        470: {
          slidesPerView: 1.3,
          spaceBetween: 10,
          navigation: false,
          navigation: {
            enabled: false,
          },
        },
        520: {
          slidesPerView: 1.4,
          spaceBetween: 10,
          navigation: false,
          navigation: {
            enabled: false,
          },
        },
        550: {
          slidesPerView: 1.5,
          spaceBetween: 10,
          navigation: false,
          navigation: {
            enabled: false,
          },
        },
        600: {
          slidesPerView: 1.6,
          spaceBetween: 10,
          navigation: false,
          navigation: {
            enabled: false,
          },
        },
        650: {
          slidesPerView: 1.8,
          spaceBetween: 10,
          navigation: false,
          navigation: {
            enabled: false,
          },
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 10,
          navigation: true,
          navigation: {
            enabled: true,
          },
        },
        1024: {
          slidesPerView: 2.5,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 3.05,
          spaceBetween: 30,
        },
        1536: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
      spaceBetween={35}
      className="w-full py-5 discounted-swiper rounded-lg swiper-bg px-5"
    >
      {data?.data?.productlist?.map((product) => {
        const item = cartList?.find(
          (item) => item.productId === product.productId
        );
        return (
          <SwiperSlide key={product.productId}>
            <Product
              product={item ? item : product}
              countItem={item?.productId === product.productId && item.count}
              weight={item?.productId === product.productId && item.weight}
              inBasket={false}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default DiscountProduct;
