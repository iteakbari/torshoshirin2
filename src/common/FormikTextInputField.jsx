const FormikTextInputField = ({
  label,
  name,
  id,
  customClass,
  readOnly,
  type,
  formik,
  forced,
}) => {
  return (
    <div className={`input-box ${customClass}`}>
      <input
        type={type ? type : "text"}
        className="h-14 bg-transparent text-right px-3 bg-white"
        value={formik.values[name]}
        onChange={formik.handleChange}
        name={name}
        id={id}
        placeholder=" "
        readOnly={readOnly}
        onBlur={formik.handleBlur}
      />
      <label>
        {label} {forced && <span className="text-orange">*</span>}
      </label>
      {formik.errors[name] && formik.touched[name] && (
        <p className="text-xs text-red-500  mt-1">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default FormikTextInputField;
