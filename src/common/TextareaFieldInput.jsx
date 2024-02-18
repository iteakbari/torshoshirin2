const TextareaFieldInput = ({
  label,
  name,
  id,
  customClass,
  forced,
  formik,
}) => {
  return (
    <div className={`input-box ${customClass}`}>
      <textarea
        name={name}
        id={id}
        className="bg-transparent textarea bg-white"
        value={formik.values[name]}
        onChange={formik.handleChange}
        placeholder=" "
        onBlur={formik.handleBlur}
      ></textarea>
      <label>
        {label} {forced && <span className="text-orange">*</span>}
      </label>
    </div>
  );
};

export default TextareaFieldInput;
