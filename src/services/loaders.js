import orderApi from "./api/orderApi";
import productApi from "./api/productApi";
import userApi from "./api/userApi";

export const productLoader = async ({ params }) => {
  try {
    const res = await productApi.fetchProduct({ id: params.id });
    const productData = res.data.data;
    return productData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const orderLoader = async ({ params }) => {
  try {
    const res = await orderApi.fetchOrder({ id: params.id });
    const orderData = res.data.data;
    return orderData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const ownerDataLoader = async ({ params }) => {
  try {
    const res = await userApi.fetchOwnerData({ id: params.id });
    const response = res.data.user;
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
