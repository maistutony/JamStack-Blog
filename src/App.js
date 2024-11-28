import "./App.css";
import React, { useState, useEffect } from "react";
import Navigationbar from "./Components/NavigationBar/Navigationbar";
import Home from "./Pages/Home/Home";
import { isAuthenticatedContext } from "./Context/Context";
import { UserContext } from "./Context/Context";
import { AllPostsContext } from "./Context/Context";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Registration from "./Pages/Registration/Registration";
import Dashboard from "./Components/Dashboard/Dashboard";
import ManageBlogs from "./Components/ManageBlogs/ManageBlogs";
import BlogForm from "./Components/BlogForm/BlogForm";
import EditForm from "./Components/EditForm/EditForm";
import Footer from "./Components/Footer/Footer";
import Culture from "./Pages/Culture/Culture";
import Technology from "./Pages/Technology/Technology";
import SinglePost from "./Components/SinglePost/SinglePost";
import Religion from "./Pages/Religion/Religion";
import FullBlogView from "./Components/FullBlogView/FullBlogView";
import Search from "./Pages/Search/Search";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [userData, setuserData] = useState(null);
  const [isRegistered, setisRegistered] = useState(false);
  const [allPosts, setallPosts] = useState(null);
  useEffect(() => {
    // Retrieve saved layout from local storage
    const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
    const isRegistered = JSON.parse(localStorage.getItem("isRegisterd"));
    const userData = JSON.parse(localStorage.getItem("userData"));
    const allPosts = JSON.parse(localStorage.getItem("allPosts"));
    if (isAuthenticated) {
      setisAuthenticated(isAuthenticated);
    }
    if (userData !== null) {
      setuserData(userData);
    }
    if (isRegistered) {
      setisRegistered(isRegistered);
    }
    if (allPosts !== null) {
      setallPosts(allPosts);
    }
  }, [setisAuthenticated, setuserData, setallPosts, setisRegistered]);
  useEffect(() => {
    // Save the layout to local storage whenever it changes
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("isRegistered", JSON.stringify(isRegistered));
    localStorage.setItem("allPosts", JSON.stringify(allPosts));
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [isAuthenticated, userData, allPosts, isRegistered]);
  return (
    <div className="App">
      <isAuthenticatedContext.Provider
        value={{
          isAuthenticated,
          setisAuthenticated,
          isRegistered,
          setisRegistered,
        }}
      >
        <AllPostsContext.Provider value={{ allPosts, setallPosts }}>
          <UserContext.Provider value={{ userData, setuserData }}>
            <Navigationbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/culture" element={<Culture />} />
              <Route path="/search" element={<Search/>} />
              <Route path="/religion" element={<Religion />} />
              <Route path="/fullBlog/:id" element={<SinglePost />} />
              <Route path="/fullBlog" element={<FullBlogView />} />
              <Route path="/register" element={<Registration />} />
              <Route
                path="/dashboard"
                element={
                  isAuthenticated && userData !== null ? (
                    <Dashboard />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/dashboard/manage"
                element={
                  isAuthenticated && userData !== null ? (
                    <ManageBlogs />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/dashboard/write"
                element={
                  isAuthenticated && userData !== null ? (
                    <BlogForm />
                  ) : (
                    <Login />
                  )
                }
              />
              <Route
                path="/dashboard/edit"
                element={
                  isAuthenticated && userData !== null ? (
                    <EditForm />
                  ) : (
                    <Login />
                  )
                }
              />
            </Routes>
            <Footer />
          </UserContext.Provider>
        </AllPostsContext.Provider>
      </isAuthenticatedContext.Provider>
    </div>
  );
}

export default App;
