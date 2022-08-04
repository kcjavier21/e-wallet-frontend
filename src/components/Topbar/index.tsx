import Button from '@mui/material/Button'
import styles from './styles/css/topbar.module.css'
import { useAuthContext } from 'src/hooks/useAuthContext'
import { useLogout } from 'src/hooks/useLogout'

const Topbar = () => {
  const { isLoggedIn } = useAuthContext()
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
