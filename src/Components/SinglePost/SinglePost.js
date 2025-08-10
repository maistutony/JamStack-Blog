import React, { useContext } from "react";
import axios from "axios";
import "./singlePost.css"
import { useParams } from "react-router-dom";
import {Card, Button,Form } from "react-bootstrap";
import { AllPostsContext } from "../../Context/Context";
import { useForm } from "react-hook-form";

function SinglePost() {
  const { id } = useParams();
  const { allPosts, setallPosts } = useContext(AllPostsContext);

  const blog = allPosts.filter((item) => item._id == id);
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      mode: "onBlur",
    });
  const registerOptions = {
    comment: { required: "type a comment" }
  };
  const handleComment = (data) => {
    console.log('comment submitted:', data);
  };
  const handleError = (errors) => {
    console.log(errors);
  };
  return(
    <Card style={{display:"flex",alignItems:"center",padding:"8px"}}>
        <Card.Title style={{color:"blue" }}>{blog[0].title}</Card.Title>
    <Card.Img variant="top" src={blog[0].imageUrl} style={{width:"75%" }} />
    <Card.Body>
      <Card.Text style={{color:"gray"}}>
        {blog[0].content}
      </Card.Text>
      <Card.Text style={{color:"green"}}>
       Category :{blog[0].category} | |  <span>Author: {blog[0].author}</span>  
      </Card.Text>
      <Form
        className="comment-form text-dark w-50"
        onSubmit={handleSubmit(handleComment, handleError)}
      >
         <label className="comment-lebel" htmlFor="comments">Have a comment about the blog post it here</label>
        <Form.Group controlId="username">
          <Form.Control
            as="textarea"
            rows={5} // ✅ Controls height
           className="comment-input"
            type="text"
            name="username"
            {...register("username", registerOptions.username)}
          />
          {errors.username && errors.username.type === "required" && (
            <p className="errorMsg">please type a comment</p>
          )}
        </Form.Group>
        <Button className="comment-button" variant="primary" type="submit">
          comment
        </Button>
      </Form>
    </Card.Body>
  </Card>
  )
}

export default SinglePost;
