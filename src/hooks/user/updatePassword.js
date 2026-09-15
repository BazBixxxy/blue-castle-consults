import { toast } from "sonner";
import { useState } from "react";
import userApi from "@/services/api/userApi";

const useUpdatePassword = () => {
  const [loading, setLoading] = useState(false);

  const updatePassword = async (data) => {
    try {
      setLoading(true);
      await userApi.updatePassword(data);
      toast.success("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response?.data?.message || "Error updating password");
    } finally {
      setLoading(false);
    }
  };

  return { updatePassword, loading };
};

export default useUpdatePassword;
