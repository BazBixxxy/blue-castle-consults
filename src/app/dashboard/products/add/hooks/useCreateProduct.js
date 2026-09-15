import productApi from "@/services/api/productApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useCreateProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createProduct = async (data) => {
    try {
      setLoading(true);
      await productApi.createProduct(data);
      toast.success("Product created successfully🎉");
      navigate("/dashboard/products");
    } catch (error) {
      console.error("Error creating product", error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return { createProduct, loading };
};

export default useCreateProduct;
