import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Sidebar from "../Sidebar/Sidebar";
import { UserContext } from "../../Context/Context";
import axios from "axios";
import "./blogForm.css";

const BlogForm = () => {
  const [notice, setNotice] = useState(false);
  const { userData, setuserData } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  async function submitData(payload) {
    try {
      console.log(userData.user._id);
      const response = await axios.post(
        `http://localhost:8888/.netlify/functions/handlePosts`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${userData.token}`,
            "X-Request-ID": userData.user._id,
          },
        }
      );
      if (response.status === 200) {
        setuserData((prevUserData) => {
          const updatedPosts = prevUserData.userPosts
            ? [...prevUserData.userPosts, response.data.postToSave]
            : [response.data.postToSave];

          setNotice(true);
          // Hide notification after 1 second
          setTimeout(() => {
            setNotice(false);
          }, 2000);
          return {
            ...prevUserData,
            userPosts: updatedPosts,
          };
        });
      }

      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleRegistration = (data) => {
    const upadatedCategory = data.category.value;
    const payload = { ...data, category: upadatedCategory };
    submitData(payload);
    reset();
  };
  const handleError = (errors) => {
    console.log(errors);
  };

  const registerOptions = {
    title: { required: "title is required" },
    imageUrl: {},
    description: { required: "description is required" },
    content: { required: "content is required" },
  };
  const category = [
    { value: "Technology", label: "Technology" },
    { value: "Religion", label: "Religion" },
    { value: "Culture", label: "Culture" },
  ];

  return (
    <div>
    {notice && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 9999,
          transition: 'opacity 0.5s ease-in-out',
        }}>
        post published
      </div>
    )}
    <div className="d-flex">
      <Sidebar />
      <div className="form-div d-flex justify-content-center align-items-center registration-form">
        <Form
          className="form text-dark"
          onSubmit={handleSubmit(handleRegistration, handleError)}
        >
          <Form.Group controlId="title">
            <Form.Label className="form-label">Title</Form.Label>
            <Form.Control
              className="form-input"
              type="text"
              name="title"
              {...register("title", registerOptions.title)}
            />
            {errors.title && errors.title.type === "required" && (
              <p className="errorMsg">Title is required.</p>
            )}
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label className="form-label">Category</Form.Label>
            <Controller
              name="category"
              control={control}
              defaultValue={null}
              rules={{ required: true }}
              render={({ field }) => (
                <Select className="form-input" {...field} options={category} />
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
            {errors.description && errors.description.type === "required" && (
              <p className="errorMsg">Description is required.</p>
            )}
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
            {errors.content && errors.content.type === "required" && (
              <p className="errorMsg">Content is required.</p>
            )}
          </Form.Group>
          <Button className="submit-btn" variant="primary" type="submit">
            Submit Blog
          </Button>
        </Form>
      </div>
    </div>
    </div>
  );
};

export default BlogForm;
