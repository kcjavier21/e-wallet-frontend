import { UsersBasicInfo } from './user'

export interface DispatchArgument {
  type: string
  data?: UsersBasicInfo
}

export interface DecodedAuthToken {
  _id: string
  email: string
  exp: number
  iat: number
}