import React, { Component } from 'react'
import {NavigationBar} from '../user/NavigationBar';
import {browserHistory, Link} from "react-router";
import MyGlobleSetting from "../MyGlobleSetting";

export class SignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
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
                name: self.state.firstname +' '+ self.state.lastname,
            }
            let uri = MyGlobleSetting.url + '/api/register';
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
            //console.log("ERRORS");

            let errors = this.state.errors;

            errors['notRegistered'] = "Please enter proper details, User not Registered";

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

        if (!this.state.firstname) {
            formIsValid = false;
            errors["firstname"] = "*Please enter First Name.";
        }
        if (!this.state.lastname) {
            formIsValid = false;
            errors["lastname"] = "*Please enter Last Name.";
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
                            <h4 className="text-center wdi-red">Create new account</h4>
                            <hr />
                            <div className="errorMsg">{this.state.errors.notRegistered}</div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-row">
                                    <div className="col-md-12">
                                        <input type="text" name="email" onChange={this.onChangeEvent}
                                               className="form-control form-control-lg flat-input" placeholder="email" />
                                        <div className="errorMsg">{this.state.errors.email}</div>
                                    </div>
                                    <div className="col-md-12">
                                        <input type="password" name="password" onChange={this.onChangeEvent}
                                               className="form-control form-control-lg flat-input" placeholder="password" />
                                        <div className="errorMsg">{this.state.errors.password}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" name="firstname" onChange={this.onChangeEvent}
                                               className="form-control form-control-lg flat-input" placeholder="firstname" />
                                        <div className="errorMsg">{this.state.errors.firstname}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" name="lastname" onChange={this.onChangeEvent}
                                               className="form-control form-control-lg flat-input" placeholder="lastname" />
                                        <div className="errorMsg">{this.state.errors.lastname}</div>

                                    </div>
                                    <button className="btn btn-lg btn-block btn-login">Register</button>
                                    <span className="dividerO">Or</span>
                                    <button type="submit" className="btn btn-lg btn-block btn-facebook">Facebook</button>
                                    <div className="termP text-center">
                                        <p>By continuing, I accept the Eventbux terms of service, community guidelines and have read the privacy policy.</p>
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

export default SignUp