import React, { Component } from "react";
import {Redirect, Link as DomLink} from "react-router-dom";
import "../css/Student_Home_Page.css";
import { Link} from "react-scroll";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Axios from "axios";

export class Student_Home_Page extends Component {

  state = {
    email: "",
    id : null,
    subjects: [],
    redirect : null,
    subject_code : null
  };

  getSubjects = (id) => {
    Axios.post(
      "http://localhost/Wisdomex/Back End/StudentHomePage/get-subjects.php",
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




  componentDidMount() {
    console.log(this.state.email);
    this.getSubjects(this.state.id);
    // this.getStudentID();
  }

  static getDerivedStateFromProps(props) {
    return { id: props.match.params.id };
  }

  setRedirect = (subject_code) =>{
    this.setState({
      redirect : "Lesson_Names",
      subject_code : subject_code
    })
  }



  render() {
    if (this.state.redirect == "Lesson_Names") {
      return <Redirect
          to={{
            pathname: `/Student_Lesson_Info/${this.state.id}/${this.state.subject_code}`
          }}
      />
    }


    let comp = this.state.subjects.map((subject) => {
      return (
        <div className="row pt-3" key={subject["Subject_Code"]}>
          <div className="col-6 align-self-center offset-3">
            <button
              type="button"
              className="button_ btn btn-rounded rounded btn-lg btn-block"
              onClick={() => this.setRedirect(subject["Subject_Code"])}
            >
              {subject["Subject_Name"]}
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
            <div className="logo"><DomLink to={`/Student_Home_Page/${this.state.id}`}><div className="wisdomex_">WISDOMEX</div></DomLink></div>
            <div className="menu">
              <ul className="font-weight-bold">
                <li>
                  <Link
                      className="link"
                    activeClass="true"
                    to="subjects"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                  >
                    <div className="links_ link_active">
                    Subjects
                    </div>
                  </Link>
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

          <div className="bg-overlay h-100">
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

        <div className="subjects__">
          <div id="subjects">
            <div className="pt-5 pb-5 shadow-lg">{comp}</div>
          </div>
        </div>


        <footer className=" page-footer font-small special-color-dark pt-5">
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
            <a href={`/Student_Home_Page/${this.state.id}`}>Wisdomex.com</a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Student_Home_Page;
