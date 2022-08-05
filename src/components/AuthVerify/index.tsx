import { ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import jwtDecode from 'jwt-decode'
import { useAuthContext } from 'src/hooks/useAuthContext'
import { DispatchArgument, DecodedAuthToken } from 'src/types/auth'
import '../../../node_modules/react-toastify/dist/ReactToastify.css'

export const removeTokenAndGoBackHome = () => {
  localStorage.removeItem('authToken')
  window.location.pathname = '/'
}

export const checkIfTokenIsExpired = async (
  authToken: string,
  dispatch: (state: DispatchArgument) => void
) => {
  try {
    const decoded: DecodedAuthToken = jwtDecode(authToken)

    if (decoded.exp - Date.now() / 1000 <= 0) {
      toast.error('Token expired! Please, log in again.')
      throw new Error('Token expired! Please, log in again.')
    }
  } catch {
    dispatch({ type: 'LOGOUT' })
    setTimeout(() => {
      removeTokenAndGoBackHome()
    }, 5000)
  }
}

const AuthVerify = (): ReactElement => {
  const { dispatch } = useAuthContext()
  const location = useLocation()

  useEffect(() => {
    const authToken = localStorage.getItem('authToken')

    if (!authToken) {
      dispatch({ type: 'LOGOUT' })
      return
    }

    checkIfTokenIsExpired(authToken, dispatch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return <></>
}

export default AuthVerify
