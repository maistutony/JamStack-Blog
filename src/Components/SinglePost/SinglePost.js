import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Row,Container,Image } from 'react-bootstrap'

function SinglePost() { 
    const { id } = useParams()
    const [data,setData] =useState()
    async function getData() {
        const response = await axios.get(
          `http://localhost:5000/posts/${id}`,
          {
            headers: {
              "content-type": "application/json",
            },
          },
        );
        if (response.status === 200) {
           setData(response.data[0])
        }
    } 
    useEffect(() => {
        getData();
    },[])
  return (
    <Container>
          {data && <Row className="main-area">
              <div className="category">{data.category}</div>
              <h3 className="blog-headline">{data.title}</h3>
              <Image
                  className="blog-image"
                  src={data.imageUrl}
                  alt="blog-image"
                  fluid
              />
              <div className="author">author</div>
              <p className="post-content">{data.content}</p>
          </Row>
          }
    </Container>
  );
}

export default SinglePost