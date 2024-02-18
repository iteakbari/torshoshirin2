import OtpInput from "react-otp-input";

const ConfrimLogin = ({
  phoneNumberCode,
  setPhoneNumberCode,
  onSubmit,
  time,
  onBack,
  onResendCode,
  isCheckingOtp,
  phoneNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <p className="my-10">
        کد ارسال‌شده به شماره همراه {phoneNumber} را وارد کنید.
      </p>

      <OtpInput
        value={phoneNumberCode}
        onChange={setPhoneNumberCode}
        numInputs={5}
        containerStyle="flex justify-between ltr"
        inputStyle="input"
        inputType="tel"
        shouldAutoFocus={true}
        renderInput={(props) => <input {...props} />}
      />

      {phoneNumberCode.length == 5 ? (
        <button
          variant="contained"
          className="bg-green-950 w-full mt-5 h-14 text-white hover:bg-green-800 transition-all rounded-lg mb-4"
        >
          {isCheckingOtp ? <span className="loader"></span> : "ورود"}
        </button>
      ) : (
        <button
          variant="contained"
          className="bg-gray-400 w-full mt-5 h-14 text-gray-100 rounded-lg mb-4 pointer-events-none"
        >
          {isCheckingOtp ? <span className="loader"></span> : "ورود"}
        </button>
      )}

      <div className="flex justify-between items-center mb-10">
        <p
          onClick={onBack}
          className="cursor-pointer text-gray-500 hover:text-blue-700 text-sm"
        >
          تغییر شماره
        </p>
        {time ? (
          <span className="text-gray-500 text-sm">
            ارسال کد تا{" "}
            <span
              className={`inline-block text-center w-6 ${
                time > 30 ? "text-green-900" : "text-red-600"
              }`}
            >
              {time}
            </span>{" "}
            ثانیه دیگر
          </span>
        ) : (
          <p
            onClick={onResendCode}
            className="text-gray-500 hover:text-blue-600 text-sm cursor-pointer"
          >
            ارسال مجدد
          </p>
        )}
      </div>
    </form>
  );
};

export default ConfrimLogin;
