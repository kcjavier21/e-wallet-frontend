import { ReactElement, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Heading from 'src/components/Heading'
import Unauthorized from 'src/components/Unauthorized'
import { getTransaction, sendMoney } from 'src/services/transactionService'
import { getUserById } from 'src/services/userService'
import { Transaction } from 'src/types/transaction'
import { User } from 'src/types/user'
import { useAuthContext } from 'src/hooks/useAuthContext'

type PropTypes = {
  isLoggedIn: boolean
}

const fetchTransactionData = async (
  requestId: string,
  setIsLoading: (isLoading: Boolean) => void,
  setRequest: (request: Transaction) => void,
  setSender: (request: User) => void
) => {
  setIsLoading(true)

  const authToken = localStorage.getItem('authToken') || ''

  console.log(requestId)

  const request = await getTransaction(requestId, authToken)
  console.log(request)
  if (!request) return

  const sender = await getUserById(request.doneBy, authToken)
  if (!sender) return

  setRequest(request)
  setSender(sender)
  setIsLoading(false)
}

const handleSubmit = async (email: string, amount: number) => {
  if (!email && !amount) return

  const authToken = localStorage.getItem('authToken') || ''
  const data = {
    emailOrPhone: email,
    amount,
    message: '',
  }

  await sendMoney(data, authToken)

  setTimeout(() => {
    window.location.pathname = '/'
  }, 5000)
}

const GrantRequest = ({ isLoggedIn }: PropTypes): ReactElement => {
  const { requestId } = useParams()
  const { user } = useAuthContext()
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [request, setRequest] = useState<Transaction | null>(null)
  const [sender, setSender] = useState<User | null>(null)

  useEffect(() => {
    if (requestId)
      fetchTransactionData(requestId, setIsLoading, setRequest, setSender)
  }, [requestId])

  if (isLoading) return <h1>Loading...</h1>
  if (!isLoggedIn && !request) return <Unauthorized />
  if (request?.doneWith !== user?._id) return <Unauthorized />

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ textAlign: 'left' }}>
        <Heading title="Grant Request" />
        <p>{`You are about to grant the request of ${sender?.firstName} ${sender?.lastName} to send him/her $${request?.amount}.`}</p>
        <p>Please click the confirm button to continue.</p>
        <Button
          variant="contained"
          onClick={() =>
            handleSubmit(sender?.email || '', request?.amount || 0)
          }
        >
          Confirm
        </Button>
      </Container>
    </>
  )
}

export default GrantRequest
