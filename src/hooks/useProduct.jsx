import { getProduct } from "@/services/productService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useProduct = (productId, variantId) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["get-product", { productId, variantId }],
    queryFn: getProduct,
    initialData: () => {
      const products = queryClient.getQueryData(["products"]);
      const productData = products?.find((p) => p.id === id);

      if (productData) {
        return productData;
      }
      return undefined;
    },
  });
};

export default useProduct;
