import styles from './QuestionCreateForm.module.css'

type QuestionCreateFormParams = {
  newQuestion: string
  newAnswer: string
  setNewQuestion: (value: string) => void
  setNewAnswer: (value: string) => void
  createQuestion: (question: string, answer: string, delay: boolean) => void
}

import { useState } from 'react'

export default function QuestionCreateForm({
  newQuestion,
  newAnswer,
  setNewQuestion,
  setNewAnswer,
  createQuestion,
}: QuestionCreateFormParams) {
  const [delay, setDelay] = useState(false)

  return (
    <form className={styles.questionCreateForm}>
      <div className={`${styles.createNewQuestionsText} ${styles.tooltip}`}>
        <span className={styles.tooltiptext}>
          Here you can create new questions and their answers
        </span>
        <div>Create a new question</div>
      </div>

      <div className={styles.questionInputContainer}>
        <label>
          Question
          <input
            className={styles.createQuestionInput}
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          ></input>
        </label>
      </div>

      <label>
        Answer
        <textarea
          rows={5}
          className={styles.createAnswerInput}
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        ></textarea>
      </label>

      <div className={styles.checkbox}>
        <input
          type="checkbox"
          id="delay"
          checked={delay}
          onChange={() => setDelay(!delay)}
        />
        <label>Delay</label>
      </div>

      <button
        type="submit"
        className={styles.createButton}
        onClick={(e) => {
          e.preventDefault()
          if (newQuestion.length > 0 && newAnswer.length > 0) {
            createQuestion(newQuestion, newAnswer, delay)
          }
          setNewQuestion('')
          setNewAnswer('')
        }}
      >
        Create question
      </button>
    </form>
  )
}
