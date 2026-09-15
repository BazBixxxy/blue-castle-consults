import { instance } from "../axios";

const productApi = {
  createProduct: (product) => {
    return instance.post("/products", product);
  },
  updateProduct: (id, product) => {
    return instance.patch(`/products/${id}`, product);
  },
  fetchProduct: ({ id }) => {
    return instance(`/products/${id}`);
  },
  fetchOwnerProducts: ({ params }) => {
    return instance.get("/products/owner", { params });
  },
  fetchProducts: ({ params }) => {
    return instance("/products", { params });
  },
};

export default productApi;
