"use client";
import Counter from "@/common/Counter";
import OffCanvas from "@/common/OffCanvas";
import Basket from "@/components/Payment/Basket";
import Payment from "@/components/Payment/Payment";
import PaymentSuccess from "@/components/Payment/PaymentSuccess";
import SelectReciveType from "@/components/Payment/SelectReciveType";
import { ShopContext } from "@/context/shopContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { NumericFormat } from "react-number-format";

const tabData = [
  {
    id: 1,
    title: "سبد خرید",
    img: "https://admin.torshoshirin.com/files/react-img/Bucker.png",
    des: "basket image",
    customeClass: "w-9",
  },
  {
    id: 2,
    title: "اطلاعات ارسال",
    img: "https://admin.torshoshirin.com/files/react-img/marker.png",
    des: "marker image",
    customeClass: "w-7",
  },
  {
    id: 3,
    title: "پرداخت",
    img: "https://admin.torshoshirin.com/files/react-img/pos.png",
    des: "pos image",
    customeClass: "w-10",
  },
];

const Purchase = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [reciveType, setReciveType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentResult, setPaymentResult] = useState();

  return (
    <div className="container lg:px-10 2xl:px-0 mx-auto pt-24">
      <div className="py-16">
        <div className="bg-white p-5">
          <div className="flex gap-3 ">
            {tabData?.map((tab) => (
              <div
                key={tab.id}
                className="flex justify-center items-center flex-1"
                // onClick={() => setActiveTab(tab.id)}
              >
                <div
                  className={`flex justify-center items-center gap-2 sm:p-3 tab-item ${
                    tab.id === activeTab ? "active" : ""
                  }`}
                >
                  <Image
                    src={tab.img}
                    width={30}
                    height={30}
                    alt={tab.des}
                    className={`hidden sm:block ${tab.customeClass}`}
                  />
                  <span className="text-sm sm:text-base">{tab.title}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-10 sm:px-10 pb-5 h-3/4">
            {activeTab === 1 ? (
              <Basket setActiveTab={setActiveTab} />
            ) : activeTab === 2 ? (
              <SelectReciveType
                reciveType={reciveType}
                setReciveType={setReciveType}
                setActiveTab={setActiveTab}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            ) : activeTab === 3 ? (
              <Payment
                setActiveTab={setActiveTab}
                setPaymentResult={setPaymentResult}
              />
            ) : activeTab === 4 ? (
              <PaymentSuccess paymentResult={paymentResult} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
