import React from 'react';
import  { Component } from "react";
import { Link } from 'react-router-dom';

export default class Login_Selection extends Component {

    render() {

        return(
            <div className="log">

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
                                        <Link to="/Home_Page#top">Home</Link>
                                    </li>
                                    <li>
                                        <Link to="/Home_Page#main">About Us</Link>
                                        {/*<a href="#about">About Us</a>*/}
                                    </li>
                                    <li>
                                        <Link to="/Home_Page#team">Editors</Link>
                                    </li>
                                    <li>
                                        <Link to="/Login_Selection">Login</Link>
                                    </li>
                                    <li className="register">
                                        <Link to="/Register_Selection">Register</Link>
                                    </li>
                                    <li>
                                        <Link to="/Home_Page#contact">Contact Us</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </header>


                <div className="row  justify-content-center align-items-center log_mid">


                    <Link className="btn p-5" to="/Student_Login_Page">
                        <div className="bg-white rounded shadow-sm py-5 px-4">
                            <img src="/img/log/student.jpg" alt="" width="200"
                                 className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                            <h5 className="mb-0">Login As a Student</h5>
                        </div>
                    </Link>

                    <Link className="btn p-5" to="/Teacher_Login_Page">
                        <div className="bg-white rounded shadow-sm py-5 px-4">
                            <img src="/img/log/teacher.jpg" alt="" width="200"
                                 className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                            <h5 className="mb-0">Login As a Teacher</h5>
                        </div>
                    </Link>

                    <Link className="btn p-5" to="/Parent_Login_Page">
                        <div className="bg-white rounded shadow-sm py-5 px-4">
                            <img src="/img/log/parent.jpg" alt="" width="200"
                                 className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"/>
                            <h5 className="mb-0">Login As a Parent</h5>
                        </div>
                    </Link>
            </div>


            <footer id="footer" className="pt-3 pb-3 fixed-bottom">
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

        )
    }
}