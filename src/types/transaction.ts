export interface Transaction {
  _id: string
  type: string
  doneBy: string
  doneWith: string
  amount: number
  message?: string
  date: number
}

export interface SendOrRequestMoneyInput {
  emailOrPhone: string
  amount: number
  message?: string
}