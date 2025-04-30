import React, { useContext } from "react";
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

  async function deletePost(id) {
    try {
      const response = await axios.delete(`http://localhost:8888/.netlify/functions/handlePosts/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userData.token}`,
          "x-request-id":userData.user._id,
        },
      });
      if (response.status === 200 && typeof response.data === "object") {
        console.log(response.data)
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
  );
};

export default ManageBlogs;
