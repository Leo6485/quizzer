import Question from "./components/question/Question"

function Quiz() {
    const question = {
        text: "Qual é a capital do Brasil?",
        options: [
            { id: 1, text: "Brasília" },
            { id: 2, text: "Rio de Janeiro" },
            { id: 3, text: "São Paulo" },
            { id: 4, text: "Belo Horizonte" }
        ]
    };

    return (
        <>
            <div>
                <Question question={question}></Question>
                <Question question={question}></Question>
                <Question question={question}></Question>
                <Question question={question}></Question>
                <Question question={question}></Question>
            </div>
        </>
    )
}

export default Quiz