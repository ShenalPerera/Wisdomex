import React from 'react';
import  { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';
import { Link,Redirect } from 'react-router-dom';
import Axios from 'axios';
import {HashLink as HLink} from "react-router-hash-link";

export default class Parent_Login_Page extends Component {

    constructor(props){
        super(props);
        this.state={
            id : null,
            Email:'',
            Password:'',
            errors:'',
            redirect: null
        };
    }


    myChangeHandler=(event)=>{
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});

    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        if(!this.state.Email || !this.state.Password){
            this.setState({
                    errors: "* Please Enter Email/Password"
                }

            );
        }

        this.insertUser(event,this.state.Email,this.state.Password);

    }



    insertUser = (event,Email, Password) => {
        event.persist();
        Axios.post('http://localhost/Wisdomex/Back End/Login/login-parent.php',{
                Email:Email,
                Password:Password
            },
            {headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }}
        )
            .then((response) => {
                console.log(response);
                if (response.status == 202) {
                    this.setState({
                        id : response.data[0]["Parent_ID"],
                        errors: "",
                        redirect:"Parent_Home_Page"
                    })

                } else {
                    this.setState({
                        errors:'* Invalid Email or Password'
                    })
                }

            }, (error) => {
                console.log(error);
            });
    }


    render() {
        if (this.state.redirect) {
            // return <Redirect to={this.state.redirect} />
            return <Redirect
                to={{
                    pathname: `/Parent_Home_Page/${this.state.id}`
                }}
            />
        }

        return (
            <div className="back">

                <header id="header" className="fixed-top">
                    <div className="container d-flex">
                        <div className="row">
                            <div className="logo mr-auto">
                                <h1 className="text-light">
                                    <Link to="/Home_Page">WISDOMEX</Link>
                                </h1>
                                {/* <a href="index.html"><img src="/assets/img/logo.png" alt="" className="img-fluid"/></a> */}
                            </div>

                            <nav className="nav-menu d-none d-lg-block">
                                <ul>
                                    <li className="active">
                                        <HLink to="HomePage/#top">Home</HLink>
                                    </li>
                                    <li>
                                        <HLink to="Home_Page/#main">About Us</HLink>
                                        {/*<a href="#about">About Us</a>*/}
                                    </li>
                                    <li>
                                        <HLink to="Home_Page/#team">Editors</HLink>
                                    </li>
                                    <li>
                                        <HLink to="/Login_Selection">Login</HLink>
                                    </li>
                                    <li className="register">
                                        <HLink to="/Register_Selection">Register</HLink>
                                    </li>
                                    <li>
                                        <HLink to="/HomePage#contact">Contact Us</HLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>


                <div className = "signup-form">
                    <form id="form_login" onSubmit={this.mySubmitHandler}>
                        <h2>Log in</h2>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" name="Email" onChange={this.myChangeHandler}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" name="Password" onChange={this.myChangeHandler}/>
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-success btn-lg btn-block">Log in</button>
                        <div className="error_message">
                            <small className="text-danger d-flex justify-content-between">{this.state.errors}</small>
                        </div>
                        <p className="new-user_sign_up">
                            New User? <Link to='Parent_SignUp_Page'>Sign Up</Link>
                        </p>

                    </form>
                </div>

                <footer id="footer" className="pt-4 pb-4 fixed-bottom">
                    <div className="container">
                        <div className="col d-flex justify-content-center">
                            &copy; All Rights Reserved
                        </div>

                        <div className="credits d-flex justify-content-center">
                            Designed by &nbsp;<a href="/">Wisdomex.com</a>
                        </div>
                    </div>
                </footer>

            </div>

        );
    }
}