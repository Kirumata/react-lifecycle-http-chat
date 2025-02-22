import "./EnterMessageForm.css"

export default function EnterMessageForm(props) {
    return (
        <form onSubmit={(e) => props.onSend(e)}>
            <textarea id="text"></textarea>
            <button className="send-message-button" type='submit' >
                <i className="fa fa-send-o"></i>
            </button>
        </form>
    )
}