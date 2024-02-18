"use client";
import { ShopContext } from "@/context/shopContext";
import useGetProfile from "@/hooks/useGetProfile";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { use, useContext, useEffect, useReducer, useState } from "react";
import { NumericFormat } from "react-number-format";

const countReducer = (state, { type, payload }) => {
  switch (type) {
    case "increment":
      return state + payload;
    case "decrement":
      return state > 0 && state - payload;
    default:
      break;
  }
};

const Counter = ({ step, label, product, countItem, inBasket }) => {
  const { cartItems, addToCart, reduceFromCart, removeFromCart } =
    useContext(ShopContext);
  const [curr, setCurr] = useState("");
  useEffect(() => {
    setCurr(localStorage.getItem("currency") || "تومان");
  }, []);
  const {
    productId,
    pathImage,
    salePrice,
    productName,
    unitCountingId,
    categoryId,
    variantId,
    discountTypeId,
    oldSalePrice,
    discountValue,
    discountTilte,
    stock,
  } = product || "";

  useEffect(() => {
    if (countItem) {
      setCount(countItem);
    }
  }, [product]);

  const [token, setToken] = useState("");
  useEffect(() => {
    const getToken = Cookies.get("token") ? Cookies.get("token") : null;
    setToken(getToken);
  }, []);
  const { data } = useGetProfile(token);
  const router = useRouter();
  const cartHandler = () => {
    data?.success ? router.push("/purchase") : router.push("/sign");
  };

  // const [count, dispatch] = useReducer(countReducer, countItem ? countItem : 0);
  const [count, setCount] = useState(countItem || 0);

  const incrementHandler = () => {
    // dispatch({ type: "increment", payload: step });
    setCount((c) => c + 1);
    addToCart({
      productId: productId ? productId : product.productId,
      categoryId: categoryId ? categoryId : product.categoryId,
      pathImage: pathImage ? pathImage : product.pathImage,
      salePrice: salePrice ? salePrice : product.salePrice,
      productName: productName ? productName : product.productName,
      unitCountingId: unitCountingId ? unitCountingId : product.unitCountingId,
      variantId: variantId ? variantId : product.variantId,
      discountTypeId: discountTypeId ? discountTypeId : product.discountTypeId,
      oldSalePrice: oldSalePrice ? oldSalePrice : product.oldSalePrice,
      discountValue: discountValue ? discountValue : product.discountValue,
      discountTilte: discountTilte ? discountTilte : product.discountTilte,
      step: step ? step : product.step,
      stock: stock ? stock : product.stock,
      totalValue: count + 1,
    });
  };

  const decrementHandler = () => {
    // dispatch({ type: "decrement", payload: step });
    setCount((c) => c - 1);

    reduceFromCart({
      productId: productId ? productId : product.productId,
      categoryId: categoryId ? categoryId : product.categoryId,
      pathImage: pathImage ? pathImage : product.pathImage,
      salePrice: salePrice ? salePrice : product.salePrice,
      productName: productName ? productName : product.productName,
      unitCountingId: unitCountingId ? unitCountingId : product.unitCountingId,
      variantId: variantId ? variantId : product.variantId,
      stock: stock ? stock : product.stock,
      step: step ? step : product.step,
      totalValue: count - 1,
    });

    if (count - 1 < 1) {
      removeFromCart(productId);
    }
  };

  useEffect(() => {
    if (!countItem) setCount(0);
  }, [countItem]);

  return (
    <>
      <div className="flex justify-between items-center gap-3 flex-1">
        <button
          type="button"
          onClick={() => incrementHandler()}
          className={`${!countItem && "w-full"} ${count >= stock && "disable"}`}
        >
          {countItem ? (
            <svg
              width="40"
              height="40"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                opacity="0.3"
                x="1"
                y="1"
                width="40"
                height="40"
                rx="20"
                stroke="#DB7267"
                strokeWidth="2"
              />
              <rect x="15" y="20" width="12" height="2" rx="1" fill="#DB7267" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 15.75V26.25C22 26.6642 21.5523 27 21 27C20.4477 27 20 26.6642 20 26.25V15.75C20 15.3358 20.4477 15 21 15C21.5523 15 22 15.3358 22 15.75Z"
                fill="#DB7267"
              />
            </svg>
          ) : (
            <span className="w-full flex h-12 bg-orange text-white rounded-md justify-center items-center">
              افزودن به سبد خرید
            </span>
          )}
        </button>

        {countItem && (
          <>
            <NumericFormat
              thousandSeparator=","
              className="text-center bg-transparent w-20 h-10 flex justify-center items-center"
              placeholder="0"
              value={count}
              displayType="text"
              // onValueChange={(values) => setInputValue(+values.value)}
            />
            <label className="text-color-light text-xl text-right flex-1">
              {label}
            </label>
            <button type="button" onClick={decrementHandler}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.3"
                  x="1"
                  y="1"
                  width="40"
                  height="40"
                  rx="20"
                  stroke="#DB7267"
                  strokeWidth="2"
                />
                <rect
                  x="15"
                  y="20"
                  width="12"
                  height="2"
                  rx="1"
                  fill="#DB7267"
                />
              </svg>
            </button>
            {/* {!inBasket && (
              <button
                className="w-10 h-10 bg-orange text-white rounded-md flex justify-center items-center"
                onClick={() => cartHandler()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-cart2"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
              </button>
            )} */}
          </>
        )}
      </div>
      {!inBasket && count ? (
        <div className="border-t text-center text-sm mt-1 pt-3 w-full">
          <NumericFormat
            thousandSeparator=","
            value={
              salePrice
                ? Math.round(count * salePrice)
                : Math.round(count * product?.price)
            }
            displayType="text"
          />
          {curr}
        </div>
      ) : null}
    </>
  );
};

export default Counter;
