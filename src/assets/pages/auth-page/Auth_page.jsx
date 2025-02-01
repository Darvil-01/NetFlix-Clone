import './Auth_page.css'

import { Outlet, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import Signup from './signup/SighUp';
import MainContent from '../Main_content/mainContent';
export default function Auth_page(){
    console.log("auth me aaya")
    return (
        <div className="Auth_page">
           
            <Routes>
                
                <Route index element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>

            <Outlet/>
            
        </div>
    );
}