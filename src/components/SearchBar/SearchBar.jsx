"use client";
import { searchProduct } from "@/services/productService";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NumericFormat } from "react-number-format";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchList, setSearchList] = useState();
  const [curr, setCurr] = useState("");
  useEffect(() => {
    setCurr(localStorage.getItem("currency") || "تومان");
  }, []);
  const { mutateAsync: searchProductFunc } = useMutation({
    mutationKey: ["search"],
    mutationFn: searchProduct,
  });

  const router = useRouter();

  const searchProductHandler = async (e) => {
    setSearchValue(e.target.value);
    const { data } = await searchProductFunc({
      categoryId: null,
      brandId: null,
      barcode: "",
      keyWord: e.target.value,
      step: 1,
      pageSize: 20,
      totalCount: 0,
    });
    setSearchList(data?.productlist);
  };

  const submitSearchHandler = (e) => {
    e.preventDefault();
    router.push(`/search?keyword=${searchValue}`);
    setSearchValue("");
  };

  const clearSerachList = () => {
    setSearchValue("");
  };

  return (
    <>
      <div></div>
      <div className="searchBar">
        <form className="relative z-30" onSubmit={submitSearchHandler}>
          <input
            type="search"
            placeholder="جستجو در محصولات"
            className="rounded-full outline-none px-3 bg-transparent flex-1"
            value={searchValue}
            onChange={(e) => searchProductHandler(e)}
          />
          {!searchValue && (
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2 top-2"
            >
              <path
                d="M24.75 21.6783L26.8638 23.7922C27.7121 24.6404 27.7121 26.0156 26.8638 26.8638C26.0156 27.7121 24.6404 27.7121 23.7922 26.8638L21.6783 24.75M5.5 14.85C5.5 9.68614 9.68613 5.5 14.85 5.5C20.0138 5.5 24.2 9.68614 24.2 14.85C24.2 20.0139 20.0138 24.2 14.85 24.2C9.68613 24.2 5.5 20.0139 5.5 14.85Z"
                stroke="#A6B2A8"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </form>
        <div
          className={`w-full border-2 px-3 pt-12 overflow-y-auto overflow-x-hidden no-scroll  rounded-3xl transition-all duration-300 z-20 bg-white absolute top-0 left-0 right-0 ${
            searchValue.length > 0
              ? "h-80 border-color-green"
              : "h-0 border-transparent"
          }`}
        >
          {searchList?.length > 0 ? (
            searchList.map((item) => (
              <Link
                href={`/category/${item.categoryId}/${item.productId}-${item.variantId}`}
                key={item.productId}
                onClick={() => clearSerachList()}
                className="flex py-4 border-b last:border-b-0"
              >
                <div className="w-2/5 flex justify-center items-center">
                  <Image
                    width={80}
                    height={80}
                    alt={item.productName}
                    src={item.pathImage}
                  />
                </div>
                <div className="w-3/5">
                  <p className="w-full text-center text-sm mb-1">
                    {item.productName}
                  </p>
                  <p className="price">
                    <span>
                      هر{" "}
                      {item.unitCountingId === 1
                        ? "عدد"
                        : item.unitCountingId === 2
                        ? "کیلو"
                        : "بسته"}
                    </span>
                    <NumericFormat
                      displayType="text"
                      value={item.salePrice}
                      thousandSeparator=","
                    />
                    <span>{curr}</span>
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center gap-3">
              <p className="text-center">نتیجه ای یافت نشد</p>

              <Image
                width={100}
                height={100}
                alt="empty-basket"
                src="https://admin.torshoshirin.com/files/react-img/no-result.png"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
