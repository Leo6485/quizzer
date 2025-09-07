import styles from "./CardLoading.module.css"

function CardLoading({ msg }) {
    return (
        <div className={styles.cardContainer}>
            <p className={styles.cardTitle}>{msg}</p>
            <span className={styles.loader}></span>
        </div>
    )
}

export default CardLoading