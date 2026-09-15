import { useAuthContext } from "@/context/auth-context";
import userApi from "@/services/api/userApi";
import { useState } from "react";
import { toast } from "sonner";

const useUpdateAvatars = () => {
  const [loading, setLoading] = useState(false);
  const [loadingBanner, setLoadingBanner] = useState(false);
  const { setAuthUser } = useAuthContext();

  const updateProfilePicture = async (profilePicture) => {
    try {
      setLoading(true);
      const res = await userApi.updateProfilePicture({ profilePicture });
      const updatedProfilePicture = res.data.user.profilePicture;

      setAuthUser((prev) => ({
        ...prev,
        profilePicture: updatedProfilePicture,
      }));
      localStorage.setItem("ovolUser", JSON.stringify(res.data.user));

      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast.error(
        error.response?.data?.message || "Error updating profile picture"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateBanner = async (banner) => {
    try {
      setLoadingBanner(true);
      const res = await userApi.updateBanner({ banner });
      const updatedBanner = res.data.user.banner;

      setAuthUser((prev) => ({ ...prev, banner: updatedBanner }));
      localStorage.setItem("ovolUser", JSON.stringify(res.data.user));

      toast.success("Banner updated successfully");
    } catch (error) {
      console.error("Error updating banner:", error);
      toast.error(error.response?.data?.message || "Error updating banner");
    } finally {
      setLoadingBanner(false);
    }
  };

  return { updateProfilePicture, updateBanner, loading, loadingBanner };
};

export default useUpdateAvatars;
