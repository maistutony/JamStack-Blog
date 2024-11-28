import React,{useContext} from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/Context";
function Protected({ isAuthenticated,children }) {
  const { userData } = useContext(UserContext);
    console.log(userData);
  if (isAuthenticated && (userData !== null)) {
    console.log("this is the dashboard");

    return children;
  } else {
    return <Navigate to="/login" />; 
  }
}
export default Protected;
