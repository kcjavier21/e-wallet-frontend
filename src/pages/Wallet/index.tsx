import { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Navigator from '../../components/Wallet/Navigator'
import styles from './styles/css/wallet.module.css'
import { getCurrentUser } from 'src/services/userService'

const fetchUserData = async (setMoney: any) => {
  const authToken = localStorage.getItem('authToken') || ''
  const res = await getCurrentUser(authToken)

  if (!res) return

  setMoney(res.data.money)
}

const Wallet = () => {
  const [money, setMoney] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    setIsLoading(true)
    fetchUserData(setMoney)
    setIsLoading(false)
  }, [])

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box className={styles.wallet}>
          <h1>Wallet</h1>
          <p>{isLoading ? 'Loading...' : `$ ${money}`}</p>
        </Box>
        <Navigator />
      </Container>
    </>
  )
}

export default Wallet
