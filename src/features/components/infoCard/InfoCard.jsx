import styles from "./InfoCard.module.css"

function InfoCard({ title, text }) {
    return (
        <div className={styles.infoCard}>
            <p className={styles.infoTitle}>{title}: </p>
            <p className={styles.infoText}>{text}</p>
        </div>
    )
}

export default InfoCard