import { getStates } from "@/services/stateServices";
import { useQuery } from "@tanstack/react-query";

const useStateList = () => {
  return useQuery({ queryKey: ["get-states"], queryFn: getStates });
};

export default useStateList;
