import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Topbar from '../index'

describe('Topbar Component', () => {
  it('display the logout button', () => {
    render(<Topbar isLoggedIn={true} />)
    const logoutButton = screen.getByRole('button', { name: 'Logout' })
    expect(logoutButton).toBeInTheDocument()
  })

  it('does not display the logout button', () => {
    render(<Topbar isLoggedIn={false} />)
    const logoutButton = screen.queryByRole('button', { name: 'Logout' })
    expect(logoutButton).not.toBeInTheDocument()
  })
})