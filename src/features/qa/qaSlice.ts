import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AppState } from '../../app/store'

type QuestionAction = {
  id: number
  question: string
  answer: string
  showAnswer: boolean
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const createQuestionAsync = createAsyncThunk(
  'qa/createQuestionAsync',
  async ({ id, question, answer, showAnswer }: QuestionAction) => {
    await wait(5000)
    const response = {
      data: { id, question, answer, showAnswer },
    }
    return response.data
  },
)

export const qaSlice = createSlice({
  name: 'qa',
  initialState: {
    status: 'idle',
    questions: [
      {
        id: 0,
        question: 'How to add a question?',
        answer: 'Just use the form below!',
        showAnswer: false,
      },
      {
        id: 1,
        question: 'Can I add my own question?',
        answer: 'Yes, of course :-)',
        showAnswer: false,
      },
    ],
  },
  reducers: {
    createQuestion: (state, action: PayloadAction<QuestionAction>) => {
      action.payload.id = Math.max(...state.questions.map((q) => q.id)) + 1
      state.questions.push(action.payload)
    },

    removeAllQuestions: (state) => {
      state.questions = []
    },

    removeQuestion: (state, action) => {
      const idx = state.questions.findIndex((q) => q.id === action.payload)
      state.questions.splice(idx, 1)
    },

    sortQuestions: (state) => {
      state.questions = state.questions.sort((a, b) =>
        a.question.localeCompare(b.question),
      )
    },

    setShowAnswer: (state, action) => {
      const idx = state.questions.findIndex((q) => q.id === action.payload)
      state.questions[idx].showAnswer = !state.questions[idx].showAnswer
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createQuestionAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createQuestionAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        action.payload.id = Math.max(...state.questions.map((q) => q.id)) + 1
        state.questions.push(action.payload)
      })
  },
})

export const {
  createQuestion,
  removeAllQuestions,
  removeQuestion,
  sortQuestions,
  setShowAnswer,
} = qaSlice.actions

export const selectQuestions = (state: AppState) => state.qa.questions

export default qaSlice.reducer
