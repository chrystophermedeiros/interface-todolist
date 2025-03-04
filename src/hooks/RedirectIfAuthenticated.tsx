import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirectIfAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("userData");

    if (token) {
      router.push("/");
    }
  }, [router]);
};

export default useRedirectIfAuthenticated;
