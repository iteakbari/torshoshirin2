import { getFooterData } from "@/services/footerService";
import { useQuery } from "@tanstack/react-query";

const useFooter = () => {
  return useQuery({
    queryKey: ["footer"],
    queryFn: getFooterData,
  });
};

export default useFooter;
