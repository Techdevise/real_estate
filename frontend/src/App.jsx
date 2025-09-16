import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import QRScannerScreen from './components/QRScannerScreen';
import PropertyDetail from './components/PropertyDetail';
import UserDetailForm from './components/UserDetailForm';
import ScheduleConfirmation from './components/ScheduleConfirmation';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
         <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/scan" element={<QRScannerScreen />} />
        <Route path="/property" element={<PropertyDetail />} />
        <Route path="/user-detail" element={<UserDetailForm />} />
        <Route path="/schedule" element={<ScheduleConfirmation />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
