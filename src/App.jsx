
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Auth_page from './assets/pages/auth-page/Auth_page'
import { BsRouter } from 'react-icons/bs'
import Login from './assets/pages/auth-page/login/Login'
import Signup from './assets/pages/auth-page/signup/SighUp'
import MainContent from './assets/pages/Main_content/mainContent'
import Index from './assets'
import Player from './assets/commonComponents/player'
import LandingPage  from './assets/LandingPage.jsx'

function App() {
  

  return (
        
        <>
          <LandingPage/>

          <Routes>
              <Route path="/" element={<Navigate to="/auth"/>}/>
              <Route path="/auth/*" element={<Auth_page/>}/>
              <Route path="/main/*" element={<MainContent/>}/>
              <Route path='/player' element={<Player/>}/>
              <Route path="*" element={<Index/>}/>
          </Routes>

        </>   

         
      
        
  )
}

export default App
