import { useAuthContext } from "@/context/auth-context";
import { app } from "@/lib/firebase";
import authApi from "@/services/api/authApi";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useGoogleOAuth = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const googleOAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      // console.log(result);
      const firstName = result.user.displayName?.split(" ")[0] || "";
      const lastName = result.user.displayName?.split(" ")[1] || "";

      const userData = {
        firstName,
        lastName,
        email: result.user.email || "",
        profilePicture: result.user.photoURL || "",
        phoneNumber: result.user.phoneNumber || "",
        googleId: result.user.uid,
      };

      const res = await authApi.google(userData);
      const user = res.data?.user;
      localStorage.setItem("ovolUser", JSON.stringify(user));
      setAuthUser(user);
      // console.log(user);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Error with Google OAuth:", error);
    }
  };

  return { googleOAuth };
};

export default useGoogleOAuth;
