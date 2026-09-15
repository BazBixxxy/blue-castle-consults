import { useAuthContext } from "@/context/auth-context";
import { useRef } from "react";

export default function UploadProfilePicture() {
  const { authUser } = useAuthContext();
  const fileRef = useRef(null);
  return (
    <div className="grid gap-3">
      <img
        src={authUser.profilePicture}
        alt="avatar"
        className="size-20 rounded-full cursor-pointer"
        onClick={() => fileRef.current.click()}
      />
      <input type="file" ref={fileRef} hidden accept="image/*" />
    </div>
  );
}
