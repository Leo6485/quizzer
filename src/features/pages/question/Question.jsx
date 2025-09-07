import styles from "./Question.module.css"
import { useState } from "react"

function Question({ question, setIdx, idx, lastIdx }) {
    const [explainState, setExplainState] = useState(false);
    const [selection, setSelection] = useState(-1);
    const [confirmed, setConfirmed] = useState(false);

    function toggleExplainState() {
        setExplainState(!explainState)
    }

    function Confirm() {
        if (!confirmed) {
            if (selection === -1) {
                return
            }
            if (selection === question.solution) {
                document.getElementById(`${question.id} - Option:${selection}`).classList.add(styles.optionCorrect)
                document.getElementById(`${question.id} - Option:${selection}`).classList.remove(styles.option)
            } else {
                document.getElementById(`${question.id} - Option:${selection}`).classList.add(styles.optionWrong)
                document.getElementById(`${question.id} - Option:${selection}`).classList.remove(styles.option)
                document.getElementById(`${question.id} - Option:${question.solution}`).classList.add(styles.optionCorrect)
                document.getElementById(`${question.id} - Option:${question.solution}`).classList.remove(styles.option)
            }
            setConfirmed(true)
            return;
        }
        if (idx >= lastIdx) {
            return
        }
        setIdx(idx + 1)
    }
    return (
        <div
            className={explainState ? styles.questionCardExplain : styles.questionCard}
        >
            <div className={styles.question}>
                <p className={styles.questionTitle}>Questão {question.id}</p>
                <line />
                <p>{question.question}</p>
            </div>
            <ul className={styles.options}>
                {question.options.map((i) =>
                    <li className={styles.optionContainer}>
                        <input type="radio" id={`${question.id} - ${i.id}`} className={styles.optionCheckBox} name={question.id} onChange={() => setSelection(i.id)} disabled={confirmed} />
                        <label htmlFor={`${question.id} - ${i.id}`} id={`${question.id} - Option:${i.id}`} className={styles.option}>{i.text}</label>
                    </li>
                )}
            </ul>

            {

                explainState && <div className={styles.explanationContainer}>
                    {question.explanation}
                </div>
            }


            <div className={styles.bottomContainer}>
                <button className={styles.explainThis} onClick={toggleExplainState}>
                    {explainState ? "Close explain" : "Explain"}
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