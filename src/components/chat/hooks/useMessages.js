import messageApi from "@/services/api/messageApi";
import useConversation from "@/zustand/useConversation";
import { useState } from "react";
import { toast } from "sonner";

const useMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useConversation();

  const fetchMessages = async (userId) => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await messageApi.fetchMessages({ id: userId });
      const response = res.data;
      setMessages(response);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  return { loading, messages, fetchMessages };
};

export default useMessages;
