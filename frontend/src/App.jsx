import { Route, Routes,Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import HomePage from './pages/HomePage'

import WalletDashboard from "./pages/WalletDashboard.jsx"
import './App.css'
import Navigation from "../../frontend/src/pages/components/Navigation"


function App() {
 
  const {isSignedIn} = useUser()
 
  return (
     <>
   <Navigation/>
   <Routes>
   <Route path="/" element={isSignedIn ? <Navigate to="/dashboard" /> : <HomePage />}
        />
   <Route path='/dashboard' element={isSignedIn ? <WalletDashboard/>: <Navigate to="/"/> }/>
  
  </Routes>


    </>
  )
}

export default App
