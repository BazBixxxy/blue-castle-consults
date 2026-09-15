import { instance } from "../axios";

const conversationsApi = {
  fetchConversations: () => {
    return instance("/conversations");
  },
};

export default conversationsApi;
