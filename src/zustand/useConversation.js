import { create } from "zustand";

const useConversation = create((set) => ({
  selectedUser: null,
  setSelectedUser: (selectedUser) => set(() => ({ selectedUser })),
  messages: [],
  setMessages: (messages) => set(() => ({ messages })),
}));

export default useConversation;
