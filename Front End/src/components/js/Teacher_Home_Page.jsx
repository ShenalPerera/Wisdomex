import React, { Component } from "react";
import "../css/Teacher_Home_Page.css";
import { Link} from "react-scroll";

import Axios from "axios";
import {Link as DomLink, Redirect} from "react-router-dom";
import '../css/Login.css';

export class Teacher_Home_Page extends Component {

    state = {
        id : null,
        email: "",
        subjects: [],
        redirect : null,
        subject_code : null,
        subject_name : null
    };

    getSubjects = (id) => {
        Axios.post(
            "http://localhost/Wisdomex/Back End/TeacherHomePage/get-subjects.php",
            {
                id: id,
            },
            {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            }
        ).then(
            (response) => {
                console.log(response.data);
                this.setState({
                    subjects: response.data,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    };

    addSubjects = (id,subject_name) =>{
        Axios.post(
            "http://localhost/Wisdomex/Back End/TeacherHomePage/add-subjects.php",
            {
                id: id,
                sub_name: subject_name
            },
            {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            }
        ).then(
            (response) => {
                console.log(response.data);
                if(response.status == 200){
                    this.setState({

                        redirect: "Teacher_Home_Page"
                    });
                    window.location.reload(false);
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };



    componentDidMount() {
        this.getSubjects(this.state.id);
    }

    static getDerivedStateFromProps(props) {
        return { id: props.match.params.id };
    }

    setRedirect = (subject_code) =>{
        this.setState({
            redirect : "Lesson_Names",
            subject_code : subject_code
        })
    }

    myChangeHandler=(event)=>{
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});

    }
    mySubmitHandler=(event)=>{
        event.preventDefault();

        this.addSubjects(this.state.id,this.state.subject_name);
    }
    render() {
        if (this.state.redirect == "Lesson_Names") {
            return <Redirect
                to={{
                    pathname: `/Teacher_Lesson_Info/${this.state.id}/${this.state.subject_code}`
                }}
            />
        }

        let comp = this.state.subjects.map((subject) => {
            return (
                <div className="row pt-3" key={subject["Subject_Code"]}>
                    <div className="col-6 align-self-center offset-3">
                        <button
                            type="button"
                            className="btn button_ btn-rounded rounded btn-lg btn-block"
                            onClick={() => this.setRedirect(subject["Subject_Code"])}
                        >
                            {subject["Subject_Name"]}
                        </button>
                    </div>
                </div>
            );
        });

        return (
            <div className="wrapper w-100">
                <header>

                    <nav className="navigation border-top-0 fixed-top w-100">
                        <div id="logo" className="menu-icon">
                            <i className="fa fa-bars fa-2x"></i>
                        </div>
                        <div className="logo"><DomLink to={`/Teacher_Home_Page/${this.state.id}`}><div className="wisdomex_">WISDOMEX</div></DomLink></div>
                        <div className="menu">
                            <ul className="font-weight-bold">
                                <li>
                                    <Link
                                        className="link"
                                        activeClass="true"
                                        to="subjects"
                                        spy={true}
                                        smooth={true}
                                        offset={-70}
                                        duration={500}
                                    >
                                        <div className="links_">
                                            Subjects
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="link"
                                        activeClass="true"
                                        to="addSubjects"
                                        spy={true}
                                        smooth={true}
                                        offset={-70}
                                        duration={500}
                                    >
                                        <div className="links_">
                                            Add Subjects
                                        </div>
                                    </Link>
                                </li>

                                <li>
                                    <DomLink
                                        activeClass="true"
                                        to="/Home_Page"
                                        spy={true}
                                        smooth={true}
                                        offset={-70}
                                        duration={500}
                                    >
                                        <div className="links_">
                                            Log Out
                                        </div>
                                    </DomLink>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className=" teacher h-100 w-100">
                        <div className="row">
                            <div className="col-6 offset-1">
                                <h1>
                                    <b>
                                        An investment in knowledge pays
                                        <br /> the best interest
                                    </b>
                                </h1>
                            </div>

                            <div className="col-12 offset-1 pt-5">
                                <button type="button" className="btn btn-primary btn-lg">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <div id="subjects" className="subjects__ w-100">
                    <div className="pt-5 pb-5">{comp}</div>
                </div>
                <div id="addSubjects" className="add_notes_ row h-50 justify-content-center align-items-center">
                    <div >
                        <div className="signup-form form_">
                            <form id="form_login" onSubmit={this.mySubmitHandler}>
                                <h4>Add a Subject</h4>
                                <div className="form-group pt-4">
                                    <input  className="form-control" placeholder="Enter Subject Name" name="subject_name" onChange={this.myChangeHandler}/>
                                </div>
                                <button type="submit" className="btn btn-success btn-lg btn-block mt-5">ADD Subject</button>

                            </form>
                        </div>
                    </div>
                </div>

                <footer className="page-footer font-small special-color-dark pt-5">
                    <ul className="list-unstyled list-inline text-center">
                        <li className="list-inline-item pr-3">
                            <a className="btn-floating btn-lg btn-primary">
                                <i className="fab fa-facebook-f"> </i>
                            </a>
                        </li>
                        <li className="list-inline-item pr-3">
                            <a className="btn-floating btn-lg btn-info">
                                <i className="fab fa-twitter"> </i>
                            </a>
                        </li>
                        <li className="list-inline-item pr-3">
                            <a className="btn-floating btn-lg btn-warning">
                                <i className="fab fa-google-plus-g "> </i>
                            </a>
                        </li>
                        <li className="list-inline-item pr-3">
                            <a className="btn-floatingbtn-lg btn-lg btn-info">
                                <i className="fab fa-linkedin-in"> </i>
                            </a>
                        </li>
                        <li className="list-inline-item pr-3">
                            <a className="btn-floating btn-lg btn-l btn-danger">
                                <i className="fab fa-youtube"> </i>
                            </a>
                        </li>
                    </ul>

                    <div className="footer-copyright text-center py-3">
                        <a href={`/Teacher_Home_Page/${this.state.id}`}>Wisdomex.com</a>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Teacher_Home_Page;
