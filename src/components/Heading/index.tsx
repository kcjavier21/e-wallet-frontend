import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

type PropTypes = {
  title: string
}

const Heading = ({ title }: PropTypes): ReactElement => {
  return (
    <>
      <NavLink
        style={{
          textDecoration: 'underline',
          color: '#1D1D1D',
          marginTop: '24px',
          display: 'inline-block',
          textAlign: 'left',
        }}
        to="/"
      >
        Go back
      </NavLink>
      <h1 data-testid="title">{title}</h1>
    </>
  )
}

export default Heading
