import Link from "next/link";

const NotFound = () => {
  return (
    <div className="not-found">
      <Link
        href="/"
        className="flex items-center justify-between w-64 p-3 px-5 rounded-lg hover:bg-green-900 transition-all bg-green text-white"
      >
        بازگشت به صفحه اول
        <svg
          width="26"
          height="17"
          viewBox="0 0 26 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.19824 5.94804L20.6434 5.94804C22.9403 5.94804 24.8024 7.81009 24.8024 10.1071L24.8024 11.6327C24.8024 13.9297 22.9403 15.7917 20.6434 15.7917L6.20866 15.7917"
            stroke="#F9FDF1"
            strokeWidth="2.08134"
            strokeLinejoin="round"
          />
          <path
            d="M5.84375 1.57288C4.13521 3.28142 3.17729 4.23933 1.46875 5.94788L5.84375 10.3229"
            stroke="#F9FDF1"
            strokeWidth="2.08134"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
};

export default NotFound;
