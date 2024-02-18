"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "../SearchBar/SearchBar";
import useGetProfile from "@/hooks/useGetProfile";
import { ShopContext } from "@/context/shopContext";
import { NumericFormat } from "react-number-format";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Logout from "../Logout/Logout";
import useCategories from "@/hooks/useCategories";
import OffCanvas from "@/common/OffCanvas";
import MobileMenu from "../MobileMenu/MobileMenu";
import Counter from "@/common/Counter";
import GramsCounter from "@/common/GramsCounter";

function Navbar() {
  const [token, setToken] = useState("");
  const { data: menuList } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const [closeCart, setCloseCart] = useState(true);
  const [curr, setCurr] = useState("");
  useEffect(() => {
    setCurr(localStorage.getItem("currency") || "تومان");
  }, []);

  const { cartItems, resetCart, removeFromCart, totalPrice } =
    useContext(ShopContext);

  // const itemCount = cartItems?.reduce((prev, current) => {
  //   return prev + current.count;
  // }, 0);

  const itemCount = cartItems?.length;

  useEffect(() => {
    const getToken = Cookies.get("token") ? Cookies.get("token") : null;
    setToken(getToken);
  }, []);

  const { data } = useGetProfile(token);
  // useEffect(() => {
  //   if (typeof window !== "undefined") window.location.reload();
  // }, [data]);

  const router = useRouter();

  const cartHandler = () => {
    data?.success ? router.push("/purchase") : router.push("/sign?purchase");
    hideCartHandler();
  };

  const hideCartHandler = () => {
    setCloseCart(false);
  };
  const showCartHandler = () => {
    setCloseCart(true);
  };

  return (
    <header className="top-0 lg:rounded-br-2xl lg:rounded-bl-2xl p-2 lg:py-3 shadow-md z-40 fixed right-0 left-0 bg-blured">
      <div className="container mx-auto lg:px-5">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="https://admin.torshoshirin.com/files/react-img/logo.png"
              width={100}
              height={50}
              alt="logo"
              className="h-12 w-auto xl:h-16"
            />
          </Link>

          <ul className="hidden lg:flex flex-1 lg:gap-5 xl:gap-10 justify-center lg:text-base 2xl:text-lg">
            <li>
              <Link href="/">خانه</Link>
            </li>
            <li>
              <div className="dropdown">
                دسته‌بندی
                <span>
                  <svg
                    width="16"
                    height="9"
                    viewBox="0 0 16 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.87535 6.51318L2.24432 0.881395L2.24431 0.881383C2.08015 0.717223 1.8575 0.625 1.62535 0.625C1.39319 0.625 1.17054 0.717223 1.00638 0.881383C0.842224 1.04554 0.75 1.26819 0.75 1.50035C0.75 1.7325 0.842224 1.95515 1.00638 2.11931L7.25628 8.36921L7.25638 8.36931L7.43316 8.19254C7.49121 8.25065 7.56014 8.29675 7.63601 8.3282C7.71188 8.35965 7.79321 8.37584 7.87535 8.37584C7.95748 8.37584 8.03881 8.35965 8.11469 8.3282C8.19056 8.29675 8.25949 8.25065 8.31754 8.19254M7.87535 6.51318L8.49431 8.36931L8.31754 8.19254M7.87535 6.51318L13.5064 0.881395L13.5064 0.881384C13.5877 0.800099 13.6842 0.735622 13.7904 0.691632C13.8966 0.647641 14.0104 0.625 14.1253 0.625C14.2403 0.625 14.3541 0.647641 14.4603 0.691632C14.5665 0.735622 14.663 0.800099 14.7443 0.881384V0.881384M7.87535 6.51318L14.7443 0.881382L14.5678 1.05794L14.7443 0.881384M8.31754 8.19254L8.49441 8.36921M8.31754 8.19254L14.5675 1.94254C14.6256 1.88447 14.6717 1.81553 14.7031 1.73966C14.7345 1.66379 14.7507 1.58247 14.7507 1.50035C14.7507 1.41823 14.7345 1.33691 14.7031 1.26104C14.6717 1.18517 14.6256 1.11623 14.5675 1.05816C14.5095 1.00009 14.4405 0.954028 14.3647 0.922601C14.2888 0.891175 14.2075 0.875 14.1253 0.875C14.0432 0.875 13.9619 0.891175 13.886 0.922601C13.8102 0.954028 13.7412 1.00009 13.6832 1.05816L8.49441 8.36921M8.49441 8.36921L14.7443 2.11931C14.8256 2.03803 14.8901 1.94153 14.9341 1.83533C14.9781 1.72913 15.0007 1.6153 15.0007 1.50035C15.0007 1.38539 14.9781 1.27157 14.9341 1.16537C14.8901 1.05917 14.8256 0.962668 14.7443 0.881384M8.49441 8.36921L14.7443 0.881384"
                      fill="#20422A"
                      stroke="#20422A"
                      strokeWidth="0.5"
                    />
                  </svg>
                </span>
                <ul className="dropdown-menu">
                  {menuList?.data?.map((m) => (
                    <li key={m.id}>
                      <Link
                        href={`/category/${m.name}-${m.id}`}
                        className="text-sm 2xl:text-xl"
                      >
                        {m.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li>
              <Link href="/discounted" className="">
                تخفیف‌دار
              </Link>
            </li>
            <li>
              <Link href="/blog" className="">
                بلاگ
              </Link>
            </li>
            <li>
              <Link href="/about" className="">
                درباره ما
              </Link>
            </li>
            <li>
              <Link href="/contactus" className="">
                تماس با ما
              </Link>
            </li>
            {!token ? (
              <li>
                <Link href="/sign" className="">
                  ورود/ثبت نام
                </Link>
              </li>
            ) : (
              <li>
                <div className="dropdown">
                  صفحه‌ی من
                  <span>
                    <svg
                      width="16"
                      height="9"
                      viewBox="0 0 16 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.87535 6.51318L2.24432 0.881395L2.24431 0.881383C2.08015 0.717223 1.8575 0.625 1.62535 0.625C1.39319 0.625 1.17054 0.717223 1.00638 0.881383C0.842224 1.04554 0.75 1.26819 0.75 1.50035C0.75 1.7325 0.842224 1.95515 1.00638 2.11931L7.25628 8.36921L7.25638 8.36931L7.43316 8.19254C7.49121 8.25065 7.56014 8.29675 7.63601 8.3282C7.71188 8.35965 7.79321 8.37584 7.87535 8.37584C7.95748 8.37584 8.03881 8.35965 8.11469 8.3282C8.19056 8.29675 8.25949 8.25065 8.31754 8.19254M7.87535 6.51318L8.49431 8.36931L8.31754 8.19254M7.87535 6.51318L13.5064 0.881395L13.5064 0.881384C13.5877 0.800099 13.6842 0.735622 13.7904 0.691632C13.8966 0.647641 14.0104 0.625 14.1253 0.625C14.2403 0.625 14.3541 0.647641 14.4603 0.691632C14.5665 0.735622 14.663 0.800099 14.7443 0.881384V0.881384M7.87535 6.51318L14.7443 0.881382L14.5678 1.05794L14.7443 0.881384M8.31754 8.19254L8.49441 8.36921M8.31754 8.19254L14.5675 1.94254C14.6256 1.88447 14.6717 1.81553 14.7031 1.73966C14.7345 1.66379 14.7507 1.58247 14.7507 1.50035C14.7507 1.41823 14.7345 1.33691 14.7031 1.26104C14.6717 1.18517 14.6256 1.11623 14.5675 1.05816C14.5095 1.00009 14.4405 0.954028 14.3647 0.922601C14.2888 0.891175 14.2075 0.875 14.1253 0.875C14.0432 0.875 13.9619 0.891175 13.886 0.922601C13.8102 0.954028 13.7412 1.00009 13.6832 1.05816L8.49441 8.36921M8.49441 8.36921L14.7443 2.11931C14.8256 2.03803 14.8901 1.94153 14.9341 1.83533C14.9781 1.72913 15.0007 1.6153 15.0007 1.50035C15.0007 1.38539 14.9781 1.27157 14.9341 1.16537C14.8901 1.05917 14.8256 0.962668 14.7443 0.881384M8.49441 8.36921L14.7443 0.881384"
                        fill="#20422A"
                        stroke="#20422A"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <Link href="/dashboard">داشبورد</Link>
                    </li>
                    <li>
                      <Link href="/dashboard/profile">پروفایل</Link>
                    </li>
                    <li>
                      <Link href="/dashboard/orders">سفارش‌ها</Link>
                    </li>
                    <li>
                      <Link href="/dashboard/favorites">علاقمندی‌ها</Link>
                    </li>
                    <li>
                      <Logout>خروج</Logout>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
          <div className="flex gap-5 lg:gap-3 items-center">
            <div className="relative hidden lg:block cartIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="34"
                viewBox="0 0 40 34"
                fill="none"
                className=" cursor-pointer"
              >
                <path
                  d="M36.5 0.5H3.5C2.70435 0.5 1.94129 0.81607 1.37868 1.37868C0.81607 1.94129 0.5 2.70435 0.5 3.5V30.5C0.5 31.2956 0.81607 32.0587 1.37868 32.6213C1.94129 33.1839 2.70435 33.5 3.5 33.5H36.5C37.2956 33.5 38.0587 33.1839 38.6213 32.6213C39.1839 32.0587 39.5 31.2956 39.5 30.5V3.5C39.5 2.70435 39.1839 1.94129 38.6213 1.37868C38.0587 0.81607 37.2956 0.5 36.5 0.5ZM36.5 3.5V6.5H3.5V3.5H36.5ZM36.5 30.5H3.5V9.5H36.5V30.5ZM29 14C29 16.3869 28.0518 18.6761 26.364 20.364C24.6761 22.0518 22.3869 23 20 23C17.6131 23 15.3239 22.0518 13.636 20.364C11.9482 18.6761 11 16.3869 11 14C11 13.6022 11.158 13.2206 11.4393 12.9393C11.7206 12.658 12.1022 12.5 12.5 12.5C12.8978 12.5 13.2794 12.658 13.5607 12.9393C13.842 13.2206 14 13.6022 14 14C14 15.5913 14.6321 17.1174 15.7574 18.2426C16.8826 19.3679 18.4087 20 20 20C21.5913 20 23.1174 19.3679 24.2426 18.2426C25.3679 17.1174 26 15.5913 26 14C26 13.6022 26.158 13.2206 26.4393 12.9393C26.7206 12.658 27.1022 12.5 27.5 12.5C27.8978 12.5 28.2794 12.658 28.5607 12.9393C28.842 13.2206 29 13.6022 29 14Z"
                  fill="#20422A"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute flex w-6 h-6 rounded-full justify-center items-center -top-2 -right-3 bg-orange">
                  {itemCount < 1 ? 1 : itemCount}
                </span>
              )}
              <div className="absolute top-full -left-20 sm:left-0 p-5 bg-white shadow-lg rounded-lg w-80 xl:w-96 cart">
                {itemCount > 0 ? (
                  <div className="grid gap-3">
                    <div className="basket-item-wrapper no-scroll">
                      {cartItems.map((item) => (
                        <div
                          className="relative py-8  border-b last:border-b-0 border-gray-300"
                          key={item.productId}
                        >
                          <span
                            className="absolute top-5 -left-1 w-6 h-6 shadow-lg bg-white rounded-full flex justify-center items-center cursor-pointer"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </span>
                          <div>
                            <Link
                              className="flex justify-between "
                              href={`/category/${item.categoryId}/${item.productId}-${item.variantId}`}
                              onClick={() => hideCartHandler()}
                            >
                              <div>
                                <p>{item.productName}</p>
                                <p>
                                  <NumericFormat
                                    thousandSeparator=","
                                    displayType="text"
                                    value={item.totalPrice}
                                  />
                                  <small className="pr-1">{curr}</small>
                                  {item.discountTypeId > 0 && (
                                    <span className="text-gray-400 line-through mr-2">
                                      <NumericFormat
                                        thousandSeparator=","
                                        displayType="text"
                                        value={
                                          item.weight
                                            ? item.oldSalePrice * item.weight
                                            : item.oldSalePrice * item.count
                                        }
                                      />
                                      <small>{curr}</small>
                                    </span>
                                  )}
                                </p>
                                {/* <p>
                                {item.weight ? item.weight : item.count}
                                <span className="text-light text-sm">
                                  {item.unitCountingId === 1
                                    ? " عدد"
                                    : item.unitCountingId === 2
                                    ? " کیلوگرم"
                                    : " بسته"}
                                </span>
                              </p> */}
                              </div>
                              <div className="w-20 h-20 xl:w-24 xl:h-24 rounded-lg overflow-hidden">
                                <Image
                                  src={item.pathImage}
                                  alt={item.productName}
                                  width={100}
                                  height={100}
                                  className="w-16 h-16 xl:w-full xl:h-full object-cover"
                                />
                              </div>
                            </Link>
                            <div>
                              {item.unitCountingId === 1 ? (
                                <div className="w-48">
                                  {/* <p className="pb-7 text-color-light">تعداد</p> */}
                                  <Counter
                                    step={1}
                                    label="عدد"
                                    product={item}
                                    countItem={item.count}
                                    inBasket={true}
                                  />
                                </div>
                              ) : item.unitCountingId === 2 ? (
                                <div className="w-48">
                                  <GramsCounter
                                    product={item}
                                    inBasket={true}
                                    weight={item.weight}
                                  />
                                </div>
                              ) : (
                                <div className="w-48">
                                  <Counter
                                    step={1}
                                    label="بسته"
                                    product={item}
                                    inBasket={true}
                                    countItem={item.count}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-3 flex justify-between items-center">
                      <p className="text-xs xl:text-sm">
                        مجموع:
                        <NumericFormat
                          thousandSeparator=","
                          displayType="text"
                          value={totalPrice}
                        />
                        {curr}
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="border text-orange py-2 px-3 text-xs xl:text-sm rounded-lg"
                          onClick={() => resetCart()}
                        >
                          حذف سبد
                        </button>
                        <button
                          type="button"
                          className="bg-green text-white text-xs xl:text-sm py-2 px-5 rounded-lg"
                          onClick={() => cartHandler()}
                        >
                          پرداخت
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-3">
                    <p className="text-center py-3">کالایی در سبد وجود ندارد</p>
                    <Image
                      width={100}
                      height={100}
                      alt="empty-basket"
                      src="https://admin.torshoshirin.com/files/react-img/b.png"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={`relative lg:hidden ${closeCart && "cartIcon"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="34"
                viewBox="0 0 40 34"
                fill="none"
                className=" cursor-pointer"
                onClick={() => showCartHandler()}
              >
                <path
                  d="M36.5 0.5H3.5C2.70435 0.5 1.94129 0.81607 1.37868 1.37868C0.81607 1.94129 0.5 2.70435 0.5 3.5V30.5C0.5 31.2956 0.81607 32.0587 1.37868 32.6213C1.94129 33.1839 2.70435 33.5 3.5 33.5H36.5C37.2956 33.5 38.0587 33.1839 38.6213 32.6213C39.1839 32.0587 39.5 31.2956 39.5 30.5V3.5C39.5 2.70435 39.1839 1.94129 38.6213 1.37868C38.0587 0.81607 37.2956 0.5 36.5 0.5ZM36.5 3.5V6.5H3.5V3.5H36.5ZM36.5 30.5H3.5V9.5H36.5V30.5ZM29 14C29 16.3869 28.0518 18.6761 26.364 20.364C24.6761 22.0518 22.3869 23 20 23C17.6131 23 15.3239 22.0518 13.636 20.364C11.9482 18.6761 11 16.3869 11 14C11 13.6022 11.158 13.2206 11.4393 12.9393C11.7206 12.658 12.1022 12.5 12.5 12.5C12.8978 12.5 13.2794 12.658 13.5607 12.9393C13.842 13.2206 14 13.6022 14 14C14 15.5913 14.6321 17.1174 15.7574 18.2426C16.8826 19.3679 18.4087 20 20 20C21.5913 20 23.1174 19.3679 24.2426 18.2426C25.3679 17.1174 26 15.5913 26 14C26 13.6022 26.158 13.2206 26.4393 12.9393C26.7206 12.658 27.1022 12.5 27.5 12.5C27.8978 12.5 28.2794 12.658 28.5607 12.9393C28.842 13.2206 29 13.6022 29 14Z"
                  fill="#20422A"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute flex w-6 h-6 rounded-full justify-center items-center -top-2 -right-3 bg-orange">
                  {itemCount < 1 ? 1 : itemCount}
                </span>
              )}
              <div className="absolute top-full -left-20 sm:left-0 p-5 bg-white shadow-lg rounded-lg w-80 xl:w-96 cart">
                {itemCount > 0 ? (
                  <div className="grid gap-3">
                    <div className="basket-item-wrapper no-scroll">
                      {cartItems.map((item) => (
                        <div
                          className="relative py-8 border-b last:border-b-0 border-gray-300"
                          key={item.productId}
                        >
                          <span
                            className="absolute top-5 -left-1 w-6 h-6 shadow-lg bg-white rounded-full flex justify-center items-center cursor-pointer"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </span>
                          <div>
                            <Link
                              className="flex justify-between "
                              href={`/category/${item.categoryId}/${item.productId}-${item.variantId}`}
                              onClick={() => hideCartHandler()}
                            >
                              <div>
                                <p>{item.productName}</p>
                                <p>
                                  <NumericFormat
                                    thousandSeparator=","
                                    displayType="text"
                                    value={item.totalPrice}
                                  />
                                  {curr}
                                  {item.discountTypeId > 0 && (
                                    <span className="text-gray-400 line-through mr-2 text-sm">
                                      <NumericFormat
                                        thousandSeparator=","
                                        displayType="text"
                                        value={
                                          item.weight
                                            ? item.oldSalePrice * item.weight
                                            : item.oldSalePrice * item.count
                                        }
                                      />
                                      <small>{curr}</small>
                                    </span>
                                  )}
                                </p>

                                {/* <p>
                                {item.weight ? item.weight : item.count}
                                <span className="text-light text-sm">
                                  {item.unitCountingId === 1
                                    ? " عدد"
                                    : item.unitCountingId === 2
                                    ? " کیلوگرم"
                                    : " بسته"}
                                </span>
                              </p> */}
                              </div>
                              <div className="w-20 h-20 xl:w-24 xl:h-24 rounded-lg overflow-hidden">
                                <Image
                                  src={item.pathImage}
                                  alt={item.productName}
                                  width={100}
                                  height={100}
                                  className="w-16 h-16 xl:w-full xl:h-full object-cover"
                                />
                              </div>
                            </Link>
                            <div>
                              {item.unitCountingId === 1 ? (
                                <div className="w-48">
                                  {/* <p className="pb-7 text-color-light">تعداد</p> */}
                                  <Counter
                                    step={1}
                                    label="عدد"
                                    product={item}
                                    countItem={item.count}
                                    inBasket={true}
                                  />
                                </div>
                              ) : item.unitCountingId === 2 ? (
                                <div className="w-48">
                                  <GramsCounter
                                    product={item}
                                    inBasket={true}
                                    weight={item.weight}
                                  />
                                </div>
                              ) : (
                                <div className="w-48">
                                  <Counter
                                    step={1}
                                    label="بسته"
                                    product={item}
                                    inBasket={true}
                                    countItem={item.count}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-3 flex justify-between items-center">
                      <p className="text-xs xl:text-sm">
                        مجموع:
                        <NumericFormat
                          thousandSeparator=","
                          displayType="text"
                          value={totalPrice}
                        />
                        {curr}
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="border text-orange py-2 px-3 text-xs xl:text-sm rounded-lg"
                          onClick={() => resetCart()}
                        >
                          حذف سبد
                        </button>
                        <button
                          type="button"
                          className="bg-green text-white text-xs xl:text-sm py-2 px-5 rounded-lg"
                          onClick={() => cartHandler()}
                        >
                          پرداخت
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-3">
                    <p className="text-center py-3">کالایی در سبد وجود ندارد</p>
                    <Image
                      width={100}
                      height={100}
                      alt="empty-basket"
                      src="https://admin.torshoshirin.com/files/react-img/b.png"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="hidden lg:block">
              <SearchBar />
            </div>

            <Link href="/search" className="lg:hidden">
              <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.75 21.6783L26.8638 23.7922C27.7121 24.6404 27.7121 26.0156 26.8638 26.8638C26.0156 27.7121 24.6404 27.7121 23.7922 26.8638L21.6783 24.75M5.5 14.85C5.5 9.68614 9.68613 5.5 14.85 5.5C20.0138 5.5 24.2 9.68614 24.2 14.85C24.2 20.0139 20.0138 24.2 14.85 24.2C9.68613 24.2 5.5 20.0139 5.5 14.85Z"
                  stroke="#1a3622"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Link>

            <button
              className="xs:flex lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                width="21"
                height="8"
                viewBox="0 0 21 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="21" height="2" rx="1" fill="#20422A" />
                <rect y="6" width="21" height="2" rx="1" fill="#20422A" />
              </svg>
            </button>

            <OffCanvas
              origin="right"
              show={isOpen ? "show" : ""}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              customeClass="p-0 rounded-tl-xl rounded-bl-xl overflow-hidden w-300px"
            >
              <MobileMenu setIsOpen={setIsOpen} token={token} />
            </OffCanvas>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Navbar;
