import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }) => {
  return (
    <Link
      href={`/blog/${blog.id}`}
      className="rounded-xl overflow-hidden bg-white"
    >
      <div className="h-48 overflow-hidden">
        <Image
          width={400}
          height={180}
          alt="blog"
          src={blog.pathImage}
          className="object-cover w-full"
        />
      </div>
      <div className="flex flex-col justify-center items-center p-5 text-center gap-3">
        <h6 className="font-bold">{blog.title}</h6>
        <p className="text-light">
          {blog.authorName ? blog.authorName : "توسط ادمین ترش‌وشیرین"}
        </p>
        <span className="text-light">{blog.date}</span>
      </div>
    </Link>
  );
};

export default BlogCard;
