import React,{useContext,useState} from "react";
import UserProfile from "../UserProfile/UserProfile";
import DisplayUserBlogs from "../DisplayUserBlogs/DisplayUserBlogs";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";
import { UserContext } from "../../Context/Context";

function Dashboard() {
   const { userData, setuserData } = useContext(UserContext);
  const[welcome,setWelcome]=useState(true)
     // Hide notification after 1 second
     setTimeout(() => {
      setWelcome(false);
    }, 2000);
  return (
    <div>{welcome && (
          <div style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'green',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            zIndex: 9999,
            transition: 'opacity 0.5s ease-in-out',
          }}>
          welcome {userData.user.userName}
        </div>
      )}
    <div className="dashboard">
      <Sidebar />
      <div>
        <UserProfile />
        <DisplayUserBlogs/>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
