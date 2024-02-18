"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import useProductComments from "@/hooks/useProductComments";
import { useEffect, useState } from "react";
import OffCanvas from "@/common/OffCanvas";

const ProductCommentList = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState({});
  const [step, setStep] = useState(1);
  const pageSize = 2;
  const { data } = useProductComments({ productId, step, pageSize });
  const [commentList, setCommentList] = useState([]);
  const commentCount = data?.totalCount;

  useEffect(() => {
    if (data) {
      setCommentList((prevComments) => [...prevComments, ...data.data]);
    }
  }, [data]);

  const newCommentList = commentList?.flatMap((p) => p);
  const pageEnd = Math.floor(commentCount / pageSize);
  // console.log("new", newCommentList);

  const loadMoreComment = () => {
    const nextPage = step + 1;
    if (nextPage <= pageEnd + 1) {
      setStep(nextPage);
    }
  };

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

  return (
    <>
      {data?.data.length > 0 ? (
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
          spaceBetween={30}
          className="w-full"
        >
          {newCommentList?.map((comment) => (
            <SwiperSlide key={comment.id}>
              <div className="card p-5 rounded-2xl bg-white h-40">
                <div className="grid grid-cols-10 mb-3">
                  <div className="col-span-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="50"
                      height="50"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21.08 8.58v6.84c0 1.12-.6 2.16-1.57 2.73l-5.94 3.43c-.97.56-2.17.56-3.15 0l-5.94-3.43a3.15 3.15 0 0 1-1.57-2.73V8.58c0-1.12.6-2.16 1.57-2.73l5.94-3.43c.97-.56 2.17-.56 3.15 0l5.94 3.43c.97.57 1.57 1.6 1.57 2.73Z"
                        stroke="#d9d9d9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M12 11a2.33 2.33 0 1 0 0-4.66A2.33 2.33 0 0 0 12 11ZM16 16.66c0-1.8-1.79-3.26-4-3.26s-4 1.46-4 3.26"
                        stroke="#d9d9d9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <div className="col-span-6">
                    <p className="font-bold mb-2">{comment.name}</p>
                    <p className="text-light text-sm">{comment.date}</p>
                  </div>
                </div>

                <p className="text-sm text-justify line-clamp-3">
                  {textCounter(comment.commentText)}
                  {comment?.commentText.length >= 85 && (
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
          <SwiperSlide>
            <div
              className="card cursor-pointer p-5 flex justify-center items-center gap-2 rounded-2xl bg-white h-40"
              onClick={() => loadMoreComment()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8 12h8M12 16V8M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z"
                  stroke="#d9d9d9"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="text-xl text-light">نظرات بیشتر</span>
            </div>
          </SwiperSlide>
        </Swiper>
      ) : (
        <p>نظری برای این محصول ثبت نشده است</p>
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

export default ProductCommentList;
