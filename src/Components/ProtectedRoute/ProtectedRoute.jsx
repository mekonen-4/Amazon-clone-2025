import React, { useContext, useEffect } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children,msg,redirect}) => {
  const [state, ] = useContext(DataContext);
  const navigate= useNavigate()
  useEffect(() => {
    if(!state?.user){
        navigate('/auth',{state:{msg,redirect}})
    }
  }, [state?.user]);
  return children;
};

export default ProtectedRoute;
