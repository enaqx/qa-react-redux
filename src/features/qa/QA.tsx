import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  createQuestion,
  createQuestionAsync,
  removeAllQuestions,
  removeQuestion,
  setShowAnswer,
  sortQuestions,
  selectQuestions,
} from './qaSlice'
import type { AppDispatch } from '../../app/store'

import QuestionCollapsible from './components/QuestionCollapsible'
import QuestionButtons from './components/QuestionButtons'
import QuestionCreateForm from './components/QuestionCreateForm'
import styles from './QA.module.css'

export default function QA() {
  const dispatch = useDispatch<AppDispatch>()
  const [newQuestion, setNewQuestion] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const questions = useSelector(selectQuestions)

  return (
    <div className={styles.qaContainer}>
      <h1>The awesome Q/A Tool</h1>

      <div>
        Here can you find {questions.length > 0 ? questions.length : 'no'}{' '}
        question{questions.length == 1 ? '' : 's'}. Feel free to create your own
        questions!
      </div>

      <div className={`${styles.createdQuestionsText} ${styles.tooltip}`}>
        <span className={styles.tooltiptext}>
          Here you can find the created questions and answers
        </span>
        <div>Created questions</div>
      </div>

      {questions.length == 0 && <div>No questions yet :-(</div>}

      {questions.map(({ id, question, answer, showAnswer }) => (
        <QuestionCollapsible
          key={id}
          id={id}
          question={question}
          answer={answer}
          showAnswer={showAnswer}
          showAnswerAction={() => dispatch(setShowAnswer(id))}
          removeQuestion={() => dispatch(removeQuestion(id))}
        />
      ))}

      <QuestionButtons
        sortQuestions={() => dispatch(sortQuestions())}
        removeAllQuestions={() => dispatch(removeAllQuestions())}
      />

      <QuestionCreateForm
        newQuestion={newQuestion}
        newAnswer={newAnswer}
        setNewQuestion={setNewQuestion}
        setNewAnswer={setNewAnswer}
        createQuestion={(
          newQuestion: string,
          newAnswer: string,
          delay: boolean,
        ) => {
          const questionParams = {
            id: 0,
            question: newQuestion,
            answer: newAnswer,
            showAnswer: false,
          }
          if (delay) {
            dispatch(createQuestionAsync(questionParams))
          } else {
            dispatch(createQuestion(questionParams))
          }
        }}
      />
    </div>
  )
}
