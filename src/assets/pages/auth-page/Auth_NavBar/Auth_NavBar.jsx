import "./Auth_NavBar.css"
import "../../MediaQuery/MQAuth_navBar.css"
import logo from "../../../../logo.png"
import { NavLink } from "react-router-dom";
export default function Auth_NavBar({show}){
   
    return(
    <div className="Auth_NavBar">      
        <img  className='authLogoImg ' src={logo}/>
        {
            show==1 &&  ( <NavLink to="/auth/signup" className='signInButton'>
                <button >Sign In</button>
            </NavLink>)

        }
    </div>);
}