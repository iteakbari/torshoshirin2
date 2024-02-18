import { newProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

const useNewProducts = () => {
  return useQuery({
    queryKey: ["newProducts"],
    queryFn: newProducts,
  });
};

export default useNewProducts;
