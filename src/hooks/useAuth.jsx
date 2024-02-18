import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState("");
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    Cookies.get("isAuth")
      ? setIsAuthenticated(true)
      : setIsAuthenticated(false);
    !isAuthenticated && path.startsWith("/dashboard") && router.push("/sign");
    isAuthenticated && !profile && router.push("/dashboard/profile");
  }, [isAuthenticated]);

  return { isAuthenticated, setIsAuthenticated, setProfile };
};

export default useAuth;
