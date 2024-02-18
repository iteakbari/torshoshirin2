import TextFieldInput from "@/common/TextFieldInput";
import useStateList from "@/hooks/useStateList";
import { useContext, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { getDiscount } from "@/services/discountService";
import Cookies from "js-cookie";
import useShowCartItems from "@/hooks/useShowCartItems";
import { setPaymentTypeOrder } from "@/services/paymentTypeService";
import { ShopContext } from "@/context/shopContext";
import toast from "react-hot-toast";

const Payment = ({ setActiveTab, setPaymentResult }) => {
  const token = Cookies.get("token");
  const { data: getSatatesList } = useStateList();
  const [paymentType, setPaymentType] = useState();
  const [discount, setDiscount] = useState("");
  const { resetCart } = useContext(ShopContext);
  const [curr, setCurr] = useState("");
  useEffect(() => {
    setCurr(localStorage.getItem("currency") || "تومان");
  }, []);
  const { data: discountData, mutateAsync: getDiscountFunc } = useMutation({
    mutationFn: getDiscount,
  });
  const { data: showCartItems, refetch } = useShowCartItems(token);
  const { mutateAsync: setPaymentTypeOrderFunc } = useMutation({
    mutationFn: setPaymentTypeOrder,
  });

  const discountHandler = async (e) => {
    e.preventDefault();
    const data = await getDiscountFunc({
      discountCode: discount,
      customerId: 0,
      token,
    });

    if (!data.data.success) {
      toast.custom((t) => (
        <div className="bg-orange p-7 rounded-3xl shadow-lg md:w-96 mt-10">
          <div className="flex items-center justify-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 7.75V13M21.08 8.58v6.84c0 1.12-.6 2.16-1.57 2.73l-5.94 3.43c-.97.56-2.17.56-3.15 0l-5.94-3.43a3.15 3.15 0 0 1-1.57-2.73V8.58c0-1.12.6-2.16 1.57-2.73l5.94-3.43c.97-.56 2.17-.56 3.15 0l5.94 3.43c.97.57 1.57 1.6 1.57 2.73Z"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12 16.2v.1"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <p className="text-white">{data.data.messageList}</p>
          </div>
          {/* <div className="w-full flex justify-center pt-5"></div> */}
        </div>
      ));
    } else {
      toast.custom((t) => (
        <div className="bg-green-600 p-7 rounded-3xl shadow-lg md:w-96 mt-10">
          <div className="flex items-center justify-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16.82 2H7.18C5.05 2 3.32 3.74 3.32 5.86v14.09c0 1.8 1.29 2.56 2.87 1.69l4.88-2.71c.52-.29 1.36-.29 1.87 0l4.88 2.71c1.58.88 2.87.12 2.87-1.69V5.86C20.68 3.74 18.95 2 16.82 2Z"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="m9.59 11 1.5 1.5 4-4"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <p className="text-white">{data.data.messageList}</p>
          </div>
          {/* <div className="w-full flex justify-center pt-5"></div> */}
        </div>
      ));
    }

    refetch();
  };

  const paymentTypeHandler = async () => {
    if (!paymentType || paymentType === undefined) {
      toast.custom((t) => (
        <div className="bg-orange p-7 rounded-3xl shadow-lg md:w-96 mt-10">
          <div className="flex items-center justify-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 7.75V13M21.08 8.58v6.84c0 1.12-.6 2.16-1.57 2.73l-5.94 3.43c-.97.56-2.17.56-3.15 0l-5.94-3.43a3.15 3.15 0 0 1-1.57-2.73V8.58c0-1.12.6-2.16 1.57-2.73l5.94-3.43c.97-.56 2.17-.56 3.15 0l5.94 3.43c.97.57 1.57 1.6 1.57 2.73Z"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12 16.2v.1"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <p className="text-white">لطفا روش پرداخت رو انتخاب کنید.</p>
          </div>
          {/* <div className="w-full flex justify-center pt-5"></div> */}
        </div>
      ));
    } else {
      const { data } = await setPaymentTypeOrderFunc({
        receiverOrderId: 0,
        customerAddressId: 0,
        paymentTypeId: +paymentType,
        token,
      });
      // console.log(data);

      if (data?.success) {
        setActiveTab(4);
        setPaymentResult(data?.data);
        resetCart();
      }
    }
  };

  return (
    <>
      <div className="flex justify-between flex-wrap">
        <div>
          <p className="text-xl font-bold">انتخاب روش پرداخت</p>
          <div className="mt-10">
            {getSatatesList?.data?.paymentTypeList.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-3">
                <input
                  type="radio"
                  name="reciveType"
                  id={p.id}
                  value={p.id}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor={p.id} className="text-xl">
                  {/* <Image src={p.icont} width={50} height={50} alt={p.name} /> */}
                  {p.name}
                </label>
              </div>
            ))}
          </div>
          <form className="flex items-end gap-3 mt-10 mb-10 md:mb-0">
            <div className="input-box discount border rounded-md flex">
              <input
                type="text"
                className="h-14 bg-transparent text-right px-3"
                placeholder=" "
                onChange={(e) => setDiscount(e.target.value)}
              />
              <label>کد تخفیف</label>
              <button
                type="submit"
                className={`px-5 border-r  ${
                  discount.length === 0
                    ? "pointer-events-none text-gray-300"
                    : "text-orange"
                }`}
                onClick={(e) => discountHandler(e)}
              >
                اعمال
              </button>
            </div>
            {/*{error && (
                <p className="text-xs text-red-500  mt-1">{errorMessage}</p>
              )} */}
          </form>
        </div>
        <div className="bg-light-gray p-5 w-96 rounded-md">
          <div className="py-5 border-b-4 border-light">
            <div className="flex justify-between items-center">
              <span>قیمت کالاها:</span>
              <span>
                <NumericFormat
                  thousandSeparator=","
                  displayType="text"
                  value={Math.round(showCartItems?.data?.data?.cartTotal)}
                />
                <small className="text-xs pr-1">{curr}</small>
              </span>
            </div>
          </div>
          <div className="py-5 border-b-4 border-light">
            <div className="flex justify-between items-center">
              <span>هزینه ارسال:</span>
              <span>
                <NumericFormat
                  thousandSeparator=","
                  displayType="text"
                  value={Math.round(
                    showCartItems?.data?.data?.cartShippingCostTotal
                  )}
                />
                <small className="text-xs pr-1">{curr}</small>
              </span>
            </div>
          </div>
          <div className="py-5 border-b-4 border-light">
            <div className="flex justify-between items-center">
              <span>تخفیف:</span>
              <span>
                <NumericFormat
                  thousandSeparator=","
                  displayType="text"
                  value={Math.round(
                    showCartItems?.data?.data?.cartDiscountTotal
                  )}
                />
                <small className="text-xs pr-1">{curr}</small>
              </span>
            </div>
          </div>
          <div className="py-5 border-b-4 border-light">
            <div className="flex justify-between items-center">
              <span>تخفیف ویژه مشتری:</span>
              <span>
                <NumericFormat
                  thousandSeparator=","
                  displayType="text"
                  value={Math.round(
                    showCartItems?.data?.data?.customerGroupDiscount
                  )}
                />
                <small className="text-xs pr-1">{curr}</small>
              </span>
            </div>
          </div>
          <div className="py-5 border-b-4 border-light-green">
            <div className="flex justify-between items-center">
              <span>مالیات بر ارزش افزوده:</span>
              <span>
                <NumericFormat
                  thousandSeparator=","
                  displayType="text"
                  value={Math.round(showCartItems?.data?.data?.taxValue)}
                />
                <small className="text-xs pr-1">{curr}</small>
              </span>
            </div>
          </div>
          <div className="py-5">
            <div className="flex justify-between items-center">
              <span>قابل پرداخت:</span>
              <span>
                <NumericFormat
                  thousandSeparator=","
                  displayType="text"
                  value={Math.round(
                    showCartItems?.data?.data?.cartTotal +
                      showCartItems?.data?.data?.cartShippingCostTotal -
                      showCartItems?.data?.data?.cartDiscountTotal -
                      showCartItems?.data?.data?.customerGroupDiscount
                  )}
                />
                <small className="text-xs pr-1">{curr}</small>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10 gap-3">
        <button
          type="button"
          className="bg-white text-orange border w-72 h-12 rounded-md mt-8"
          onClick={() => setActiveTab(2)}
        >
          مرحله قبل
        </button>
        <button
          type="button"
          className="bg-orange text-white w-72 h-12 rounded-md mt-8"
          onClick={() => paymentTypeHandler()}
        >
          پرداخت
        </button>
      </div>
    </>
  );
};

export default Payment;
