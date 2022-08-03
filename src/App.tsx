import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Topbar from './components/Topbar'
import Login from './pages/Login'
import Wallet from './pages/Wallet'
import Send from './pages/Send'
import Request from './pages/Request'
import Transactions from './pages/Transactions'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <Topbar />
      <BrowserRouter>
        <Routes>
          {user ? renderRoutesWhenLoggedIn() : renderRoutesWhenLoggedOut()}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

const renderRoutesWhenLoggedIn = () => {
  return (
    <>
      <Route path="/" element={<Wallet />} />
      <Route path="/send" element={<Send />} />
      <Route path="/request" element={<Request />} />
      <Route path="/transactions" element={<Transactions />} />
    </>
  )
}

const renderRoutesWhenLoggedOut = () => {
  return <Route path="/" element={<Login />} />
}

export default App
