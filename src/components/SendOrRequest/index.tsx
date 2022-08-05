import { ReactElement, FormEvent, ChangeEvent, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Form from './Form'
import Heading from 'src/components/Heading'
import { SendOrRequestMoneyInput } from 'src/types/transaction'

type PropTypes = {
  title: string
  httpFunction: any
}

const SendOrRequest = ({ title, httpFunction }: PropTypes): ReactElement => {
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
    const authToken = localStorage.getItem('authToken') || ''
    await httpFunction(data, authToken)
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ textAlign: 'left' }}>
        <Heading title={title} />
        <Box>
          <Form
            handleChange={handleChange.bind(null)}
            handleSubmit={handleSubmit.bind(null)}
          />
        </Box>
      </Container>
    </>
  )
}

export default SendOrRequest
