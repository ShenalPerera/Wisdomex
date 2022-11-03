import React, { Component } from "react";
import Axios from "axios";
import {Link as DomLink, Redirect} from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';
import {Link} from "react-scroll";

export class Teacher_Lesson_Info extends Component {
    state = {
        id : null,
        subject_code: null,
        lesson_names : [],
        paper_names:[],
        paper_id : null,
        redirect : null,
        lesson_name : null,
        selectedFile:'',
        input_lesson_name:'',
        lesson_name_err:'',
        upload_file_err:'',
        input_paper_name : '',
        paper_name_err : '',
        add_notes_open:false,
        add_papers_open:false,
        students :[],
        student_id:null,
    };

    handleInputFileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
        })
    }

    handleInputChange = (event) =>{
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }



    validateLessonName = () => {
        let err = '';
        if(this.state.input_lesson_name.length == 0){
           err  = ' * required'
        }

        this.setState(
            {lesson_name_err : err},
            function() {
                this.addNotes();
            }
        );

    }

    validatePaperName = () => {
        let err = '';
        if(this.state.input_paper_name.length == 0){
           err  = ' * required'
        }

        this.setState(
            {paper_name_err : err},
            function() {
                this.addPapers();
            }
        );

    }

    addNotes = () => {
        if(this.state.lesson_name_err === ''){
            const data = new FormData();
            data.append('file', this.state.selectedFile);
            data.append('subject_code', this.state.subject_code);
            data.append('lesson_name' , this.state.input_lesson_name);
            console.log(this.state.input_lesson_name);
            console.log(this.state.subject_code);
            let url = "http://localhost/Wisdomex/Back End/TeacherHomePage/add-notes.php";

            Axios.post(url, data, { // receive two parameter endpoint url ,form data
            })
                .then(res => { // then print response status
                    console.log(res);
                    if(res.status == 200){
                        window.location.reload(false);
                    }
                    let err = '';
                    if(res.status == 203){
                        err = 'Only PDF files are allowed to upload.';
                    }
                    else if(res.status == 204){
                        err = 'Please select a pdf file to upload.';
                    }
                    this.setState({
                        upload_file_err : err
                    })
                })
        }

    }

    addPapers = () => {

        if(this.state.paper_name_err === ''){

            Axios.post(
                "http://localhost/Wisdomex/Back End/TeacherHomePage/add-papers.php",
                {
                    paper_name: this.state.input_paper_name,
                    subject_code: this.state.subject_code,
                },
                {
                    headers: {
                        "content-type": "application/x-www-form-urlencoded",
                    },
                }
            ).then(
                (response) => {
                    console.log(response.data);
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        }

    }

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

    showStudents =(Subject_Code)=>{
        Axios.post(
            "http://localhost/Wisdomex/Back End/TeacherHomePage/get-students.php",
            {
                Subject_Code: Subject_Code
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
    }

    componentDidMount() {
        this.showLessonNames(this.state.subject_code);
        this.showPaperNames(this.state.subject_code);
        this.showStudents(this.state.subject_code);

    }

    static getDerivedStateFromProps(props) {
        return {
            subject_code: props.match.params.subject_code,
            id: props.match.params.id,

        };
    }

    setRedirect = (lesson_name) =>{
        this.setState({
            redirect : "Lesson_Names",
            lesson_name : lesson_name
        })
    }

    setRedirect2 = (paper_id) =>{
        {console.log(paper_id)}
        this.setState({
            redirect : "Paper",
            paper_id : paper_id
        })
    }

    setRedirect3 = (student_id)=>{
        {console.log(student_id)}
        this.setState({
            redirect:"grading",
            student_id : student_id,

        })
    }

    setOpenAddNotes = () => {
        this.setState({
            add_notes_open : !this.state.add_notes_open
        })
    }

    setOpenAddPapers = () => {
        this.setState({
            add_papers_open : !this.state.add_papers_open
        })
    }

    render() {
        if (this.state.redirect == "Lesson_Names") {
            return <Redirect
                to={{
                    pathname: `/Teacher_Notes/${this.state.id}/${this.state.subject_code}/${this.state.lesson_name}`
                }}
            />
        }

        if (this.state.redirect == "Paper") {
            return <Redirect
                to={{
                    pathname: `/Add_Paper/${this.state.id}/${this.state.subject_code}/${this.state.paper_id}`
                }}
            />
        }

        if (this.state.redirect == "grading"){
            return <Redirect
                to={{
                    pathname: `/Mark_Papers/${this.state.id}/${this.state.subject_code}/${this.state.student_id}`
                }}
            />
        }

        let subjects = this.state.lesson_names.map((lesson_name) => {
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

        let papers = this.state.paper_names.map((paper_name) => {
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

        let students = this.state.students.map((Name) => {
            return (
                <div className="row pt-3" key={Name["Student_ID"]}>
                    <div className="col-6 align-self-center offset-3">
                        <button
                            type="button"
                            className="btn button_ btn-rounded rounded btn-lg btn-block"
                            onClick={() => this.setRedirect3(Name["Student_ID"])}
                        >
                            {Name["First_Name"]}
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
                    <div className="logo"><DomLink to={`/Teacher_Home_Page/${this.state.id}`}><div className="wisdomex_">WISDOMEX</div></DomLink></div>
                    <div className="menu">
                        <ul className="font-weight-bold">
                            <li>
                                <DomLink
                                    className="link"
                                    activeClass="true"
                                    to={`/Teacher_Home_Page/${this.state.id}`}
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

                <div className="notes">
                    {/*Notes*/}

                    <div id="Notes_">
                        <div  className="row pt-5 mt-5">
                            <div className="col-6 offset-3">
                                <h3 className="title_ d-flex justify-content-center">Notes</h3>
                            </div>

                        </div>
                        <div className="pb-5">
                            {subjects}
                        </div>

                        <div className="row pt-5">
                            <div className="col-4 align-self-center offset-4">
                                <button className="btn btn-primary btn-rounded rounded btn-lg btn-block"
                                        data-toggle="collapse" data-target="#add_note" aria-expanded="false"
                                        aria-controls="add_note"
                                        onClick={this.setOpenAddNotes}
                                >
                                    Add Notes
                                </button>

                            </div>
                        </div>

                        <Collapse in = {this.state.add_notes_open} timeout = {100} className="collapse pt-5" id="add_note">
                            <div id = "add_notes">
                                <div className="col-md-6 offset-md-3 rounded border border-primary bg-transparent shadow-lg">
                                    <div className="form-row pt-3">
                                        <div className="form-group col-md-12">
                                            <label>Lesson Name</label>
                                            <input width= "100%" type="text" className="form-control input-lg" name="input_lesson_name"
                                                   onChange={this.handleInputChange}/>
                                            <small className="text-danger d-flex justify-content-between d-flex justify-content-between">{this.state.lesson_name_err}</small>
                                        </div>
                                    </div>

                                    <div className="form-row pt-3">
                                        <div className="form-group col-md-12">
                                            <input type="file" className="form-control" name="upload_file"
                                                   onChange={this.handleInputFileChange}/>
                                            <small className="text-danger d-flex justify-content-between d-flex justify-content-between">{this.state.upload_file_err}</small>
                                        </div>
                                    </div>

                                    <div className="form-row pt-3 pb-3">
                                        <div className="col-md-6">
                                            <button type="submit" className="btn btn-primary"
                                                    onClick={this.validateLessonName}>Add Note
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </Collapse>
                    </div>


                    <hr className="line_"/>

                    {/*Papers*/}
                    <div id = "Papers_">
                        <div className="row pt-5">
                            <div className="col-6 offset-3 d-flex justify-content-center">
                                <h3 className="title_">Papers</h3>
                            </div>

                        </div>

                        <div className="pb-5">
                            {papers}
                        </div>


                        <div className="row pt-5">
                            <div className="col-4 align-self-center offset-4">
                                <button className="btn btn-primary btn-rounded rounded btn-lg btn-block"
                                        data-toggle="collapse" data-target="#add_papers" aria-expanded="false"
                                        aria-controls="add_papers"
                                        onClick={this.setOpenAddPapers}
                                >
                                    Add Papers
                                </button>

                            </div>
                        </div>

                        <Collapse in = {this.state.add_papers_open} timeout = {100} className="collapse pt-5" id="add_papers">
                            <div id = "add_notes">
                                <div className="col-md-6 offset-md-3 rounded border border-primary bg-transparent shadow-lg">
                                    <div className="form-row pt-3">
                                        <div className="form-group col-md-12">
                                            <label>Paper Name</label>
                                            <input width= "100%" type="text" className="form-control input-lg" name="input_paper_name"
                                                   onChange={this.handleInputChange}/>
                                            <small className="text-danger d-flex justify-content-between d-flex justify-content-between">{this.state.paper_name_err}</small>
                                        </div>
                                    </div>

                                    <div className="form-row pt-3 pb-3">
                                        <div className="col-md-6">
                                            <button type="submit" className="btn btn-primary"
                                                    onClick={() => this.validatePaperName()}>Add Paper
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </Collapse>
                    </div>


                    <hr className="line_"/>

                    <div>
                        <div className="row pt-5">
                            <div className="col-6 offset-3 d-flex justify-content-center">
                                <h3 className="title_">Students</h3>
                            </div>

                        </div>
                        <div className="pb-5">
                            {students}
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
            </div>


        );
    }
}

export default Teacher_Lesson_Info;

