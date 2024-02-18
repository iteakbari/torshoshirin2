import { getLikedProducts } from "@/services/likeProduct";
import { useQuery } from "@tanstack/react-query";

const useLikedProducts = (token) => {
  return useQuery({
    queryKey: ["get-likedProducts", token],
    queryFn: getLikedProducts,
    cacheTime: 1000,
  });
};

export default useLikedProducts;
