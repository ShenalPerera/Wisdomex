import React, { Component } from "react";
import Axios from "axios";
import FileViewer from 'react-file-viewer';
import {Link as DomLink} from "react-router-dom";

export class Teacher_Notes extends Component {
    state = {
        id : null,
        subject_code : null,
        lesson_name : null,
        contents : []
    };



    showNotes = () => {
        Axios.post(
            "http://localhost/Wisdomex/Back End/StudentHomePage/get-notes.php",
            {
                lesson_name: this.state.lesson_name,
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
                this.setState({
                    contents: response.data,
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    componentDidMount() {
        this.showNotes();
    }

    static getDerivedStateFromProps(props) {
        return {
            lesson_name: props.match.params.lesson_name,
            id: props.match.params.id,
            subject_code: props.match.params.subject_code
        };
    }



    render() {

        let comp = this.state.contents.map((content) => {
            return (
                <div className="row" >
                    <div className="col-6 pt-5 offset-3">

                        <FileViewer

                            fileType='pdf'
                            filePath={`data:image/jpeg;base64,${content}`}

                            // errorComponent={CustomErrorComponent}
                            // onError={this.onError}
                        />



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

                <div className="notes_view mt-5">
                    {comp}
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

export default Teacher_Notes;

