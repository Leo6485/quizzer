import ChatBar from "./components/chatBar/ChatBar"
import CardLoading from "./components/cardLoading/CardLoading"

function Chat({generatingQuiz, send}) {
    return (
            <>
            {generatingQuiz &&
            <CardLoading msg="Seu quiz está sendo gerado"/>
            }

            <ChatBar send={send}/>
            </>
    )
}

export default Chat