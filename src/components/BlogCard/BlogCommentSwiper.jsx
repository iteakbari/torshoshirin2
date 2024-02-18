import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import useSelectedComments from "@/hooks/useSelectedComments";
import OffCanvas from "@/common/OffCanvas";

const BlogCommentSwiper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});
  const { data } = useSelectedComments();

  const textCounter = (text) => {
    if (text.length > 85) {
      return text.substring(0, 85) + "...";
    } else {
      return text;
    }
  };

  const showFullComment = (item) => {
    setSelectedComment(item);
    setIsOpen(true);
  };

  console.log(selectedComment);

  return (
    <>
      {data && (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1124: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          //   modules={[Pagination]}
          className="w-full py-5"
        >
          {data?.data?.map((b) => (
            <SwiperSlide key={b.id}>
              <div className="bg-white rounded-2xl p-10 shadow-lg h-48">
                <p className="font-bold text-xl">{b?.name}</p>
                <p className="pt-3 text-justify">
                  {textCounter(b?.commentText)}
                  {b?.commentText.length >= 85 && (
                    <button
                      type="button"
                      className="text-xs text-blue-500 absolute bottom-11 left-10"
                      onClick={() => showFullComment(b)}
                    >
                      مشاهده بیشتر
                    </button>
                  )}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <OffCanvas
        origin="center"
        height="h-max"
        show={isOpen ? "show" : ""}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        customeClass="py-14 px-5"
      >
        <p>{selectedComment?.name}</p>
        <p className="text-light text-xs">{selectedComment?.date}</p>
        <p className="mt-3">{selectedComment?.commentText}</p>
      </OffCanvas>
    </>
  );
};

export default BlogCommentSwiper;
