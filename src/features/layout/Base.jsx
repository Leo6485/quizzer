import Question from "../pages/quiz/Quiz"
import Chat from "../pages/chat/Chat";
import { useState, useEffect} from "react"

function Base() {
    const [lastIdx, setLastIdx] = useState(-1);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [generatingQuiz, setGeneratingQuiz] = useState(false)
    const [file, setFile] = useState(null)

    function get_quiz(msg) {
        setGeneratingQuiz(true)

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('msg', msg);
            fetch(`/api/quiz_file`, {
                method: 'POST',
                body: formData,
            })
            .then((response) => response.json())
            .then((data) => {setQuestions(data)})
            .catch((error) => {
                console.error('Error:', error);
                setGeneratingQuiz(false)
            });

            return;
        }

        fetch(`/api/quiz?msg=${msg}`)
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
            <Chat send={get_quiz} generatingQuiz={generatingQuiz} setFile={setFile}></Chat>
            }
        </div>
    )
}

export default Base;