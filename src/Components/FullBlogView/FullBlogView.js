import React, { useContext} from "react";
import { Image, Container, Row} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./FullBlogView.css"
import { UserContext } from "../../Context/Context";

const FullBlogView = () => {
  const location = useLocation();
   const { userData } = useContext(UserContext);
  const postData=location.state.postData
  const datePart =postData.timePublished.split("T")[0];
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
        <div className="author">published {datePart} by:  {userData.user.userName}</div>
        <p className="post-content">{postData.content}</p>
      </Row>
    </Container>
  );
};

export default FullBlogView;
