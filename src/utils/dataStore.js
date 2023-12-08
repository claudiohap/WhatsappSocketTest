import { create } from "zustand";

const useDataStore = create((set) => ({
  lastMessage: {},
  history: [],
  setLastMessageClient: (message) => {
    console.log(message);
    return set((state) => ({
      lastMessage: message,
      history: [...state.history, message],
    }));
  },
  setLastMessageUser: (message) =>
    set((state) => {
      const newMessage = {
        body: message,
        from: "user",
      };
      return {
        lastMessage: message,
        history: [...state.history, newMessage],
      };
    }),
  setHistory: (h) => set(() => ({ history: h })),
}));

export { useDataStore };
