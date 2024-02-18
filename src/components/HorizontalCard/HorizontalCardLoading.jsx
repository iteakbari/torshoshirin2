import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HorizontalCardLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative">
        <div className="flex justify-center items-center">
          <Skeleton width={300} height={300} className="rounded-2xl" />
        </div>
        <div className="flex justify-between mt-5">
          <Skeleton width={80} height={80} className="rounded-2xl" />
          <Skeleton width={80} height={80} className="rounded-2xl" />
          <Skeleton width={80} height={80} className="rounded-2xl" />
          <Skeleton width={80} height={80} className="rounded-2xl" />
        </div>
      </div>
      <div className="py-10 px-7 mt-5 md:mt-0 flex flex-col justify-center items-center gap-5">
        <Skeleton height={30} width={200} />
        <Skeleton height={30} width={250} />
        <Skeleton height={30} width={250} />
      </div>
    </div>
  );
};

export default HorizontalCardLoading;
