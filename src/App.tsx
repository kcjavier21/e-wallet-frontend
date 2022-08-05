import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthVerify from 'src/components/AuthVerify'
import Topbar from 'src/components/Topbar'
import Login from 'src/pages/Login'
import Wallet from 'src/pages/Wallet'
import Send from 'src/pages/Send'
import Request from 'src/pages/Request'
import GrantRequest from 'src/pages/GrantRequest'
import Transactions from 'src/pages/Transactions'
import NotFound from 'src/pages/NotFound'
import { useAuthContext } from 'src/hooks/useAuthContext'

function App() {
  const { isLoggedIn, authIsReady } = useAuthContext()

  return (
    <div className="App">
      <Topbar isLoggedIn={isLoggedIn} />
      <BrowserRouter>
        <AuthVerify />
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<Wallet authIsReady={authIsReady} />} />
          ) : (
            <Route path="/" element={<Login authIsReady={authIsReady} />} />
          )}
          <Route path="/send" element={<Send isLoggedIn={isLoggedIn} />} />
          <Route path="/request" element={<Request isLoggedIn={isLoggedIn} />} />
          <Route path="/request/:requestId" element={<GrantRequest isLoggedIn={isLoggedIn} />} />
          <Route path="/transactions" element={<Transactions isLoggedIn={isLoggedIn} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
