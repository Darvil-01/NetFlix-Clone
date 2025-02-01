import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './pages/Main_content/Movies/movieSlice';
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

// const persistConfig = {
//   key: "movies", 
//   storage,     
// };



// const persistedReducer=persistReducer(persistConfig,movieReducer);
const store= configureStore({
  reducer: movieReducer,
})

// export const persistor = persistStore(store);

export default store