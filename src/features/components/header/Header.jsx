import styles from "./Header.module.css"

function Header({ idx, lastIdx }) {
    return (
        <div className={styles.header}>
            <h2 className={styles.title}>Quizzer</h2>
            {lastIdx > 0 &&
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={{ width: `${(idx / (lastIdx + 1)) * 100}%`, borderRadius: `${(idx === lastIdx + 1 ? "0" : "0 10px 10px 0")}`}}></div>
            </div>
            }
        </div>
    )
}

export default Header