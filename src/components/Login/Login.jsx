"use client";
import { useContext, useEffect, useState } from "react";
import GetMobileNumber from "./GetNumber";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkOtp, getOtp } from "@/services/authServices";
import ConfrimLogin from "./ConfrimLogin";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { AuthContext } from "@/context/AuthContext";
const RESEND_TIME = 90;

const Login = ({ context }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [phoneNumberCode, setPhoneNumberCode] = useState("");
  const [time, setTime] = useState(0);
  const [error, setError] = useState(false);
  const { setProfile } = useContext(AuthContext);
  const router = useRouter();
  const {
    data: otpResponse,
    isError,
    isLoading,
    mutateAsync: mutateGetOtp,
  } = useMutation({
    mutationFn: getOtp,
  });
  const { mutateAsync: mutateCheckOtp, isLoading: isCheckingOtp } = useMutation(
    {
      mutationFn: checkOtp,
    }
  );

  const phoneNumberHandler = (e) => {
    const phoneNumberFormat = /^09\d{2}\d{7}$/;
    const val = e.target.value;
    val?.match(phoneNumberFormat) ? setError(false) : setError(true);
    setPhoneNumber(e.target.value);
  };

  const onBack = () => {
    setStep((s) => s - 1);
    setPhoneNumber("");
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const sendOTPHandler = async (e) => {
    e.preventDefault();
    if (!error) {
      try {
        const data = await mutateGetOtp({ phoneNumber });
        if (data.success) {
          toast.custom((t) => (
            <div className="bg-slate-50 p-7 rounded-3xl shadow-lg md:w-96">
              <div className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    opacity=".4"
                    d="M10.75 2.45c.7-.59 1.83-.59 2.51 0l1.58 1.35c.3.25.87.46 1.27.46h1.7c1.06 0 1.93.87 1.93 1.93v1.7c0 .4.21.96.46 1.26l1.35 1.58c.59.7.59 1.83 0 2.51l-1.35 1.58c-.25.3-.46.86-.46 1.26v1.7c0 1.06-.87 1.93-1.93 1.93h-1.7c-.4 0-.96.21-1.26.46l-1.58 1.35c-.7.59-1.83.59-2.51 0l-1.58-1.35c-.3-.25-.87-.46-1.26-.46H6.17c-1.06 0-1.93-.87-1.93-1.93v-1.71c0-.39-.2-.96-.45-1.25l-1.35-1.59c-.58-.69-.58-1.81 0-2.5l1.35-1.59c.25-.3.45-.86.45-1.25V6.2c0-1.06.87-1.93 1.93-1.93H7.9c.4 0 .96-.21 1.26-.46l1.59-1.36Z"
                    fill="#1a3622"
                  ></path>
                  <path
                    d="M12 16.871c-.55 0-1-.45-1-1s.44-1 1-1c.55 0 1 .45 1 1s-.44 1-1 1ZM12 13.719c-.41 0-.75-.34-.75-.75v-4.84c0-.41.34-.75.75-.75s.75.34.75.75v4.83c0 .42-.33.76-.75.76Z"
                    fill="#1a3622"
                  ></path>
                </svg>
                <p>{data.messageList}</p>
              </div>
              <div className="w-full flex justify-center pt-5"></div>
            </div>
          ));
          // toast.custom(
          //   (t) => (
          //     <div className="bg-slate-50 p-7 rounded-3xl shadow-lg md:w-96">
          //       <div className="flex items-center gap-5">
          //         <svg
          //           xmlns="http://www.w3.org/2000/svg"
          //           width="32"
          //           height="32"
          //           viewBox="0 0 24 24"
          //           fill="none"
          //         >
          //           <path
          //             opacity=".4"
          //             d="M10.75 2.45c.7-.59 1.83-.59 2.51 0l1.58 1.35c.3.25.87.46 1.27.46h1.7c1.06 0 1.93.87 1.93 1.93v1.7c0 .4.21.96.46 1.26l1.35 1.58c.59.7.59 1.83 0 2.51l-1.35 1.58c-.25.3-.46.86-.46 1.26v1.7c0 1.06-.87 1.93-1.93 1.93h-1.7c-.4 0-.96.21-1.26.46l-1.58 1.35c-.7.59-1.83.59-2.51 0l-1.58-1.35c-.3-.25-.87-.46-1.26-.46H6.17c-1.06 0-1.93-.87-1.93-1.93v-1.71c0-.39-.2-.96-.45-1.25l-1.35-1.59c-.58-.69-.58-1.81 0-2.5l1.35-1.59c.25-.3.45-.86.45-1.25V6.2c0-1.06.87-1.93 1.93-1.93H7.9c.4 0 .96-.21 1.26-.46l1.59-1.36Z"
          //             fill="#1a3622"
          //           ></path>
          //           <path
          //             d="M12 16.871c-.55 0-1-.45-1-1s.44-1 1-1c.55 0 1 .45 1 1s-.44 1-1 1ZM12 13.719c-.41 0-.75-.34-.75-.75v-4.84c0-.41.34-.75.75-.75s.75.34.75.75v4.83c0 .42-.33.76-.75.76Z"
          //             fill="#1a3622"
          //           ></path>
          //         </svg>
          //         <p>{data.params1}</p>
          //       </div>
          //       <div className="w-full flex justify-center pt-5"></div>
          //     </div>
          //   ),
          //   { duration: 10000 }
          // );
          setStep(2);
          setTime(RESEND_TIME);
          setPhoneNumberCode("");
        } else {
          setPhoneNumber("");
          toast.success(data.messageList);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
      return;
    }
  };

  const onSendOtpHandler = async () => {
    try {
      const data = await mutateCheckOtp({ phoneNumber, phoneNumberCode });
      Cookies.set("token", data.data.jwToken);

      if (phoneNumberCode && time) {
        toast.success(data.messageList);
        if (data.success) {
          // setProfile(data?.data.firstName);

          if (!data.data.firstName) {
            router.push("/dashboard/profile");
          } else if (
            data.data.firstName &&
            window.location.search.includes("purchase")
          ) {
            router.push("/purchase");
          } else {
            router.back();
          }
          // console.log(typeof window);

          setTimeout(() => {
            if (typeof window !== "undefined") window.location.reload();
          }, 1500);
        }

        // setToken(data.data.jwToken);
        // console.log(data);
      } else {
        toast.error(data.messageList);
      }
    } catch (error) {
      toast.error(error?.response?.data?.messageList);
    }
  };

  useEffect(() => {
    if (phoneNumberCode?.length === 5 && !error) {
      onSendOtpHandler();
    }
  }, [phoneNumberCode]);

  const confirmCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateCheckOtp({ phoneNumber, phoneNumberCode });
      Cookies.set("token", data.data.jwToken);

      if (phoneNumberCode && time) {
        toast.success(data.messageList);
        // console.log(data);
        if (data.success) {
          // setProfile(data?.data.firstName);

          if (!data.data.firstName) {
            router.push("/dashboard/profile");
          } else if (
            data.data.firstName &&
            window.location.search.split("?")[1] === "purchase"
          ) {
            router.push("/purchase");
          } else {
            router.push("/");
          }
          // console.log(typeof window);

          setTimeout(() => {
            if (typeof window !== "undefined") window.location.reload();
          }, 800);
        }

        // setToken(data.data.jwToken);
        // console.log(data);
      } else {
        toast.error(data.messageList);
      }
    } catch (error) {
      toast.error(error?.response?.data?.messageList);
    }
  };

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <GetMobileNumber
            phoneNumber={phoneNumber}
            onChange={phoneNumberHandler}
            isLoading={isLoading}
            onSubmit={sendOTPHandler}
            error={error}
          />
        );
      case 2:
        return (
          <ConfrimLogin
            phoneNumberCode={phoneNumberCode}
            setPhoneNumberCode={setPhoneNumberCode}
            onSubmit={confirmCodeSubmit}
            time={time}
            onBack={onBack}
            phoneNumber={phoneNumber}
            onResendCode={sendOTPHandler}
            isCheckingOtp={isCheckingOtp}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-10 sm:px-16 rounded-3xl shadow-sm">
      <p>اکانت اختصاصی</p>
      <p className="text-2xl">ورود | ثبت نام</p>
      {renderSteps()}
    </div>
  );
};

export default Login;
