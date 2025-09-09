import styles from "./ChatBar.module.css"
import { useState } from "react"
import { FiPaperclip } from "react-icons/fi"


function ChatBar({ send, setFile}) {
    const [inputValue, setInputValue] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

    return (
        <div className={styles.chatContainer}>
            <div className={styles.inputContainer}>
                <input className={styles.inputChat} placeholder="Descreva seu quiz aqui" onChange={(e) => setInputValue(e.target.value)}></input>

                <div className={styles.vContainer}>
                    <input type="file" className={styles.fileInput} id="fileUpload" onChange={(e) => {setFile(e.target.files[0]); setSelectedFile(e.target.files[0]);}}></input>
                    <label htmlFor="fileUpload" className={styles.fileLabel}>
                        <FiPaperclip size={22} />
                    </label>
                    {selectedFile && <span className={styles.fileName}>{selectedFile.name}</span>}

                    <button className={styles.sendButton} onClick={() => send(inputValue)}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default ChatBar