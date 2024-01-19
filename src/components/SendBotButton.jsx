import axios from "axios";
import { useDataStore } from "../utils/dataStore";

const SendBotButton = () => {
  const [idEmpresa, idLead, idVendedor] = useDataStore((state) => [
    state.idEmpresa,
    state.idLead,
    state.idVendedor,
  ]);
  const handleClick = () => {
    axios.post(
      "http://localhost:3001/whatsapp/sendBot",
      {
        id_empresa: idEmpresa,
        id_lead: idLead,
        id_vendedor: idVendedor,
      },
      {
        headers: {
          Authorization: import.meta.env.VITE_AUTH,
        },
      },
    );
  };

  return (
    <button
      className="bg-slate-400 rounded mx-2 w-auto shrink-0 px-2"
      onClick={handleClick}
    >
      Send bot
    </button>
  );
};

export default SendBotButton;
