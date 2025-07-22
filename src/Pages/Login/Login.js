import React, { useContext, useState } from "react";
import { isAuthenticatedContext } from "../../Context/Context";
import { Form, Button} from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { UserContext } from "../../Context/Context";

const Login = () => {
  const [wrongPass, setWrongPass] = useState("");
  const navigate = useNavigate();
  const { setisAuthenticated } = useContext(isAuthenticatedContext);
  const {setuserData } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  async function submitData(payload) {
    try {
      const response = await axios.post(
        "http://localhost:8888/.netlify/functions/login",
        payload,
        {
          Headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = response.data;

      if (response.status === 200) {
        setuserData(responseData);
        setisAuthenticated(true);
        navigate("/dashboard");
      } else {
        console.log("server problem");
      }
    } catch (error) {
      if (error.message.includes("Network Error")) {
        console.log("Network Error: Please check your internet connection.");
      } else {
        console.log(error.response.data.message);
      }
    }
  }

  const handleRegistration = (data) => {
    submitData(data);
    reset();
  };
  const handleError = (errors) => {
    console.log(errors);
  };

  const registerOptions = {
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  return (
    
    <div className="w-100 d-flex col-md-8 flex-column justify-content-center align-items-center registration-form">
      <h4 className="login-h4">Login Form</h4>
      <Form
        className="w-50 text-dark"
        onSubmit={handleSubmit(handleRegistration, handleError)}
      >
        <Form.Group controlId="email">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control
            className="form-input"
            type="email"
            name="email"
            {...register("email", registerOptions.email)}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="errorMsg">Email is required.</p>
          )}
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            className="form-input"
            type="password"
            name="password"
            {...register("password", registerOptions.password)}
          />
          {errors.password && errors.password.type === "minLength" && (
            <p className="errorMsg">min of 8 character is required.</p>
          )}
          {errors.password && errors.password.type === "required" && (
            <p className="errorMsg">password is required.</p>
          )}
        </Form.Group>
        <Button className="login-button" variant="primary" type="submit">
          Login
        </Button>
        <div className="login-text">
          Don't Have an account:{" "}
          <span>
            <Link
              className="px-3 text-decoration-none register-btn"
              to="/register"
            >
              Register
            </Link>
          </span>
        </div>
      </Form>
    </div>
   
  );
};

export default Login;
