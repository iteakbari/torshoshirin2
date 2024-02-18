import { getOrderDetails } from "@/services/orderService";
import { useQuery } from "@tanstack/react-query";

const useOrderDetails = (id, token) => {
  return useQuery({
    queryKey: ["get-orderDetails", { id, token }],
    queryFn: getOrderDetails,
  });
};

export default useOrderDetails;
