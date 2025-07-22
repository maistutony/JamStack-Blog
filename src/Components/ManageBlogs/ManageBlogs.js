import React, { useState,useContext } from "react";
import { Table } from "react-bootstrap";
import "./ManageBlogs.css";
import Sidebar from "../Sidebar/Sidebar";
import { FaTrash, FaEdit } from "react-icons/fa";
import { UserContext } from "../../Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageBlogs = () => {
  const { userData, setuserData } = useContext(UserContext);
  const userPosts = userData.userPosts;
  const navigation = useNavigate();
   const [notice, setNotice] = useState(false);
  console.log(userPosts)

  async function deletePost(id) {
    try {
      const response = await axios.delete(`http://localhost:8888/.netlify/functions/handlePosts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userData.token}`,
          "x-request-id":userData.user._id,
        },
      });
      console.log(userData)
      if (response.status === 200 && typeof response.data === "object") {
        setNotice(true)
         // Hide notification after 1 second
         setTimeout(() => {
          setNotice(false);
        }, 2000);
        setuserData((prev) => ({
          ...prev,
          userPosts: prev.userPosts.filter((blog) => blog._id !== id)
        }));
        return response.data;
      }
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error.message);
    }
  }
  function handleDelete(e) {
    const postid =
      e.target.parentElement.parentElement.parentElement.getAttribute("postid");
      deletePost(postid);
  }
  function handleEdit(e) {
    const postid =
      e.target.parentElement.parentElement.parentElement.getAttribute("postid");
    const blogToEdit = userData.userPosts.find((blog) => blog._id === postid);
    if (blogToEdit) {
      navigation("/dashboard/edit", { state:{ data: blogToEdit } })
    }
  }
  return (
    <div> {notice && (
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'gray',
        color: 'red',
        padding: '12px 24px',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        zIndex: 9999,
        transition: 'opacity 0.5s ease-in-out',
      }}>
      post deleted
    </div>
  )}
    <div className="d-flex">
      <Sidebar />
      <div className="user-blogs">
        <h4>Manage Blogs</h4>
        <Table striped bordered hover className="blog-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {userPosts ? (
              userPosts.map((blog) => (
                <tr key={blog._id} postid={blog._id}>
                  <td className="blog-title fw-bolder">{blog.title}</td>
                  <td>{ blog.category}</td>
                  <td>{blog.description}</td>
                  <td className="d-flex justify-content-between align-items-center">
                    <FaTrash onClick={handleDelete} className=" delete-btn text-danger" />{" "}
                    <FaEdit onClick={handleEdit} className="edit-btn text-primary" />{" "}
                  </td>
                </tr>
              ))
            ) : (
              <div className="text-dark">You dont have post to manage</div>
            )}
          </tbody>
        </Table>
      </div>
    </div>
    </div>
  );
};

export default ManageBlogs;
