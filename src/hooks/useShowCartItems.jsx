import { showItemsCart } from "@/services/showItemsCartService";
import { useQuery } from "@tanstack/react-query";

const useShowCartItems = (token) => {
  return useQuery({
    queryKey: ["showCartItems", token],
    queryFn: showItemsCart,
    refetchOnWindowFocus: false,
  });
};

export default useShowCartItems;
