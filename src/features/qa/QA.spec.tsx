import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'

import { makeStore } from '../../app/store'
import QA from './QA'

describe('<QA />', () => {
  it('renders the component', () => {
    const store = makeStore()

    render(
      <Provider store={store}>
        <QA />
      </Provider>,
    )

    expect(screen.getByText('The awesome Q/A Tool')).toBeInTheDocument()
    expect(screen.getByText('How to add a question?')).toBeInTheDocument()
    expect(screen.getByText('Can I add my own question?')).toBeInTheDocument()
  })

  it('adds new new question', () => {
    const store = makeStore()

    render(
      <Provider store={store}>
        <QA />
      </Provider>,
    )

    user.type(screen.getByLabelText(/Question/i), 'New Question?')
    user.type(screen.getByLabelText(/Answer/i), 'New Answer')
    user.click(screen.getByRole('button', { name: /Create question/i }))

    expect(screen.getByText('New Question?')).toBeInTheDocument()
  })

  it('deletes question', () => {
    const store = makeStore()

    render(
      <Provider store={store}>
        <QA />
      </Provider>,
    )

    user.click(screen.getByTestId('delete-button-0'))
    const firstAnswer = screen.queryByText('How to add a question?')
    expect(firstAnswer).not.toBeInTheDocument()
    expect(screen.getByText('Can I add my own question?')).toBeInTheDocument()
  })
})
