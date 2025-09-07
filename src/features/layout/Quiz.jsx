import Question from "../pages/question/Question"
import Chat from "../pages/chat/Chat";
import { useState, useEffect} from "react"

function Quiz() {
    const [lastIdx, setLastIdx] = useState(-1);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [generatingQuiz, setGeneratingQuiz] = useState(false)

    function get_quiz(msg) {
        setGeneratingQuiz(true)
        fetch(`http://192.168.3.165:8000/quiz_?msg=${msg}`)
        .then((response) => response.json())
        .then((data) => {setQuestions(data)})
        .catch((error) => {
            console.error('Error:', error);
            setGeneratingQuiz(false)
        });
    }

    useEffect(() => {
        setLastIdx(questions.length -1)
        if (questions.length) {
            setGeneratingQuiz(false)
        }
    }, [questions])

    return (
        <div>
            {questions.length ?
            <Question questions={questions} setIdx={setCurrentIdx} idx={currentIdx} lastIdx={lastIdx}></Question>
            :
            <Chat send={get_quiz} generatingQuiz={generatingQuiz}></Chat>
            }
        </div>
    )
}

export default Quiz;