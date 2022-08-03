import { ReactElement, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthContext } from 'src/hooks/useAuthContext'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'
import '../../../node_modules/react-toastify/dist/ReactToastify.css'

const removeTokenAndGoBackHome = () => {
  setTimeout(() => {
    localStorage.removeItem('authToken')
    window.location.pathname = '/'
  }, 5000)
}

export const checkIfTokenIsExpired = async (
  authToken: string,
  dispatch: any
) => {
  try {
    const decoded: any = jwtDecode(authToken)

    if (decoded.exp - Date.now() / 1000 <= 0) {
      toast.error('Token expired! Please, log in again.')
      dispatch({ type: 'LOGOUT' })
      removeTokenAndGoBackHome()
    }
  } catch {
    dispatch({ type: 'LOGOUT' })
    removeTokenAndGoBackHome()
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