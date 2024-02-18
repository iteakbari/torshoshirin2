import useLastArticle from "@/hooks/useLastArticle";
import Link from "next/link";
import Image from "next/image";

const NewBlog = () => {
  const { data } = useLastArticle();

  return data?.documentsList?.map((item) => (
    <Link
      key={item.id}
      href={`/blog/${item.id}`}
      className=" grid grid-cols-6 gap-3 p-7 border-b last:border-0"
    >
      <div className="col-span-2 flex justify-center items-center w-20 h-20">
        <Image src={item.pathImage} width={80} height={80} alt={item.title} />
      </div>
      <div className="col-span-4">
        <h6 className="font-bold">{item.title}</h6>
        <p className="text-light">
          {item.authorName ? item.authorName : "توسط ادمین ترش‌وشیرین"}
        </p>
        <span className="text-light">{item.date}</span>
      </div>
    </Link>
  ));
};

export default NewBlog;
