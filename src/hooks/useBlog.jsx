import { getBlog } from "@/services/blogService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useBlog = (blogId) => {
  return useQuery({
    queryKey: ["get-blog", blogId],
    queryFn: getBlog,
  });
};

export default useBlog;
