import React, { Component } from 'react';
import "../../css/Add_Paper.css";
import Axios from 'axios';
import Collapse from 'react-bootstrap/Collapse';
import {Link as DomLink} from "react-router-dom";

class Add_Paper extends Component {
    state = {
        id : null,
        paper_id : null,
        subject_code : null,
        mcq_id : 1,
        structured_id : 1,
        paper_name : "",
        question : "",
        str_question : '',
        option1 : "",
        option2 : "",
        option3 : "",
        option4 : "",
        answer : "",
        errors : [],
        str_error : '',
        mcq_open:false,
        str_open:false,
        mcq : [],
        structured: [],
    }

    setMCQOpen = () => {
        this.setState({
            mcq_open : !this.state.mcq_open,
            str_open : false
        })
    }

    setStrOpen = () => {
        this.setState({
            str_open : !this.state.str_open,
            mcq_open : false
        })
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    validate_str = (event) => {
        event.preventDefault();
        let str_err = '';
        if(this.state.str_question === ""){
            str_err = ' * required';
        }
        this.setState({
                str_error : str_err
            },
            function() {
                this.handleSubmitStr(event);
            }
        )
    }

    validate = (event) => {
        event.preventDefault();
        let errors =  {
            question : '',
            option1 : '',
            option2 : '',
            option3 : '',
            option4 : '',
            answer : '',
        }


        if(this.state.question === ""){
            errors.question = ' * required'
        }

        if(this.state.option1 === ""){
            errors.option1 = ' * required'
        }

        if(this.state.option2 === ""){
            errors.option2 = ' * required'
        }

        if(this.state.option3 === ""){
            errors.option3 = ' * required'
        }

        if(this.state.option4 === ""){
            errors.option4 = ' * required'
        }

        if(this.state.answer === ""){
            errors.answer = ' * required'
        }

        this.setState(
            {errors : errors},
            function() {
                this.handleSubmit(event);
            }
        );

    }

    handleSubmit = (event) => {
        // console.log(this.state.errors)
        if(this.isValid(this.state.errors)){
            this.insertQuestion(event, this.state.question, this.state.option1, this.state.option2, this.state.option3, this.state.option4, this.state.answer);
        }


    }

    handleSubmitStr = (event) => {
        // console.log(this.state.errors)
        if(this.state.str_error == ''){
            this.insertQuestionStr(event, this.state.str_question);
        }


    }

    getQuestionNumber = (type) =>{
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
                let question_id = 1;
                if(response.data[0]["COUNT(Question_ID)"] != null){
                    question_id = parseInt(response.data[0]["COUNT(Question_ID)"]) + 1
                }
                if(type == "MCQ"){
                    this.setState({
                        mcq_id : question_id
                    })
                }
                else{
                    this.setState({
                        structured_id : question_id
                    })
                }

            }, (error) => {
                console.log(error);
            });
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

