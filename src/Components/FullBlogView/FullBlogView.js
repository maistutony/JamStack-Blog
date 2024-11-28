import React, { } from "react";
import { Image, Container, Row} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./FullBlogView.css"

const FullBlogView = () => {
  const location = useLocation();
  const postData=location.state.postData
  return (
    <Container>
      <Row className="main-area">
        <div className="category">{ postData.category}</div>
        <h3 className="blog-headline">{postData.title}</h3>
        <Image
          className="blog-image"
          src={postData.imageUrl}
          alt="blog-image"
          fluid
        />
        <div className="author">author</div>
        <p className="post-content">{postData.content}</p>
      </Row>
    </Container>
  );
};

export default FullBlogView;
