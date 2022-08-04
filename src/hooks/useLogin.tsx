import { useAuthContext } from './useAuthContext'
import { loginUser, getCurrentUser } from '../services/userService'

export const useLogin = () => {
  const { dispatch } = useAuthContext()

  const login = async (emailOrPhone: string, password: string) => {
    try {
      const res = await loginUser({ emailOrPhone, password })

      if (!res) throw new Error('Could not complete login')
      const authToken = res.data

      localStorage.setItem('authToken', authToken)

      const user = await getCurrentUser(authToken)
      if (!user) throw new Error('Could not complete login')

      delete user.password
      delete res.data.money

      dispatch({ type: 'LOGIN', payload: user })
    } catch (err: any) {
      console.log(err.message)
    }
  }

  return { login }
}
