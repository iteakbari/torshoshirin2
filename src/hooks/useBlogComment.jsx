import { getBlogComments } from "@/services/commentService";
import { useQuery } from "@tanstack/react-query";

const useBlogComment = ({ documentId, step, pageSize }) => {
  return useQuery({
    queryKey: ["blogComment", { documentId, step, pageSize }],
    queryFn: getBlogComments,
    keepPreviousData: true,
  });
};

export default useBlogComment;