    insertQuestion = (event, question, option1, option2, option3, option4, answer) => {
        event.persist();
        Axios.post('http://localhost/Wisdomex/Back End/TeacherHomePage/add-mcq.php', {
            question: question,
            option1: option1,
            option2: option2,
            option3: option3,
            option4: option4,
            answer: answer,
            paper_id: this.state.paper_id,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    window.location.reload();

                }

            }, (error) => {
                console.log(error);
            });
    }

    insertQuestionStr = (event, question) => {
        event.persist();
        Axios.post('http://localhost/Wisdomex/Back End/TeacherHomePage/add-structured.php', {
            question: question,
            paper_id: this.state.paper_id,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    window.location.reload();

                }

            }, (error) => {
                console.log(error);
            });
    }

    isValid = (errors) => {
        let validity = true;
        Object.keys(errors).forEach(key => {
            if(errors[key] !== ''){
                validity = false;
            }
        });
        return validity;
    }

    componentDidMount() {
        this.getQuestionNumber("MCQ");
        this.getQuestionNumber("STRUCTURED");
        this.getPaperName();
        this.getMCQ();
        this.getStructured();
    }

    static getDerivedStateFromProps(props) {
        return {
            id : props.match.params.id,
            paper_id: props.match.params.paper_id,
            subject_code: props.match.params.subject_code
        };
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

    render() {

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

                        <div className= "pb-3 pt-2">
                            <i>Correct Answer : {mcq["Correct_Answer"]}</i>
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


                <div className="d-flex justify-content-center pt-5 mt-5">
                    <h2 className="title_">{this.state.paper_name}</h2>
                </div>

                {/*MCQ*/}
                <div className="col-6 offset-3 pt-4">
                    <div className="row pt-2">
                        <div className="col">
                            <button className="btn btn-primary btn-rounded rounded btn-lg btn-block"
                                    data-toggle="collapse" data-target="#add_note" aria-expanded="false"
                                    aria-controls="add_note"
                                    onClick={this.setMCQOpen}
                            >
                                Add MCQ Question
                            </button>

                        </div>

                        <div className="col">
                            <button className="btn btn-primary btn-rounded rounded btn-lg btn-block"
                                    data-toggle="collapse" data-target="#add_note" aria-expanded="false"
                                    aria-controls="add_note"
                                    onClick={this.setStrOpen}
                            >
                                Add Structured Question
                            </button>

                        </div>
                    </div>
                </div>

                <Collapse in = {this.state.mcq_open} timeout = {100} className="collapse pt-5">
                    <div className="col-8 offset-2 pt-5">
                        <form onSubmit = {this.validate} id = "add_question">

                            <div className="d-flex justify-content-lg-start pt-3">
                                <h5>Question {parseInt(this.state.mcq_id)}</h5>
                            </div>

                            <div className="form-group pt-5">
                                <div className="row">
                                    <div className="col">
                                    <textarea className="form-control" name="question" placeholder="Question" rows="4" cols="50"
                                              value={this.state.question} onChange={this.handleChange} />
                                        <small className="text-danger d-flex justify-content-between d-flex justify-content-between">{this.state.errors.question}</small>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row pt-5">
                                    <div className="col">
                                    <textarea type="text" className="form-control" name="option1" placeholder="Option 1" rows="2" cols="50"
                                              value={this.state.option1} onChange={this.handleChange} />
                                        <small className="text-danger d-flex justify-content-between d-flex justify-content-between">{this.state.errors.option1}</small>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row pt-2">
                                    <div className="col">
                                    <textarea type="text" className="form-control" name="option2" placeholder="Option 2" rows="2" cols="50"
                                              value={this.state.option2} onChange={this.handleChange} />
                                        <small className="text-danger d-flex justify-content-between d-flex justify-content-between">{this.state.errors.option2}</small>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="row pt-2">
                                    <div className="col">
                                    <textarea type="text" className="form-control" name="option3" placeholder="Option 3" rows="2" cols="50"
                                              value={this.state.option3} onChange={this.handleChange} />
                                        <small className="text-danger d-flex justify-content-between d-flex justify-content-between">{this.state.errors.option3}</small>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group pb-5">
                                <div className="row pt-2">
                                    <div className="col">
                                    <textarea type="text" className="form-control" name="option4" placeholder="Option 4" rows="2" cols="50"
                                              value={this.state.option4} onChange={this.handleChange} />
                                        <small className="text-danger d-flex justify-content-between d-flex justify-content-between">{this.state.errors.option4}</small>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group pb-5">
                                <div className="row pt-2">
                                    <div className="col-6">
                                        <select className="browser-default custom-select" name="answer" onChange={this.handleChange}>
                                            <option selected>Select Correct Answer</option>
                                            <option value="1">Option 1</option>
                                            <option value="2">Option 2</option>
                                            <option value="3">Option 3</option>
                                            <option value="4">Option 4</option>
                                        </select>
                                        <small className="text-danger d-flex justify-content-between d-flex justify-content-between">{this.state.errors.answer}</small>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-50 offset-3  btn btn-success btn-lg btn-block">Add Question</button>

                        </form>
                    </div>
                </Collapse>



                <Collapse in = {this.state.str_open} timeout = {100} className="collapse pt-5">
                    <div className="col-8 offset-2 pt-5">
                        <form onSubmit = {this.validate_str} id = "add_question">

                            <div className="d-flex justify-content-lg-start pt-3">
                                <h5>Question {parseInt(this.state.structured_id)}</h5>
                            </div>

                            <div className="form-group pt-5">
                                <div className="row">
                                    <div className="col">
                                    <textarea className="form-control" name="str_question" placeholder="Question" rows="4" cols="50"
                                              value={this.state.str_question} onChange={this.handleChange} />
                                        <small className="text-danger d-flex justify-content-between d-flex justify-content-between">{this.state.str_error}</small>
                                    </div>
                                </div>
                            </div>


                            <button type="submit" className="w-50 offset-3 btn btn-success btn-lg btn-block mt-5">Add Question</button>

                        </form>
                    </div>
                </Collapse>

                <hr className="line_"/>

                <div className="title_ d-flex justify-content-center pt-5 mt-5">
                    Paper View
                </div>
                <div>
                    {mcqs}
                </div>

                <div>
                    {structured}
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

        )
    }
}

export default Add_Paper











