import styles from "./Chat.module.css"

function Chat() {
    return (
        <div className={styles.chatContainer}>
            <div className={styles.inputContainer}>
                <input className={styles.inputChat} placeholder="Insira aqui uma sugestão para a próxima questão (Opcional)"></input>
                <button className={styles.sendButton}>Send</button>
            </div>
        </div>
    )
}

export default Chat