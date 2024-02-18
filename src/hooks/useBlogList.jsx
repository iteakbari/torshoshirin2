import { getBlogList } from "@/services/blogService";
import { useQuery } from "@tanstack/react-query";

const useBlogList = (options) => {
  return useQuery({
    queryKey: ["blogList", options],
    queryFn: getBlogList,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

export default useBlogList;
