"use client";

import CitiesSelectBox from "@/common/CitiesSelectBox";
import FormikTextInputField from "@/common/FormikTextInputField";
import StateSelectBox from "@/common/StateSelectBox";
import useGetProfile from "@/hooks/useGetProfile";
import useStateList from "@/hooks/useStateList";
import { changeProfile } from "@/services/changeProfile";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import MapComponent from "@/common/Map";

const Profile = () => {
  const [userAddress, setUserAddress] = useState("");
  const token = Cookies.get("token");
  const { data } = useGetProfile(token);
  const { data: getSatatesList } = useStateList();
  const [selectedState, setSelectedState] = useState();
  const [showCities, setShowCities] = useState();
  const [selectedCity, setSelectedCity] = useState("");
  const [userLocation, setUserLocation] = useState({
    id: 2,
    title: "ساری",
    parentId: 1,
    lat: 36.5659598,
    lng: 53.0587229,
  });
  const [formValues, setFormValues] = useState({
    id: null,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    cityId: null,
    stateId: null,
    userName: "",
    longY: 0,
    latX: 0,
    address: "",
    codePost: "",
    phonNumber2: "",
    cityName: "",
    stateName: "",
  });

  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: changeProfile,
  });

  const validationSchema = Yup.object({
    firstName: Yup.string().required("لطفا اطلاعات فیلد را تکمیل کنید"),
    lastName: Yup.string().required("لطفا اطلاعات فیلد را تکمیل کنید"),
    codePost: Yup.string().matches(
      /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
      "کدپستی نادرست است"
    ),
    phonNumber2: Yup.string().matches(
      /^0\d{2}\d{8}$/,
      "فرمت شماره تلفن ثابت صحیح نیست"
    ),
    stateName: Yup.string().required("لطفا اطلاعات فیلد را تکمیل کنید"),
    cityName: Yup.string().required("لطفا اطلاعات فیلد را تکمیل کنید"),
    address: Yup.string().required("لطفا اطلاعات فیلد را تکمیل کنید"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    codePost: "",
    phonNumber2: "",
    stateName: "",
    cityName: "",
    address: "",
  };

  const submitHandler = async (values) => {
    const stateId = getSatatesList?.data.statesList.find(
      (s) => s.title === formik.values.stateName
    ).id;
    const cityId = getSatatesList?.data.citiesList.find(
      (c) => c.title === formik.values.cityName
    ).id;
    const latX = parseFloat(userLocation[0]);
    const longY = parseFloat(userLocation[1]);
    const id = data?.data.id;
    const userName = data?.data.phoneNumber;

    try {
      const { data } = await updateProfile({
        ...values,
        id,
        stateId,
        cityId,
        latX,
        longY,
        userName,
        token,
      });
      // console.log(data);
      data?.success &&
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
              <p className="text-white">اطلاعات با موفقیت ثبت شد</p>
            </div>
            {/* <div className="w-full flex justify-center pt-5"></div> */}
          </div>
        ));
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues || initialValues,
    onSubmit: submitHandler,
    validationSchema,
    validateOnMount: true,
  });

  useEffect(() => {
    data &&
      setFormValues({
        firstName: data.data.firstName ? data.data.firstName : "",
        lastName: data.data.lastName ? data.data.lastName : "",
        phoneNumber: data.data.phoneNumber ? data.data.phoneNumber : "",
        codePost: data.data.codePost ? data.data.codePost : "",
        phonNumber2: data.data.phonNumber2 ? data.data.phonNumber2 : "",
        stateName: data.data.stateName ? data.data.stateName : "",
        cityName: data.data.cityName ? data.data.cityName : "",
        address: data.data.address ? data.data.address : "",
      });
  }, [data]);

  useEffect(() => {
    const stateSelected = getSatatesList?.data?.statesList?.find(
      (state) => state.title === formik.values.stateName
    );

    setSelectedState(stateSelected);
    // console.log("state", getSatatesList);
    setShowCities(
      stateSelected &&
        getSatatesList?.data?.citiesList?.filter(
          (city) => city.parentId === stateSelected.id
        )
    );
  }, [getSatatesList, formik.values.stateName]);

  useEffect(() => {
    setShowCities(
      selectedState &&
        getSatatesList?.data?.citiesList?.filter(
          (city) => city.parentId === selectedState.id
        )
    );
  }, [selectedState, getSatatesList?.data?.citiesList]);

  useEffect(() => {
    // console.log(formik.values.cityName);
    formik.values.cityName
      ? setSelectedCity(
          showCities &&
            showCities?.find((city) => city.title === formik.values.cityName)
        )
      : "";
  }, [formik.values.cityName, showCities]);

  useEffect(() => {
    setUserLocation(
      showCities &&
        showCities?.find((city) => city.title === formik.values.cityName)
    );
  });

  useEffect(() => {
    formik.setFieldValue("address", userAddress);
  }, [userAddress]);

  useEffect(() => {
    !data?.data?.firstName &&
      toast.custom(
        (t) => (
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
              <p>ابتدا لطفا پروفایل خود را تکمیل کنید.</p>
            </div>
            <div className="w-full flex justify-center pt-5"></div>
          </div>
        ),
        { duration: 10000 }
      );
  }, []);

  return (
    <>
      <h3 className="text-xl">تکمیل پروفایل</h3>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-wrap gap-10 mt-10"
      >
        <FormikTextInputField
          label="نام"
          name="firstName"
          customClass="w-half"
          formik={formik}
          forced={true}
        />
        <FormikTextInputField
          label="نام‌خانواگی"
          name="lastName"
          customClass="w-half"
          formik={formik}
          forced={true}
        />
        <FormikTextInputField
          label="شماره موبایل"
          name="phoneNumber"
          customClass="w-half"
          formik={formik}
          readOnly={true}
          forced={true}
        />
        <FormikTextInputField
          label="کدپستی(اختیاری)"
          name="codePost"
          customClass="w-half"
          formik={formik}
        />
        <FormikTextInputField
          label="شماره تلفن ثابت(اختیاری)"
          name="phonNumber2"
          customClass="w-half"
          formik={formik}
        />
        <p className="w-full mt-3">
          *صرفاً استان‌ها و شهرهایی که در محدوده خدمات فروشگاه ما هستند، قابل
          انتخاب‌اند.
        </p>

        <StateSelectBox
          value={formik.values.stateName}
          statesList={getSatatesList?.data.statesList}
          onChange={(value) => formik.setFieldValue("stateName", value.value)}
          forced={true}
        />

        <CitiesSelectBox
          value={formik.values.cityName}
          citiesList={showCities}
          onChange={(value) => formik.setFieldValue("cityName", value.value)}
          customClass={selectedState ? "" : "disabled"}
          forced={true}
        />

        <div className="pt-4 w-half">
          <FormikTextInputField
            label="آدرس"
            name="address"
            customClass="mt-3"
            formik={formik}
            forced={true}
          />
        </div>
        <div className="w-half">
          <p className="pb-2">موقعیت مکانی آدرستان را روی نقشه مشخص کنید.</p>

          <div className="h-56">
            <MapComponent
              lat={userLocation?.lat}
              lng={userLocation?.lng}
              setUserAddress={setUserAddress}
            />
          </div>
        </div>

        <div className="flex mt-5 justify-center w-100">
          <button
            disabled={!formik.isValid}
            type="submit"
            variant="contained"
            className={`bg-green-950 w-full sm:w-96 h-14 text-white hover:bg-green-800 transition-all rounded-lg ${
              !formik.isValid && "disabled-btn"
            }`}
          >
            ثبت
          </button>
        </div>
      </form>
    </>
  );
};

export default Profile;
