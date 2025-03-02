import { ChangeEvent } from "react"
import "./EnterMessageForm.css"

export default function EnterMessageForm(props: {
    handleSubmit: (e: React.FormEvent) => void,
    handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
}) {
    return (
        <div className="enter-panel">
            <form onSubmit={(e) => props.handleSubmit(e)}>
                <textarea name="content" onChange={(e) => props.handleChange(e)}></textarea>
                <button className="send-message-button" type='submit' >
                    <i className="fa fa-send-o"></i>
                </button>
            </form>
        </div>
    )
}