import { useEffect } from "react";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useRedirectIfAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("userData");

    if (token) {
      router.push("/"); 
    }
  }, []);
};

export default useRedirectIfAuthenticated;
