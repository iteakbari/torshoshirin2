import OffCanvas from "@/common/OffCanvas";
import Image from "next/image";
import { NumericFormat } from "react-number-format";
import AddAddress from "./AddAddress";
import useAddressList from "@/hooks/useAddressList";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "@/context/shopContext";
import { useMutation } from "@tanstack/react-query";
import { deleteAddress, setAddressOrder } from "@/services/addressService";
import useStateList from "@/hooks/useStateList";
import toast from "react-hot-toast";

const SelectReciveType = ({
  reciveType,
  setReciveType,
  setActiveTab,
  isOpen,
  setIsOpen,
}) => {
  const token = Cookies.get("token");
  const { data, refetch } = useAddressList(token);
  const { cartItems } = useContext(ShopContext);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(3);
  const { data: getSatatesList } = useStateList();
  const { mutateAsync: deleteAddressfunc } = useMutation({
    mutationFn: deleteAddress,
  });
  const { mutateAsync: setAddressOrderfunc } = useMutation({
    mutationFn: setAddressOrder,
  });
  const [curr, setCurr] = useState("");
  useEffect(() => {
    setCurr(localStorage.getItem("currency") || "تومان");
  }, []);

  const editAddressHandler = (id) => {
    const editAddress = data?.data.find((address) => address.id === id);
    setSelectedAddress(editAddress);
    // console.log(editAddress);
    setIsOpen(true);
  };

  const confirmDeleteHandler = async (toastId, id) => {
    toast.dismiss(toastId);
    const data = await deleteAddressfunc({ id, token });
    // console.log(data);
    data?.data?.data?.success
      ? toast.custom((t) => (
          <div className="bg-green-700 p-7 rounded-3xl shadow-lg md:w-96 mt-10">
            <div className="flex items-center justify-center gap-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  opacity=".4"
                  d="M16.82 1.91H7.18c-2.12 0-3.86 1.74-3.86 3.86v14.09c0 1.8 1.29 2.56 2.87 1.69l4.88-2.71c.52-.29 1.36-.29 1.87 0l4.88 2.71c1.58.88 2.87.12 2.87-1.69V5.77c-.01-2.12-1.74-3.86-3.87-3.86Z"
                  fill="#fff"
                ></path>
                <path
                  d="M11.09 13.251c-.19 0-.38-.07-.53-.22l-1.5-1.5a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l.97.97 3.47-3.47c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-4 4c-.15.15-.34.22-.53.22Z"
                  fill="#fff"
                ></path>
              </svg>
              <p className="text-white">{data?.data?.data?.messageList}</p>
            </div>
            {/* <div className="w-full flex justify-center pt-5"></div> */}
          </div>
        ))
      : toast.custom((t) => (
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
              <p className="text-white">{data?.data?.data?.messageList}</p>
            </div>
            {/* <div className="w-full flex justify-center pt-5"></div> */}
          </div>
        ));
    refetch();
  };

  const deleteAddressHandler = (id) => {
    try {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5`}
        >
          <p className="text-center py-8 ">آیا از حذف آدرس مطمئن هستید؟</p>
          <div className="flex justify-center gap-5 pb-5">
            <button
              onClick={() => confirmDeleteHandler(t.id, id)}
              className="w-28 border border-orange rounded-lg h-11 px-4 flex items-center justify-center text-sm font-medium "
            >
              بله مطمئنم!
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-28 border border-transparent h-11 px-4  flex items-center justify-center text-sm font-medium "
            >
              خیر
            </button>
          </div>
        </div>
      ));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      const defaultAddress = data.data.find((a) => a.defaultAddress);
      setSelectedAddressId(defaultAddress?.id);
    }
  }, [data]);

  const setAddresOrderHandler = async () => {
    if (!reciveType) {
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
            <p className="text-white">
              لطفا روش دریافت سفارش خود را انتخاب کنید.
            </p>
          </div>
          {/* <div className="w-full flex justify-center pt-5"></div> */}
        </div>
      ));
    } else if (reciveType === "1") {
      // console.log(reciveType);
      const data = await setAddressOrderfunc({
        receiverOrderId: reciveType,
        customerAddressId: null,
        paymentTypeId: 0,
        token,
      });
      setActiveTab(3);
    } else if (reciveType === "2") {
      if (!selectedAddressId) {
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
              <p className="text-white">لطفا ابتدا آدرس خود را ثبت کنید.</p>
            </div>
            {/* <div className="w-full flex justify-center pt-5"></div> */}
          </div>
        ));
      }
      if (selectedAddressId && selectedAddressId !== 2) {
        // console.log(selectedAddressId);
        const data = await setAddressOrderfunc({
          receiverOrderId: reciveType,
          customerAddressId: selectedAddressId,
          paymentTypeId: 0,
          token,
        });
        setActiveTab(3);
      }
    }

    // console.log(data);
  };
  useEffect(() => {
    !isOpen && setSelectedAddress(null);
  }, [isOpen]);

  return (
    <div className="flex justify-between flex-wrap">
      <div className="order-2 md:order-1">
        <p className="text-xl font-bold">
          روش دریافت سفارش خود را انتخاب کنید.
        </p>
        <div className="mt-10">
          {getSatatesList?.data.reciverOrderList.map((r) => (
            <div key={r.id} className="flex items-center gap-3 py-3">
              <input
                type="radio"
                name="reciveType"
                id={r.id}
                value={r.id}
                onChange={(e) => setReciveType(e.target.value)}
                className="w-4 h-4"
              />
              <label htmlFor={r.id} className="text-xl">
                {r.name}
              </label>
            </div>
          ))}
        </div>

        {+reciveType === 2 && (
          <>
            <p className="text-xl my-10 font-bold flex flex-wrap gap-3 items-center">
              آدرس خود را انتخاب کنید.
              <button
                type="button"
                className="flex items-center gap-2 border py-2 px-5 text-sm text-orange rounded-md hover:shadow-sm transition-all duration-300"
                onClick={() => setIsOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-lg"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                  />
                </svg>
                افزودن آدرس
              </button>
            </p>
            <div>
              {data?.data?.map((data) => (
                <React.Fragment key={data.id}>
                  {data[0]}
                  <div className="flex items-center gap-3 py-3">
                    <input
                      type="radio"
                      name="address"
                      id={data.id}
                      value={data.id}
                      onChange={(e) => setSelectedAddressId(e.target.value)}
                      className="w-4 h-4"
                      defaultChecked={data.defaultAddress}
                    />
                    <label htmlFor={data.id} className="text-xl">
                      {data.stateName +
                        " " +
                        // data.cityName +
                        // " " +
                        data.address}
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="mr-7 text-orange flex items-center gap-1"
                      onClick={() => editAddressHandler(data.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="m13.26 3.6-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16Z"
                          stroke="#DB7267"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M11.89 5.05a6.126 6.126 0 0 0 5.45 5.15M3 22h18"
                          stroke="#DB7267"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      ویرایش
                    </button>

                    <button
                      type="button"
                      className="mr-7 text-orange flex items-center gap-1"
                      onClick={() => deleteAddressHandler(data.id)}
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
                </React.Fragment>
              ))}
            </div>
          </>
        )}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="bg-white text-orange border w-72 h-12 rounded-md mt-8"
            onClick={() => setActiveTab(1)}
          >
            مرحله قبل
          </button>
          <button
            type="button"
            className="bg-orange text-white w-72 h-12 rounded-md md:mt-8"
            onClick={() => setAddresOrderHandler()}
          >
            ثبت
          </button>
        </div>
      </div>
      <div className="bg-light-gray p-5 w-96 mt-10 xl:mt-0 rounded-md order-1 md:order-2 mb-8 md:mb-0">
        {cartItems?.map((item) => (
          <div key={item.productId} className="text-light mb-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Image src={item.pathImage} width={56} height={56} alt="" />
                <span>{item.productName}</span>
              </div>
              <span>
                <NumericFormat
                  thousandSeparator=","
                  displayType="text"
                  value={item.totalPrice}
                />
                <small className="text-xs pr-1">{curr}</small>
              </span>
            </div>
            <p className="text-sm pt-2">
              {item.unitCountingId === 2 ? item.weight : item.count}
              <span className="pr-1">
                {item.unitCountingId === 1
                  ? "عدد"
                  : item.unitCountingId === 2
                  ? "کیلوگرم"
                  : "بسته"}
              </span>
            </p>
          </div>
        ))}

        <button
          type="button"
          className="flex items-center gap-2 text-xl "
          onClick={() => setActiveTab(1)}
        >
          بازگشت به سبد خرید
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </button>
      </div>
      <OffCanvas
        origin="center"
        height="h-max"
        show={isOpen ? "show" : ""}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        customeClass="py-14 px-5"
      >
        <AddAddress
          refetch={refetch}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          getSatatesList={getSatatesList}
        />
      </OffCanvas>
    </div>
  );
};

export default SelectReciveType;
