import React, {Component} from 'react';
import { Router, Route, Link } from 'react-router';


class Master extends Component {
  render(){
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <h1 className="navbar-brand">EventBux</h1>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/display-event">Home</Link></li>
              {/*<li><Link to="add-event">Create Event</Link></li>
              <li><Link to="display-event">Events</Link></li>*/}
            </ul>
          </div>
        </nav>
          <div>
              {this.props.children}
          </div>
      </div>
    )
  }
}
export default Master;