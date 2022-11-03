import React, { Component } from "react";
import Axios from "axios";
import {Redirect, Link as DomLink} from "react-router-dom";
import { Link} from "react-scroll";
import "../../css/Student_Home_Page.css";

export class Enroll_subject extends Component{
    state={
        id   : null,
        student_id : null,
        subjects: [],
        subject_code: null,
        redirect: null,
    }

    getSubjects = (id) => {
        Axios.post(
          "http://localhost/Wisdomex/Back End/StudentHomePage/get-enroll-subjects.php",
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
      
    enroll_n_Redirect = (id,subject_code) =>{
        Axios.post(
            "http://localhost/Wisdomex/Back End/StudentHomePage/enroll-to-subjects.php",
            {
              id: id,
              sub_code: subject_code
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
                    redirect: "Student_Home_Page"
                });
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

      setRedirect = () =>{
        this.setState({
          redirect : "Student_Home_Page"
          
        })
      }


      render(){
        
        if(this.state.redirect == "Student_Home_Page"){
            return <Redirect
          to={{
            pathname: `/Student_Home_Page/${this.state.id}`
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
                    onClick={() => this.enroll_n_Redirect(this.state.id,subject["Subject_Code"])}
                  >
                    {subject["Subject_Name"]}
                  </button>
                </div>
              </div>
            );
          });

        return(
            <div className="wrapper">
            <header>
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
                                    to={`/Enroll_subject/${this.state.id}`}
                                    spy={true}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                >
                                    <div className="links_ link_active">
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
                                    <div className="links_">
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

                <div className="pt-5 mt-5 enrol_subs pb-5 mb-5">
                    <div className="position-fixed click_">
                        Click Subject <br/>to Enroll
                    </div>
                    <div className="overflow-auto ">
                        {comp}
                    </div>
                </div>

            </header>

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
export default Enroll_subject;