"use client";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import FormikTextInputField from "@/common/FormikTextInputField";
import CitiesSelectBox from "@/common/CitiesSelectBox";
import StateSelectBox from "@/common/StateSelectBox";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { useFormik } from "formik";
import Switch from "@/common/Switch";
import { useMutation } from "@tanstack/react-query";
import { addressFunc, editAddressFunc } from "@/services/addressService";
import Address from "@/common/AddressMap";
import MapComponent from "@/common/Map";

const AddAddress = ({
  selectedAddress,
  setIsOpen,
  refetch,
  getSatatesList,
  setSelectedAddress,
  isOpen,
}) => {
  const [userAddress, setUserAddress] = useState("");
  const token = Cookies.get("token");
  const [selectedState, setSelectedState] = useState([]);
  const [showCities, setShowCities] = useState([]);
  const [reciver, setReciver] = useState(false);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [formValues, setFormValues] = useState({
    id: 0,
    cityId: null,
    stateId: null,
    receiverMyself: true,
    longY: 0,
    latX: 0,
    address: "",
    codePost: "",
    phoneNumber: "",
    mobileNumber: "",
    fname: "",
    lname: "",
  });

  const { data, mutateAsync: addressFunction } = useMutation({
    mutationFn: addressFunc,
  });

  const { mutateAsync: editAddressFunction } = useMutation({
    mutationFn: editAddressFunc,
  });

  const validationSchema = Yup.object({
    codePost: Yup.string().matches(
      /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
      "کدپستی نادرست است"
    ),
    stateName: Yup.string().required("لطفا اطلاعات فیلد را تکمیل کنید"),
    cityName: Yup.string().required("لطفا اطلاعات فیلد را تکمیل کنید"),
    address: Yup.string().required("لطفا اطلاعات فیلد را تکمیل کنید"),
  });

  const initialValues = {
    id: 0,
    cityId: null,
    stateId: null,
    receiverMyself: true,
    longY: 0,
    latX: 0,
    address: "",
    codePost: "",
    phoneNumber: "",
    mobileNumber: "",
    fname: "",
    lname: "",
  };

  useEffect(() => {
    if (selectedAddress) {
      console.log("sl", selectedAddress.latX, selectedAddress.longY);
      console.log("ll", lat, lng);
      setLat(selectedAddress.latX);
      setLng(selectedAddress.longY);
      setFormValues({
        id: selectedAddress.id,
        fname: selectedAddress.fname,
        lname: selectedAddress.lname,
        mobileNumber: selectedAddress.mobileNumber,
        codePost: selectedAddress.codePost,
        phonNumber: selectedAddress.phonNumber,
        stateName: selectedAddress.stateName,
        cityName: selectedAddress.cityName,
        address: selectedAddress.address,
      });
    }
  }, [selectedAddress]);

  const submitHandler = async (values) => {
    // console.log(values);
    const stateId = getSatatesList?.data.statesList.find(
      (s) => s.title === formik.values.stateName
    ).id;
    const cityId = getSatatesList?.data.citiesList.find(
      (c) => c.title === formik.values.cityName
    ).id;
    // const latX = parseFloat(lng);
    // const longY = parseFloat(lat);
    // const id = data?.data.id;

    if (selectedAddress) {
      console.log("send", lat, lng);
      try {
        const data = await editAddressFunction({
          id: values.id,
          cityId,
          stateId,
          receiverMyself: !reciver,
          longY: lng,
          latX: lat,
          address: values.address,
          codePost: values.codePost,
          phoneNumber: values.phoneNumber,
          mobileNumber: values.mobileNumber,
          fname: values.fname,
          lname: values.lname,
          token,
        });

        if (data.success) {
          setIsOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("send", lat, lng);

      try {
        const data = await addressFunction({
          id: 0,
          cityId,
          stateId,
          receiverMyself: !reciver,
          longY: lng,
          latX: lat,
          address: userAddress,
          codePost: "",
          phoneNumber: "",
          mobileNumber: "",
          fname: "",
          lname: "",
          token,
        });

        if (data.success) {
          setIsOpen(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    formik.resetForm();
    setSelectedAddress(null);

    refetch();
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: selectedAddress ? formValues : initialValues,
    onSubmit: submitHandler,
    validationSchema,
    validateOnMount: true,
  });

  useEffect(() => {
    setSelectedState(
      formik.values.stateName &&
        getSatatesList?.data?.statesList?.find(
          (state) => state.title === formik.values.stateName
        )
    );
  }, [formik.values.stateName]);

  useEffect(() => {
    setShowCities(
      selectedState &&
        getSatatesList?.data?.citiesList?.filter(
          (city) => city.parentId === selectedState.id
        )
    );
  }, [selectedState]);

  useEffect(() => {
    setUserAddress(formik.values.address);
  }, [formik.values.address]);

  useEffect(() => {
    const selectedCity =
      showCities &&
      showCities?.find((city) => city.title === formik.values.cityName);
    setLat(selectedCity?.lat);
    setLng(selectedCity?.lng);
  }, [formik.values.cityName]);

  useEffect(() => {
    formik.setFieldValue("address", userAddress);
  }, [userAddress]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedState([]);
      setFormValues({
        id: 0,
        cityId: null,
        stateId: null,
        receiverMyself: true,
        longY: 0,
        latX: 0,
        address: "",
        codePost: "",
        phoneNumber: "",
        mobileNumber: "",
        fname: "",
        lname: "",
      });
    }
  }, [isOpen]);

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-wrap gap-5 address-modal"
      >
        <div className="flex gap-2 items-center w-full">
          <Switch
            reciver={reciver}
            setReciver={setReciver}
            checked={!reciver}
          />
          <span className={`${reciver ? "text-gray-500" : "text-gray-900"}`}>
            گیرنده سفارش خودم هستم
          </span>
        </div>
        {reciver && (
          <>
            <FormikTextInputField
              label="نام گیرنده"
              name="firstName"
              customClass="w-half"
              formik={formik}
            />
            <FormikTextInputField
              label="نام‌خانوادگی گیرنده"
              name="lastName"
              customClass="w-half"
              formik={formik}
            />
            <FormikTextInputField
              label="شماره موبایل گیرنده"
              name="phoneNumber"
              customClass="w-half"
              formik={formik}
            />
            <FormikTextInputField
              label="کدپستی(اختیاری) گیرنده"
              name="codePost"
              customClass="w-half"
              formik={formik}
            />
            <FormikTextInputField
              label="شماره تلفن ثابت(اختیاری) گیرنده"
              name="phonNumber2"
              customClass="w-half"
              formik={formik}
            />
          </>
        )}
        <p className="w-full mt-3">
          *صرفاً استان‌ها و شهرهایی که در محدوده خدمات فروشگاه ما هستند، قابل
          انتخاب‌اند.
        </p>

        <StateSelectBox
          value={formik.values.stateName}
          statesList={getSatatesList?.data.statesList}
          onChange={(value) => formik.setFieldValue("stateName", value.value)}
        />

        <CitiesSelectBox
          value={formik.values.cityName}
          citiesList={showCities}
          onChange={(value) => formik.setFieldValue("cityName", value.value)}
          customClass={selectedState ? "" : "disabled"}
        />

        <div className="pt-4 w-half">
          <FormikTextInputField
            label="آدرس"
            name="address"
            customClass="mt-3"
            formik={formik}
          />
        </div>
        <div className="w-half">
          <p className="pb-2">موقعیت مکانی آدرستان را روی نقشه مشخص کنید.</p>
          <div className="w-full h-56 rounded-lg border">
            <MapComponent
              lat={lat}
              lng={lng}
              setLat={setLat}
              setLng={setLng}
              userAddress={userAddress}
              setUserAddress={setUserAddress}
            />
          </div>
        </div>

        <div className="flex mt-5 justify-center w-100">
          <button
            disabled={!formik.isValid}
            type="submit"
            variant="contained"
            className={`bg-green-950 w-96 h-14 text-white hover:bg-green-800 transition-all rounded-lg ${
              !formik.isValid && "disabled-btn"
            }`}
          >
            ثبت
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
