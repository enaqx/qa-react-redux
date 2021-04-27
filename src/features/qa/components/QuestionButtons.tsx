import styles from './QuestionButtons.module.css'

type QuestionButtonsParams = {
  sortQuestions: () => {}
  removeAllQuestions: () => {}
}

export default function QuestionButtons({
  sortQuestions,
  removeAllQuestions,
}: QuestionButtonsParams) {
  return (
    <div className={styles.qaButtons}>
      <button className={styles.sortButton} onClick={sortQuestions}>
        Sort questions
      </button>
      <button className={styles.removeButton} onClick={removeAllQuestions}>
        Remove questions
      </button>
    </div>
  )
}
