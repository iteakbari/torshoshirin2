"use client";

import { AuthContext } from "@/context/AuthContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Logout({ children }) {
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  function handleLogout() {
    Cookies.remove("token");
    // Cookies.remove("isAuth");
    // setIsAuthenticated(false);
    if (typeof window !== "undefined" && window.location)
      window.location.reload();
    setTimeout(() => {
      router.push("/");
    }, 100);
  }

  return (
    <>
      <span onClick={handleLogout} className="inline-block w-full">
        {children}
      </span>
    </>
  );
}
