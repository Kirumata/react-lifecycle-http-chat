import { MessageData } from "../../types";
import Message from "../Message/Message";

export default function MessagesBlock({ messages, myUuid }: { messages: MessageData[], myUuid: string | null }) {

    let array = [];
    for (let i = 0; i < messages.length; i++){
        if (messages[i].userId === myUuid){
            array.push(<Message type="my" text={messages[i].content}></Message>);
        }
        else
        {
            array.push(<Message type="other" text={messages[i].content}></Message>);
        }
    }
    return (
        <>
            {array}
        </>

    )
}