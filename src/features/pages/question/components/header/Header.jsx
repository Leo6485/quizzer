import styles from "./Header.module.css"

function Header({ idx, lastIdx }) {
    return (
        <div className={styles.header}>
            <h2 className={styles.title}>Quizzer</h2>
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={{ width: `${(idx / (lastIdx + 1)) * 100}%` }}></div>
            </div>
        </div>
    )
}

export default Header