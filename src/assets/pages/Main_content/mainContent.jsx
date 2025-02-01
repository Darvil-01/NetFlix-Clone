import { Routes,Route } from "react-router-dom"
import HomeNavBar from "./homeNavBar"
import Home from "./home/home"
import { useEffect, useRef } from "react";
import Index from "../..";
import Movies from "./Movies/movies";
import MyList from "./myList/myList";
import {db} from "../../../firebase-config"
import { collection, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./Movies/movieSlice";
export default function MainContent(){

    
    const scrollableDivRef = useRef(null);
    // const savedMoviesListref=collection(db,"savedMovies")
    const dbdata=useSelector((store)=>store.savedMovieList)
    const dispatch =useDispatch();

    // const getSavedMovies=async ()=>{
    //     try {
    //         const data=await getDocs(savedMoviesListref);
    //         const res=
    //         console.log("fibase ka data")
    //         console.log(data.docs.map((doc)=>(doc.data().id)));
    //     } catch (error) {
    //         console.log(error)
    //     }
        
        
    // }
    useEffect(()=>{
        // getSavedMovies();
        // console.log("fibase ka data")
        // console.log(dbdata);

        dispatch(getData());
    },[dispatch]);

    console.log("fibase ka data")
    console.log(dbdata);

    
    return (
    < div className="mainContent" style={{position:"relative", height:"100%"} }> 
        <HomeNavBar scrollableDivRef={scrollableDivRef}/>
        {/* <Home/> */}

        <Routes>
            <Route index element={<Home/>}/>
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/myList" element={<MyList/>}/>
            {/* <Route path="/main/*" element={<Index/>}/> */}
        </Routes>

        


    </div>
    )
}