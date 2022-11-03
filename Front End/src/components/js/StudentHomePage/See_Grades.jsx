import React, { Component } from "react";
import Axios from "axios";
import {Link as DomLink, Redirect} from "react-router-dom";
import { Link} from "react-scroll";
import "../../css/Student_Home_Page.css";

export class Check_grade extends Component{
    state={
        id:null,
        subject_name:null,
        subject_code:null,
        grade :[],
        str_grade:[]
    }

    static getDerivedStateFromProps(props) {
        return {
            id: props.match.params.id,
        };
    }

    componentDidMount() {
        this.getGrades(this.state.id);
        this.getStrGrades(this.state.id);
    }

    getGrades = (id) => {
        Axios.post(
            "http://localhost/Wisdomex/Back End/ParentHomePage/get-grades.php",
            {
                student_id: id
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
                    grade: response.data,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    };

    getStrGrades = (id) => {
        Axios.post(
            "http://localhost/Wisdomex/Back End/ParentHomePage/get-str-grade.php",
            {
                student_id: id
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
                    str_grade: response.data,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    };

    render(){
        let comp = this.state.grade.map((grades,index) => {
            return (
                <div className="row pt-5" key={index} >
                    <div className="col-6 align-self-center offset-3">
                        <div className="py-4 px-5 shadow-lg border bg-transparent rounded">
                            <h5 className="mb-0 grades_content">
                                Subject :   {grades["Subject_Name"]} <br/><br/>
                                Paper   :  {grades["Paper_Name"]} <br/><br/>
                                Grade   :  {parseFloat(grades["Grade"]).toFixed(2)} %
                            </h5>
                        </div>



                    </div>
                </div>
            );
        });

        let str = this.state.str_grade.map((str_grades,index) => {
            return (
                <div className="row pt-5" key={index} >
                    <div className="col-6 align-self-center offset-3" >
                        <div className="py-4 px-5 shadow-lg border bg-transparent rounded">
                            <h5 className="mb-0 grades_content">
                                Subject :   {str_grades["Subject_Name"]} <br/><br/>
                                Paper   :  {str_grades["Paper_Name"]} <br/><br/>
                                Grade   :  {parseFloat(str_grades["Grade"]).toFixed(2)} %
                            </h5>
                        </div>



                    </div>
                </div>
            );
        });

        return(
            <div className="wrapper">
                <header className="">
                    <nav className="navigation border-top-0 fixed-top w-100">
                        <div id="logo" className="menu-icon">
                            <i className="fa fa-bars fa-2x"></i>
                        </div>
                        <div className="logo"><DomLink to={`/Student_Home_Page/${this.state.id}`}><div className="wisdomex_">WISDOMEX</div></DomLink></div>
                        <div className="menu">
                            <ul className="font-weight-bold">
                                <li>
                                    <DomLink
                                        className="link"
                                        activeClass="true"
                                        to={`/Student_Home_Page/${this.state.id}`}
                                        spy={true}
                                        smooth={true}
                                        offset={-70}
                                        duration={500}
                                    >
                                        <div className="links_">
                                            Students
                                        </div>
                                    </DomLink>
                                </li>
                                <li>
                                    <DomLink
                                        className="link"
                                        activeClass="true"
                                        to={`/Enroll_subject/${this.state.id}`}
                                        spy={true}
                                        smooth={true}
                                        offset={-70}
                                        duration={500}
                                    >
                                        <div className="links_">
                                            Enroll
                                        </div>
                                    </DomLink>
                                </li>

                                <li>
                                    <DomLink
                                        activeClass="true"
                                        to={`/See_Grades/${this.state.id}`}
                                        spy={true}
                                        smooth={true}
                                        offset={-70}
                                        duration={500}
                                    >
                                        <div className="links_ link_active">
                                            Grades
                                        </div>
                                    </DomLink>
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

                    <div className=" grades_ row pt-5 mt-5 pb-5 mb-5">
                        <div className="col-6">
                            <div className="title_ d-flex justify-content-center">MCQ</div>
                            <div className="justify-content-center align-items-center">
                                {comp}
                            </div>
                        </div>

                        <div className="col-6">
                            <h4 className="title_ d-flex justify-content-center">STRUCTURE</h4>
                            <div className="justify-content-center align-items-center mb-5">
                                {str}
                            </div>
                        </div>

                    </div>
                </header>

                <footer className=" mt-5 fixed-bottom page-footer font-small special-color-dark pt-3 pb-3">

                    <div className="col d-flex justify-content-center">
                        &copy; All Rights Reserved
                    </div>

                    <div className="credits d-flex justify-content-center">
                        Designed by &nbsp; <a href={`/Student_Home_Page/${this.state.id}`}>Wisdomex.com</a>
                    </div>
                </footer>

            </div>
        )
    }

}
export default Check_grade;