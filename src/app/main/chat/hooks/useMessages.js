import { useEffect, useState } from "react";
import messageApi from "@/services/api/messageApi";
import { toast } from "sonner";
import useConversation from "@/zustand/useConversation";

const useMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedUser } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await messageApi.fetchMessages({ id: selectedUser._id });
       const response = res.data;
       setMessages(response);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedUser?._id) getMessages();
  }, [selectedUser?._id, setMessages]);

  return { messages, loading };
};

export default useMessages;
