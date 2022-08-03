import { ReactElement, useState, FormEvent, ChangeEvent } from 'react'
import { NavLink } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import Unauthorized from 'src/components/Unauthorized'
import { useAuthContext } from 'src/hooks/useAuthContext'
import { sendMoney } from 'src/services/transactionService'
import { SendMoneyInput } from 'src/types/transaction'

const SendMoney = (): ReactElement => {
  const { user } = useAuthContext()

  const [data, setData] = useState<SendMoneyInput>({
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
    const authToken = localStorage.getItem('authToken') || ''
    await sendMoney(data, authToken)
  }

  if (!user) return <Unauthorized />

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
        <h1 style={{ textAlign: 'left' }}>Send Money</h1>
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
              Send
            </Button>
          </form>
        </Box>
      </Container>
    </>
  )
}

export default SendMoney
