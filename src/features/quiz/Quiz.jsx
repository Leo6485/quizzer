import Question from "./components/question/Question"

function Quiz() {
    const questions = [
        {
            text: "O que é uma tupla em Python?",
            options: [
                { id: 1, text: "Uma lista mutável" },
                { id: 2, text: "Uma sequência imutável" },
                { id: 3, text: "Um conjunto de dados sem ordem" },
                { id: 4, text: "Um tipo de dicionário" }
            ]
        },
        {
            text: "Como você declara uma função em Python?",
            options: [
                { id: 1, text: "function minha_funcao():" },
                { id: 2, text: "def minha_funcao():" },
                { id: 3, text: "func minha_funcao():" },
                { id: 4, text: "declare minha_funcao():" }
            ]
        },
        {
            text: "Qual é o tipo de dado de 'True' em Python?",
            options: [
                { id: 1, text: "Int" },
                { id: 2, text: "Bool" },
                { id: 3, text: "String" },
                { id: 4, text: "Float" }
            ]
        },
        {
            text: "O que é uma lista em Python?",
            options: [
                { id: 1, text: "Uma sequência imutável de dados" },
                { id: 2, text: "Uma sequência mutável de dados" },
                { id: 3, text: "Uma estrutura de dados única" },
                { id: 4, text: "Um tipo de dicionário" }
            ]
        },
        {
            text: "Como você adiciona um item em uma lista em Python?",
            options: [
                { id: 1, text: "list.add(item)" },
                { id: 2, text: "list.append(item)" },
                { id: 3, text: "list.push(item)" },
                { id: 4, text: "list.insert(item)" }
            ]
        }
    ];

    return (
        <div>
            {questions.map((question, index) => (
                <Question key={index} question={question}></Question>
            ))}
        </div>
    )
}

export default Quiz;
