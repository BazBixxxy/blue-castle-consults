import productApi from "@/services/api/productApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const useUpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const updateProduct = async (product) => {
    try {
      setLoading(true);
      await productApi.updateProduct(id, product);
      toast.success("Product updated successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateProduct };
};

export default useUpdateProduct;
