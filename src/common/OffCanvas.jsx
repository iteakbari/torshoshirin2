import "./../styles/OffCanvas.css";
const OffCanvas = ({
  children,
  origin,
  height,
  show,
  setIsOpen,
  isOpen,
  customeClass,
  staticBackdrop,
}) => {
  return (
    <>
      {staticBackdrop ? (
        <div className={`offcanvas ${show}`}></div>
      ) : (
        <div
          className={`offcanvas ${show}`}
          onClick={() => setIsOpen(!isOpen)}
        ></div>
      )}

      <div
        className={`offCanvas-content ${customeClass}  ${
          origin === "right"
            ? "offcanvas-right"
            : origin === "bottom"
            ? "offcanvas-bottom"
            : origin === "left"
            ? "offcanvas-left"
            : origin === "center"
            ? "offcanvas-center"
            : ""
        } ${height} ${show}`}
      >
        <span
          className="flex absolute top-5 left-5"
          onClick={() => setIsOpen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10ZM9.17 14.83l5.66-5.66M14.83 14.83 9.17 9.17"
              stroke="#d9d9d9"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
        {children}
      </div>
    </>
  );
};

export default OffCanvas;
