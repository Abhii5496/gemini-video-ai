import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const chatStore = (set) => ({
  chatHistory: [],

  addNewChat: (chat) => {
    set((state) => ({
      chatHistory: [...state.chatHistory, chat],
    }));
  },

  clearChat: () => {
    set((state) => ({
      chatHistory: [],
    }));
  },
});

const usechatStore = create(
  devtools(persist(chatStore, { name: "galpha-chats" }))
);

export default usechatStore;
