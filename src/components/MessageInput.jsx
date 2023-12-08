import axios from "axios";
import { useState } from "react";
import { useDataStore } from "../utils/dataStore";

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const setLastMessage = useDataStore((state) => state.setLastMessageUser);

  const handleMessage = (e) => setNewMessage(e.target.value);
  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    axios
      .post(
        "http://localhost:3001/whatsapp/sendMessage",
        {
          message: newMessage,
          numero_wab: "whatsapp:+14155238886",
          numero_lead: "whatsapp:+5215587968434",
          id_empresa: 1,
          id_lead: 1,
          id_vendedor: 1,
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
      <input
        className="w-full border"
        type="text"
        value={newMessage}
        onChange={handleMessage}
      />
      <button className="w-32 bg-slate-400 rounded mx-2" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default MessageInput;
