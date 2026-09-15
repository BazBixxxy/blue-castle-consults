import { useEffect } from "react";
import { useSocketContext } from "@/context/socket-context";
import { useAuthContext } from "@/context/auth-context";
import useConversation from "@/zustand/useConversation";
import notificationSound from "@/assets/sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();
  const { messages, setMessages, selectedUser } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      const isCurrentConversation =
        selectedUser &&
        ((newMessage.senderId === selectedUser._id &&
          newMessage.receiverId === authUser._id) ||
          (newMessage.senderId === authUser._id &&
            newMessage.receiverId === selectedUser._id));

      if (isCurrentConversation) {
        // Add to current conversation
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
      }

      // Always play notification sound for received messages
      if (newMessage.receiverId === authUser._id) {
        const sound = new Audio(notificationSound);
        sound.play();
      }
    };

    socket?.on("newMessage", handleNewMessage);

    return () => socket?.off("newMessage", handleNewMessage);
  }, [socket, messages, setMessages, selectedUser, authUser]);
};

export default useListenMessages;
