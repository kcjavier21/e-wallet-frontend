import Button from '@mui/material/Button'
import styles from './styles/css/topbar.module.css'
import { useLogout } from 'src/hooks/useLogout'

type PropTypes = {
  isLoggedIn: boolean
}

const Topbar = ({ isLoggedIn }: PropTypes) => {
  const { logout } = useLogout()

  return (
    <div className={styles.topbar}>
      <div className={styles.innerContainer}>
        <h1>E-Wallet</h1>
        {isLoggedIn && (
          <Button variant="text" onClick={logout}>
            Logout
          </Button>
        )}
      </div>
    </div>
  )
}

export default Topbar
