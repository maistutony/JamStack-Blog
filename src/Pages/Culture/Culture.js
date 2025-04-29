import React, { useEffect, useState } from "react";
import { Container, Card, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Culture() {
    const source = axios.CancelToken.source();
  const [cultureBlogs, setcultureBlogs] = useState(null);
  async function fetchPosts(category) {
    try {
      const response = await axios.get(
        `http://localhost:8888/.netlify/functions/getCategory/${category}`,
        {
           cancelToken: source.token,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status===200 && response.data !== null) {
        setcultureBlogs(response.data);
        return response.data;
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request was cancelled:", error.message); // This will print "Request timed out"
      } else {
        console.log("Error:", error);
      }
    }
  }
  // set timeout to cancel the request
   setTimeout(() => {
     source.cancel("Request timed out");
   }, 5000);
  useEffect(() => {
    fetchPosts("Culture");
  }, []);
  const navigate = useNavigate();
  return (
    <Container>
      <Row className="my-3">
        {cultureBlogs ? (
          cultureBlogs.map((post) => (
            <Card key={post._id} id={post._id} className="col-md-4  text-dark">
              <Card.Img
                style={{ width: "100%", height: "200px" }}
                variant="top"
                src={post.imageUrl}
              />
              <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description.slice(0, 150)}...</Card.Text>
                <Button
                  className="readmoreBtn"
                  onClick={() =>
                    navigate("/fullBlog", { state: { postData: post } })
                  }
                  variant="primary"
                >
                  read more
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div className="text-dark">Posts Loading...</div>
        )}
      </Row>
    </Container>
  );
}

export default Culture;
