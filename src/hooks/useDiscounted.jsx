import { discountedProduct, getProductsList } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

const useDiscounted = ({ keyWord, step, pageSize, sortTypeId }) => {
  return useQuery({
    queryKey: ["discountedProducts", { keyWord, step, pageSize, sortTypeId }],
    queryFn: discountedProduct,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

export default useDiscounted;
