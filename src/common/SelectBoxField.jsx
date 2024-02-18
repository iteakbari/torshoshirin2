import Select from "react-select";

const SelectBoxField = ({
  label,
  onChange,
  customClass,
  options,
  defaultValue,
  error,
  errorMessage,
  onBlur,
  value,
}) => {
  return (
    <div className={`select-box ${customClass}`}>
      <Select
        value={value}
        options={options}
        onChange={onChange}
        placeholder=""
        className="h-14 w-full select"
        defaultValue={defaultValue}
        onBlur={onBlur}
      />
      <label className={defaultValue ? "top" : ""}>{label}</label>
      {error && <p className="text-xs text-red-500  mt-1">{errorMessage}</p>}
    </div>
  );
};

export default SelectBoxField;
