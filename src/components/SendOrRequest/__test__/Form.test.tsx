import { ReactElement, FormEvent, ChangeEvent, useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SendOrRequestMoneyInput } from 'src/types/transaction'
import Form from '../Form'
import '@testing-library/jest-dom'

const MockForm = (): ReactElement => {
  const [data, setData] = useState<SendOrRequestMoneyInput>({
    emailOrPhone: '',
    amount: 0,
    message: '',
  })

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement
    if (name === 'amount') setData({ ...data, [name]: parseInt(value) })
    else setData({ ...data, [name]: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log('Submitted')
  }

  return (
    <Form
      handleChange={handleChange.bind(null)}
      handleSubmit={handleSubmit.bind(null)}
    />
  )
}

describe('Send Or Request Form Component', () => {
  it('shows the right input value in Email or Phone input element', () => {
    const { container } = render(<MockForm />)
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const emailOrPhoneInputElement: any = container.querySelector(
      `input[name="emailOrPhone"]`
    )

    fireEvent.click(emailOrPhoneInputElement)
    fireEvent.change(emailOrPhoneInputElement, {
      target: { value: 'myemail@gmail.com' },
    })
    expect(emailOrPhoneInputElement.value).toBe('myemail@gmail.com')
  })

  it('shows the right input value in Amount input element', () => {
    const { container } = render(<MockForm />)
    const amountInputElement: any =
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector(`input[name="amount"]`)

    fireEvent.click(amountInputElement)
    fireEvent.change(amountInputElement, {
      target: { value: 1 },
    })
    expect(amountInputElement.value).toBe('1')
  })

  it('shows the right input value in Message input element', () => {
    const { container } = render(<MockForm />)
    const messageTextAreaElement: any =
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector(`textarea[name="message"]`)

    fireEvent.click(messageTextAreaElement)
    fireEvent.change(messageTextAreaElement, {
      target: { value: 'My message' },
    })
    expect(messageTextAreaElement.value).toBe('My message')
  })
})
