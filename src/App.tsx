import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Topbar from './components/Topbar'
import Wallet from './pages/Wallet'
import Send from './pages/Send'
import Request from './pages/Request'
import Transactions from './pages/Transactions'

function App() {
  return (
    <div className="App">
      <Topbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wallet />} />
          <Route path="/send" element={<Send />} />
          <Route path="/request" element={<Request />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
