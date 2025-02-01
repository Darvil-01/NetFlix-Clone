import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addDoc, collection, getDocs ,deleteDoc, query, where, doc, setDoc} from 'firebase/firestore';
import { db } from '../../../../firebase-config';
import { useEffect } from 'react';


export const getData = createAsyncThunk("movieData/getData", async (a,{dispatch}) => {
    const querySnapshot = await getDocs(collection(db, "savedMovies")); 
    const res= querySnapshot.docs.map((doc) => doc.data());
    dispatch(setsavedMovieList(res))
    return res;
   
});

export const postData = createAsyncThunk("movieData/postData", async (newMovie, { dispatch, getState }) => {
    // Optimistically update Redux  

    
    // const { savedMovieList } = getState().movieData; 

    // console.log(savedMovieList)
    // const exists = savedMovieList.some(movie => movie.movieId === newMovie.movieId);
    // if (exists) return;
  
    try {

      await setDoc(doc(db, "savedMovies", String(newMovie.movieId)),{movieId: newMovie.movieId, genreId: newMovie.genreId,genreName: newMovie.genreName});
      dispatch(addInSaveList(newMovie)); 
    } catch (error) {
      console.error("Error adding movie:", error);
      // If Firebase fails, remove the movie from Redux (rollback)
     
    }
  });


  export const deleteData = createAsyncThunk("movies/deleteData", async (movieId, { dispatch }) => {
    try {
        // Find the Firestore document with the matching movieId

        if(!movieId){
          console.log("movie id is not valid")
          return
        }

        await deleteDoc(doc(db, "savedMovies", String(movieId)));  // Delete the document
        

        dispatch(removeMovie(movieId)); // ✅ Update Redux store
    } catch (error) {
        console.error("Error deleting movie:", error);
    }
});

  

const initialState = {
    data: {},  
    savedMovieList: [],  // ✅ This is where fetched IDs should be stored
    player_movieid:'',
    playerFotterVisible:''
};

export const movieSlice = createSlice({
    name: 'movieData',
    initialState,
    reducers: {
        addData: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },
        addInSaveList: (state, action) => {
            state.savedMovieList.push(action.payload);
        },

        setPlayerMovieId:(state,action)=>{
          state.player_movieid=action.payload;
        },

        removeMovie: (state, action) => {
          state.savedMovieList = state.savedMovieList.filter(movie => movie.movieId !== action.payload);
        },

        setsavedMovieList:(state,action)=>{
          state.savedMovieList = action.payload;
        },

        setplayerFotterVisible:(state,action)=>{
          state.playerFotterVisible=action.payload;
        }

        // getPlayerMovieId:(state,action)=>{
        //   return player_movieid;
        // }

        // addMovieId:(state,action)=>{
        //         state.data.push(action.payload);
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            state.savedMovieList = action.payload;  // ✅ Fix: Now saving IDs in savedMovieList
        })
        // .addCase(getData.rejected,(state,action))={
                
                
        // }
    }
});


export const{ addData,addInSaveList,setPlayerMovieId,removeMovie,setsavedMovieList,setplayerFotterVisible}=movieSlice.actions;

export default movieSlice.reducer;