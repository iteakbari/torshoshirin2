import Counter from "@/common/Counter";
import GramsCounter from "@/common/GramsCounter";
import { likeProduct } from "@/services/likeProduct";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NumericFormat } from "react-number-format";

const Product = ({ product, refetch, countItem, weight }) => {
  const {
    productId,
    pathImage,
    salePrice,
    productName,
    unitCountingId,
    isFavorite,
    categoryId,
    variantId,
    discountTypeId,
    oldSalePrice,
    discountValue,
    discountTilte,
  } = product || "";

  const [favorite, setFavorite] = useState(isFavorite);
  const { data, mutateAsync: likedProduct } = useMutation({
    mutationFn: likeProduct,
  });

  const token = Cookies.get("token");
  const [curr, setCurr] = useState("");
  useEffect(() => {
    setCurr(localStorage.getItem("currency") || "تومان");
  }, []);

  const favoriteHandler = async () => {
    if (token != null && token != "null") {
      const data = await likedProduct({ productId, token });
      setFavorite(!favorite);
      favorite
        ? toast.custom(
            (t) => (
              <div className="bg-slate-50 p-7 rounded-3xl shadow-lg">
                {productName} از لیست علاقمندی‌های شما حذف شد.
              </div>
            ),
            { duration: 2000 }
          )
        : toast.custom(
            (t) => (
              <div className="bg-slate-50 p-7 rounded-3xl shadow-lg">
                <div className="flex items-center gap-5">
                  <svg
                    width="35"
                    height="32"
                    viewBox="0 0 35 32"
                    fill="#DB7267"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.7077 5.19672C17.6042 5.33246 17.3961 5.33246 17.2927 5.19672C13.6238 0.382228 7.84966 -0.139009 4.26259 3.63301C0.607133 7.47693 0.607132 13.7092 4.26259 17.5531L15.5145 29.3852C16.6112 30.5384 18.3892 30.5384 19.4858 29.3852L30.7377 17.5531C34.3932 13.7092 34.3932 7.47693 30.7377 3.63301C27.1507 -0.139009 21.3766 0.382228 17.7077 5.19672Z"
                      stroke="#DB7267"
                      strokeWidth="2"
                    />
                  </svg>
                  <p>{productName} به لیست عللاقه‌مندی‌های شما اضافه شد.</p>
                </div>
                <div className="w-full flex justify-center pt-5">
                  <Link href="/dashboard/favorites">
                    مشاهده‌ی لیست علاقه‌مندی‌ها
                  </Link>
                </div>
              </div>
            ),
            { duration: 2000 }
          );
      refetch && refetch();
    } else {
      toast.custom((t) => (
        <div className="bg-slate-50 p-7 rounded-3xl shadow-lg">
          لطفا ابتدا به سایت وارد شوید.
          <div className="w-full flex justify-center pt-5">
            <Link href="/sign">ورود</Link>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className="card bg-white relative pt-10">
      {discountTypeId > 0 &&
        (discountTypeId === 2 ? (
          <span className="text-orange absolute top-0 right-3 z-10">
            <span className="block">
              <NumericFormat
                displayType="text"
                thousandSeparator=","
                value={discountTilte}
              />
              <small className="pr-1">{curr}</small>
            </span>
            <span className="text-lg">تخفیف</span>
          </span>
        ) : (
          <span className="off">
            <span>{discountTilte}%</span>
            <span className="text-lg">تخفیف</span>
          </span>
        ))}
      <label>
        <input
          type="checkbox"
          name="favorite"
          id=""
          onChange={favoriteHandler}
          className="hidden"
        />
        <svg
          width="35"
          height="32"
          viewBox="0 0 35 32"
          fill={`${favorite ? "#DB7267" : "none"}`}
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer absolute top-3 left-3 z-10"
        >
          <path
            d="M17.7077 5.19672C17.6042 5.33246 17.3961 5.33246 17.2927 5.19672C13.6238 0.382228 7.84966 -0.139009 4.26259 3.63301C0.607133 7.47693 0.607132 13.7092 4.26259 17.5531L15.5145 29.3852C16.6112 30.5384 18.3892 30.5384 19.4858 29.3852L30.7377 17.5531C34.3932 13.7092 34.3932 7.47693 30.7377 3.63301C27.1507 -0.139009 21.3766 0.382228 17.7077 5.19672Z"
            stroke="#DB7267"
            strokeWidth="2"
          />
        </svg>
      </label>
      <Link
        href={`/category/${categoryId}/${productId}-${variantId}`}
        className="flex justify-center h-36"
      >
        <Image
          width={200}
          height={200}
          alt=""
          src={pathImage}
          className="w-auto"
        />
      </Link>
      <div className="flex justify-between items-center px-3">
        <Link
          href={`/category/${categoryId}/${productId}-${variantId}`}
          className="inline-block w-48"
        >
          {productName}
        </Link>
        {discountTypeId > 0 && (
          <span className="text-gray-400 line-through">
            <NumericFormat
              displayType="text"
              value={oldSalePrice}
              thousandSeparator=","
            />
          </span>
        )}
        <p className="price">
          <span>
            هر{" "}
            {unitCountingId === 1
              ? "عدد"
              : unitCountingId === 2
              ? "کیلو"
              : "بسته"}
          </span>
          <NumericFormat
            displayType="text"
            value={salePrice}
            thousandSeparator=","
          />
          <span>{curr}</span>
        </p>
      </div>
      <div className="bg-light-gray p-5 sm:p-2 md:p-5 mt-3 rounded-xl h-36 flex flex-col justify-end">
        {unitCountingId === 1 ? (
          <>
            {/* <p className="pb-7 text-color-light">تعداد</p> */}
            <Counter
              step={1}
              label="عدد"
              product={product}
              countItem={countItem}
            />
          </>
        ) : unitCountingId === 2 ? (
          <GramsCounter product={product} weight={weight} />
        ) : (
          <>
            <Counter
              step={1}
              label="بسته"
              product={product}
              countItem={countItem}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Product;

// const addToBasketHandler = (
//   k,
//   g,
//   salePrice,
//   pathImage,
//   productId,
//   productName
// ) => {
//   const cartItem = { productId, productName, pathImage, salePrice, k, g };

//   cart.push(cartItem);
//   localStorage.setItem("cart", JSON.stringify(cart));

//   (k || g) &&
//     toast.custom((t) => (
//       <div className="bg-slate-50 p-7 rounded-3xl shadow-lg">
//         <p className="text-xl">
//           {k > 0 && (
//             <span>
//               <span className="text-orange">{k}</span>{" "}
//               <span>
//                 {unitCountingId === 1
//                   ? "عدد"
//                   : unitCountingId === 2
//                   ? "کیلوگرم"
//                   : "بسته"}
//               </span>
//             </span>
//           )}{" "}
//           {k > 0 && g > 0 && "و"}{" "}
//           {g > 0 && (
//             <span>
//               <span className="text-orange">{g}</span> گرم
//             </span>
//           )}{" "}
//           {productName} به سبد خرید شما اضافه شد
//         </p>
//       </div>
//     ));
// };
