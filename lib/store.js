import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { geminiModels } from "./helper";

const chatStore = (set) => ({
  chatHistory: [],
  model: geminiModels[0].name,

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

  switchModel: (mod) => {
    set({ model: mod });
  },
});

const usechatStore = create(
  devtools(persist(chatStore, { name: "galpha-chats" }))
);

export default usechatStore;
