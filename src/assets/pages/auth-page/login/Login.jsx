import Auth_NavBar from '../Auth_NavBar/Auth_NavBar';
import { FaChevronRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import "../../../pages/MediaQuery/MQLogin.css";
import { useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import  {firebaseAuth}  from '../../../../firebase-config';
import { ToastContainer, toast ,Bounce} from 'react-toastify';
export default function Login(){
    const [userData,setUserData]=useState({
        email:'',
        password:'',
    });

    const navigate=useNavigate();
   

    function handleUserData(event){
        setUserData({...userData,[event.target.name]:event.target.value});    
    }

    async function onClickHandler(){
        
        console.log(userData);

        try{    
                await toast.promise(createUserWithEmailAndPassword(firebaseAuth,userData.email,userData.password),
                {
                    pending:"Creating your account...",
                    success:"Account created successfully",
                    error:"Account already exists.."
                }
            )                
            
        }
        catch(error){
            // alert(error)
            
        }
        
        // notify();
        
    }

    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        
        setTimeout(()=>{
            if(currentUser)
                navigate("/main");
        },5000)
           
    })
    return (
        <>  
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
            />

            
            <Auth_NavBar show={1}/> 
            <div className='loginContainer'>
                <h1>Unlimited movies, TV</h1>
                <h1>shows and more</h1>
                <p>Starts at ₹149. Cancel at any time.</p>
                <h3>Ready to watch? Enter your email to create or restart your <br></br>membership.</h3>

                <div className='loginInputContainer' >

                    <input className="loginInput" 
                        type='email' 
                        placeholder='Enter address' 
                        name='email' 
                        value={userData.email}
                        onChange={handleUserData}
                        
                    />

                    <input className="loginInput" 
                        type='password' 
                        placeholder='Enter password'
                        name='password' 
                        value={userData.password}
                        onChange={handleUserData}
                    />
                    <button className='LoginSignUpButton' onClick={onClickHandler}><p> Get Started </p>&nbsp; <FaChevronRight/></button>
                </div>
            </div>
        </>
    );
}