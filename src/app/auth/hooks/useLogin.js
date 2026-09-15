import { useAuthContext } from "@/context/auth-context";
import authApi from "@/services/api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLogin = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const login = async (values) => {
    try {
      setLoading(true);

      const res = await authApi.login(values);
      const user = res.data?.user;
      localStorage.setItem("ovolUser", JSON.stringify(user));
      setAuthUser(user);
      // console.log(user);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);

      const message =
        error.response?.data?.message || "Login failed. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
