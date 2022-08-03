import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { loginUser, getCurrentUser } from '../services/userService'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState<boolean>(false)
  const { state, dispatch } = useAuthContext()

  const login = async (emailOrPhone: string, password: string) => {
    setError(null)
    setIsPending(true)

    try {
      let res = await loginUser({ emailOrPhone, password })

      if (!res) throw new Error('Could not complete login')
      const jwt = res.data

      localStorage.setItem('authToken', jwt)

      const { data: user } = await getCurrentUser(jwt)
      if (!user ) throw new Error('Could not complete login')
      delete user.password
      
      dispatch({ type: 'LOGIN', payload: user })
    } catch (err: any) {
      setIsPending(false)
      setError(err.message)
      console.log(err.message)
    }
  }

  return { error, isPending, login }
}
