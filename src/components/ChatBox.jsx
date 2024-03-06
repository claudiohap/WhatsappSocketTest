import { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { useDataStore } from "../utils/dataStore";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import TemplateInput from "./TemplateInput";

const ChatBox = () => {
  const messagesEnd = useRef(null);
  const history = useDataStore((state) => state.history);
  const disponibilidad = useDataStore((state) => state.disponibilidad);

  useEffect(() => {
    if (history.length) {
      messagesEnd.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [history.length]);

  return (
    <div className="bg-slate-200 rounded shadow">
      <div className="bg-slate-400 text-slate-100 py-2 px-1 rounded-t flex items-center gap-2 justify-between">
        <div className="flex items-center gap-1">
          {disponibilidad ? (
            <CheckCircleIcon className="w-8 h-8 text-green-400" />
          ) : (
            <XCircleIcon className="w-8 h-8 text-red-500" />
          )}
          <p>{disponibilidad ? "Disponible" : "No disponible"}</p>
        </div>
        <TemplateInput />
      </div>

      <div className="rounded h-[640px] overflow-auto flex flex-col gap-2">
        <div className="mt-2 mx-4">
          {history.map((v, i) => (
            <ChatBubble key={i} data={v} />
          ))}
        </div>
        <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
      </div>
    </div>
  );
};

export default ChatBox;
