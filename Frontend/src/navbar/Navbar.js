import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import './Navbar.css';

const NavbarComponent = () => (
  
  <Navbar expand="lg" className="navbar-bgc">
    <Container>
      <Navbar.Brand href="/" className="navbar-logo">
      {/* <img className="logo" src="../img/pica_navbar_icon.jpeg" alt="logo"/> */}
      <p>Army - Tanks</p>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
        <Nav>
          
          <Nav.Link href="/" className="navbar11_dropdown-toggle">Home</Nav.Link>
          <Nav.Link href="/#solutions" className="navbar11_dropdown-toggle">Solutions</Nav.Link>
          <Nav.Link href="/#product-features" className="navbar11_dropdown-toggle">Product Features</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          <Nav.Link href="/demo" className="navbar11_dropdown-toggle"><button className="button-navigation w-button" style={{width:"100%"}}>Request a Demo</button></Nav.Link>         
      </Navbar.Collapse>
    </Container>
  </Navbar>

);
export default NavbarComponent;
