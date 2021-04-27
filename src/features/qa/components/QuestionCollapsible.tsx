import styles from './QuestionCollapsible.module.css'

type QuestionCollapsibleParams = {
  id: number
  question: string
  answer: string
  showAnswer: boolean
  showAnswerAction: () => {}
  removeQuestion: () => {}
}

export default function QuestionCollapsible({
  id,
  question,
  answer,
  showAnswer,
  showAnswerAction,
  removeQuestion,
}: QuestionCollapsibleParams) {
  return (
    <div key={id}>
      <div className={styles.questionContainer}>
        <div onClick={showAnswerAction} className={styles.collapsible}>
          {question}
        </div>
        <button
          data-testid={`delete-button-${id}`}
          className={styles.deleteButton}
          onClick={removeQuestion}
        >
          Delete
        </button>
      </div>
      {showAnswer && <div className={styles.content}>{answer}</div>}
      <br />
    </div>
  )
}
