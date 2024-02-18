"use client";
import BlogCard from "@/components/BlogCard/BlogCard";
import BlogCommentSwiper from "@/components/BlogCard/BlogCommentSwiper";
import useBlogList from "@/hooks/useBlogList";
import { use, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { searchBlog } from "@/services/blogService";

const Blog = () => {
  const [step, setStep] = useState(1);
  const [blogList, setBlogList] = useState([]);
  const [searchKeyworld, setSearchKeyworld] = useState("");
  const { isLoading, mutateAsync: searchBlogFunc } = useMutation({
    mutationFn: searchBlog,
  });

  const { data } = useBlogList({ documentGroupId: 3, step, pageSize: 20 });

  useEffect(() => {
    if (data) {
      setBlogList(data?.documentsList);
    }
  }, [data]);

  const searchHandler = async (e) => {
    setSearchKeyworld(e.target.value);
    const { data } = await searchBlogFunc({
      documentGroupId: 3,
      step,
      pageSize: 20,
      keyWord: e.target.value,
    });
    setBlogList(data?.documentsList);
  };

  // console.log(blogList);

  return (
    <div className="blog-bg">
      <div className="container lg:px-10 2xl:px-0 mx-auto pt-24 px-3">
        <div className="flex flex-col justify-center items-center py-10">
          <h1 className="text-3xl font-bold">بلاگ</h1>
          <p className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-7xl py-5 lg:py-10">
            میوه‌های سالــم و طــبیعی
          </p>
          <p className="font-bold text-3xl sm:text-4xl md:text-5xl xl:text-7xl py-5 lg:py-10">
            تازگی، سـلامتی و لـــذت
          </p>
        </div>
        <div className="flex justify-center py-5 mt-20">
          <span className="flex gap-2 justify-center items-center text-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="47"
              height="47"
              viewBox="0 0 47 47"
              fill="none"
            >
              <rect width="47" height="47" fill="url(#pattern0)" />
              <defs>
                <pattern
                  id="pattern0"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_409_6242"
                    transform="scale(0.0078125)"
                  />
                </pattern>
                <image
                  id="image0_409_6242"
                  width="128"
                  height="128"
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
            پست‌های اخیر
          </span>
        </div>
        <div>
          <form
            action=""
            className="relative border flex gap-2 border-gray-400 rounded-lg w-full sm:w-96 px-2 py-3 bg-white"
          >
            <span className="absolute -top-2 right-4 bg-white text-xs inline-block px-2 py-0.5">
              جستجو در بلاگ
            </span>
            <input
              type="search"
              onChange={searchHandler}
              className="bg-transparent flex-1 px-2"
            />
            <span className="flex w-10 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </span>
          </form>
        </div>
        <div className="py-20 grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-14 px-5">
          {blogList.length > 0 ? (
            blogList.map((blog) => <BlogCard key={blog.id} blog={blog} />)
          ) : (
            <p>مطلبی با عبارت {searchKeyworld} یافت نشد</p>
          )}
        </div>
      </div>
      <div className="pb-20">
        <div className="container mx-auto pb-10 text-xl flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8.3 18.04v-1.16C6 15.49 4.11 12.78 4.11 9.9c0-4.95 4.55-8.83 9.69-7.71 2.26.5 4.24 2 5.27 4.07 2.09 4.2-.11 8.66-3.34 10.61v1.16c0 .29.11.96-.96.96H9.26c-1.1.01-.96-.42-.96-.95ZM8.5 22c2.29-.65 4.71-.65 7 0"
              stroke="#4c4c4c"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          نظرات شما
        </div>
        <BlogCommentSwiper />
      </div>
    </div>
  );
};

export default Blog;
