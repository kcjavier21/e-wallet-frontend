import { NavLink } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'

const UnauthorizedDisplay = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ textAlign: 'left' }}>
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
        <h1 style={{ textAlign: 'left' }}>You are unauthorized to view this page</h1>
      </Container>
    </>
  )
}

export default UnauthorizedDisplay
