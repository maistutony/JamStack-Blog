import React, { useEffect, useContext, useState } from "react";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AllPostsContext } from "../../Context/Context";
function Home() {
  const navigate = useNavigate();
  const { allPosts, setallPosts } = useContext(AllPostsContext);
  const [activePage, setActivePage] = useState(1);
  const [loading,setLoading] =useState(true)
 
  const landingPageData = {
    title: "For climate tech startups, the IRA is starting to pay off",
    category:"technology",
    imageUrl:
      "https://techcrunch.com/wp-content/uploads/2023/07/x-twitter-1.jpg?resize=1200,800",
    description:
      "There's been a notable increase in the existence of overall climate startups in the year since the Inflation Reduction Act (IRA) was signed",
    content:
      'Amazon is looking to boost its TikTok-style "Inspire" shopping feed and is offering to pay influencers $25 a video, but some creators are mocking th...',
  };
  //fetching all blog posts
  async function fetchPosts() {
    try {
      const response = await axios.get("http://localhost:5000/posts", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData=response.data
      if (response.status === 200 && responseData.constructor === Array) {
        setallPosts(responseData);
        setLoading(false)
        return responseData;
      } else (
        setLoading(false)
      )
    } catch (error) {
      if (error.response.status === 400 || 401 || 404) {
        setLoading(false)
      }
      console.log(error.response.message);
    }
  }
  useEffect(() => {
     if (allPosts) {
       setLoading(false);
     }
    fetchPosts();
  }, [setLoading]);
  // Pagination logic
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const indexOfLastBlog = activePage * 6;
  const indexOfFirstBlog = indexOfLastBlog - 6;
  let totalPages;
  let currentPosts;
  let trendingPosts;
  if (allPosts!==null) {
    totalPages = Math.ceil(allPosts.length / 6);
    currentPosts = allPosts.slice(indexOfFirstBlog, indexOfLastBlog);
    trendingPosts = allPosts.slice(0, 5);
  }
  return (
    <div>
      <Container fluid>
        <Row className="hero-section">
          <Card text="light" className="col-md-8 main-card blog-card">
            <Card.Img
              variant="top"
              src={landingPageData.imageUrl}
              alt="Blog Post Thumbnail"
              className="landing-image"
            />
            <Card.Body>
              <Card.Title>
                <Link
                  className="landing-page-title"
                  onClick={() =>
                    navigate("/fullBlog", {
                      state: { postData: landingPageData },
                    })
                  }
                >
                  {landingPageData.title}
                </Link>
              </Card.Title>
              <Card.Text>{landingPageData.description}...</Card.Text>
              <Button
                onClick={() =>
                  navigate("/fullBlog", {
                    state: { postData: landingPageData },
                  })
                }
                className="readmoreBtn"
                href=""
                variant="primary"
              >
                Read more
              </Button>
            </Card.Body>
          </Card>
          <Col className="trending col-md-4">
            <h2>Trending</h2>
            {allPosts &&
              loading === false &&
              trendingPosts.map((post) => (
                <Card
                  key={post._id}
                  id={post._id}
                  className="trending-post text-dark"
                  style={{ width: "100%" }}
                >
                  <Card.Body>
                    <Card.Title className="card-title">
                      <Link
                        to={`/fullBlog/${post._id}`}
                        className="trending-title"
                      >
                        {post.title}
                      </Link>
                    </Card.Title>
                    <Card.Text className="trending-description">
                      {post.category}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            {allPosts === null && loading && <div>Loading posts ...</div>}
            {allPosts && loading && <div>Loading posts ...</div>}
          </Col>
        </Row>
        <Row className="d-flex">
          <h3 className="recent-headline">RECENT BLOGS</h3>
          {allPosts ? (
            currentPosts.map((post) => (
              <Card
                key={post._id}
                id={post._id}
                className="col-md-4  text-dark"
              >
                <Card.Img
                  style={{ width: "100%", height: "200px" }}
                  variant="top"
                  src={post.imageUrl}
                />
                <Card.Body>
                  <Card.Text className="category-recent">
                    {post.category}
                  </Card.Text>
                  <Card.Title className="recent-title">{post.title}</Card.Title>
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
            <div>Posts Loading...</div>
          )}

          <div className="pagination-div d-flex justify-content-center align-items-center col-12">
            <Pagination className="custom-pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <Pagination.Item
                  className="pagination-item"
                  key={index}
                  active={index + 1 === activePage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
