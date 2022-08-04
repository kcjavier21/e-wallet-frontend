import { ReactElement } from 'react'
import Unauthorized from 'src/components/Unauthorized'
import SendOrRequest from 'src/components/SendOrRequest'
import { sendMoney } from 'src/services/transactionService'

type PropTypes = {
  isLoggedIn: boolean
}

const SendMoney = ({ isLoggedIn }: PropTypes): ReactElement => {
  if (!isLoggedIn) return <Unauthorized />
  return <SendOrRequest title="Send Money" httpFunction={sendMoney} />
}

export default SendMoney
