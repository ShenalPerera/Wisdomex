import React, { Component } from "react";
import "../css/Parent_Home_Page.css";
import { Link} from "react-scroll";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Axios from "axios";
import '../css/Login.css';
import {Link as DomLink, Redirect} from "react-router-dom";
import Teacher_Home_Page from "./Teacher_Home_Page";

export class Parent_Home_Page extends Component {

    state = {
        id : null,
        students: [],
        redirect : null,
        student_id : null,
        student_email:null,
        student_name : null,
        err:""
    };

    addStudent = (student_email,student_name,id) => {
        Axios.post(
            "http://localhost/Wisdomex/Back End/ParentHomePage/add-student.php",
            {
                student_email: student_email,
                student_name: student_name,
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
                // this.setState({
                //     subjects: response.data,
                // });
                if(response.status==200){
                    window.location.reload(false);
                }
                else if(response.status == 201){
                    this.setState({
                        err:" * cannot add. try again"
                    });
                }
            },
            (error) => {
                console.log(error);
            }
        );
    };

    getStudent = (id) => {
        Axios.post(
            "http://localhost/Wisdomex/Back End/ParentHomePage/get-students.php",
            {
                id: id
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
                    students: response.data,
                });
              
            },
            (error) => {
                console.log(error);
            }
        );
    };

    componentDidMount() {
        this.getStudent(this.state.id);
    }
    
    static getDerivedStateFromProps(props) {
        return { id: props.match.params.id };
    }
    //
    setRedirect = (Student_ID) =>{
        this.setState({
            redirect : "Check_Student",
            student_id : Student_ID
        })
    }
    myChangeHandler = (event)=>{
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
    mySubmitHandler = (event)=>{
        event.preventDefault();
        if(!this.state.student_name || !this.state.student_email){
            this.setState({
                err:" * please enter name and email"
            });
        }
        else{
            this.addStudent(this.state.student_email,this.state.student_name,this.state.id);
        } 
    }

    
    render() {
        if (this.state.redirect == "Check_Student") {
            return <Redirect
                to={{
                    pathname: `/Check_grade/${this.state.id}/${this.state.student_id}`
                }}
            />
        }

        let comp = this.state.students.map((student) => {
            return (
                <div className="row pt-3" key={student["Student_ID"]}>
                    <div className="col-6 align-self-center offset-3">
                        <button
                            type="button"
                            className="btn button_ btn-rounded rounded btn-lg btn-block"
                            onClick={() => this.setRedirect(student["Student_ID"])}
                        >
                            {student["First_Name"]}
                        </button>
                    </div>
                </div>
            );
        });

        return (
            <div className="wrapper">

                <header>
                    <nav className="navigation border-top-0 fixed-top w-100">
                        <div id="logo" className="menu-icon">
                            <i className="fa fa-bars fa-2x"></i>
                        </div>
                        <div className="logo"><DomLink to={`/Parent_Home_Page/${this.state.id}`}><div className="wisdomex_">WISDOMEX</div></DomLink></div>
                        <div className="menu">
                            <ul className="font-weight-bold">
                                <li>
                                    <Link
                                        className="link"
                                        activeClass="true"
                                        to="students"
                                        spy={true}
                                        smooth={true}
                                        offset={-70}
                                        duration={500}
                                    >
                                        <div className="links_">
                                            Students
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="link"
                                        activeClass="true"
                                        to="addStudents"
                                        spy={true}
                                        smooth={true}
                                        offset={-70}
                                        duration={500}
                                    >
                                        <div className="links_">
                                            Add Student
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

                    <div className="parent h-100">
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

                <div className="children_">
                    <div id="students">
                        <div className="pt-5 pb-3">{comp}</div>
                    </div>
                    <div id ="addStudents" className="pb-5">
                        <div >
                            <div className="signup-form form_">
                                <form id="form_login" onSubmit={this.mySubmitHandler}>
                                    <h4>Add a Student</h4>
                                    <div className="form-group">
                                        <label>Student's Name</label>
                                        <input  className="form-control" placeholder="Enter Student Name" name="student_name" onChange={this.myChangeHandler}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Student's Email</label>
                                        <input  className="form-control" placeholder="Enter Student Email" name="student_email" onChange={this.myChangeHandler}/>
                                    </div>
                                    <div className="error_message">
                                        <small className="text-danger d-flex justify-content-between">{this.state.err}</small>
                                    </div>
                                    <button type="submit" className="btn btn-success btn-lg btn-block mt-3">ADD</button>

                                </form>
                            </div>
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
                        <a href={`/Parent_Home_Page/${this.state.id}`}>Wisdomex.com</a>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Parent_Home_Page;