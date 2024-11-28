import React,{useContext} from "react";
import UserProfile from "../UserProfile/UserProfile";
import DisplayUserBlogs from "../DisplayUserBlogs/DisplayUserBlogs";
import "./Dashboard.css";
import Sidebar from "../Sidebar/Sidebar";

function Dashboard() {
  return (
    <div className="dashboard">
      <Sidebar />
      <div>
        <UserProfile />
        <DisplayUserBlogs/>
      </div>
    </div>
  );
}

export default Dashboard;
