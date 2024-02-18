import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategoriesListLoading = () => {
  return (
    <>
      <div className="md:w-80 h-36 md:h-80 rounded-3xl overflow-hidden">
        <Skeleton height={350} width={350} />
      </div>
      <div className="md:w-80 h-36 md:h-80 rounded-3xl overflow-hidden">
        <Skeleton height={350} width={350} />
      </div>
      <div className="md:w-80 h-36 md:h-80 rounded-3xl overflow-hidden">
        <Skeleton height={350} width={350} />
      </div>
      <div className="md:w-80 h-36 md:h-80 rounded-3xl overflow-hidden">
        <Skeleton height={350} width={350} />
      </div>
      <div className="md:w-80 h-36 md:h-80 rounded-3xl overflow-hidden">
        <Skeleton height={350} width={350} />
      </div>
      <div className="md:w-80 h-36 md:h-80 rounded-3xl overflow-hidden">
        <Skeleton height={350} width={350} />
      </div>
      <div className="md:w-80 h-36 md:h-80 rounded-3xl overflow-hidden">
        <Skeleton height={350} width={350} />
      </div>
      <div className="md:w-80 h-36 md:h-80 rounded-3xl overflow-hidden">
        <Skeleton height={350} width={350} />
      </div>
    </>
  );
};

export default CategoriesListLoading;
