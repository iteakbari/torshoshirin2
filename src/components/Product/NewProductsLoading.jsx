import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewProductsLoading = () => {
  return (
    <ul>
      <li>
        <div className="border-t flex items-center p-3">
          <div className="flex justify-center items-center w-1/2">
            <Skeleton width={100} height={100} />
          </div>
          <div className="w-1/2 flex flex-col gap-2 items-center">
            <Skeleton width={150} height={20} />
            <Skeleton width={150} height={20} />
            <Skeleton width={150} height={20} />
          </div>
        </div>
      </li>
      <li>
        <div className="border-t flex items-center p-3">
          <div className="flex justify-center items-center w-1/2">
            <Skeleton width={100} height={100} />
          </div>
          <div className="w-1/2 flex flex-col gap-2 items-center">
            <Skeleton width={150} height={20} />
            <Skeleton width={150} height={20} />
            <Skeleton width={150} height={20} />
          </div>
        </div>
      </li>
      <li>
        <div className="border-t flex items-center p-3">
          <div className="flex justify-center items-center w-1/2">
            <Skeleton width={100} height={100} />
          </div>
          <div className="w-1/2 flex flex-col gap-2 items-center">
            <Skeleton width={150} height={20} />
            <Skeleton width={150} height={20} />
            <Skeleton width={150} height={20} />
          </div>
        </div>
      </li>
      <li>
        <div className="border-t flex items-center p-3">
          <div className="flex justify-center items-center w-1/2">
            <Skeleton width={100} height={100} />
          </div>
          <div className="w-1/2 flex flex-col gap-2 items-center">
            <Skeleton width={150} height={20} />
            <Skeleton width={150} height={20} />
            <Skeleton width={150} height={20} />
          </div>
        </div>
      </li>
      <li>
        <div className="border-t flex items-center p-3">
          <div className="flex justify-center items-center w-1/2">
            <Skeleton width={100} height={100} />
          </div>
          <div className="w-1/2 flex flex-col gap-2 items-center">
            <Skeleton width={150} height={20} />
            <Skeleton width={150} height={20} />
            <Skeleton width={150} height={20} />
          </div>
        </div>
      </li>
    </ul>
  );
};

export default NewProductsLoading;
