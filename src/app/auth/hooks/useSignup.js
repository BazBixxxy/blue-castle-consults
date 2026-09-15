import authApi from "@/services/api/authApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const signup = async (values) => {
    try {
      setLoading(true);
      await authApi.signup(values);
      toast.success("Sign up successful! Please verify your email.");
      navigate("/email-sent");
    } catch (error) {
      console.error("Sign up failed:", error);
      const message =
        error.response?.data?.message || "Sign up failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;
