import { getUserProfile } from "@/services/authServices";
import { useQuery } from "@tanstack/react-query";

const useGetProfile = (token) => {
  return useQuery({
    queryKey: ["get-profile", token],
    enabled: !!token,
    queryFn: getUserProfile,
    refetchOnWindowFocus: true,
  });
};

export default useGetProfile;
