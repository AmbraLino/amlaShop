import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { UserContext } from '../Auth/UserContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import logo from '../images/logo.jpeg';

const NavBar = () => {
  const nav = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/logout', null, { withCredentials: true });
      setUserInfo(null);
      nav('/profile'); 
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-3">
      <Container fluid>
        <Navbar.Brand href="/" className="fw-bold d-flex align-items-center">
          <img src={logo} width="35" height="35" alt="logo" className="me-2 rounded-circle" />
          Amla Shop
        </Navbar.Brand>

        <Nav className="mx-auto fw-semibold">
          <Nav.Link href="/shop" className="px-3">Shop</Nav.Link>
          <Nav.Link href="/about" className="px-3">About Us</Nav.Link>
          <Nav.Link href="/contact" className="px-3">Contact Us</Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link><i className="fa-solid fa-magnifying-glass"></i></Nav.Link>
          <Nav.Link><i className="fa-regular fa-heart"></i></Nav.Link>
          <Nav.Link href="/cart"><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
          <Nav.Link href="/profile"><i className="fa-regular fa-user"></i></Nav.Link>
        </Nav>

        <Nav className="fw-semibold">
          {userInfo ? (
            <>
              {userInfo.role === "admin" && (
                <>
                  <Nav.Link href="/create" className="px-2">Create</Nav.Link>
                  <Nav.Link href="/adminPanel" className="px-2">Admin Panel</Nav.Link>
                </>
              )}
              <Nav.Link onClick={handleLogout} className="px-2">
                Logout ({userInfo.email})
              </Nav.Link>
            </>
          ) : (
            <>
            </>
          )}
        </Nav>

      </Container>
    </Navbar>
  );
};

export default NavBar;
