import  imgsrc1 from'./landingPageLogo.png';
import logo from '../../src/logo.png'
import './LandingPage.css'
import { useEffect, useState } from 'react';
 function LandingPage(){

    const [pageClassName,setClass]=useState(false);
    const [pageDisplay,setFadeUp]=useState(false);
   

    
    useEffect(()=>{
        setTimeout(()=>{
            setClass(true) ;
           
        },3000);

        
        setTimeout(()=>setFadeUp(true),5600);
    },[])

    
   

    return <div
            className={`landingPage 
            ${ pageClassName && "fadeUpLandingPage"} 
            ${pageDisplay && "pageDisplayNone"}
            `}>

                <img src={ imgsrc1} className="loandingPageImg firstlogo" />
                <img src={logo} className="loandingPageImg secondlogo"/>
                
                { !pageClassName && <h2 className='lodingPageDisp'>Entertainment is loding &nbsp;</h2>}
                { !pageClassName && <span className="loader"></span>}

           </div>
}

export default LandingPage;