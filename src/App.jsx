import { useEffect } from "react";
import { socket } from "./socket";
import { useDataStore } from "./utils/dataStore";
import MessageInput from "./components/MessageInput";
import ChatBox from "./components/ChatBox";
import NumberSelector from "./components/NumberSelector";

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
      const { body, from } = data;
      setLastMessage({ body, from });
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
    <div>
      <h1 className="text-2xl text-center font-mono py-2">
        Demo Whatsapp Twilio
      </h1>
      <NumberSelector />
      <div>
        <ChatBox />
        <MessageInput />
      </div>
    </div>
  );
};

export default App;
