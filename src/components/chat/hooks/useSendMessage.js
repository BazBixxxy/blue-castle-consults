import messageApi from "@/services/api/messageApi";
import useConversation from "@/zustand/useConversation";
import { useState } from "react";
import { toast } from "sonner";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useConversation();

  const sendMessage = async ({ receiver, message }) => {
    setLoading(true);
    try {
      const res = await messageApi.sendMessage({
        id: receiver._id,
        message,
      });
      const response = res.data;
      setMessages([...messages, response]);
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
