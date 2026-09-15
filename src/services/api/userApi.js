import { instance } from "../axios";

const userApi = {
  updateUser: (data) => {
    return instance.patch("/users", data);
  },
  updatePassword: (data) => {
    return instance.patch("/users/update-password", data);
  },
  updateProfilePicture: (data) => {
    return instance.patch("/users", data);
  },
  updateBanner: (data) => {
    return instance.patch("/users", data);
  },
  fetchOwnerData: ({ id }) => {
    return instance(`/users/${id}`);
  },
};

export default userApi;
