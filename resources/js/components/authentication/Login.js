import React, {Component} from 'react'
import {NavigationBar} from '../user/NavigationBar';
import {browserHistory, Link} from "react-router";
import MyGlobleSetting from "../MyGlobleSetting";
// Import helper
import { helperService } from '../Helper';

export class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            fields:{},
            errors: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeEvent = this.onChangeEvent.bind(this);

    }

    onChangeEvent(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

        let errors = this.state.errors;
        if (!e.target.value.length) {
            errors[e.target.name] = "*Please enter "+[e.target.name];
        }else{
            errors[e.target.name] = "";
        }
        this.setState({
            errors: errors
        });

    }

    handleSubmit(e){
        var self = this;
        e.preventDefault();
        if (self.validateForm()) {
            const fields = {
                email: self.state.email,
                password: self.state.password,
            }
            let uri = MyGlobleSetting.url + '/api/login';
            axios.post(uri, fields)
                .then((response) => {
                    self.handleResponse(response);
                }).catch(function (error) {
                    self.handleResponse(error);
                });
        }

    }

    handleResponse(response){
        if (response.status === 200) {
            localStorage.setItem('AUTH_TOKEN', response.data.success.token);
            browserHistory.push('/');
        } else {
            let errors = this.state.errors;

            errors['unauthorize'] = "Invalid email and/or password";

            this.setState({
                errors: errors
            });

        }
    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "*Please enter Email.";
        }

        if (!this.state.password) {
            formIsValid = false;
            errors["password"] = "*Please enter Password.";
        }

        this.setState({
            errors: errors
        });
        //console.log(formIsValid);
        return formIsValid;

    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar />
            <div className="loginApp container">
                <div className="row justify-content-md-center">
                    <div className="col-md-6 col-md-auto login-box">
                        <h4 className="text-center wdi-red">Login to account</h4>
                        <hr/>
                        <div className="errorMsg">{this.state.errors.unauthorize}</div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                <div className="col-md-12">
                                    <input type="text" name="email" onChange={this.onChangeEvent}
                                           className="form-control form-control-lg flat-input" placeholder="email"/>
                                    <div className="errorMsg">{this.state.errors.email}</div>
                                </div>
                                <div className="col-md-12">
                                    <input type="password" name="password" onChange={this.onChangeEvent}
                                           className="form-control form-control-lg flat-input" placeholder="password"/>
                                    <div className="errorMsg">{this.state.errors.password}</div>
                                </div>
                                <button className="btn btn-lg btn-block btn-login">Login</button>
                                <span className="dividerO">Or</span>
                                <button type="submit" className="btn btn-lg btn-block btn-facebook">Facebook</button>
                                <div className="termP text-center">
                                    <p>By continuing, I accept the Eventbux terms of service, community guidelines and
                                        have read the privacy policy.</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </React.Fragment>
        )
    }
}

export default Login
