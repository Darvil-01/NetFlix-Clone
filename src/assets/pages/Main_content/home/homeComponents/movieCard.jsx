import { useState } from 'react';
import Player from '../../../../commonComponents/player';
import { FaHeart, FaRegHeart, FaRegPlayCircle } from "react-icons/fa";
import { LuSaveAll } from "react-icons/lu";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import './movieCard.css'
import '../../../MediaQuery/MQmovieCard.css'
import { useDispatch, useSelector } from 'react-redux';
import { postData ,setPlayerMovieId,setplayerFotterVisible} from '../../Movies/movieSlice';
import { IoMdHeart } from 'react-icons/io';
export default function MovieCard({data,play,setprm,genre_Id,genre_name}){
    
    
    const [isvisible, setVisible]=useState(false);
    const dispatch=useDispatch();
    const savedMovieList=useSelector((store)=>store.savedMovieList);
    

    function onClickHandler(){
        
        const newMovie = {
            movieId: data.id,       // ✅ Renamed id → movieId
            genreId: genre_Id, // ✅ Renamed genre → genreId
            genreName: genre_name // ✅ Renamed genre_name → genreName
        };
        dispatch(postData(newMovie));
        console.log(genre_Id,genre_name)    
        console.log("movie save hoii "+data.id)
    }

    // savedMovieList.some(movie=> movie.movieId==data.id)&& console.log(data.id+" ye movie saved hai")

    // console.log("list la data")
    // console.log(savedMovieList)
    
    return (
        <div className="movieCard " 
            onMouseEnter={()=>{setVisible(true),dispatch(setPlayerMovieId(data.id)),dispatch(setplayerFotterVisible(true))}} 
            onMouseLeave={()=>setVisible(false)}
            // style={ {height:isvisible?'150%':'100%'}} 
            
        >
            <img src={`https://image.tmdb.org/t/p/original`+data.poster_path} className='cardImg'/>

            {/* when i am not using isvisible concept the react render palyer component for every 
                card which make website get heavy to load but using the condition react render only that player according to which card is get hover */}
            { isvisible && play &&
                <div className="cardPlayer">
                    {
                       <Player backShow={false} className="player"  />
                    }
                    {/* <Player backShow={false} className="player"  /> */}
                </div>
                
            }
           
            {!play && <div className='fotter' onClick={()=>console.log("div clicked")}>
                        
                <FaRegPlayCircle className="icon redIcon" onClick={()=>{setprm(data.id),dispatch(setplayerFotterVisible(false))}}/>

                {
                    savedMovieList.some(movie=> movie.movieId==data.id)?  
                    (<FaHeart className='icon greenIcon'/>):
                    ( <FaRegHeart className='icon redIcon' onClick={onClickHandler}/>)      
                
                }    
                                        
                        
            </div>  }      
            
        </div>
    );
}