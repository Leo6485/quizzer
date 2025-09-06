import styles from "./Question.module.css"
import { useState } from "react"

function Question({question, setGlobalExplainState, lastQuestionId}) {
    const [explanation, setExplanation] = useState([]);
    const [explainState, setExplainState] = useState(false);
    const [selection, setSelection] = useState(-1);
    const [confirmed, setConfirmed] = useState(false);

    function toggleExplainState() {
        if (!confirmed) {
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
        setGlobalExplainState(!explainState)
        setExplainState(!explainState)
    }

    return (
        <div
        className={explainState ? styles.questionCardExplain : styles.questionCard}
        >
            <p className={styles.question}>{question.text}</p>
            <ul className={styles.options}>
                {question.options.map((i) => 
                                        <li className={styles.optionContainer}>
                                            <input type="radio" id={`${question.id} - ${i.id}`} className={styles.optionCheckBox} name={question.id} onChange={() => setSelection(i.id)} disabled={confirmed}/>
                                            <label htmlFor={`${question.id} - ${i.id}`} id={`${question.id} - Option:${i.id}`} className={styles.option}>{i.text}</label>
                                        </li>
                )}
            </ul>
            
            {explainState && <div className={styles.explanationContainer}>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
                Essa é uma explicação de teste<br/>
            </div>}
            <div className={styles.bottomContainer}>
                
                {selection !== -1 &&
                <button className={styles.explainThis} onClick={toggleExplainState}>
                    {!confirmed ? "Confirm" : explainState ? "Close explain" : "Explain"}
                </button>
                }
                
                {lastQuestionId === question.id && 
                <button className={styles.confirmButton}>
                    Próximo
                </button>
}
            </div>

        </div>
    )
}

export default Question