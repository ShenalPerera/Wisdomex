import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { HashLink as HLink } from 'react-router-hash-link';

class HomePage extends Component {
  state = {};
  render() {
    return (
      <div id = "top">
        <header id="header" className="fixed-top">
          <div className="container d-flex">
            <div className="row">
              <div className="logo mr-auto">
                <h1 className="text-light">
                  <Link to="/Home_Page">WISDOMEX</Link>
                </h1>
                {/* <a href="index.html"><img src="/assets/img/logo.png" alt="" className="img-fluid"/></a> */}
              </div>

              <nav className="nav-menu d-none d-lg-block">
                <ul>
                  <li className="active">
                    <HLink to="HomePage/#top">Home</HLink>
                  </li>
                  <li>
                    <HLink to="Home_Page/#main">About Us</HLink>
                    {/*<a href="#about">About Us</a>*/}
                  </li>
                  <li>
                    <HLink to="Home_Page/#team">Editors</HLink>
                  </li>
                  <li>
                    <HLink to="/Login_Selection">Login</HLink>
                  </li>
                  <li className="register">
                    <HLink to="/Register_Selection">Register</HLink>
                  </li>
                  <li>
                    <HLink to="/HomePage#contact">Contact Us</HLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>


          <section
              id="hero"

              className="d-flex flex-column justify-content-center align-items-center"
          >
            <div
                className="container text-center text-md-left"
                data-aos="fade-up"
            >
              <h1>WISDOM<a className="text-primary">EX</a></h1>
              <h2>Build your KNOWLEDGE with....</h2>
            </div>
          </section>


        <div className="h_page">
          <main id="main" className="pt-3 pb-2">

            <div className="about_us">
              <section id="about" className="about offset-1">
                <div className="container">
                  <div className="row">
                    <div className="pl-5 pr-5 col-xl-6 col-lg-7" data-aos="fade-right">
                      <img
                          src="/assets/img/about-img.jpg"
                          className="img-fluid about_img shadow-lg border"
                          alt=""
                      />
                    </div>
                    <div className="col-xl-6 col-lg-5 pt-5 pt-lg-0">
                      <h3 data-aos="fade-up" className="pb-2 pl-5 pt-5 font-weight-bold">About us....</h3>
                      <p data-aos="fade-up" className="justify-content-center col-8 pl-5 pt-3 font-weight-bold font-italic">
                        We are second year Engineering students in University of
                        Peradeniya. Our main purpose to create this online learning
                        platform is, give an opportunity for students to improve
                        their knowledge by answering mcq ans structured essay papers
                        online.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="steps" className="steps section-bg pb-5">
                <div className="container">
                  <div className="row no-gutters">
                    <div
                        className="col-lg-4 col-md-4 content-item pr-2"
                        data-aos="fade-in 100"
                    >
                      <h4 className="font-weight-bold">MCQ auto marking</h4>
                      <p className="font-italic font-weight-bold">After answering MCQ answers will be auto marked.</p>
                    </div>

                    <div
                        className="col-lg-4 col-md-4 content-item pl-4"
                        data-aos="fade-in"
                        data-aos-delay="100"
                    >
                      <h4 className="font-weight-bold">Parents involvement</h4>
                      <p className="font-italic font-weight-bold">
                        Parents can see their student's grades and communicate with
                        their teachers.
                      </p>
                    </div>

                    <div
                        className="col-lg-4 col-md-4 content-item"
                        data-aos="fade-in"
                        data-aos-delay="100"
                    >
                      <h4 className="font-weight-bold">Teacher and student friendly</h4>
                      <p className="font-italic font-weight-bold">
                        Teachers can offer subjects and students can enroll if they
                        interested.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="editors_ pt-2" id = "team">
              <section  className="team">

                <div className="container">
                  <h1 className="row d-flex justify-content-center font-weight-bold">Editors</h1>

                  <div className="row d-flex justify-content-center pt-5">

                    <div className="col-xl-3 col-lg-4 col-md-6"
                         data-aos="fade-up"
                         data-aos-delay="100"
                    >
                      <div className="member">
                        <img
                            src="assets/img/team/team-1.jpg"
                            className="img-fluid rounded-circle shadow-lg"
                            alt=""
                        />
                        <div className="member-info">
                          <div className="member-info-content ">
                            <h4>R.M.S.M. Gunathilaka</h4>
                            <span>E/17/100</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                        className="col-xl-3 col-lg-4 col-md-6"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                      <div className="member">
                        <img
                            src="assets/img/team/team-2.jpg"
                            className="img-fluid rounded-circle shadow-lg"
                            alt=""
                        />
                        <div className="member-info">
                          <div className="member-info-content">
                            <h4>R.L.D.A.S. Rathnayaka</h4>
                            <span>E/17/284</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                        className="col-xl-3 col-lg-4 col-md-6"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                      <div className="member">
                        <img
                            src="assets/img/team/team-3.jpg"
                            className="img-fluid rounded-circle shadow-lg"
                            alt=""
                        />
                        <div className="member-info">
                          <div className="member-info-content">
                            <h4>K.D.S. Perera</h4>
                            <span>E/17/246</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>


              <section id="contact" className="contact">
                <div className="container">
                  <div className="section-title" data-aos="fade-up">
                    <h2 className="font-weight-bold">Contact</h2>
                  </div>

                  <div
                      className="row no-gutters justify-content-center"
                      data-aos="fade-up"
                  >
                    <div className="col-lg-5 d-flex align-items-stretch">
                      <div className="info">
                        <div className="address">
                          <i className="icofont-google-map"></i>
                          <h4>Location:</h4>
                          <p>University of Peradeniya</p>
                          <p>Peradeniya</p>
                        </div>

                        <div className="email mt-4">
                          <i className="icofont-envelope"></i>
                          <h4>Email:</h4>
                          <p>e17100@eng.pdn.ac.lk</p>
                          <p>e17284@eng.pdn.ac.lk</p>
                          <p>e17246@eng.pdn.ac.lk</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>


            <footer id="footer" className="pt-4 pb-4">
              <div className="container">
                <div className="col d-flex justify-content-center">
                  &copy; All Rights Reserved
                </div>

                <div className="credits d-flex justify-content-center">
                  Designed by &nbsp;<a href="/">Wisdomex.com</a>
                </div>
              </div>
            </footer>
            </div>
          </main>
        </div>


        <a href="#" className="back-to-top">
          <i className="icofont-simple-up"></i>
        </a>
      </div>
    );
  }
}

export default HomePage;
