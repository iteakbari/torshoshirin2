import Link from "next/link";
import Image from "next/image";
import { NumericFormat } from "react-number-format";
import { useEffect, useState } from "react";

const PaymentSuccess = ({ paymentResult }) => {
  const [curr, setCurr] = useState("");
  useEffect(() => {
    setCurr(localStorage.getItem("currency") || "تومان");
  }, []);

  console.log(paymentResult);
  return (
    <div className="flex flex-wrap md:flex-nowrap gap-12">
      <div className="md:w-3/6">
        <p className="flex gap-2 items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
          >
            <path
              d="M10.125 12.375L13.5 15.75L24.75 4.5"
              stroke="#20422A"
              strokeWidth="2.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M23.625 13.5V21.375C23.625 21.9717 23.3879 22.544 22.966 22.966C22.544 23.3879 21.9717 23.625 21.375 23.625H5.625C5.02826 23.625 4.45597 23.3879 4.03401 22.966C3.61205 22.544 3.375 21.9717 3.375 21.375V5.625C3.375 5.02826 3.61205 4.45597 4.03401 4.03401C4.45597 3.61205 5.02826 3.375 5.625 3.375H18"
              stroke="#20422A"
              strokeWidth="2.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          سفارش شما ثبت شد.
        </p>
        <div className="border-4 border-light rounded-lg p-3 my-5">
          <p className="font-bold mb-3">وضعیت سفارش:</p>
          <p>درحال آماده‌سازی در فروشگاه</p>
        </div>

        <div className="border-4 border-light rounded-lg p-3 my-5">
          <p className="py-5 text-orange flex gap-5">
            <span>پشتیبانی فروشگاه</span>
            <Link href={`tel:09112274967`}>09112274967</Link>
          </p>
          <p className="py-5 border-t-4 border-b-4 border-light flex gap-5">
            <span>ارسال به آدرس :</span>
            <span>{paymentResult?.address}</span>
          </p>
          <p className="py-5 flex gap-5">
            <span>روش پرداخت : </span>
            <span>{paymentResult?.paymentType}</span>
          </p>
        </div>
      </div>
      <div className="w-full md:w-3/6 lg:w-2/6">
        <p className="mb-5">سبد خرید</p>

        <div className="border-4 border-light-green rounded-lg h-max">
          <div className="p-7 overflow-auto h-64 no-scroll">
            {paymentResult?.productsList?.map((item) => (
              <Link
                href={`/category/${item.categoryId}/${item.productId}-${item.variantId}`}
                key={item.productId}
                className="text-light mb-5 "
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Image src={item.pathImage} width={56} height={56} alt="" />
                    <span>{item.name}</span>
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
                    {item.unitCountingId === 2
                      ? "کیلوگرم"
                      : item.unitCountingId === 1
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
                  value={paymentResult?.totalPrice}
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
                  value={paymentResult?.discountAmount}
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
                  value={paymentResult?.customerGroupDiscount}
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
                  value={paymentResult?.shippingCost}
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
                  value={paymentResult?.taxValue}
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
                  value={paymentResult?.sumPaymentAmount}
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

export default PaymentSuccess;
