"use client";
import FormikTextInputField from "@/common/FormikTextInputField";
import TextareaFieldInput from "@/common/TextareaFieldInput";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { suggestion } from "@/services/commentService";
import useGetProfile from "@/hooks/useGetProfile";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Suggestion = ({ productId }) => {
  const token = Cookies.get("token");
  const { data } = useGetProfile(token);
  const [comment, setComment] = useState("");
  const { mutateAsync: postSuggestion } = useMutation({
    mutationFn: suggestion,
  });
  const [formValues, setFormValues] = useState({
    fullName: "",
    userName: "",
    commentText: "",
  });

  const validationSchema = Yup.object({
    fullName: Yup.string().required("لطفا اطلاعات فیلد را تکمیل کنید"),
    userName: Yup.string()
      .matches(/^0\d{2}\d{8}$/, "فرمت شماره تلفن ثابت صحیح نیست")
      .required("لطفا اطلاعات فیلد را تکمیل کنید"),
    commentText: Yup.string().required("لطفا اطلاعات فیلد را تکمیل کنید"),
  });

  const submitHandler = async (values) => {
    try {
      const result = await postSuggestion({
        flName: values.fullName,
        mobileNumber: values.userName,
        description: values.commentText,
      });
      if (result?.data.success) {
        toast.custom((t) => (
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
              <p className="text-white">{result.data.messageList}</p>
            </div>
            {/* <div className="w-full flex justify-center pt-5"></div> */}
          </div>
        ));
        setFormValues({
          fullName: "",
          userName: "",
          commentText: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    onSubmit: submitHandler,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-72 sm:w-96 mt-8 mb-20">
      <FormikTextInputField
        label="نام و نام‌خانواگی"
        name="fullName"
        customClass="mb-3"
        formik={formik}
        forced={true}
      />
      <FormikTextInputField
        label="شماره موبایل"
        name="userName"
        customClass="mb-3"
        formik={formik}
        forced={true}
      />
      <TextareaFieldInput
        name="commentText"
        customClass="mb-3"
        formik={formik}
        forced={true}
        label="پیام شما"
      />
      <div className="flex justify-center">
        <button
          disabled={!formik.isValid}
          type="submit"
          className={`bg-green w-2/3 text-white h-12 rounded-lg ${
            !formik.isValid && "disabled-btn"
          }`}
        >
          ارسال
        </button>
      </div>
    </form>
  );
};

export default Suggestion;
