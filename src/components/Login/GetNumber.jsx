import TextFieldInput from "@/common/TextFieldInput";

const GetMobileNumber = ({
  phoneNumber,
  onChange,
  onSubmit,
  isLoading,
  error,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <TextFieldInput
        label="شماره موبایل"
        name="phoneNumber"
        value={phoneNumber}
        onChange={onChange}
        customClass="mt-14"
        errorMessage="شماره وارد شده اشتباه است"
        error={error}
        type="tel"
      />
      <button
        type="submit"
        variant="contained"
        className="bg-green-950 w-full mt-5 h-14 text-white hover:bg-green-800 transition-all rounded-lg mb-20"
      >
        {isLoading ? <span className="loader"></span> : "ارسال کد"}
      </button>
    </form>
  );
};

export default GetMobileNumber;
