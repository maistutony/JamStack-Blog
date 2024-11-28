import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";
import { Container, Row,Card,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
   const navigate=useNavigate()

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  async function makeQuery() {
    if (searchQuery) {
      try {
        const response = await axios.get(
          `http://localhost:5000/search?query=${searchQuery}`,
        );
        if (response.status === 200) {
          setSearchResults(response.data);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data.message); // Assuming your backend sends an error message in a "message" field
        } else {
          console.log("An error occurred while fetching data.");
        }
      }
    }
  }
  useEffect(() => {
    makeQuery()
  }, [searchQuery]);

  return (
    <Container>
      <Row>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
        />
      </Row>
      <Row>
        {searchResults ? (
          searchResults.map((post) => (
            <Card key={post._id} id={post._id} className="col-md-4  text-dark">
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
      </Row>
    </Container>
  );
};

export default Search;
