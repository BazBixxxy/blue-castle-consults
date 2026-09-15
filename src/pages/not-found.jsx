import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <FaExclamationTriangle className="text-yellow-700 text-6xl mb-4" />
      <h1 className="text-3xl lg:text-5xl font-bold mb-4">404 Not Found</h1>
      <p className="text-xl mb-5">This page does not exist</p>
      <Button
        onClick={() => {
          navigate(-1);
        }}
        size="lg"
      >
        Go Back
      </Button>
    </section>
  );
};

export default NotFound;
