import Question from "./components/question/Question"
import Chat from "./components/chat/Chat";
import { useState, useEffect} from "react"

function Quiz() {
    const [explainState, setExplainState] = useState(false)
    const [lastId, setLastId] = useState(-1);

    const [questions, setQuestions] = useState([
        {
            text: "O que é uma tupla em Python?",
            id: 1,
            options: [
                { id: 1, text: "Uma lista mutável" },
                { id: 2, text: "Uma sequência imutável" },
                { id: 3, text: "Um conjunto de dados sem ordem" },
                { id: 4, text: "Um tipo de dicionário" }
            ],
            solution: 2
        },
        {
            text: "Como você declara uma função em Python?",
            id: 2,
            options: [
                { id: 1, text: "function minha_funcao():" },
                { id: 2, text: "def minha_funcao():" },
                { id: 3, text: "func minha_funcao():" },
                { id: 4, text: "declare minha_funcao():" }
            ],
            solution: 2
        },
        {
            text: "Qual é o tipo de dado de 'True' em Python?",
            id: 3,
            options: [
                { id: 1, text: "Int" },
                { id: 2, text: "Bool" },
                { id: 3, text: "String" },
                { id: 4, text: "Float" }
            ],
            solution: 2
        },
        {
            text: "O que é uma lista em Python?",
            id: 4,
            options: [
                { id: 1, text: "Uma sequência imutável de dados" },
                { id: 2, text: "Uma sequência mutável de dados" },
                { id: 3, text: "Uma estrutura de dados única" },
                { id: 4, text: "Um tipo de dicionário" }
            ],
            solution: 2
        },
        {
            text: "Como você adiciona um item em uma lista em Python?",
            id: 5,
            options: [
                { id: 1, text: "list.add(item)" },
                { id: 2, text: "list.append(item)" },
                { id: 3, text: "list.push(item)" },
                { id: 4, text: "list.insert(item)" }
            ],
            solution: 2
        }
    ]);

    useEffect(() => setLastId(questions[questions.length -1].id), [questions])
    return (
        <div>
            {questions.map((question, index) => (
                <Question key={question.id} question={question} setGlobalExplainState={setExplainState} lastQuestionId={lastId}></Question>
            ))}
            {!explainState && <Chat/>}
        </div>
    )
}

export default Quiz;
