import transactionsData from '../data/transactions.json'
import usersData from '../data/users.json'
import { Transaction } from '../types/transaction'

const getTransactions = (userId: string): Transaction[] => {
  const userTransactions = transactionsData.filter(
    (transaction) => transaction.doneBy === userId
  )

  let i = 0
  let user

  for (const userTransaction of userTransactions) {
    user = usersData.filter((user) => userTransaction.doneWith === user._id)

    if (user.length > 0) {
      userTransactions[i].doneWith = `${user[0].firstName} ${user[0].lastName}`
      console.log(userTransactions)
    }

    i++
  }

  return userTransactions
}

export { getTransactions }
