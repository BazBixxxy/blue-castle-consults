import { instance } from "../axios";

const messageApi = {
  sendMessage: ({ id, message }) => {
    return instance.post(`/messages/send/${id}`, { message });
  },
  fetchMessages: ({ id }) => {
    return instance(`/messages/${id}`);
  },
};

export default messageApi;
