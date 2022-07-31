import { ReactElement, useState } from 'react'
import { NavLink } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

interface RequestData {
  emailOrPhone: string
  amount: number
  message: string
}

const RequestMoney = (): ReactElement => {
  const [data, setData] = useState<RequestData>({
    emailOrPhone: '',
    amount: 0,
    message: '',
  })

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(data)
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xs">
        <NavLink
          style={{
            textDecoration: 'underline',
            color: '#1D1D1D',
            marginTop: '24px',
            display: 'inline-block',
          }}
          to="/"
        >
          Go back
        </NavLink>
        <h1>Request Money</h1>
        <Box>
          <form onSubmit={handleSubmit}>
            <TextField
              sx={{ width: '360px', mb: '12px' }}
              id="outlined-basic"
              label="Email or Phone number"
              variant="outlined"
              name="emailOrPhone"
              onChange={handleChange}
            />
            <br />
            <TextField
              sx={{ width: '360px', mb: '12px' }}
              id="outlined-basic"
              label="Amount"
              type="number"
              variant="outlined"
              name="amount"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <br />
            <TextField
              placeholder="MultiLine with rows: 2 and rowsMax: 4"
              sx={{ width: '360px', mb: '12px' }}
              multiline
              rows={8}
              name="message"
              label="Message"
              onChange={handleChange}
            />
            <br />
            <Button type="submit" variant="contained" startIcon={<SendIcon />}>
              Send Request
            </Button>
          </form>
        </Box>
      </Container>
    </>
  )
}

export default RequestMoney
