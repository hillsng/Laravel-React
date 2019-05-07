require('./bootstrap');
import '../sass/App.css';
import '../sass/custom_app.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';


//import Master from './components/admin/Master';
import Dashboard from './components/Dashboard';
//import CreateEvent from './components/admin/event/CreateEvent';
//import DisplayEvent from './components/admin/event/DisplayEvent';
//import UpdateEvent from './components/admin/event/UpdateEvent';
import CreateEvent from './components/user/event/CreateEvent';
import Login from './components/authentication/Login';
import SignUp from './components/authentication/SignUp';


render(
  <Router history={browserHistory}>
      <Route path="/" component={Dashboard} >
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/create-event" component={CreateEvent} />
  </Router>,
      document.getElementById('eventbux'));

{/*
<Router history={browserHistory}>
    <Route path="/" component={Master} >
        <Route path="/add-event" component={CreateEvent} />
        //<Route path="/display-event" component={DisplayEvent} />
        <Route path="/edit-event/:id" component={UpdateEvent} />
    </Route>
</Router>*/}
