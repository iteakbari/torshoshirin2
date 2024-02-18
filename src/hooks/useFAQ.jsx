import { FAQ } from "@/services/faqService";
import { useQuery } from "@tanstack/react-query";

const useFAQ = () => {
  return useQuery({
    queryKey: ["FAQ"],
    queryFn: FAQ,
  });
};

export default useFAQ;
