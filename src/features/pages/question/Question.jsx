import styles from "./Question.module.css"
import Header from "./components/header/Header"
import { useEffect, useState } from "react"

function Question({ questions, setIdx, idx, lastIdx }) {
    const [explainState, setExplainState] = useState(false);
    const [selection, setSelection] = useState(-1);
    const [confirmed, setConfirmed] = useState(false);
    const [question, setQuestion] = useState(questions[idx]);

    function toggleExplainState() {
        setExplainState(!explainState)
    }

    function Confirm() {
        if (!confirmed) {
            if (selection === -1) return
            setConfirmed(true)
            return;
        }
        if (idx < lastIdx) {
            setExplainState(false)
            setSelection(-1)
            setConfirmed(false)
            setQuestion(questions[idx + 1])
            setIdx(idx + 1)
        }
    }

    return (
        <div className={styles.questionCard}>
            <Header idx={idx} lastIdx={lastIdx}></Header>

            <div className={styles.question}>
                <p className={styles.questionTitle}>Questão {question.id}</p>
                <line />
                <p>{question.question}</p>
            </div>


            <ul className={styles.options}>
                {question.options.map((i) =>
                    <li className={styles.optionContainer}>
                        <input type="radio" id={`${question.id} - ${i.id}`} className={styles.optionCheckBox} name={question.id} onChange={() => setSelection(i.id)} disabled={confirmed} checked={selection === i.id} />
                        <label
                            htmlFor={`${question.id} - ${i.id}`} id={`${question.id} - Option:${i.id}`}
                            className={confirmed ?
                                (i.id === question.solution) ?
                                    styles.optionCorrect
                                    :
                                    i.id === selection ? styles.optionWrong : styles.option
                                :
                                styles.option
                            }
                        >{i.text}
                        </label>
                    </li>
                )}
            </ul>


            {   // Explain
                explainState && <div className={styles.explanationContainer}>
                    <p className={styles.explanationTitle}>Explicação:</p>
                    <p className={styles.explanationText}>{question.explanation}</p>
                </div>
            }


            <div className={styles.bottomContainer}>
                <button className={styles.explainThis} onClick={toggleExplainState}>
                    {explainState ? "Fechar Explicação" : "Explicar"}
                </button>

                {
                    idx < lastIdx ?
                        <button className={styles.confirmButton} onClick={Confirm}>
                            {!confirmed ? "Confirmar" : "Próximo"}
                        </button>
                        :
                        <button className={styles.confirmButton} onClick={Confirm}>
                            {!confirmed ? "Confirmar" : "Finalizar"}
                        </button>
                }


            </div>

        </div>
    )
}

export default Question