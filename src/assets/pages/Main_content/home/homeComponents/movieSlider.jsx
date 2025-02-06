import { useEffect, useState } from "react";
import useFetch from "../../useFetch";
import MovieCard from "./movieCard";
import './movieSlider.css'
import '../../../MediaQuery/MQMovieSlider.css'
import { useSelector } from "react-redux";
export default function MovieSlider({tag}){
   
    
    const {apiRes}=useFetch(tag);
    const [apiData,setData]=useState([]);
    // console.log("tag hai "+tag);
    
    
   useEffect(()=>{ 
        if(apiRes && apiRes.length>0)
         setData(apiRes)
    },[apiRes])

    // console.log(tag)
    // console.log(apiRes);

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
   
    return(
        <>
            { apiData &&  apiData.length>0 &&<div className="movieSlider">
                <h2>{tag}</h2>
                <div className="movieCards">
                    {
                        apiData.map((data,index)=>{
                            return <MovieCard key={index} data={data} play={true} />
                        })
                    }
                </div>        
                
            </div>
            }

    </>
    );
}