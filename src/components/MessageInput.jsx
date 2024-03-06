import axios from "axios";
import { useState } from "react";
import { useDataStore } from "../utils/dataStore";
import SendBotButton from "./SendBotButton";

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const setLastMessage = useDataStore((state) => state.setLastMessageUser);
  const [numeroLead, setNumeroLead] = useState("87968434");
  const [idLead, idEmpresa, idVendedor] = useDataStore((state) => [
    state.idLead,
    state.idEmpresa,
    state.idVendedor,
  ]);

  const handleMessage = (e) => setNewMessage(e.target.value);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    axios
      .post(
        "http://localhost:3001/whatsapp/sendMessage",
        {
          message: newMessage,
          numero_wab: "whatsapp:+5215593377298",
          numero_lead: `whatsapp:+52155${numeroLead}`,
          id_empresa: idEmpresa,
          id_lead: idLead,
          id_vendedor: idVendedor,
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_AUTH,
          },
        },
      )
      .then(() => {
        setLastMessage(newMessage);
        setNewMessage("");
      });
  };

  return (
    <div className="flex w-full p-4">
      <SendBotButton />
      <input
        className="w-full border rounded px-2 overflow-auto"
        type="text"
        value={newMessage}
        onChange={handleMessage}
      />
      <button
        className="w-32 bg-slate-400 rounded mx-2 p-2"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
