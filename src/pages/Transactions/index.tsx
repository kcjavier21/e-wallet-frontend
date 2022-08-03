import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import Container from '@mui/material/Container'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Unauthorized from 'src/components/Unauthorized'
import { useAuthContext } from 'src/hooks/useAuthContext'
import { getTransactions } from 'src/services/transactionService'
import { getUserById } from 'src/services/userService'
import { Transaction } from 'src/types/transaction'

const Transactions = () => {
  const { user } = useAuthContext()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    setTransactions([])
    fetchTransactionData()
  }, [])

  const fetchTransactionData = async () => {
    const authToken: string = localStorage?.getItem('authToken') || ''
    const fetchedTransactions: Transaction[] = await getTransactions(authToken)

    for (const transaction of fetchedTransactions) {
      const res = await getUserById(transaction.doneWith, authToken)

      if (res)
        transaction.doneWith = `${res.data.firstName} ${res.data.lastName}`
      else
        transaction.doneWith = 'User not found'
    }

    setTransactions(fetchedTransactions)
  }

  if (!user) return <Unauthorized />

  if (!transactions) {
    return <></>
  }

  return (
    <Container maxWidth="md" sx={{ textAlign: 'left' }}>
      <NavLink
        style={{
          textDecoration: 'underline',
          color: '#1D1D1D',
          marginTop: '24px',
          display: 'inline-block',
          textAlign: 'left',
        }}
        to="/"
      >
        Go back
      </NavLink>
      <h1>Transactions</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">To/From</TableCell>
              <TableCell align="right">{'Date & Time'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="right">{`$ ${row.amount}`}</TableCell>
                <TableCell align="right">{row.doneWith}</TableCell>
                <TableCell align="right">
                  {moment(new Date(row.date)).format('MMMM DD YYYY, h:mm:ss a')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Transactions
