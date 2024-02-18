import Image from "next/image";
import Link from "next/link";

const Category = ({ category: { id, name, icon } }) => {
  return (
    <Link href={`/category/${name}-${id}`} className="rounded-2xl">
      {icon ? (
        <Image width={350} height={350} alt="" src={icon} />
      ) : (
        <div className="relative flex justify-center">
          <span className="absolute top-6 sm:top-14 md:top-12 lg:top-9 xl:top-16 text-lg sm:text-2xl lg:text-xl xl:text-3xl">
            {name}
          </span>
          <Image
            width={350}
            height={350}
            alt=""
            src="https://admin.torshoshirin.com/files/react-img/defaultCategory.png"
          />
        </div>
      )}
    </Link>
  );
};

export default Category;
