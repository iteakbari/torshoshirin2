import CategoriesList from "@/components/Category/CategorisList";

const categoryPage = () => {
  return (
    <div className="container lg:px-10 2xl:px-0 mx-auto pt-24">
      <div className="p-7 rounded-3xl bg-white my-14 text-center text-4xl">
        دسته بندی
      </div>
      <CategoriesList />
    </div>
  );
};

export default categoryPage;
