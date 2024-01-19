import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { useDataStore } from "../utils/dataStore";

const ChatBox = () => {
  const messagesEnd = useRef(null);
  const history = useDataStore((state) => state.history);

  useEffect(() => {
    if (history.length) {
      messagesEnd.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [history.length]);

  return (
    <div className="mx-4 bg-slate-200 rounded h-[640px] overflow-auto p-6 flex flex-col gap-2">
      {history.map((v, i) => (
        <ChatBubble key={i} data={v} />
      ))}
      <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
    </div>
  );
};

export default ChatBox;
