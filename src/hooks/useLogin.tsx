import { useAuthContext } from './useAuthContext'
import { loginUser, getCurrentUser } from '../services/userService'

export const useLogin = () => {
  const { dispatch } = useAuthContext()

  const login = async (emailOrPhone: string, password: string) => {
    try {
      let res = await loginUser({ emailOrPhone, password })

      if (!res) throw new Error('Could not complete login')
      const jwt = res.data

      localStorage.setItem('authToken', jwt)

      const { data: user } = await getCurrentUser(jwt)
      if (!user) throw new Error('Could not complete login')
      
      delete user.password
      delete res.data.money

      dispatch({ type: 'LOGIN', payload: user })

      window.location.reload()
    } catch (err: any) {
      console.log(err.message)
    }
  }

  return { login }
}
