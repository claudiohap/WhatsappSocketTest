const ChatBubble = ({ data }) => {
  const { body, from } = data;

  const getColor = (from) => {
    switch (from) {
      case "client":
        return "bg-slate-600";
      case "user":
        return "bg-green-600";
      case "bot":
        return "bg-orange-600";
    }
  };

  return (
    <div
      className={`flex ${from === "client" ? "flex-row" : "flex-row-reverse"}`}
    >
      <div
        className={`p-2 rounded text-white ${getColor(
          from,
        )} max-w-sm h-fit overflow-auto`}
      >
        <p>{body}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
