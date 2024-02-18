import { relatedProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

const useRelatedProducts = (CategoryId) => {
  return useQuery({
    queryKey: ["relatedProducts", CategoryId],
    queryFn: relatedProducts,
  });
};

export default useRelatedProducts;
