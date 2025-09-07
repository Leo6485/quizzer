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
        fetch(`http://localhost:8000/quiz?msg=${msg}`)
        .then((response) => response.json())
        .then((data) => {setQuestions(data)})
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
            <Question key={questions[currentIdx].id} question={questions[currentIdx]} setIdx={setCurrentIdx} idx={currentIdx} lastIdx={lastIdx}></Question>
            :
            <Chat send={get_quiz} generatingQuiz={generatingQuiz}></Chat>
            }
        </div>
    )
}

export default Quiz;