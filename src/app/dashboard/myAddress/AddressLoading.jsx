import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AddressLoading = () => {
  return (
    <>
      <div className="border w-full md:3/4 xl:w-2/4 p-5 rounded-lg mb-5">
        <Skeleton height={30} className="w-72" />
      </div>
      <div className="border w-full md:3/4 xl:w-2/4 p-5 rounded-lg mb-5">
        <Skeleton height={30} className="w-72" />
      </div>
      <div className="border w-full md:3/4 xl:w-2/4 p-5 rounded-lg mb-5">
        <Skeleton height={30} className="w-72" />
      </div>
    </>
  );
};

export default AddressLoading;
