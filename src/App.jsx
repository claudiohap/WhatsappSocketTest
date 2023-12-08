import { useEffect } from "react";
import { socket } from "./socket";
import ChatBubble from "./components/ChatBubble";
import axios from "axios";
import { useDataStore } from "./utils/dataStore";
import MessageInput from "./components/MessageInput";

const App = () => {
  const [lastMessage, setLastMessage] = useDataStore((state) => [
    state.lastMessage,
    state.setLastMessageClient,
  ]);
  const [history, setHistory] = useDataStore((state) => [
    state.history,
    state.setHistory,
  ]);

  useEffect(() => {
    console.log("Load history");
    axios
      .post(
        "http://localhost:3001/whatsapp/history",
        {
          id_lead: 1,
          id_empresa: 1,
          id_vendedor: 1,
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_AUTH,
          },
        },
      )
      .then((res) => {
        const { data } = res;
        setHistory(data.historial);
      });
  }, []);

  useEffect(() => {
    const handleMessage = (data) => {
      const { body, from } = data;
      setLastMessage({ body, from });
    };

    socket.on("connect", () => console.log("Conectado"));
    socket.on("reciveMessage", handleMessage);

    return () => {
      socket.off("reciveMessage", handleMessage);
    };
  }, [lastMessage]);

  return (
    <div>
      <h1 className="text-xl text-center">Chat whatsapp</h1>
      <div>
        <div className="mx-4 bg-slate-200 rounded h-[640px] overflow-auto p-6 flex flex-col gap-2">
          {history.map((v, i) => (
            <ChatBubble key={i} data={v} />
          ))}
        </div>
        <MessageInput />
      </div>
    </div>
  );
};

export default App;
