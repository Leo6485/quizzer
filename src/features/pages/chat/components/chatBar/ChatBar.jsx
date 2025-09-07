import styles from "./ChatBar.module.css"
import { useState } from "react"


function ChatBar({ send }) {
    const [inputValue, setInputValue] = useState("")
    return (
        <div className={styles.chatContainer}>
            <div className={styles.inputContainer}>
                <input className={styles.inputChat} placeholder="Insira aqui uma sugestão para a próxima questão (Opcional)" onChange={(e) => setInputValue(e.target.value)}></input>
                <button className={styles.sendButton} onClick={() => send(inputValue)}>Send</button>
            </div>
        </div>
    )
}

export default ChatBar