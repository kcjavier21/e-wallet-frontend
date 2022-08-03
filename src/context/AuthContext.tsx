import { createContext, useReducer, useEffect } from 'react'
import { checkIfTokenIsExpired } from 'src/components/AuthVerify'
import { getCurrentUser } from 'src/services/userService'
import { toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'

export const AuthContext = createContext<any>({})
toast.configure()

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.data, isLoggedIn: true }
    case 'LOGOUT':
      return { ...state, user: null, isLoggedIn: false }
    default:
      return state
  }
}

const setAuthState = async (dispatch: any) => {
  const authToken = localStorage.getItem('authToken')
  if (!authToken) return

  const res = await getCurrentUser(authToken)
  if (!res) return

  checkIfTokenIsExpired(authToken, dispatch)

  delete res.data.password
  delete res.data.money

  dispatch({ type: 'LOGIN', data: res.data })
}

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoggedIn: false,
  })

  useEffect(() => {
    setAuthState(dispatch)
  }, [])

  console.log('AuthContext State:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
