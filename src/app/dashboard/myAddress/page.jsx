"use client";
import useAddressList from "@/hooks/useAddressList";
import Cookies from "js-cookie";
import Image from "next/image";
import AddressLoading from "./AddressLoading";
import OffCanvas from "@/common/OffCanvas";
import AddAddress from "@/components/Payment/AddAddress";
import { useState } from "react";
import useStateList from "@/hooks/useStateList";
import { useMutation } from "@tanstack/react-query";
import { deleteAddress } from "@/services/addressService";
import toast from "react-hot-toast";
import AddNewAddress from "@/components/Address/AddNewAddress";

const MyAddress = () => {
  const token = Cookies.get("token");
  const { data, isLoading, refetch } = useAddressList(token);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { data: getSatatesList } = useStateList();
  const [isOpen, setIsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { mutateAsync: deleteAddressfunc } = useMutation({
    mutationFn: deleteAddress,
  });

  const editAddressHandler = (id) => {
    setSelectedAddress(data?.data.find((address) => address.id === id));
    setIsOpen(true);
  };

  const confirmDeleteHandler = async (toastId, id) => {
    toast.dismiss(toastId);
    const data = await deleteAddressfunc({ id, token });
    // console.log(data);
    data?.data?.data?.success
      ? toast.custom(
          (t) => (
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
          ),
          { duration: 100 }
        )
      : toast.custom(
          (t) => (
            (
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
            ),
            { duration: 100 }
          )
        );
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

  return (
    <>
      <h3 className="text-xl mb-10">آدرس‌های من</h3>

      <button
        type="button"
        className="flex items-center gap-2 border py-2 px-5 text-sm text-orange rounded-md hover:shadow-sm transition-all duration-300 mb-5"
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

      {isLoading ? (
        <AddressLoading />
      ) : data ? (
        data.data?.map((item) => (
          <div
            key={item.id}
            className="border lg:3/4 xl:w-3/4 p-5 rounded-lg mb-5 flex flex-wrap gap-3 sm:gap-0"
          >
            <p className="w-full sm:w-7/12 md:8/12">{item.address}</p>
            <div className="flex gap-2">
              <button
                type="button"
                className="mr-5 text-orange flex items-center gap-1"
                onClick={() => editAddressHandler(item.id)}
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
                className="mr-5 text-orange flex items-center gap-1"
                onClick={() => deleteAddressHandler(item.id)}
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
        ))
      ) : (
        <div className="w-full h-full flex justify-start items-center flex-col">
          <Image
            src="https://admin.torshoshirin.com/files/react-img/no-location.png"
            width={300}
            height={300}
            alt="basket image"
          />
          <p className="text-center text-xl font-bold mt-5">
            آدرسی از طرف شما ثبت نشده.
          </p>
        </div>
      )}

      <OffCanvas
        origin="center"
        height="h-max"
        show={isOpen ? "show" : ""}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        customeClass="py-14 px-5"
      >
        <AddNewAddress
          refetch={refetch}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          getSatatesList={getSatatesList}
        />
      </OffCanvas>
    </>
  );
};

export default MyAddress;
