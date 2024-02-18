import { lastAritcle } from "@/services/blogService";
import { useQuery } from "@tanstack/react-query";

const useLastArticle = () => {
  return useQuery({
    queryKey: ["lastArticle"],
    queryFn: lastAritcle,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

export default useLastArticle;
