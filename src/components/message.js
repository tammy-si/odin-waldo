function Message(props) {
    return (
        <div className="message">
            {props.correct ? <p className="right">You found a character!</p> : <p className="wrong">Keep trying</p>}
        </div>
    )
}

export default Message;