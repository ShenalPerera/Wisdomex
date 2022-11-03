import React, { Component } from "react";
import Axios from "axios";
import {Link as DomLink, Redirect} from "react-router-dom";

export class Student_Lesson_Info extends Component {
    state = {
        id : null,
        subject_code: null,
        lesson_names : [],
        paper_names : [],
        redirect : null,
        lesson_name : null,
        paper_name : null,
        paper_id : null
    };



    showLessonNames = (Subject_Code) => {
        Axios.post(
            "http://localhost/Wisdomex/Back End/StudentHomePage/get-lessonnames.php",
            {
                Subject_Code: Subject_Code,
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
                    lesson_names: response.data,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    showPaperNames = (Subject_Code) => {
        Axios.post(
            "http://localhost/Wisdomex/Back End/StudentHomePage/get-papernames.php",
            {
                Subject_Code: Subject_Code,
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
                    paper_names: response.data,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    componentDidMount() {
        this.showLessonNames(this.state.subject_code);
        this.showPaperNames(this.state.subject_code);
    }

    static getDerivedStateFromProps(props) {
        return {
            subject_code: props.match.params.subject_code,
            id : props.match.params.id
        };
    }

    setRedirect = (lesson_name) =>{
        this.setState({
            redirect : "Lesson_Names",
            lesson_name : lesson_name
        })
    }

    setRedirect2 = (paper_id) =>{
        this.setState({
            redirect : "Paper",
            paper_id : paper_id
        })
    }




    render() {
        if (this.state.redirect == "Lesson_Names") {
            return <Redirect
                to={{
                    pathname: `/Student_Notes/${this.state.id}/${this.state.subject_code}/${this.state.lesson_name}`
                }}
            />
        }
        else if (this.state.redirect == "Paper") {
            return <Redirect
                to={{
                    pathname: `/Student_Paper/${this.state.id}/${this.state.subject_code}/${this.state.paper_id}`
                }}
            />
        }

        let lesson_names = this.state.lesson_names.map((lesson_name) => {
            return (
                <div className="row pt-3" >
                    <div className="col-6 align-self-center offset-3">
                        <button
                            type="button"
                            className="btn button_ btn-rounded rounded btn-lg btn-block"
                            onClick={() => this.setRedirect(lesson_name["Lesson_Name"])}
                        >
                            {lesson_name["Lesson_Name"]}
                        </button>
                    </div>
                </div>
            );
        });

        let paper_names = this.state.paper_names.map((paper_name) => {
            return (
                <div className="row pt-3" key={paper_name["Paper_ID"]}>
                    <div className="col-6 align-self-center offset-3">
                        <button
                            type="button"
                            className="btn button_ btn-rounded rounded btn-lg btn-block"
                            onClick={() => this.setRedirect2(paper_name["Paper_ID"])}
                        >
                            {paper_name["Paper_Name"]}
                        </button>

                    </div>
                </div>
            );
        });

        return (
            <div>
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
                                        Subjects
                                    </div>
                                </DomLink>
                            </li>


                        </ul>
                    </div>
                </nav>


                {/*Notes*/}
                <div className="notes">
                    <div className="row pt-5 mt-3">
                        <div className="col-6">
                            <div className="pt-4 d-flex justify-content-center">
                                <h3 className="title_">Notes</h3>
                            </div>
                            {lesson_names}
                        </div>


                        <div className="col-6">
                            <div className="pt-4 d-flex justify-content-center ">
                                <h3 className="title_">Papers</h3>
                            </div>
                            {paper_names}
                        </div>


                    </div>

                </div>

                <footer className="mt-5 fixed-bottom page-footer font-small special-color-dark pt-3 pb-3">

                    <div className="col d-flex justify-content-center">
                        &copy; All Rights Reserved
                    </div>

                    <div className="credits d-flex justify-content-center">
                        Designed by &nbsp; <a href={`/Student_Home_Page/${this.state.id}`}>Wisdomex.com</a>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Student_Lesson_Info;

