"use client";
import useOrderDetails from "@/hooks/useOrderDetails";
import Cookies from "js-cookie";
import Image from "next/image";
import { NumericFormat } from "react-number-format";
import Link from "next/link";
import { useEffect, useState } from "react";

const OrderDetails = ({ params }) => {
  const [curr, setCurr] = useState("");
  const token = Cookies.get("token");
  const { data } = useOrderDetails(params.orderId, token);
  // console.log(data?.data);

  useEffect(() => {
    setCurr(localStorage.getItem("currency") || "تومان");
  }, []);

  return (
    <div className="flex flex-wrap gap-12">
      <div className="xl:w-3/6">
        <div className="border-4 border-light rounded-lg p-3 my-5">
          <p className="font-bold mb-3">وضعیت سفارش:</p>
          <p>
            <span className="text-orange">{data?.data?.statusOrder}</span>
          </p>
        </div>

        <div className="border-4 border-light rounded-lg p-3 my-5">
          <p className="py-5 text-orange flex gap-5">
            <span>پشتیبانی فروشگاه</span>
            <Link href={`tel:09112274967`}>09112274967</Link>
          </p>
          <p className="py-5 border-t-4 border-b-4 border-light flex gap-5">
            <span>ارسال به آدرس : {data?.data?.customerAddress}</span>
            <span></span>
          </p>
          <p className="py-5 flex gap-5">
            <span>روش پرداخت : {data?.data?.orderPayment}</span>
            <span></span>
          </p>
        </div>
      </div>
      <div className="w-full sm:w-8/12 xl:w-5/12 2xl:2/6">
        <p className="mb-5">سبد خرید</p>
        <div className="border-4 border-light-green rounded-lg h-max">
          <div className="p-7 overflow-auto h-64 no-scroll">
            {data?.data?.productsList?.map((item) => (
              <Link
                href={`/category/${item.categoryId}/${item.productId}-${item.variantId}`}
                key={item.variantId}
                className="text-light mb-5 "
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Image src={item.pathImage} width={56} height={56} alt="" />
                    <span>{item.farsiName}</span>
                  </div>
                  <div className="grid">
                    <span className="text-sm line-through">
                      <NumericFormat
                        thousandSeparator=","
                        displayType="text"
                        value={item.unitPrice * item.quantity}
                      />
                      <small className="text-xs pr-1">{curr}</small>
                    </span>
                    <span className="text-black">
                      <NumericFormat
                        thousandSeparator=","
                        displayType="text"
                        value={
                          item.unitPrice * item.quantity - item.discountMoney
                        }
                      />
                      <small className="text-xs pr-1">{curr}</small>
                    </span>
                  </div>
                </div>
                <p className="text-sm">
                  {item.quantity}
                  <span className="pr-1">
                    {item.unitName === "وزن"
                      ? "کیلوگرم"
                      : item.unitName === "عدد"
                      ? "عدد"
                      : "بسته"}
                  </span>
                </p>
              </Link>
            ))}
          </div>
          <div>
            <div className="flex justify-between py-3 px-7 border-t-2 border-green-light text-sm 2xl:text-base">
              مجموع خرید
              <span>
                <NumericFormat
                  thousandSeparator=","
                  displayType="text"
                  value={data?.data?.totalPrice}
                />
                {curr}
              </span>
            </div>
            <div className="flex justify-between py-3 px-7 border-t-2 border-green-light text-sm 2xl:text-base">
              تخفیف
              <span>
                <NumericFormat
                  thousandSeparator=","
                  displayType="text"
                  value={data?.data?.discountAmount}
                />
                {curr}
              </span>
            </div>
            <div className="flex justify-between py-3 px-7 border-t-2 border-green-light text-sm 2xl:text-base">
              تخفیف ویژه مشتری
              <span>
                <NumericFormat
                  thousandSeparator=","
                  displayType="text"
                  value={data?.data?.customerGroupDiscount}
                />
                {curr}
              </span>
            </div>
            <div className="flex justify-between py-3 px-7 border-t-2 border-green-light text-sm 2xl:text-base">
              هزینه ارسال
              <span>
                <NumericFormat
                  thousandSeparator=","
                  displayType="text"
                  value={data?.data?.shippingCost}
                />
                {curr}
              </span>
            </div>

            <div className="flex justify-between py-3 px-7 border-t-2 border-green-light text-sm 2xl:text-base">
              مالیات بر ارزش افزوده
              <span>
                <NumericFormat
                  thousandSeparator=","
                  displayType="text"
                  value={data?.data?.taxValue}
                />
                {curr}
              </span>
            </div>
            <div className="flex justify-between py-3 px-7 border-t-2 border-green-light">
              مجموع
              <span>
                <NumericFormat
                  thousandSeparator=","
                  displayType="text"
                  value={data?.data?.sumPaymentAmount}
                />
                {curr}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
