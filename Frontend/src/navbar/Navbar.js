import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import './Navbar.css';

const NavbarComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <Navbar expand="lg" className="navbar-bgc">
      <Container>
        <Navbar.Brand href="/" className="navbar-logo">
          <img className="logo" src="../img/tankNav.png" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
          <Nav>
            <Nav.Link href="/" className="navbar11_dropdown-toggle">Home</Nav.Link>
            <Nav.Link href="/add" className="navbar11_dropdown-toggle">Add New Tank</Nav.Link>
            <Nav.Link href="/import" className="navbar11_dropdown-toggle">Import</Nav.Link>
            {isLoggedIn ? (
              <Nav.Link href="/download" className="navbar11_dropdown-toggle">Export</Nav.Link>
            ) : (<></>
            )}
            <Nav.Link href="/analytics" className="navbar11_dropdown-toggle">Analytics</Nav.Link>
            <Nav.Link href="/search" className="navbar11_dropdown-toggle">Search</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {isLoggedIn ? (
            <Nav.Link href="/logout" className="navbar11_dropdown-toggle">
              <button onClick={handleLogout} className="button-navigation w-button" style={{ width: "100%" }}>Logout</button>
            </Nav.Link>
          ) : (
            <Nav.Link href="/login" className="navbar11_dropdown-toggle">
              <button className="button-navigation w-button" style={{ width: "100%" }}>Login</button>
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
