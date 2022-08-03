import http from './httpService'
import { toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'

toast.configure()

const loginApiEndpoint = process.env.REACT_APP_API_ENDPOINT + '/api/auth'
const usersApiEndpoint = process.env.REACT_APP_API_ENDPOINT + '/api/users'

export const loginUser = async ({ emailOrPhone, password }: any) => {
  const res = await http.post(loginApiEndpoint, {
    emailOrPhone,
    password,
  })

  console.log(res)

  return res
}

export const getCurrentUser = async (authToken: string) => {
  return await http.get(`${usersApiEndpoint}/me`, {
    headers: {
      'x-auth-token': authToken,
    },
  })
}

export const getUserById = async (userId: string, authToken: string) => {
  return await http.get(`${usersApiEndpoint}/user-id=${userId}`, {
    headers: {
      'x-auth-token': authToken,
    },
  })
}
