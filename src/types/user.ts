export interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password?: string
  money: number
}

export interface UsersBasicInfo {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}