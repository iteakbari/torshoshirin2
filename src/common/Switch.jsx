import "../styles/Switch.css";

const Switch = ({ setReciver, reciver, checked }) => {
  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        checked={checked}
        onChange={() => setReciver(!reciver)}
      />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;
