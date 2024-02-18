const TextFieldInput = ({
  label,
  name,
  id,
  value,
  onChange,
  customClass,
  errorMessage,
  error,
  readOnly,
  type,
  onBlur,
}) => {
  return (
    <div className={`input-box ${customClass}`}>
      <input
        type={type ? type : "text"}
        className="h-14 bg-transparent text-right px-3"
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        placeholder=" "
        readOnly={readOnly}
        onBlur={onBlur}
      />
      <label>{label}</label>
      {error && <p className="text-xs text-red-500  mt-1">{errorMessage}</p>}
    </div>
  );
};

export default TextFieldInput;
