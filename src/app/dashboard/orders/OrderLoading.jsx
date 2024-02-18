import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderLoading = () => {
  return (
    <>
      <div className=" py-7 border-b last:border-0">
        <div className="flex flex-wrap justify-between">
          <Skeleton height={30} width={220} />
          <Skeleton height={30} width={220} />
          <Skeleton height={30} width={220} />
        </div>
        <Skeleton className="mt-5 w-full sm:w-72" height={30} />
      </div>
      <div className=" py-7 border-b last:border-0">
        <div className="flex flex-wrap justify-between">
          <Skeleton height={30} width={220} />
          <Skeleton height={30} width={220} />
          <Skeleton height={30} width={220} />
        </div>
        <Skeleton className="mt-5 w-full sm:w-72" height={30} />
      </div>
      <div className=" py-7 border-b last:border-0">
        <div className="flex flex-wrap justify-between">
          <Skeleton height={30} width={220} />
          <Skeleton height={30} width={220} />
          <Skeleton height={30} width={220} />
        </div>
        <Skeleton className="mt-5 w-full sm:w-72" height={30} />
      </div>
      <div className=" py-7 border-b last:border-0">
        <div className="flex flex-wrap justify-between">
          <Skeleton height={30} width={220} />
          <Skeleton height={30} width={220} />
          <Skeleton height={30} width={220} />
        </div>
        <Skeleton className="mt-5 w-full sm:w-72" height={30} />
      </div>
    </>
  );
};

export default OrderLoading;
