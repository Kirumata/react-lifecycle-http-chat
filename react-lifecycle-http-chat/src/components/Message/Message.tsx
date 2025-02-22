import "./Message.css"

export default function Message({ text, type }: { text: string, type: "my" | "other" }) {
    const messageStyle = type == "my" ? "my-message-box" : "other-message-box";
    return (
        <div className={messageStyle}>
            <p>{text}</p>
        </div>
    )

}