import { create } from "zustand";
import axios from "axios";

const useDataStore = create((set, get) => ({
  lastMessage: {},
  history: [],
  disponibilidad: false,
  idEmpresa: 1,
  idVendedor: 1,
  idLead: 1,

  templates: [
    {
      text: "Reanudar",
      value: "HXee98c2205ae2557df1a98e1554332801",
    },
    {
      text: "Bienvenida",
      value: "HXe4b868ffd49ef39fc632e676ec968045",
    },
  ],
  setIdLead: (id) => {
    set({ idLead: id });
  },
  reloadData: async () => {
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
    const history = response.data.historial ?? [];
    const disponibilidad = response.data.disponibilidad ?? false;

    set({ history: await history, disponibilidad });
  },
  setLastMessageClient: (message) => {
    return set((state) => ({
      disponibilidad: message.disponibilidad,
      lastMessage: message,
      history: [...state.history, message],
    }));
  },
  setLastMessageUser: (message) =>
    set((state) => {
      const newMessage = {
        body: message,
        from: "user",
        date: Date.now(),
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
