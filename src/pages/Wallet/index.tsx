import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import Navigator from '../../components/Wallet/Navigator'
import styles from './styles/css/wallet.module.css'

const Wallet = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box className={styles.wallet}>
          <h1>Wallet</h1>
          <p>{`$ ${10000.0}`}</p>
        </Box>
        <Navigator />
      </Container>
    </>
  )
}

export default Wallet
