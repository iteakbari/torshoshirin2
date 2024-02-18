"use client";
import CategoriesListLoading from "./CategorisListLoading";
import Category from "./Category";
import useCategories from "@/hooks/useCategories";

const CategoriesList = () => {
  const { data, isLoading } = useCategories();

  return (
    <div className="grid grid-cols-2 gap-3 px-3 sm:px-0 md:gap-10 md:grid-cols-3 lg:grid-cols-4">
      {isLoading ? (
        <CategoriesListLoading />
      ) : (
        data?.data.map((category) => (
          <Category key={category.id} category={category} />
        ))
      )}
    </div>
  );
};

export default CategoriesList;
