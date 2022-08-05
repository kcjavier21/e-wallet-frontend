import { useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Navigator from 'src/components/Wallet/Navigator'
import { getCurrentUser } from 'src/services/userService'
import styles from './styles/css/wallet.module.css'

const fetchAmountOfMoney = async (
  setNameOfUser: (name: string) => void,
  setMoney: (amount: number) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  setIsLoading(true)
  
  const authToken = localStorage.getItem('authToken') || ''
  const user = await getCurrentUser(authToken)

  if (!user) return

  setNameOfUser(`${user.firstName} ${user.lastName}`)
  setMoney(user.money)
  setIsLoading(false)
}

type PropTypes = {
  authIsReady: boolean
}

const Wallet = ({ authIsReady }: PropTypes) => {
  const [money, setMoney] = useState<number>(0)
  const [nameOfUser, setNameOfUser] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchAmountOfMoney(setNameOfUser, setMoney, setIsLoading)
  }, [])

  if (!authIsReady) return <></>
  
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box className={styles.wallet}>
          <h1>{isLoading ? 'Loading...' : `${nameOfUser}'s Wallet`}</h1>
          <p>{isLoading ? 'Loading...' : `$ ${money}`}</p>
        </Box>
        <Navigator />
      </Container>
    </>
  )
}

export default Wallet
