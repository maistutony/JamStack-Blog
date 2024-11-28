import React, { useContext } from "react";
import { isAuthenticatedContext } from "../../Context/Context";
import { UserContext } from "../../Context/Context";
import { Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser,FaSearch } from "react-icons/fa";
import "./Navigationbar.css"

function Navigationbar() {
  const { isAuthenticated, setisAuthenticated } = useContext(
    isAuthenticatedContext
  );
  const {userData,setuserData}=useContext(UserContext)
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Link className="navbar-brand" to="/">
        TT NEWS
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navigation ml-auto">
          <Link className="nav-link mx-2 text-light" to="/">
            Home
          </Link>
          <Link className="nav-link mx-2 text-light" to="/technology">
            Technology
          </Link>
          <Link className="nav-link mx-2 text-light" to="/religion">
            Religion
          </Link>
          <Link className="nav-link mx-2 text-light" to="/culture">
            Culture
          </Link>
          <Link className="nav-link mx-2 text-light" to="/search">
          <FaSearch/>
          </Link>

          <Link
            className={`${
              isAuthenticated && userData !== null
                ? "d-none"
                : "d-block nav-link mx-2 text-light"
            }`}
            to="/login"
          >
            Login
          </Link>
          <Dropdown
            className={`${
              isAuthenticated && userData !== null
                ? "d-inline mx-2 dropdown text-light"
                : "d-none"
            }`}
          >
            <Dropdown.Toggle className="dropdown">
              <FaUser />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/dashboard");
                }}
              >
                dashboard
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/dashboard/manage");
                }}
              >
                manage Blogs
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/dashboard");
                }}
              >
                View Profile
              </Dropdown.Item>
              <Link className="dropdown-item" to="/profile">
                Settings
              </Link>
              <Dropdown.Divider />
              <Link
                className="dropdown-item"
                onClick={(e) => {
                  e.preventDefault();
                  setisAuthenticated(false);
                  setuserData(null);
                  navigate("/");
                }}
              >
                Logout
              </Link>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigationbar;
