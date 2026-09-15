import { toast } from "sonner";
import { useAuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import authApi from "@/services/api/authApi";

const useLogout = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    toast.promise(authApi.logout(), {
      loading: "Logging out...",
      success: () => {
        setAuthUser(null);
        localStorage.removeItem("ovolUser");
        navigate("/login");
        return "Logout successful!";
      },
      error: (error) => {
        console.error("Logout failed:", error);
        return (
          error.response?.data?.message || "Logout failed. Please try again."
        );
      },
    });
  };

  return { logout };
};

export default useLogout;
