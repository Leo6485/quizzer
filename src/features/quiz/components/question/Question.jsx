import styles from "./Question.module.css"

function Question({question}) {
    return (
        <div className={styles.questionCard}>
            <p className={styles.question}>{question.text}</p>
            <ul className={styles.options}>
                {question.options.map((i) => <li key={i.id} className={styles.option}>{i.text}</li>)}
            </ul>

            <div className={styles.bottomContainer}>
                <button className={styles.explainThis}>
                    Explain
                </button>
                <button className={styles.confirmButton}>
                    Confirm
                </button>
            </div>

        </div>
    )
}

export default Question