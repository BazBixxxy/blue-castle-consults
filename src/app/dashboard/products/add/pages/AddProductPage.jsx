import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/product-form";

export default function AddProductPage() {
  const navigate = useNavigate();
  return (
    <main className="grid flex-1 items-start gap-4 max-w-screen-xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-semibold">New Product</h1>
        </div>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button
            variant="outline"
            type="reset"
            size="sm"
            onClick={() => navigate(-1)}
          >
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>
      <div>
        <ProductForm />
      </div>
    </main>
  );
}
