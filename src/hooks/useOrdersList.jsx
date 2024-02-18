import { getOrderList } from "@/services/orderService";
import { useQuery } from "@tanstack/react-query";

const useOrdersList = (token) => {
  return useQuery({
    queryKey: ["get-orderList", token],
    queryFn: getOrderList,
  });
};

export default useOrdersList;
