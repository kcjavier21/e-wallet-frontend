import { ReactElement } from 'react'
import Unauthorized from 'src/components/Unauthorized'
import SendOrRequest from 'src/components/SendOrRequest'
import { requestMoney } from 'src/services/transactionService'

type PropTypes = {
  isLoggedIn: boolean
}

const RequestMoney = ({ isLoggedIn }: PropTypes): ReactElement => {
  if (!isLoggedIn) return <Unauthorized />
  return <SendOrRequest title="Request Money" httpFunction={requestMoney} />
}

export default RequestMoney