import { useState } from "react";
import Auth_NavBar from "../Auth_NavBar/Auth_NavBar"
import "./Signup.css"
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../../../firebase-config";
import { ToastContainer, toast,Bounce } from 'react-toastify';
export default function Signup(){

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
                await toast.promise(signInWithEmailAndPassword(firebaseAuth,userData.email,userData.password),
                {
                    pending:"Checking...user info",
                    success:"Signin Successfully",
                    error:"Wrong credintials"
                }
            )
                
                
            
        }
        catch(error){
            // alert("Email already in use..")
            console.log(error)
        }
        
    }

    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        setTimeout(()=>{
            if(currentUser)
                navigate("/main");
        },2000)
    })



    return (
        <div className="signUp">

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}/>

            <Auth_NavBar show={0}/>
            <div className="SignUpContainer">
            
                <div >
                
                        <h1>Sign In</h1>
                        <input className="signinInput" type="email"
                            placeholder="Email or mobile number"
                            name='email' 
                            value={userData.email}
                            onChange={handleUserData}

                        />

                        <input className="signinInput" type="password" 
                            placeholder="Password"
                            name='password' 
                            value={userData.password}
                            onChange={handleUserData}
                        />

                        <button className="signUpSignInButton" onClick={onClickHandler}>Sign In</button>
                        <p> OR</p>
                        <button className="signUpSignUpButton" >Use a sign code</button>
                        <a href="#">Forget Password</a> 
                    
                </div> 
                
                
            </div>
        </div>
    )
}