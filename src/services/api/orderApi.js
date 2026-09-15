import { instance } from "../axios";

const orderApi = {
  createOrder: (data) => {
    return instance.post("/orders", data);
  },
  userOrders: ({ params }) => {
    return instance("/orders/user", { params });
  },
  ownerOrders: ({ params }) => {
    return instance("/orders/owner", { params });
  },
  fetchOrder: ({ id }) => {
    return instance(`/orders/${id}`);
  },
  updateOrder: ({ id, data }) => {
    return instance.patch(`/orders/${id}/owner`, data);
  },
  fulfillOrder: ({ id, data }) => {
    return instance.patch(`/orders/${id}/fulfilled`, data);
  },
  deleteOrder: ({ id }) => {
    return instance.delete(`/orders/${id}`);
  },
};

export default orderApi;
