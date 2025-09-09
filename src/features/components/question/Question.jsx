import styles from "./Question.module.css"

function Question({ question, setSelection, selection, confirmed }) {
    return (
            <>
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
            </>
    )
}

export default Question