import UploadProfilePicture from "@/components/profile/upload-profile-picture";
import Example from "./components/example";

const HomePage = () => {
  return (
    <div className="flex place-items-center h-full">
      <UploadProfilePicture />
      <Example />
    </div>
  );
};

export default HomePage;
