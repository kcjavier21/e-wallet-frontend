import { removeTokenAndGoBackHome } from 'src/components/AuthVerify'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    setTimeout(() => {
      dispatch({ type: 'LOGOUT' })
    }, 500)
    removeTokenAndGoBackHome()
  }

  return { logout }
}
