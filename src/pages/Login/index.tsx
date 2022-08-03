import { ReactElement, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useLogin } from '../../hooks/useLogin'

const Login = (): ReactElement => {
  const { login } = useLogin()
  const [data, setData] = useState({ emailOrPhone: '', password: '' })

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    login(data.emailOrPhone, data.password)
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ textAlign: 'left' }}>
        <h1 style={{ textAlign: 'left' }}>Login</h1>
        <Box>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ width: '360px', mb: '12px' }}
              className="outlined-basic"
              label="Email or Phone number"
              variant="outlined"
              name="emailOrPhone"
              onChange={handleChange}
            />
            <br />
            <TextField
              sx={{ width: '360px', mb: '12px' }}
              className="outlined-basic"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              onChange={handleChange}
            />
            <br />
            <Button type="submit" variant="contained">
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </>
  )
}

export default Login
