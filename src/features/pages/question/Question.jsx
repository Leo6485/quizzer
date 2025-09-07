import styles from "./Question.module.css"
import Header from "../../components/header/Header"
import ExplanationCard from "../../components/explanationCard/ExplanationCard";
import { useEffect, useState } from "react"


function Question({ questions, setIdx, idx, lastIdx }) {
    const [explainState, setExplainState] = useState(false);
    const [selection, setSelection] = useState(-1);
    const [confirmed, setConfirmed] = useState(false);
    const [question, setQuestion] = useState(questions[idx]);
    const [isEnd, setIsEnd] = useState(false);
    const [acertos, setAcertos] = useState(0);

    function toggleExplainState() {
        setExplainState(!explainState)
    }

    function Confirm() {
        if (!confirmed) {
            if (selection === -1) return
            if (selection === question.solution) setAcertos(prev => prev + 1)
            setConfirmed(true)
            return;
        }
        if (idx < lastIdx) {
            setExplainState(false)
            setSelection(-1)
            setConfirmed(false)
            setQuestion(questions[idx + 1])
            setIdx(idx + 1)
        } else {
            setIsEnd(true)
        }
    }

    return (
        <div className={styles.questionCard}>
            <Header idx={idx + isEnd} lastIdx={lastIdx}></Header>
            {isEnd ?
                <div className={styles.endScreen}>
                    <h2 className={styles.endTitle}>Parabéns!</h2>
                    <p className={styles.endText}>Você concluiu o quiz.</p>
                    <p className={styles.endText}>Acertos: {acertos}/{questions.length}</p>
                    <button className={styles.restartButton} onClick={() => window.location.reload()}>Reiniciar Quiz</button>
                </div>
            :<>
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


            <div className={styles.bottomContainer}>
                <button className={styles.explainThis} onClick={toggleExplainState}>
                    {explainState ? "Fechar Explicação" : "Explicar"}
                </button>

                <button className={styles.confirmButton} onClick={Confirm}>
                    {!confirmed ? "Confirmar" : (idx < lastIdx ? "Próximo" : "Finalizar")}
                </button>

            </div>
            
            {
                explainState &&
                <ExplanationCard explanation={question.explanation}></ExplanationCard>
            }
            </>
        }
        </div>
    )
}

export default Question