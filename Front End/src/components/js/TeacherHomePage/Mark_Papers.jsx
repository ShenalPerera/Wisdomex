import React, { Component } from "react";
import {Redirect, Link as DomLink} from "react-router-dom";

import { Link} from "react-scroll";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Axios from "axios";

export class Mark_Papers extends Component{
    state={
        id:null,
        papers:[],
        subject_code:null,
        student_id:null,
        redirect:null,
        paper_id:null
    };

    static getDerivedStateFromProps(props) {
        return {subject_code: props.match.params.subject_code,  
                
                 id: props.match.params.id,
                 student_id: props.match.params.student_id,
                 };
                 
    }

    getAnswers= (Subject_code)=>{
        Axios.post(
            "http://localhost/Wisdomex/Back End/TeacherHomePage/get-papername.php",
            {
                subject_code: Subject_code
                
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
                    papers: response.data,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    componentDidMount(){
        this.getAnswers(this.state.subject_code);
    }
    setRedirect = (Paper_ID)=>{
        this.setState({
            redirect:"Give_Marks",
            paper_id:Paper_ID
        });
    }

    render(){

        if(this.state.redirect=="Give_Marks"){
            return <Redirect
                to={{
                    pathname: `/Give_Marks/${this.state.id}/${this.state.subject_code}/${this.state.student_id}/${this.state.paper_id}`
                }}
            />
        }
        let papersname = this.state.papers.map((ans)=>{
            return(
                <div className="row pt-3" key={ans["Paper_ID"]}>
                    <div className="col-6 align-self-center offset-3">
                        <button
                            type="button"
                            className="btn button_ btn-rounded rounded btn-lg btn-block"
                            onClick={() => this.setRedirect(ans["Paper_ID"])}
                        >
                            {ans["Paper_Name"]}
                        </button>

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
                                    to={`/Teacher_Lesson_Info/${this.state.id}/${this.state.subject_code}`}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    <div className="links_">
                                        Subject Info
                                    </div>
                                </DomLink>
                            </li>


                        </ul>
                    </div>
                </nav>

                <div className="marks_info_">
                    <div className="row pt-5">
                        <div className="col-6 offset-3">
                            <h3 className="title_ d-flex justify-content-center pt-5">PAPERS</h3>
                        </div>

                    </div>

                    <div className="pb-5">
                        {papersname}
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
export default Mark_Papers;