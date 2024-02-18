"use client";
import NewBlog from "@/components/BlogCard/NewBlog";
import BlogComment from "@/components/Comment/BlogComment";
import BlogCommentList from "@/components/Product/BlogCommentList";
import useBlog from "@/hooks/useBlog";
import DOMPurify from "isomorphic-dompurify";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const BlogDetails = ({ params }) => {
  const [token, setToken] = useState();
  const blogId = params?.blogId;
  const { data, isLoading } = useBlog(blogId);

  // console.log(blogId);

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, [token]);

  const cleanHtml = DOMPurify.sanitize(data?.mainText, {
    USE_PROFILES: { html: true },
  });

  return (
    <div className="bg-light-green">
      <div className="container lg:px-10 2xl:px-0 mx-auto pt-24">
        <div className="py-16 grid grid-cols-1 lg:grid-cols-4">
          <div className="col-span-3 py-7 px-5 md:px-12 rounded-lg">
            <div className="sm:w-96 h-60 rounded-lg overflow-hidden">
              <Image
                width={400}
                height={250}
                alt="blog image"
                src={data?.pathImage}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h6 className="font-bold py-4">{data?.title}</h6>
              <div className="w-2/3 h-2 rounded-xl bg-white"></div>
              <div className="py-4">
                <span className="text-light pl-10">
                  {data?.authorName
                    ? data?.authorName
                    : "توسط ادمین ترش‌وشیرین "}
                </span>
                <span className="text-light">{data?.date}</span>
              </div>

              <div
                className="leading-7 text-justify text-black"
                dangerouslySetInnerHTML={{
                  __html: cleanHtml,
                }}
              ></div>
              <div className="w-2/3 h-2 rounded-xl bg-white my-10"></div>
            </div>
          </div>
          <div className="md:hidden lg:block">
            <p className="py-8 text-center text-xl">مطالب اخیر</p>
            <div className="bg-white">
              <NewBlog />
            </div>
          </div>
        </div>

        <p className="text-xl">نظرات</p>
        <div className="mt-5  px-5">
          <BlogCommentList blogId={blogId} />
        </div>

        <div className="flex flex-col items-center mt-16">
          <p className="text-center">
            نظرتون در مورد این محصول چیه؟ 🍊 با ما به اشتراک بگذارین!
          </p>
          <BlogComment blogId={blogId} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
