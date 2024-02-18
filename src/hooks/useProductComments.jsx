import { getProductComments } from "@/services/commentService";
import { useQuery } from "@tanstack/react-query";

const useProductComments = ({ productId, step, pageSize }) => {
  return useQuery({
    queryKey: ["productComment", { productId, step, pageSize }],
    queryFn: getProductComments,
    keepPreviousData: true,
  });
};

export default useProductComments;
