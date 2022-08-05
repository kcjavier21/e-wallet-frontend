import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Heading from '../index'

const MockHeading = ({ title }: { title: string }) => {
  return (
    <BrowserRouter>
      <Heading title={title} />
    </BrowserRouter>
  )
}

describe('Heading Component', () => {
  it('display the right title', () => {
    render(<MockHeading title="Heading Title" />)
    const headingElement = screen.getByTestId('title')
    expect(headingElement.textContent).toBe('Heading Title')
  })
})
