import Counter from "@/common/Counter";
import GramsCounter from "@/common/GramsCounter";
import { ShopContext } from "@/context/shopContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useMutation } from "@tanstack/react-query";
import { sendCart } from "@/services/sendCart";
import Cookies from "js-cookie";

const Basket = ({ setActiveTab }) => {
  const [inputValue, setInputValue] = useState(0);
  const [basket, setBasket] = useState([]);
  const [curr, setCurr] = useState("");
  useEffect(() => {
    setCurr(localStorage.getItem("currency") || "تومان");
  }, []);
  const { data, mutateAsync: mutateSendCart } = useMutation({
    mutationFn: sendCart,
  });

  const { cartItems, addToCart, removeFromCart, resetCart } =
    useContext(ShopContext);

  const itemCount = cartItems?.reduce((prev, current) => {
    return prev + current.totalPrice;
  }, 0);

  useEffect(() => {
    setBasket(
      cartItems?.map((item) => {
        return {
          variantId: item.variantId,
          Qty: item.unitCountingId === 2 ? item.weight : item.count,
        };
      })
    );
  }, [cartItems]);

  const token = Cookies.get("token");

  const sendBasketHandler = async () => {
    const data = await mutateSendCart({ basket, token });
    // console.log(data);
    setActiveTab(2);
  };

  console.log(cartItems);

  return (
    <div>
      {cartItems?.map((item) => (
        <div key={item.productId} className="border-b-2 pt-5 pb-2 relative">
          <button
            type="button"
            className="flex items-center sm:hidden mb-2 gap-1 text-orange absolute left-5"
            onClick={() => removeFromCart(item.productId)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-14 h-14">
              <Image
                src={item.pathImage}
                width={56}
                height={56}
                alt={item.productName}
                className="w-14 h-14 rounded-md"
              />
            </div>
            <p className="font-bold">{item.productName}</p>
            <span className="sm:pr-5 hidden md:inline-block">
              <NumericFormat
                value={item.salePrice}
                displayType="text"
                thousandSeparator=","
              />
              <small className="text-sm pr-2">{curr}</small>
            </span>
            {item.discountTypeId > 0 && (
              <p className="text-gray-400 line-through hidden md:block">
                <NumericFormat
                  value={item.oldSalePrice}
                  displayType="text"
                  thousandSeparator=","
                />
                {curr}
              </p>
            )}
            <span className="sm:p-3 md:hidden">
              <NumericFormat
                value={item.totalPrice}
                displayType="text"
                className="font-bold"
                thousandSeparator=","
              />
              <small className="text-sm pr-2">{curr}</small>
            </span>
          </div>
          <div className="pt-4 flex justify-center md:justify-start items-end sm:gap-10">
            {item.unitCountingId === 2 ? (
              <div className="w-72">
                <GramsCounter
                  weight={item.weight}
                  product={item}
                  inBasket={true}
                />
              </div>
            ) : (
              <div className="w-72">
                <Counter
                  countItem={item.count}
                  step={1}
                  label={item.unitCountingId === 1 ? "عدد" : "بسته"}
                  product={item}
                  inBasket={true}
                />
              </div>
            )}
            <span className="sm:p-3 hidden md:inline-block">
              <NumericFormat
                value={item.totalPrice}
                displayType="text"
                className="font-bold"
                thousandSeparator=","
              />
              <small className="text-sm pr-2">{curr}</small>
            </span>
            <button
              type="button"
              className="hidden sm:flex items-center mb-2 gap-1 text-orange"
              onClick={() => removeFromCart(item.productId)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              حذف
            </button>
          </div>
        </div>
      ))}

      <p className="py-5">
        <span className="pl-10 ">مجموع</span>
        <span>
          <NumericFormat
            thousandSeparator=","
            displayType="text"
            className="font-bold"
            value={itemCount}
          />
        </span>
        <small className="text-sm pr-2">{curr}</small>
      </p>

      <div className="flex justify-center pt-5">
        <button
          type="button"
          className={`bg-orange text-white w-72 h-12 rounded-md ${
            cartItems?.length > 0 ? "" : "disabled-btn"
          }`}
          onClick={() => sendBasketHandler()}
          disabled={!cartItems?.length > 0}
        >
          ثبت سبد خرید
        </button>
      </div>
    </div>
  );
};

export default Basket;
