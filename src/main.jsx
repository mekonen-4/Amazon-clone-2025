import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DataProvider from './Components/DataProvider/DataProvider.jsx'
import './index.css'
import App from './App.jsx'
import { initialState, reducer } from './Utility/reducer.js'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState} >     
       <App />
    </DataProvider>
  </StrictMode>
);
