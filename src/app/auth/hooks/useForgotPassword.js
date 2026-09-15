import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import authApi from "@/services/api/authApi";

const useForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      await authApi.forgotPassword(email);
      toast.success("Password reset link sent to your email.");
      navigate("/email-sent");
    } catch (error) {
      console.error("Forgot password failed:", error);
      const message =
        error.response?.data?.message ||
        "Failed to send reset link. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading };
};

export default useForgotPassword;
