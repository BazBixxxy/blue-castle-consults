import { instance } from "../axios";

const storeApi = {
  updateStore: (data) => {
    return instance.patch("/store", data);
  },
};

export default storeApi;
