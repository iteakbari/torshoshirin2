import { selectedComments } from "@/services/commentService";
import { useQuery } from "@tanstack/react-query";

const useSelectedComments = () => {
  return useQuery({
    queryKey: ["selectedComments"],
    queryFn: selectedComments,
    keepPreviousData: true,
  });
};

export default useSelectedComments;
