import React, { Component } from "react";
import Axios from "axios";
import {Link as DomLink, Redirect} from "react-router-dom";
import '../../css/Student_Paper.css';

export class Student_Paper extends Component {
    state = {
        id : null,
        paper_id : null,
        subject_code : null,
        mcq : [],
        structured : [],
        paper_name : null,
        mcq_answers : {
        },
        str_answers : {
        },
        total_questions : null,
        error : "",
        redirect : null,

    };

    componentDidMount() {
        this.getMCQ();
        this.getStructured();
        this.getPaperName();
        this.getTotalQuestions("MCQ");
    }

    getMCQ = () => {
        Axios.post(
            "http://localhost/Wisdomex/Back End/StudentHomePage/get-mcq.php",
            {
                paper_id: this.state.paper_id,
            },
            {
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                },
            }
        ).then(
            (response) => {
                this.setState({
                    mcq: response.data,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getStructured = () => {
        Axios.post(
            "http://localhost/Wisdomex/Back End/StudentHomePage/get-structured.php",
            {
                paper_id: this.state.paper_id,
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
                    structured: response.data,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    static getDerivedStateFromProps(props) {
        return {
            id : props.match.params.id,
            paper_id: props.match.params.paper_id,
            subject_code: props.match.params.subject_code
        };
    }

    getPaperName = () =>{
        Axios.post('http://localhost/Wisdomex/Back End/StudentHomePage/get-paper-name.php', {
            paper_id : this.state.paper_id,
        }, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({
                    paper_name : response.data[0]["Paper_Name"]
                })
            }, (error) => {
                console.log(error);
            });
    }

    handleChange = (e) =>{
        let value = e.target.value;
        let name = e.target.name;
        let q_num = name.substr(1);
        this.setState(prevState => ({
            mcq_answers: {
                ...prevState.mcq_answers,
                [name]: {value,q_num}
            }
        }))
    }

    handleChange2 = (e) =>{
        let value = e.target.value;
        let name = e.target.name;
        let q_num = name.substr(1);
        this.setState(prevState => ({
            str_answers: {
                ...prevState.str_answers,
                [name]: {value,q_num}
            }
        }))
    }

    validate = () =>{
        let err = "";
        if(this.state.total_questions != Object.keys(this.state.mcq_answers).length){
            err = " * answer all the questions"
        }
        this.setState({
            error : err
        },
        function() {
            this.handleSubmit();
        })
    }

    handleSubmit = () => {
        if(this.state.error == ''){
            this.addAnswers();

        }


    }

    getTotalQuestions = (type) =>{
        Axios.post('http://localhost/Wisdomex/Back End/TeacherHomePage/get-question-number.php', {
            paper_id : this.state.paper_id,
            type : type
        }, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => {
                console.log(response);
                let total_questions = 0;
                    if(response.data[0]["COUNT(Question_ID)"] != null){
                    total_questions = parseInt(response.data[0]["COUNT(Question_ID)"])
                }

                this.setState({
                    total_questions : total_questions
                })


            }, (error) => {
                console.log(error);
            });
    }

    addAnswers = () =>{
        Axios.post('http://localhost/Wisdomex/Back End/StudentHomePage/add-answers.php', {
            mcq_answers : this.state.mcq_answers,
            str_answers : this.state.str_answers,
            student_id : this.state.id,
            paper_id : this.state.paper_id,
        }, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
            .then(
            (response) => {
                console.log(response);
                if(response.status == 200){
                    this.setState({
                        redirect: "Student_Lesson_Info",
                    });
                }

            },
            (error) => {
                console.log(error);
            }
        );
    }

    render() {

        if (this.state.redirect == "Student_Lesson_Info") {
            return <Redirect
                to={{
                    pathname: `/Student_Lesson_Info/${this.state.id}/${this.state.subject_code}`
                }}
            />
        }

        let mcqs = this.state.mcq.map((mcq) => {
            return (
                <div className="row pt-5" key={mcq["Question_ID"]}>
                    <div className="col-6 align-self-center offset-3 shadow-lg border bg-transparent rounded">
                        <div className="pt-3">
                            <h5><b>Question</b></h5>
                        </div>
                        <div className= "pb-3 pt-2">
                            <i>{mcq["Question"]}</i>
                        </div>

                        <div className= "pb-3 pt-2">
                            <label className="radio-inline custom-control custom-radio">
                                <input type="radio" name={"q"+mcq["Question_ID"]} value="1" onChange={this.handleChange}/>&nbsp; {mcq["Option1"]}
                            </label>

                            <label className="radio-inline custom-control custom-radio">
                                <input type="radio" name={"q"+mcq["Question_ID"]} value="2" onChange={this.handleChange}/>&nbsp; {mcq["Option2"]}
                            </label>

                            <label className="radio-inline custom-control custom-radio">
                                <input type="radio" name={"q"+mcq["Question_ID"]} value="3" onChange={this.handleChange}/>&nbsp; {mcq["Option3"]}
                            </label>

                            <label className="radio-inline custom-control custom-radio">
                                <input type="radio" name={"q"+mcq["Question_ID"]} value="4" onChange={this.handleChange}/>&nbsp; {mcq["Option4"]}
                            </label>
                        </div>
                    </div>
                </div>
            )

        });

        let structured = this.state.structured.map((struct) => {
            return (
                <div className="row pt-5" key={struct["Question_ID"]}>
                    <div className="col-6 align-self-center offset-3 shadow-lg bg-transparent rounded">
                        <div className="pt-3">
                            <h5><b>Question</b></h5>
                        </div>
                        <div className= "pb-3 pt-2">
                            <i>{struct["Question"]}</i>
                        </div>

                        <div className= "pb-3 pt-2">
                            <textarea className="form-control"  placeholder="Answer" rows="4" cols="50"
                                      name={"q"+struct["Question_ID"]} onChange={this.handleChange2} />
                        </div>


                    </div>
                </div>
            )

        });

        return(
            <div className="paper">
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
                            <li>
                                <DomLink
                                    className="link"
                                    activeClass="true"
                                    to={`/Student_Lesson_Info/${this.state.id}/${this.state.subject_code}`}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    <div className="links_">
                                        Notes & Papers
                                    </div>
                                </DomLink>
                            </li>

                        </ul>
                    </div>
                </nav>

                <div className="paper_">
                    <div className="d-flex justify-content-center pt-5 mt-4 title_">
                        <h2>{this.state.paper_name}</h2>
                    </div>

                    <div className="d-flex justify-content-center pt-3">
                        <h5 className="font-weight-bold title">MCQ Qusetions</h5>
                    </div>

                    {mcqs}

                    <div className="d-flex justify-content-center pt-5">
                        <h5 className="font-weight-bold">Structured Questions</h5>
                    </div>

                    {structured}

                    <div className="row pt-3">
                        <div className="col-6 align-self-center offset-3 shadow-lg bg-transparent rounded">
                            <small className="text-danger d-flex justify-content-center">{this.state.error}</small>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-4 align-self-center offset-4 shadow-lg bg-transparent rounded">
                            <button type="submit" className="btn btn-success btn-lg btn-block"
                                    onClick={this.validate}

                            >Submit Paper</button>
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

        )
    }


}

export default Student_Paper