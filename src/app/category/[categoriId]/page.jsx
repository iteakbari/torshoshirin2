"use client";
import Product from "@/components/Product/Product";
import useProducts from "@/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import ProductLoading from "@/components/Product/ProductLoading";
import { useInView } from "react-intersection-observer";
import useInfiniteProducts from "@/hooks/useInfiniteProducts";
import { useRouter } from "next/navigation";
import { ShopContext } from "@/context/shopContext";

const CategoryPage = ({ params }) => {
  const [step, setStep] = useState(1);
  const [sortBy, setSortBy] = useState(0);
  const [productsList, setProductsList] = useState([]);
  const [cartList, setCartList] = useState(null);

  const categoryName = decodeURI(params?.categoriId);
  const regex = /([^\/]+)-(\d+)/;
  const match = categoryName.match(regex);
  const cName = match[1];
  const categoryId = match[2];
  const pageSize = 20;
  const token = Cookies.get("token");
  const { ref, inView } = useInView();
  const router = useRouter();

  const { cartItems } = useContext(ShopContext);

  useEffect(() => {
    setCartList(cartItems);
  }, [cartItems]);

  // console.log(cartList);

  const { data, isLoading, isFetching } = useProducts({
    categoryId: +categoryId,
    step,
    pageSize,
    keyWord: "",
    sortTypeId: sortBy,
  });

  const productsCount = data?.totalCount;

  useEffect(() => {
    if (data?.productlist) {
      // از spread operator برای خارج کردن اشیاء از آرایه‌ها استفاده می‌کنیم
      const newProducts = data.productlist.reduce((unique, product) => {
        if (!unique.some((obj) => obj.productId === product.productId)) {
          unique.push(product);
        }
        return unique;
      }, []);
      // حالا با استفاده از کد زیر، محصولات جدید را به لیست قبلی اضافه کنید
      setProductsList((prevProducts) => [
        // ابتدا محصولات جدید را اضافه کنید
        // سپس محصولات قبلی را اضافه کنید، بدون اینکه محصولاتی که در newProducts هستند مجدداً اضافه شوند
        ...prevProducts.filter(
          (product) =>
            !newProducts.some(
              (newProduct) => newProduct.productId === product.productId
            )
        ),
        ...newProducts,
      ]);
    }
  }, [data]);

  const newProductsList = productsList?.flatMap((p) => p);
  const pageEnd = Math.floor(productsCount / pageSize);

  useEffect(() => {
    if (inView) {
      const nextPage = step + 1;
      if (nextPage <= pageEnd) {
        setStep(nextPage);
      }
    }
  }, [inView, step, pageEnd]);

  const sortProductHandler = (e) => {
    if (e.target.value !== sortBy) {
      setSortBy(e.target.value);
      // ابتدا مقدار step را بازنشانی کنید
      setStep(1);
      // سپس لیست کنونی را پاک کنید
      setProductsList([]);
    }
  };

  return (
    <div className="container lg:px-10 2xl:px-0 mx-auto pt-24">
      <div className="py-16">
        <div className="sm:flex justify-between px-3">
          <h1 className="text-3xl sm:text-2xl lg:text-3xl text-center sm:text-right flex-1 mb-5 sm:mb-0">
            {cName}
          </h1>
          <div className="flex items-center md:items-end gap-5">
            <p className="flex items-end gap-3">
              <svg
                className="w-8 h-6 md:w-10 md:h-8"
                viewBox="0 0 44 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.5 2C13.5 1.17157 12.8284 0.5 12 0.5C11.1716 0.5 10.5 1.17157 10.5 2L13.5 2ZM10.9393 30.0607C11.5251 30.6464 12.4749 30.6464 13.0607 30.0607L22.6066 20.5147C23.1924 19.9289 23.1924 18.9792 22.6066 18.3934C22.0208 17.8076 21.0711 17.8076 20.4853 18.3934L12 26.8787L3.51472 18.3934C2.92893 17.8076 1.97918 17.8076 1.3934 18.3934C0.807611 18.9792 0.807611 19.9289 1.3934 20.5147L10.9393 30.0607ZM10.5 2L10.5 29L13.5 29L13.5 2L10.5 2Z"
                  fill="#1A3622"
                />
                <line
                  x1="13.5"
                  y1="34.5"
                  x2="42.5"
                  y2="34.5"
                  stroke="#1A3622"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="26.5"
                  y1="26.5"
                  x2="42.5"
                  y2="26.5"
                  stroke="#1A3622"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <line
                  x1="31.5"
                  y1="18.5"
                  x2="42.5"
                  y2="18.5"
                  stroke="#1A3622"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-base md:text-xl">مرتب‌سازی بر اساس:</span>
            </p>
            <div className="flex gap-5">
              <div className="sort-input">
                <input
                  type="radio"
                  name="sort"
                  id="1"
                  className="hidden"
                  value="1"
                  onChange={(e) => sortProductHandler(e)}
                />
                <label
                  className="text-base md:text-xl cursor-pointer"
                  htmlFor="1"
                >
                  ارزان‌ترین
                </label>
              </div>
              <div className="sort-input">
                <input
                  type="radio"
                  name="sort"
                  id="2"
                  className="hidden"
                  value="2"
                  onChange={(e) => sortProductHandler(e)}
                />
                <label
                  htmlFor="2"
                  className="text-base md:text-xl cursor-pointer"
                >
                  گران‌ترین
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 lg:p-12 2xl:p-10 rounded-xl shadow mt-10 ">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-8 h-full">
              <ProductLoading />
            </div>
          ) : newProductsList.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 md:gap-8 lg:gap-10 2xl:gap-8 h-full">
                {newProductsList.map((product) => {
                  const item = cartList?.find(
                    (item) => item.productId === product.productId
                  );

                  return (
                    <Product
                      key={product.productId}
                      product={item ? item : product}
                      categoriId={categoryId}
                      countItem={
                        item?.productId === product.productId && item.count
                      }
                      weight={
                        item?.productId === product.productId && item.weight
                      }
                      inBasket={false}
                    />
                  );
                })}
              </div>

              <div className="flex justify-center items-center mt-10 gap-1">
                <span ref={ref}>
                  {step < pageEnd ? <p>در حال بارگزاری...</p> : null}
                </span>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center flex-col min-h-700">
              <p className="text-center mb-10 text-light text-xl">
                محصولی در این دسته بندی ثبت نشده است.
              </p>
              <Image
                src="https://admin.torshoshirin.com/files/react-img/b2.png"
                width={300}
                height={300}
                alt="basket image"
              />
              <Link href="/" className="mt-10">
                بازگشت
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
