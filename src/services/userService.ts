import http from './httpService'
import { toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'

toast.configure()

const loginApiEndpoint = process.env.REACT_APP_API_ENDPOINT + '/api/auth'
const usersApiEndpoint = process.env.REACT_APP_API_ENDPOINT + '/api/users'

export const loginUser = async ({ emailOrPhone, password }: any) => {
  try {
    const res = await http.post(loginApiEndpoint, {
      emailOrPhone,
      password,
    })

    return res
  } catch (ex: any) {
    toast.error(ex.response.data.error)
  }
}

export const getCurrentUser = async (authToken: string) => {
  try {
    const res = await http.get(`${usersApiEndpoint}/me`, {
      headers: {
        'x-auth-token': authToken,
      },
    })

    return res.data
  } catch (ex: any) {
    console.error(ex.response.error)
    return
  }
}

export const getUserById = async (userId: string, authToken: string) => {
  try {
    const res = await http.get(`${usersApiEndpoint}/user-id=${userId}`, {
      headers: {
        'x-auth-token': authToken,
      },
    })

    return res.data
  } catch (ex: any) {
    console.error(ex.response.error)
  }
}
