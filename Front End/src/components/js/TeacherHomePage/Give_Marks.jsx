import React, { Component } from "react";
import {Redirect, Link as DomLink} from "react-router-dom";

import { Link} from "react-scroll";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Axios from "axios";

export class Give_Marks extends Component{
    state={
        id:null,
        paper_id:null,
        answers:[],
        student_id:null,
        subject_code:null,
        grade:null,
        error:""

    };

    static getDerivedStateFromProps(props) {
        return {
            subject_code: props.match.params.subject_code,  
            id: props.match.params.id,
            student_id: props.match.params.student_id,
            paper_id: props.match.params.paper_id
        };
                 
    }
    getAnswers=(subject_code,student_id,paper_id)=>{
        Axios.post(
            "http://localhost/Wisdomex/Back End/TeacherHomePage/get-str-answers.php",
            {
                subject_code: subject_code,
                student_id:student_id,
                paper_id:paper_id
                
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
                    answers: response.data,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }
    componentDidMount(){
         // console.log(this.state.id);
         // console.log(this.state.subject_code);
         // console.log(this.state.student_id);
         // console.log(this.state.paper_id);
        this.getAnswers(this.state.subject_code,this.state.student_id,this.state.paper_id);
    }


    mySubmitHandler=(event)=>{
        event.preventDefault();

        this.addGrade(this.state.grade,this.state.student_id,this.state.paper_id);
    }

    myChangeHandler=(event)=>{
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});

    }
    addGrade=(grade,student_id,paper_id)=>{
        Axios.post(
            "http://localhost/Wisdomex/Back End/TeacherHomePage/add-grade.php",
            {
               grade:grade,
               paper_id:paper_id,
               student_id:student_id
            },
            {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            }
        ).then(
            (response) => {
                console.log(response.data);
                if(response.status==200){
                    this.setState({
                        redirect: "Successful"
                        
                    });
                    window.location.reload(false);
                }
                else{
                    this.setState({
                        error:"something wrong"
                    });
                   
                }
                
            },
            (error) => {
                console.log(error);
            }
        );
    }

    render(){

        if(this.state.redirect=="Successful"){
            return <Redirect
                to={{
                    pathname: `/Teacher_Lesson_Info/${this.state.id}/${this.state.subject_code}`
                }}
            />
        }
        let answerss = this.state.answers.map((ans,index)=>{
            return(
                <div className="row pt-4 pb-4" key={index}>
                    <div className="col-6 align-self-center offset-3 shadow-lg border bg-transparent rounded">

                        <div className="button2_">
                            {ans["Question"]}
                        </div>

                        <div className="button3_ pt-2">
                            {ans["Student_Answer"]}
                        </div>

                    </div>
                </div>
            );
        });

        return(
            <div>

                <nav className="navigation border-top-0 fixed-top w-100">
                    <div id="logo" className="menu-icon">
                        <i className="fa fa-bars fa-2x"></i>
                    </div>
                    <div className="logo"><DomLink to={`/Teacher_Home_Page/${this.state.id}`}><div className="wisdomex_">WISDOMEX</div></DomLink></div>
                    <div className="menu">
                        <ul className="font-weight-bold">
                            <li>
                                <DomLink
                                    className="link"
                                    activeClass="true"
                                    to={`/Mark_Papers/${this.state.id}/${this.state.subject_code}/${this.state.student_id}`}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    <div className="links_">
                                        Papers
                                    </div>
                                </DomLink>
                            </li>


                        </ul>
                    </div>
                </nav>

                <div className="give_marks_">
                    <div className="row pt-5">
                        <div className="col-6 offset-3">
                            <h3 className="title_ pt-5 d-flex justify-content-center">Answers</h3>
                        </div>

                    </div>

                    <div className="pb-5">
                        {answerss}
                    </div>

                    <div>
                        <div className="signup-form form_">
                            <form id="form_login" onSubmit={this.mySubmitHandler}>
                                <h4>Give marks</h4>
                                <div className="form-group pt-3">
                                    <input  className="form-control" placeholder="Enter the mark" name="grade" onChange={this.myChangeHandler}/>
                                </div>
                                <button type="submit" className="btn btn-success btn-lg btn-block mt-4">Give Mark</button>

                            </form>
                        </div>
                    </div>

                </div>




                <footer className="mt-5 fixed-bottom page-footer font-small special-color-dark pt-3 pb-3">

                    <div className="col d-flex justify-content-center">
                        &copy; All Rights Reserved
                    </div>

                    <div className="credits d-flex justify-content-center">
                        Designed by &nbsp; <a href={`/Teacher_Home_Page/${this.state.id}`}>Wisdomex.com</a>
                    </div>
                </footer>

            </div>
        );

    }

}
export default Give_Marks;