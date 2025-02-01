import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store  from './assets/store.js'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
)


