import Question from "../pages/quiz/Quiz"
import Chat from "../pages/chat/Chat";
import { useState, useEffect} from "react"
import InfoCard from "../components/infoCard/InfoCard";

function Base() {
    const [lastIdx, setLastIdx] = useState(-1);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [generatingQuiz, setGeneratingQuiz] = useState(false)
    const [file, setFile] = useState(null)
    const [error429, setError429] = useState(false)

    function get_quiz(msg) {
        setError429(false)
        if (generatingQuiz) return;
        setGeneratingQuiz(true)

        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('msg', msg);
            fetch(`/api/gen_quiz_file`, {
                method: 'POST',
                body: formData,
            })
            .then((response) => {
                if (response.status === 429) {
                    setGeneratingQuiz(false)
                    setError429(true)
                    return []
                } else {
                    return response.json()
                }
            }
            )
            .then((data) => {setQuestions(data)})
            .catch((error) => {
                console.error('Error:', error);
                setGeneratingQuiz(false)
                return
            });

            return;
        }

        fetch(`/api/gen_quiz?msg=${msg}`)
        .then((response) => {
                if (response.status === 429) {
                    setGeneratingQuiz(false)
                    setError429(true)
                    return []
                } else {
                    return response.json()
                }
            })

        .then((data) => {setQuestions(data)})
        .catch((error) => {
            console.error('Error:', error);
            setGeneratingQuiz(false)
            return
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
        {
            error429 &&
            <InfoCard title="Erro" text="Muitas requisições, tente novamente mais tarde."></InfoCard>
        }
        </div>
    )
}

export default Base;