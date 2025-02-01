import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa6";
import { FaCaretUp } from "react-icons/fa6";
import logo from "../../../logo.png"
import './homeNavBar.css'
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast ,Bounce} from 'react-toastify';

import {signOut,getAuth} from 'firebase/auth';


export default function HomeNavBar({scrollableDivRef}){

    const [homeNavBarClass,setHomeNavBarClass]=useState('NavBarNotScrolled');
    const [toggleArrow,setArrow]=useState(false);
    const navigate=useNavigate();
    
    const toggleHandler=()=>{
        setArrow(!toggleArrow)
    }

    const auth=getAuth();
    const hadleSignOut=()=>{
        console.log("signout button pr click hoaa")
        try{
             toast.promise(signOut(auth),{
                pending:"Signing out...",
                success:"Signing out..."
             });
            console.log("signout hoaa")

            setTimeout(()=>navigate("/"),2000)
        }
        catch(error){
            console.log(error);
        }
        

      
    }

    useEffect(()=>{
        console.log('useeffect laga')
        const handleScroll=()=>{
            console.log("Scroll position:", window.scrollY); 
            if(scrollableDivRef.current.scrollTop >10){
                setHomeNavBarClass('NavBarScrolled');
                console.log({homeNavBarClass});
            }
            else {
                setHomeNavBarClass('NavBarNotScrolled');
                console.log({homeNavBarClass});
            }
    
        };

        const scrollableDiv = scrollableDivRef.current;
        
        if(scrollableDiv)
        scrollableDiv.addEventListener("scroll",()=>{
            console.log("scroll hoaa");
        });

        if(scrollableDiv)
        return ()=>{
            scrollableDiv.removeEventListener("scroll",handleScroll);
        }
    },[scrollableDivRef]);

    return(

        <div className={homeNavBarClass}>    
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
            <div className="logoAndLiContainer">
                <img className='homeLogoImg'src={logo}/>

                <div className='menuContainer'>
                    <ul className="menu">
                        <NavLink className={({isActive})=>(isActive?"navlink active": "navlink")} to="/main" end>Home</NavLink>
                        {/* <NavLink className={({isActive})=>(isActive?"navlink active": "navlink")} to="/main/TVShows">TVShows</NavLink> */}
                        <NavLink className={({isActive})=>(isActive?"navlink active": "navlink")} to="/main/movies">Movies</NavLink>
                        {/* <NavLink className={({isActive})=>(isActive?"navlink active": "navlink")} to="/main/News&Popular">News & Popular</NavLink> */}
                        <NavLink className={({isActive})=>(isActive?"navlink active": "navlink")} to="/main/myList">My List</NavLink>

                    </ul>
                </div>
            </div>
                
            <div className="searchAndIconsContainer">
                <div className="searchContainer">
                    <input className='search' type='text' placeholder='search...'/>
                    <FiSearch className="homeIcon searchButton"/>
                </div>
               
                
                <IoNotificationsOutline className="homeIcon"/>
                { toggleArrow ? (<FaCaretDown className="homeIcon" onClick={toggleHandler}/>)
                                 :
                                (<FaCaretUp className="homeIcon"onClick={toggleHandler} />)}

                { toggleArrow && <div className="logOut">
                    <button onClick={hadleSignOut}>Log Out</button>
                    </div>
                }

            </div>
                
                
                
        </div>
    );
}