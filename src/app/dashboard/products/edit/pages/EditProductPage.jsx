import { Button } from "@/components/ui/button";
import EditProductForm from "../components/edit-product-form";
import { useLoaderData } from "react-router-dom";
import BackButton from "@/components/back-button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProductPage() {
  const navigate = useNavigate();
  const product = useLoaderData();

  useEffect(() => {
    product
      ? (document.title = `${product.name} | ${product.brand}`)
      : navigate(-1);
  }, []);

  if (!product) return <div>No Product Here</div>;

  return (
    <main className="grid flex-1 items-start gap-4 max-w-screen-xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1 className="text-xl font-semibold">
            {product?.name || "Loading..."}
          </h1>
        </div>
        <div className="hidden items-center gap-2 md:ml-auto md:fle">
          <Button variant="outline" type="reset" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>

      <div>
        <EditProductForm product={product} />
      </div>
    </main>
  );
}
