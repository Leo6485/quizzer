import styles from "./ExplanationCard.module.css"

function ExplanationCard({ explanation }) {
    return (
        <div className={styles.explanationCard}>
            <p className={styles.explanationTitle}>Explicação:</p>
            <p className={styles.explanationText}>{explanation}</p>
        </div>
    )
}

export default ExplanationCard