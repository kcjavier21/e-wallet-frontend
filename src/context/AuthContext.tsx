import { createContext, useReducer, useEffect } from 'react'
import { getCurrentUser } from 'src/services/userService'

export const AuthContext = createContext<any>({})

export const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.data }
    case 'LOGOUT':
      return { ...state, user: null }
    default:
      return state
  }
}

const reLoginUser = async (dispatch: any) => {
  const jwt = localStorage.getItem('authToken')
  if (!jwt) return

  const res = await getCurrentUser(jwt)
  if (!res) return
  delete res.data.password

  dispatch({ type: 'LOGIN', data: res.data })
}

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  })

  useEffect(() => {
    reLoginUser(dispatch)
  }, [])

  // console.log('AuthContext State:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}
