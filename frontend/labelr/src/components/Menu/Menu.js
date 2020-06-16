import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import classes from './Menu.module.css';

class Menu extends Component {

    render() {
        return(
            <Navbar /*className={classes.navbar}*/ bg="light" expand="lg">
                <Navbar.Brand  href="/">Labelr</Navbar.Brand>
                <Navbar.Toggle className={classes.navbarbrand} aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <NavDropdown title="Show" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/">User's achievments</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/">Recently uploaded images</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>Signed in as: <a href="/">Testuser One</a></Navbar.Text>
                </Navbar.Collapse>
            </Navbar>

            // <ul className={classes.topnav}>
            //     <li><Link to='/'>Home</Link></li>
            //     <li><Link to='/login'>Login</Link></li>
            //     <li className={classes.drpdn}>
            //         <Link to='/' className={classes.dropbtn}>Show &#8595;</Link>
            //         <div className={classes.drpdnContent}>
            //             <Link to='/'>Latest uploads</Link>
            //             <Link to='/'>Most active user</Link>
            //         </div>
            //     </li>
            //     <li className={classes.user}>Logged in as:<Link className={classes.userLink} to='/'>Testuser One</Link></li>
            // </ul>
        )
    }

    // state = {
    //     expanded: true
    // }

    // expnad = () => {
    //     this.setState({expanded: true})
    // }

    // collapse = () => {
    //     this.setState({expanded: false})
    // }

    // render() {
        
    //     const styleClasses = [classes.menu]; 
    //     if(this.state.expanded === true){
    //         styleClasses.push(classes.expanded); 
    //     } else {
    //         styleClasses.push(classes.collapsed);
    //     }
    //     const collapseButton = this.state.expanded ? <button onClick={this.collapse}>Collapse Menu</button> : null
    //     const expandButton = !this.state.expanded ? <button onClick={this.expnad}>Menu</button> : null
    //     const menuItemsExpanded = this.state.expanded ? 
    //         <div>
    //             <h1>MENU</h1>
    //             <Link to='/'>HOME</Link><br/>
    //             <Link to='/login'>LOGIN</Link>
    //             {/*  ^^^^^^ Nur Dummy Content bisher um Links zu testen. Menu hier befüllen */}
    //         </div> : null; 
    //     const menuItemsCollapsed = !this.state.expanded ? 
    //         <div>
    //             {/* Hier nur icons der Menu optionen */}
    //         </div> : null;

    //     return(
    //         <div className={styleClasses.join(' ')}>
    //             {collapseButton}
    //             {expandButton}
    //             {menuItemsExpanded}
    //             {menuItemsCollapsed}
    //         </div>
    //     )
    // }
}

export default Menu;