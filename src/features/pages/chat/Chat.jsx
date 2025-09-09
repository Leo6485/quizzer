import ChatBar from "../../components/chatBar/ChatBar"
import CardLoading from "../../components/cardLoading/CardLoading"
import Header from "../../components/header/Header"

function Chat({generatingQuiz, send, setFile}) {

    return (
            <>
            <Header idx={0} lastIdx={0}></Header>
            {generatingQuiz &&
            <CardLoading msg="Seu quiz está sendo gerado"/>
            }

            <ChatBar send={send} setFile={setFile}/>
            </>
    )
}

export default Chat