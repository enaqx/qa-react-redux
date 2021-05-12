import styles from './QuestionCollapsible.module.css'

type QuestionCollapsibleParams = {
  id: number
  question: string
  answer: string
  showAnswer: boolean
  editState: boolean
  showAnswerAction: () => {}
  removeQuestion: () => {}
  setEditState: () => {}
  updateQuestion: (value: string) => {}
  updateAnswer: (value: string) => {}
}

export default function QuestionCollapsible({
  id,
  question,
  answer,
  showAnswer,
  editState,
  showAnswerAction,
  removeQuestion,
  setEditState,
  updateQuestion,
  updateAnswer,
}: QuestionCollapsibleParams) {
  let questionEditable: any
  if (!editState) {
    questionEditable = (
      <div onClick={showAnswerAction} className={styles.collapsible}>
        {question}
      </div>
    )
  } else {
    questionEditable = (
      <div className={styles.collapsible}>
        <form className={styles.questionForm}>
          <input
            value={question}
            onChange={(e) => updateQuestion(e.target.value)}
          ></input>
          <input
            value={answer}
            onChange={(e) => updateAnswer(e.target.value)}
          ></input>
        </form>
      </div>
    )
  }

  return (
    <div key={id}>
      <div className={styles.questionContainer}>
        {questionEditable}
        <div className={styles.buttonContainer}>
          <button
            data-testid={`edit-button-${id}`}
            className={styles.editButton}
            onClick={setEditState}
          >
            Edit
          </button>
        </div>
        <div className={styles.buttonContainer}>
          <button
            data-testid={`delete-button-${id}`}
            className={styles.deleteButton}
            onClick={removeQuestion}
          >
            Delete
          </button>
        </div>
      </div>
      {showAnswer && <div className={styles.content}>{answer}</div>}
      <br />
    </div>
  )
}
