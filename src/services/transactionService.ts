import http from './httpService'
import { toast } from 'react-toastify'
import { SendMoneyInput } from 'src/types/transaction'

import '../../node_modules/react-toastify/dist/ReactToastify.css'

toast.configure()

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT + '/api/transactions'

export const getTransactions = async (authToken: string) => {
  try {
    const res = await http.get(`${apiEndpoint}/me`, {
      headers: {
        'x-auth-token': authToken,
      },
    })
    return res.data
  } catch (ex) {
    return
  }
}

export const sendMoney = async (data: SendMoneyInput, authToken: string) => {
  try {
    await http.post(`${apiEndpoint}/send`, data, {
      headers: {
        'x-auth-token': authToken,
      },
    })

    toast.success('Money sent successfully!')
  } catch (ex: any) {
    console.log(ex.response.data.error)
  }
}
