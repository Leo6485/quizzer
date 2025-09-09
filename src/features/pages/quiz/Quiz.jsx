import styles from "./Quiz.module.css"
import Header from "../../components/header/Header"
import ExplanationCard from "../../components/explanationCard/ExplanationCard";
import { useEffect, useState } from "react"
import Question from "../../components/question/Question";


function Quiz({ questions, setIdx, idx, lastIdx }) {
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
            <Question question={question} setSelection={setSelection} selection={selection} confirmed={confirmed}></Question>


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

export default Quiz