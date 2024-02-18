"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import useRelatedProducts from "@/hooks/useRelatedProducts";
import Product from "./Product";
import { ShopContext } from "@/context/shopContext";

const RelatedProducts = ({ categoryId }) => {
  const [id, setId] = useState(null);
  useEffect(() => {
    setId(categoryId);
  }, [categoryId]);

  const { data } = useRelatedProducts(id);

  const [cartList, setCartList] = useState(null);
  const { cartItems } = useContext(ShopContext);

  useEffect(() => {
    setCartList(cartItems);
  }, [cartItems]);

  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        370: {
          slidesPerView: 1.1,
          spaceBetween: 10,
        },
        420: {
          slidesPerView: 1.2,
          spaceBetween: 10,
        },
        470: {
          slidesPerView: 1.3,
          spaceBetween: 10,
        },
        520: {
          slidesPerView: 1.4,
          spaceBetween: 10,
        },
        550: {
          slidesPerView: 1.5,
          spaceBetween: 10,
        },
        600: {
          slidesPerView: 1.6,
          spaceBetween: 10,
        },
        650: {
          slidesPerView: 1.8,
          spaceBetween: 10,
        },
        767: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 2.5,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1536: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
      }}
      spaceBetween={35}
      className="w-full "
    >
      {data?.data?.productlist?.map((product) => {
        const item = cartList?.find(
          (item) => item.productId === product.productId
        );
        return (
          <SwiperSlide key={product.productId}>
            <Product
              product={item ? item : product}
              categoriId={categoryId}
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

export default RelatedProducts;
