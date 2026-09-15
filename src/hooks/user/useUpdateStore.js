import { useAuthContext } from "@/context/auth-context";
import storeApi from "@/services/api/storeApi";
import { useState } from "react";
import { toast } from "sonner";

const useUpdateStore = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const updateStore = async (values) => {
    setLoading(true);
    try {
      const res = await storeApi.updateStore(values);
      const response = res.data.user;
      // console.log(response);
      setAuthUser(response);
      localStorage.setItem("ovolUser", JSON.stringify(response));
      toast.success("Updated store successfully");
    } catch (error) {
      console.error("Error updating store:", error);
      toast.error(error.response?.data?.message || "Error updating store");
    } finally {
      setLoading(false);
    }
  };

  return { updateStore, loading };
};

export default useUpdateStore;
