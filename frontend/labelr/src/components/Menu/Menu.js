import React, { Component } from 'react';
import PopupNewAchievement from '../Popup/PopupNewAchievement';
import { Navbar, Nav, NavDropdown, Badge, Button, Form } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

import classes from './Menu.module.css';

class Menu extends Component {
  /*
  Show Link to Login/Register if user is not logged in
  */
  renderLoginSignup() {
    if (!this.props.loggedIn) {
      return <Nav.Link href='/login'>Login/Signup</Nav.Link>;
    }
  }

  /*
  Show User's Menu if user or uploader is logged in
  */
  renderUserMenu() {
    if (this.props.loggedIn) {
      return (
        <NavDropdown
          alignRight
          title={this.props.userName}
          id='collasible-nav-dropdown'
        >
          <NavDropdown.Item href=''>User Profile</NavDropdown.Item>
          <NavDropdown.Item >Achievements</NavDropdown.Item>
          <NavDropdown.Item >Analytics</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item hrerf=''>Delete Account</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item hrerf='' onClick={this.props.logout}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      );
    }
  }

  /*
  Show Highscore, Achievement and Logout if user is logged in
  */
  renderIsLoggedInAsUser() {
    if (this.props.loggedIn && !this.props.isUploader) {
      return (
        <Nav>
          <NavLink to='/highscore' className={classes.NavLink}>
            Highscore
          </NavLink>
          <NavLink to='/achievements' className={classes.NavLink}>
            Achievements
          </NavLink>
          <NavLink to='/' className={classes.NavLink} onClick={this.props.logout}>
            Logout
          </NavLink>
        </Nav>
      );
    }
  }

  /*
  Show Upload Link if uploader is logged in
  */
  renderLoggedInAsUploader() {
    if (this.props.isUploader) {
      return (
        <Nav>
          <NavLink to='/uploadForm' className={classes.NavLink}>
            Upload Images
          </NavLink>
          <NavLink to='/' onClick={this.props.logout} className={classes.NavLink}>
            Logout
          </NavLink>
        </Nav>
      );
    }
  }

  /*
  Show dropdown menu with last uploaded pictures, last labeled pictures and most active users
  */
  renderShowCurrentActivities() {
    if (this.props.loggedIn) {
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
    if (this.props.loggedIn) {
      return <PopupNewAchievement />;
    }
  }

  render() {
    return (
      <Navbar
        style={{ zIndex: 80 }}
        fixed='top'
        collapseOnSelect
        expand='sm'
        bg='dark'
        variant='dark'
      >
        <Link to='/'>
          <Navbar.Brand>Labelr</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            {/* {this.renderLoginSignup()} */}
            {/* {this.renderShowCurrentActivities()} */}
          </Nav>
          {this.renderIsLoggedInAsUser()}
          {this.renderLoggedInAsUploader()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;
