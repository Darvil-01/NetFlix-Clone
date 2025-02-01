import { useEffect, useState } from "react";

export default function useFetch(tag,id){
    // console.log("use fetch chala")
    const [apiRes,setRes]=useState([]);
    const [movieKey,setKey]=useState('');
    
    async function getData(){

        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer <API read Access token>'
            }
          };
        
        const res=await fetch(`https://api.themoviedb.org/3/movie/`+tag+`?language=en-US&page=1`, options)
        const data =await res.json();

        // console.log(`https://api.themoviedb.org/3/movie/`+tag+`?language=en-US&page=1`);
        // console.log(data);
        setRes(data.results)
        
    }   
      

    const getVideo=(movie_id)=>{
      // console.log("movie id hai "+movie_id)
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer <API read Access token>'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => {
          console.log(res.results[0].key);
          setKey(res.results[0].key);
        })
        .catch(err => console.error("video fetching me error "+err));
    }

    useEffect( ()=>{
      if(tag)
        getData();  
      
      if(id) getVideo(id);
    },[]);
      
    return {apiRes,movieKey,getVideo};

    // return apiRes;

    // return getData;
   
}