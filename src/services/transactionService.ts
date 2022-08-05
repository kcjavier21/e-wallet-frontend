import http from './httpService'
import { toast } from 'react-toastify'
import { SendOrRequestMoneyInput } from 'src/types/transaction'
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
  } catch (ex: any) {
    console.error(ex.response.data.error)
  }
}

export const getTransaction = async (id: string, authToken: string) => {
  try {
    const res = await http.get(`${apiEndpoint}/${id}`, {
      headers: {
        'x-auth-token': authToken,
      },
    })
    
    return res.data
  } catch (ex: any) {
    console.error(ex.response.data.error)
  }
}

export const sendMoney = async (data: SendOrRequestMoneyInput, authToken: string) => {
  try {
    await http.post(`${apiEndpoint}/send`, data, {
      headers: {
        'x-auth-token': authToken,
      },
    })

    toast.success('Money sent successfully!')
  } catch (ex: any) {
    toast.error(ex.response.data.error)
  }
}

export const requestMoney = async (data: SendOrRequestMoneyInput, authToken: string) => {
  try {
    await http.post(`${apiEndpoint}/request`, data, {
      headers: {
        'x-auth-token': authToken,
      },
    })

    toast.success('Request sent successfully!')
  } catch (ex: any) {
    toast.error(ex.response.data.error)
  }
}