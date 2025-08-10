import React, { useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Sidebar from "../Sidebar/Sidebar";
import { UserContext } from "../../Context/Context";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { updatedPost } from "../../Hooks/UpdatedPost";
import "./editForm.css"

const EditForm = () => {
  const { userData, setuserData } = useContext(UserContext);
  const location = useLocation();
  const postData = location.state.data;
  const postId = postData._id;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    reset({
      title: postData.title,
      imageUrl:postData.imageUrl,
      description: postData.description,
      content: postData.content,
      category: postData.category,
    });
  }, [reset]);
  async function submitData(payload) {
    try {
      const response = await axios.put(
        `https://ttjamstackblog.netlify.app/.netlify/functions/handlePosts/${postId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userData.token}`,
            "x-request-id":userData.user._id,
          },
        },
      );
      if (response.status === 200) {
        setuserData((prevUserData) => ({
          ...prevUserData,
          userPosts: updatedPost(userData.userPosts, {...payload,_id:postId})
        }));
      }
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleEdit = (data) => {
       const upadatedCategory = data.category.value;
       const payload = { ...data, category: upadatedCategory };
   submitData(payload);
    reset();
  };
  const handleError = (errors) => {
    console.log(errors);
  };

  const registerOptions = {
    title: { },
    imageUrl: {},
    description: {  },
    content: { },
  };
  const category = [
    { value: "Technology", label: "Technology" },
    { value: "Religion", label: "Religion" },
    { value: "Culture", label: "Culture" },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="form-div d-flex justify-content-center align-items-center registration-form">
        <Form
          className="form text-dark"
          onSubmit={handleSubmit(handleEdit, handleError)}
        >
          <Form.Group controlId="title">
            <Form.Label className="form-label">Title</Form.Label>
            <Form.Control
              className="form-input"
              type="text"
              name="title"
              {...register("title", registerOptions.title)}
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label className="form-label">Category</Form.Label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  className="form-input text-dark"
                  {...field}
                  options={category}
                />
              )}
            />
            {errors.category && (
              <p className="errorMsg">This is a required field.</p>
            )}
          </Form.Group>
          <Form.Group controlId="imageUrl">
            <Form.Label className="form-label">Image URL</Form.Label>
            <Form.Control
              className="form-input"
              type="text"
              name="imageUrl"
              {...register("imageUrl", registerOptions.imageUrl)}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label className="form-label">Description</Form.Label>
            <Form.Control
              className="form-input"
              as="textarea"
              rows={3}
              type="text"
              name="description"
              {...register("description", registerOptions.description)}
            />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label className="form-label">Content</Form.Label>
            <Form.Control
              className="form-input"
              as="textarea"
              rows={6}
              type="text"
              name="content"
              {...register("content", registerOptions.content)}
            />
          </Form.Group>
          <Button className="submit-btn" variant="primary" type="submit">
            Edit Blog
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditForm;
