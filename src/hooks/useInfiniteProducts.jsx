import { getProductsList } from "@/services/productService";
import { useInfiniteQuery } from "@tanstack/react-query";

const useInfiniteProducts = ({ categoryId, step, pageSize, token }) => {
  return useInfiniteQuery({
    queryKey: ["productsList", { categoryId, step, pageSize, token }],
    queryFn: getProductsList,
    initialPageParams: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage + step;
    },
  });
};

export default useInfiniteProducts;
