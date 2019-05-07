import React, {Component} from 'react';
import {Router, Route, Link, browserHistory} from 'react-router';


import {NavigationBar} from '../components/user/NavigationBar';
import {EventBanner} from '../components/user/EventBanner';
import {FooterMenu} from '../components/user/FooterMenu';
import {Login} from '../components/authentication/Login';
//import CreateEvent from "./admin/event/CreateEvent";
//import DisplayEvent from "./admin/event/DisplayEvent";
//import UpdateEvent from "./admin/event/UpdateEvent";

class Dashboard extends Component {
    render(){
        return (
            <React.Fragment>
                <NavigationBar />
                <EventBanner />
                <div className="container">

                </div>
    
                <FooterMenu />
            </React.Fragment>
        )
    }
}
export default Dashboard;