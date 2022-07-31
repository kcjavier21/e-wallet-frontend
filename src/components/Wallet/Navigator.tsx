import styles from './styles/css/navigator.module.css'
import { NavLink } from 'react-router-dom'

const Navigator = () => {
  return (
    <ul className={styles.navigator}>
      <li>
        <NavLink to="/send">Send Money</NavLink>
      </li>
      <li>
        <NavLink to="/request">Request Money</NavLink>
      </li>
      <li>
        <NavLink to="/transactions">Transactions</NavLink>
      </li>
    </ul>
  )
}

export default Navigator
