import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="py-5">
      <Container>
        <Row>
          <Col md={8}>
            <p>
              &copy; {new Date().getFullYear()} TT NEWS. All rights reserved.
            </p>
          </Col>
          <Col md={4} className="d-flex justify-content-end">
            <ul className="list-unstyled d-flex">
              <li className="mx-3">
                <a href="/about">About</a>
              </li>
              <li className="mx-3">
                <a href="/contact">Contact</a>
              </li>
              <li className="mx-3">
                <a href="/terms">Terms</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
