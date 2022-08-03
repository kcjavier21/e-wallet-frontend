import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthVerify from 'src/components/AuthVerify'
import Topbar from 'src/components/Topbar'
import Login from 'src/pages/Login'
import Wallet from 'src/pages/Wallet'
import Send from 'src/pages/Send'
import Request from 'src/pages/Request'
import Transactions from 'src/pages/Transactions'
import NotFound from 'src/pages/NotFound'
import { useAuthContext } from 'src/hooks/useAuthContext'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <Topbar />
      <BrowserRouter>
        <AuthVerify />
        <Routes>
          {user ? (
            <Route path="/" element={<Wallet />} />
          ) : (
            <Route path="/" element={<Login />} />
          )}
          <Route path="/send" element={<Send />} />
          <Route path="/request" element={<Request />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
