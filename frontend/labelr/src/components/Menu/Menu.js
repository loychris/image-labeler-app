import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
// import classes from "./Menu.module.css";

class Menu extends Component {
  state = {
    loggedInAsUser: false,
    loggedInAsUploader: true,
    userName: "Testuser One",
  };

  /*
  Show Link to Login/Register if user is not logged in
  */
  renderLoginSignup() {
    if (!this.state.loggedInAsUser && !this.state.loggedInAsUploader) {
      return <Nav.Link href="/login">Login/Signup</Nav.Link>;
    }
  }

  /*
  Show User's Menu if user or uploader is logged in
  */
  renderUserMenu() {
    if (this.state.loggedInAsUser || this.state.loggedInAsUploader) {
      return (
        <NavDropdown
          alignRight
          title={this.state.userName}
          id="collasible-nav-dropdown"
        >
          <NavDropdown.Item href="">User Profile</NavDropdown.Item>
          <NavDropdown.Item href="">Achievements</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item hrerf="">Delete Account</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item hrerf="">Logout</NavDropdown.Item>
        </NavDropdown>
      );
    }
  }

  /*
  Show Upload Link if uploader is logged in
  */
  renderLoggedInAsUploader() {
    if (this.state.loggedInAsUploader) {
      return <Nav.Link href="">Upload new Pictures</Nav.Link>;
    }
  }

  /*
  Show dropdown menu with last uploaded pictures, last labeled pictures and most active users
  */
  renderShowCurrentActivities() {
    if (this.state.loggedInAsUser || this.state.loggedInAsUploader) {
      return (
        <NavDropdown title="Latest activities" id="collasible-nav-dropdown">
          <NavDropdown.Item href="">Last uploaded pictures</NavDropdown.Item>
          <NavDropdown.Item href="">Last labeled pictures</NavDropdown.Item>
          <NavDropdown.Item hrerf="">Most active users</NavDropdown.Item>
        </NavDropdown>
      );
    }
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Brand href="/">Labelr</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {this.renderLoginSignup()} {this.renderShowCurrentActivities()}
            {this.renderLoggedInAsUploader()}
          </Nav>
          <Nav>{this.renderUserMenu()}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;
