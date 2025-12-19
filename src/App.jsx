import "react-responsive-carousel/lib/styles/carousel.min.css";
import './App.css'

import Routing from './Router/Routing';
import { useContext, useEffect } from "react";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { auth } from "./Utility/fireBase";
import { Type } from "./Utility/action.type";

function App() {
  const [state , dispatch]=useContext(DataContext)
  console.log(state);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      dispatch({ type: Type.SET_USER, user: authUser || null });
    });
    return () => unsubscribe(); // cleanup
  }, []);
  return (
    <>
      <Routing/>
    </>
  );
}

export default App
