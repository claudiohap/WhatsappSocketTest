const ChatBubble = ({data}) => {
    const { body, from } = data;
    return (<div className={`flex ${from === "client" ? "flex-row" : "flex-row-reverse"}`}>
        <div className={`p-2 rounded text-white ${from === "client" ? "bg-slate-600" : "bg-green-600"} max-w-sm`}>
            <p>{body}</p>
        </div>
    </div>)
}

export default ChatBubble;