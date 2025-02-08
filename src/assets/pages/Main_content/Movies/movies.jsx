import { useEffect, useState } from "react";
import MovieCard from "../home/homeComponents/movieCard";
import './movies.css'
import '../../MediaQuery/MQmovies.css'
import { GrEbay } from "react-icons/gr";
import Player from "../../../commonComponents/player";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { addData,setPlayerMovieId } from "./movieSlice";
// import HomeNavBar from '../../homeNavBar.jsx';


function GenreDropdown({ genresList, onGenreSelect }) {


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre.id);
    onGenreSelect(genre); // Pass the selected genre to the parent component
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className={isDropdownOpen? "dropdown-container": "dropdown-notOpen"}>
      <button onClick={toggleDropdown} className="dropdown-button">
          { selectedGenre
              ? genresList.find((genre) => genre.id === selectedGenre)?.name
              : "All"
          }
      </button>
      {isDropdownOpen && (
        // <div >
          <ul className="dropdown-list" >
            <li
               onClick={() => handleGenreClick({ id: null, name: "All" })}
               className={`dropdown-item ${selectedGenre === null ? "selected" : ""}`}
              >
                All
              </li>
            {genresList.map((genre) => (
              <li
                key={genre.id}
                onClick={() => handleGenreClick(genre)}
                className={`dropdown-item ${
                  selectedGenre === genre.id ? "selected" : ""
                }`}
              >
                {genre.name}
              </li>
            ))}
          </ul>
        // </div> 
      )}
    </div>
  );
}

export default function Movies(){

    const [genresList,setList]=useState([]);
    // const [movieList,setMovieList]=useState({});
    const [filterList,setFilterList]=useState([]);
    const [togglePlayer,setPlayer]=useState(false);
    const [movieId,setMovieId]=useState('');
    const savedMovieList=useSelector((store)=>store.savedMovieList);

    const movieList=useSelector(state=>state.data);
    
    const dispatch=useDispatch();
     

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWNiNDVlM2EzMTgzODBlYzljZThlYTIzZDgyYTczNyIsIm5iZiI6MTczNzQ0Njg4OS40OTQwMDAyLCJzdWIiOiI2NzhmNTVlOTAxYTcxYWNhNTRmMDdkMWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CQdh9Se_G4De_uF2LYGTeLHv6ICcRcK61zHjC4uLRRk'
        }
      };
      
    function fetchMovieByGenre(genres){
        const moviesData = {};
        genres.forEach((genre) => {
            
          fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre.id}`,options)
            .then((res) => res.json())
            .then((res) => {
              moviesData[genre.id] = res.results; // Store movies for each genre
              dispatch(addData({ ...moviesData })); // Update state

              // setMovieList({...moviesData});
              // console.log("movie fetch hoii")
            })
        .catch(err => console.error(err))});
         
    }

        
          
            useEffect(()=>{ 
          
              // if (Object.keys(movieList).length === 0)
                // {
                  fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
                  .then(res => res.json())
                  .then(res => {
                      // console.log(res.genres);
                      setList(res.genres);
                      fetchMovieByGenre(res.genres);

                  })
                  .catch(err => console.error(err));
                // }
                    

            },[savedMovieList]);


      const onGenreSelect=(genre)=>{
        // console.log(genre);
        setFilterList(genresList.filter((genres)=>genres.id===genre.id))
      }

      // console.log("change hone ke baad ka list ");
      // console.log(genresList)

      const cardOnClickHandler=(id)=>{
                                  // console.log("click hoaa")
        

        setMovieId(id);
                                // console.log("card ke click krene ke baad "+movieId)

        setPlayer(true); 
        dispatch(setPlayerMovieId(id))

                                 // console.log("click ke baad toggle ki value: "+togglePlayer)
      }



      // console.log("toggle ke value hai "+togglePlayer)

      /////////////////////////////////////////////////////

     
        
    return (<div className="movies">

        {togglePlayer && 
          <div className="playerContianer" style={{zIndex:"20000"}}>  
              <div className="crossButton"onClick={()=>setPlayer(false)}>
                  <RxCrossCircled  />
              </div> 

              
              <Player backShow={false} className="player"/>
          </div>
        }
        <GenreDropdown  genresList={genresList} onGenreSelect={onGenreSelect}/>
        
        <div className="movieContainer" >{
           
           filterList.length==0 ? ( genresList.map(({id,name})=>{
            return ( name!=="Romance" && <div className="movieHolder" >
                    <h1> {name} </h1>
                    {   movieList[id] && <div className=" movieList"  >{
                            movieList[id].map((data)=>(
                              // console.log(data),
                              <MovieCard key={data.id}
                                  data={data} play={false}
                                  setprm={(id)=>cardOnClickHandler(id)} 
                                  genre_Id={id}
                                  genre_name={ name}
                              />
                          )) 
                        }
                        </div>
                     }
                  </div>)

            })):( filterList[0].name!=="Romance" && <div className="movieHolder" >
                  {/* {console.log(filterList)} */}
                  <h1> {filterList[0].name} </h1>
                  <div className="movieList"  >{
                     movieList[filterList[0].id] && movieList[filterList[0].id].map((data)=>(
                        
                        <MovieCard key={data.id} 
                          data={data} play={false} 
                          setprm={(id)=>cardOnClickHandler(id)}
                          genre_Id={filterList[0].id}
                          genre_name={filterList[0].name}
                        />
                     )) 
                  }
                  </div>    
              </div>)
          }
        </div>
    </div>

    );
    
}