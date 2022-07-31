import { useState, useEffect } from 'react'
import { getTransactions } from "../../services/transactions"

const Transactions = () => {
  const [ transactions, setTransactions ] = useState<any>([])

  useEffect(() => {
    setTransactions(getTransactions('0000'))
  }, [])

  console.log(transactions)


  return <div>Transactions</div>
}

export default Transactions
