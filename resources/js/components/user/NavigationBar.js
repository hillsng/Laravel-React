import React, { Component } from 'react'
import {Nav, Navbar } from 'react-bootstrap'
import {browserHistory, Link} from 'react-router';
// Import helper
import { helperService } from '../Helper';

export class NavigationBar extends Component {

  logout() {
    helperService.logout();
    browserHistory.push('/');
  }

  render() {
    const checkLogin = helperService.isLoggedIn();
    /*if (window.location.pathname === '/createevent') return null;*/
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link to="/" className="navbar-brand">EventBux</Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      </Nav>
        <Nav className="pl-5">
          {checkLogin ? <Link to="/create-event" className="nav-link">Start event</Link> : ''}
          {!checkLogin ? <Link to="/login" className="nav-link">Login</Link> : <Link to="/login" onClick={this.logout} className="nav-link">Logout</Link>}
          {!checkLogin ? <Link to="/signUp" className="nav-link">Sign Up</Link> : ''}
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    )
  }
}

export default NavigationBar
