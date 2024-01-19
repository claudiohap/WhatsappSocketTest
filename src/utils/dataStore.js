import { create } from "zustand";
import axios from "axios";
import { socket } from "../socket";

const useDataStore = create((set, get) => ({
  lastMessage: {},
  history: [],
  phoneNumbers: [
    {
      number: "5587968434",
      value: 1,
    },
    {
      number: "5528635899",
      value: 3,
    },
    {
      number: "5532899611",
      value: 4,
    },
  ],
  idEmpresa: 1,
  idVendedor: 1,
  idLead: 1,
  setIdLead: (id) => {
    socket.disconnect();
    set({ idLead: id });
  },
  reloadData: async () => {
    console.log("reload data");
    if (get().idLead === 0) return;
    const response = await axios.post(
      "http://localhost:3001/whatsapp/history",
      {
        id_lead: get().idLead,
        id_empresa: get().idEmpresa,
        id_vendedor: get().idVendedor,
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_AUTH,
        },
      },
    );
    const history = response.data.historial;
    console.log(`IDLEAD: ${get().idLead}`);
    console.log(response);
    console.log(history);

    set({ history: await history });
  },
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
  getSocketAuth: () => ({
    data: {
      id_lead: get().idLead,
      id_empresa: get().idEmpresa,
      id_vendedor: get().idVendedor,
    },
  }),
}));

export { useDataStore };
