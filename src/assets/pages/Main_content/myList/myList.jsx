import { useDispatch, useSelector } from "react-redux";
import { MdOutlinePlayCircle } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { setPlayerMovieId,deleteData } from "../Movies/movieSlice";
import './myList.css'
import '../../MediaQuery/MQList.css'
import { useNavigate } from "react-router-dom";
import Loder from "../../../commonComponents/loder"; 

export default function myList(){

    const savedMovieList =useSelector((store)=>(store.savedMovieList));
    const moviedata=useSelector((store)=>(store.data));
    const dispatch=useDispatch();
    const navigate=useNavigate();
    console.log("myList")
    console.log(savedMovieList)
    // console.log(moviedata);

    const onClicksetPlayerMovieId=(id)=>{
         dispatch(setPlayerMovieId(id));
         
    }

    const findMovieInMovieData=(movieId,genreId)=>{
        return moviedata[genreId]?.find((movie)=> movie.id===movieId ? movie:null )
    }
    return (
        <div className="myList">
            {   savedMovieList.length!==0?(
                savedMovieList.map((movie)=>{ 
                    
                    var fetchedMovie =findMovieInMovieData(movie.movieId,movie.genreId)  ;
                    console.log(fetchedMovie)
                    return fetchedMovie && <div className="savedMovieCard">

                        <img src={`https://image.tmdb.org/t/p/original`+fetchedMovie.poster_path}  className="savedMovieCardImg"/>

                        <div>
                            <h2 className="listH2"><div className="movieContainerDiv">{fetchedMovie.title}</div></h2> &nbsp; <h3 className="listH3">({movie.genreName})</h3>
                            
                            <p>overview:</p>
                            <p className="movieOverview">{fetchedMovie.overview}</p>
                        </div>
                        

                        <div className="savedListIconContainer">
                            <MdOutlinePlayCircle className="savedListIcon" onClick={()=>{onClicksetPlayerMovieId(movie.movieId),navigate('/player')}}/>
                                
                            <AiOutlineDelete className="savedListIcon" onClick={()=>dispatch(deleteData(movie.movieId))}/>

                        </div>    
                        

                    </div>
                    })
                ):(

                    <div className="loderContainer">
                        <Loder/>
                        <h2 style={{color:"#fff", marginTop:"50px"}}>No Movie Found</h2>
                    </div>
                )
                
            }
        </div>
    );
}