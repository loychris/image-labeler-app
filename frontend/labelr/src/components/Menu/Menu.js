import React, { Component } from 'react';
import PopupNewAchievement from '../Popup/PopupNewAchievement';
import { Navbar, Nav, NavDropdown, Badge } from 'react-bootstrap';
// import classes from "./Menu.module.css";

class Menu extends Component {


  /*
  Show Link to Login/Register if user is not logged in
  */
  renderLoginSignup() {
    if (!this.props.loggedInAsUser && !this.props.loggedInAsUploader) {
      return <Nav.Link href='/login'>Login/Signup</Nav.Link>;
    }
  }

  /*
  Show User's Menu if user or uploader is logged in
  */
  renderUserMenu() {
    if (this.props.loggedInAsUser || this.props.loggedInAsUploader) {
      return (
        <NavDropdown
          alignRight
          title={this.props.userName}
          id='collasible-nav-dropdown'
        >
          <NavDropdown.Item href=''>User Profile</NavDropdown.Item>
          <NavDropdown.Item href=''>Achievements</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item hrerf=''>Delete Account</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item hrerf='' onClick={this.props.logout}>Logout</NavDropdown.Item>
        </NavDropdown>
      );
    }
  }

  /*
  Show Upload Link if uploader is logged in
  */
  renderLoggedInAsUploader() {
    if (this.props.loggedInAsUploader) {
      return <Nav.Link href=''>Upload new Pictures</Nav.Link>;
    }
  }

  /*
  Show dropdown menu with last uploaded pictures, last labeled pictures and most active users
  */
  renderShowCurrentActivities() {
    if (this.props.loggedInAsUser || this.props.loggedInAsUploader) {
      return (
        <NavDropdown title='Latest activities' id='collasible-nav-dropdown'>
          <NavDropdown.Item href=''>Last uploaded pictures</NavDropdown.Item>
          <NavDropdown.Item href=''>Last labeled pictures</NavDropdown.Item>
          <NavDropdown.Item hrerf=''>Most active users</NavDropdown.Item>
        </NavDropdown>
      );
    }
  }

  /*
  TODO: Connect to backend to enable appearing only when user achieves a new goal/achievement
  */
  renderShowPopupNewAchievement() {
    if (this.props.loggedInAsUser || this.props.loggedInAsUploader) {
      return <PopupNewAchievement />;
    }
  }

  render() {
    return (
      <Navbar collapseOnSelect expand='sm' bg='dark' variant='dark'>
        <Navbar.Brand href='/'>Labelr</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            {this.renderLoginSignup()} 
            {this.renderShowCurrentActivities()}
            {this.renderLoggedInAsUploader()}
          </Nav>
          <Nav>{this.renderUserMenu()}</Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;

