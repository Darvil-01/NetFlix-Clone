import { IoArrowBackCircleOutline, IoCheckmarkDoneSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import './player.css'
import useFetch from "../pages/Main_content/useFetch";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaRegPlayCircle } from "react-icons/fa";
import { LuSaveAll } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { postData ,setplayerFotterVisible} from "../pages/Main_content/Movies/movieSlice";
export default function Player({backShow=true}){  
    
    // since palyer is common in all therfore backshow is for 
    // backarrow display condition
    
    const navigate =useNavigate();
    const movieid=useSelector((state)=>state.player_movieid);
    const playerFotterVisible=useSelector((state)=>state.playerFotterVisible);
     
    const {movieKey}=useFetch('',movieid); 
    

    // const {movieKey}=useFetch('',1184918); 

     function onClickHandler(){
            
            const newMovie = {
                movieId: data.id,       // ✅ Renamed id → movieId
                genreId: genre_data.id, // ✅ Renamed genre → genreId
                genreName: genre_data.name // ✅ Renamed genre_name → genreName
            };
            dispatch(postData(newMovie));
    
            console.log("movie save hoii "+data.id)
        }

    

    console.log(movieid)
    
    /* Note:-
        
        jitni baar usefetch call krogye to wo unti baar render hoga. 
        moviSlider me jub call kiya to usme tag pass kiya jisse movie list nikal ske. 
                                        AND
        player me call kiya to re-render hoga then osme useEffect chalega jo movie key fetch krega

        usefetch me movieKey ka state bna hai...to jub key fetch hogi to wo key state ko change kregi
        usefetch re-render hoga and yha updated value ko yha return krega. 
        Yha movieKey ke value change hogi ...then useEffect call hoga ku ki movieKey dependency hai ..isse
        setKey call hoga to re-rendering krega jiise movie me movieKey ki value aa jyegii and iframe to dobara 
    */
                                           
    
    const [movie,setKey]=useState('');

    useEffect(()=>{
        
        setKey(movieKey);
        
    },[movieKey]);
    
    console.log(playerFotterVisible);
    return(
        <div className="player">

<iframe src={`https://www.youtube.com/embed/${movie}?autoplay=1`}  className="playerArea" allowFullScreen allow="autoplay"/>
            { backShow && <IoArrowBackCircleOutline onClick={()=>navigate(-1)} className="palyerBack"/>}
            

            {/* backShow && */}
            { !backShow && playerFotterVisible && <div className='playerFotter' onClick={()=>console.log("div clicked")}>
                                
                <FaRegPlayCircle className="icon redIcon"  onClick={()=>{navigate('/player'),dispatch(setplayerFotterVisible(false))}}/>                                                
                                
            </div>}
        </div>
    );
}