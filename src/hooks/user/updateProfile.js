import { useAuthContext } from "@/context/auth-context";
import userApi from "@/services/api/userApi";
import { useState } from "react";
import { toast } from "sonner";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const updateProfile = async (values) => {
    try {
      setLoading(true);
      const res = await userApi.updateUser(values);
      const response = res.data.user;
      // console.log(response);
      setAuthUser(response);
      localStorage.setItem("ovolUser", JSON.stringify(response));
      toast.success("Updated profile successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };
  return { updateProfile, loading };
};

export default useUpdateProfile;
