import { instance } from "../axios";

const authApi = {
  login: (data) => {
    return instance.post("/auth/login", data);
  },
  signup: (data) => {
    return instance.post("/auth/signup", data);
  },
  google: (data) => {
    return instance.post("/auth/google", data);
  },
  forgotPassword: (email) => {
    return instance.post("/auth/forgot-password", { email });
  },
  logout: () => {
    return instance.post("/auth/logout");
  },
};

export default authApi;
