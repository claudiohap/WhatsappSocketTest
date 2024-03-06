import { useEffect } from "react";
import { socket } from "./socket";
import { useDataStore } from "./utils/dataStore";
import MessageInput from "./components/MessageInput";
import ChatBox from "./components/ChatBox";
import Settings from "./components/Settings";

const App = () => {
  const [setLastMessage, loadHistory, getSocketAuth] = useDataStore((state) => [
    state.setLastMessageClient,
    state.reloadData,
    state.getSocketAuth,
  ]);

  useEffect(() => {
    loadHistory();

    const handleConnect = () => console.log("Conectado");

    const handleMessage = (data) => {
      const { body, from, disponibilidad } = data;

      setLastMessage({ body, from, disponibilidad });
    };

    socket.auth = getSocketAuth();
    socket.on("connect", handleConnect);
    socket.on("reciveMessage", handleMessage);
    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("reciveMessage", handleMessage);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-center font-mono py-2">
        Demo Whatsapp Twilio
      </h1>
      <div className="flex mx-4 flex-grow gap-2">
        <Settings />
        <div className="flex-grow">
          <ChatBox />
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default App;
