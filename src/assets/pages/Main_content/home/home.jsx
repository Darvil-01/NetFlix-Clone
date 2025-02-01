import { IoMdPlay } from "react-icons/io";
import { MdInfoOutline } from "react-icons/md";
import bg from'./Hero.jpg'
import MovieSlider from "./homeComponents/movieSlider";
import './home.css'
import { useNavigate } from "react-router-dom";
import useFetch from "../useFetch";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPlayerMovieId } from "../Movies/movieSlice";
export default function Home(){
   const navigate =useNavigate();
   const dispatch=useDispatch();
   
   
   console.log("home render hoaa")

    const onPlayClick=()=>{
        dispatch(setPlayerMovieId(1241982));
        navigate('/player')
    }
   
   
    return (
        <div className='home'> 
            <div className="imgContainer">
                    <img className="homeBgImage" src={`https://image.tmdb.org/t/p/original/vYqt6kb4lcF8wwqsMMaULkP9OEn.jpg`}/>
            </div>
           
            <div className="disp-container">
                {/* <h1>House of Ninjas</h1> */}
                <img style={{width:"300px", height:"120px"}} src="https://image.tmdb.org/t/p/original/sFzVGobXVnazwttzOo34nx0c4vF.png"/>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quibusdam quaerat culpa assumenda harum obcaecati,
                    
                </p>

                <div className="homeButtonContainer">
                    <button onClick={onPlayClick} style={{display:"inline-flex", alignContent:"center", gap:"1px"}}><IoMdPlay className="homeicon" /> <span>Play</span> </button>
                    <button style={{display:"inline-flex", alignContent:"center",gap:"1px"}} ><MdInfoOutline className="homeicon"/> &nbsp; <span>More info</span> </button>
                </div>
                
            </div>

            <div className="movieSliderContainer">
                    <MovieSlider tag={'now_playing'}/>
                    <MovieSlider tag={'popular'}/>
                    <MovieSlider tag={'upcoming'}/>
                    <MovieSlider tag={'top_rated'}/>
                    
                    
            </div>
            

        </div>
    );
}

