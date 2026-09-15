import { useTheme } from "@/context/theme-provider";
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "100px auto",
};

const LoadingSpinner = () => {
  const { theme } = useTheme();

  return (
    <div className="col-span-full text-center h-screen flex place-items-center">
      <div className="animate-spin rounded-full size-20 border-b-2 border-primary mx-auto" />
    </div>
  );

  return (
    <ClipLoader
      color={theme === "dark" ? "#ffffff" : "#000000"}
      loading={true}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default LoadingSpinner;
