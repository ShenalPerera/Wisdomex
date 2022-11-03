import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './components/js/HomePage';

import Login_Selection from "./components/js/Login_Selection";
import Register_Selection from "./components/js/Register_Selection";

import Teacher_Sign_Up from './components/js/Teacher_Sign_Up';
import Parent_Sign_Up from './components/js/Parent_Sign_Up';
import Student_Sign_Up from './components/js/Student_Sign_Up';



import Teacher_Login_Page from './components/js/Teacher_Login_Page';
import Student_Login_Page from './components/js/Student_Login_Page';
import Parent_Login_Page from "./components/js/Parent_Login_Page";

import Student_Home_Page from './components/js/Student_Home_Page';
import Teacher_Home_Page from "./components/js/Teacher_Home_Page";
import Parent_Home_Page from "./components/js/Parent_Home_Page";


import Student_Lesson_Info from "./components/js/StudentHomePage/Student_Lesson_Info";
import Teacher_Lesson_Info from "./components/js/TeacherHomePage/Teacher_Lesson_Info";


import Student_Notes from "./components/js/StudentHomePage/Student_Notes";
import Teacher_Notes from "./components/js/TeacherHomePage/Teacher_Notes";

import Student_Paper from "./components/js/StudentHomePage/Student_Paper";
import Add_Paper from "./components/js/TeacherHomePage/Add_Paper";

import Enroll_subject from "./components/js/StudentHomePage/Enroll_subject"

import Check_grade from './components/js/ParentHomePage/Check_grade';

import Mark_Papers from "./components/js/TeacherHomePage/Mark_Papers";
import Give_Marks from "./components/js/TeacherHomePage/Give_Marks";
import See_Grades from "./components/js/StudentHomePage/See_Grades";

// import Subjects from './components/js/Subjects';


function App() {
  return (
    <BrowserRouter>
      <div className="App">

      <Switch>

          <Route exact path='/Home_Page' component={() => <HomePage/>} />

          <Route exact path='/Student_SignUp_Page' component={() => <Student_Sign_Up/>} />
          <Route exact path='/Parent_SignUp_Page' component={() => <Parent_Sign_Up/>} />
          <Route exact path='/Teacher_SignUp_Page' component={() => <Teacher_Sign_Up/>} />

          <Route exact path='/Login_Selection' component={() => <Login_Selection/>} />
          <Route exact path='/Register_Selection' component={() => <Register_Selection/>} />

          <Route exact path='/Teacher_Login_Page' component={() => <Teacher_Login_Page/>} />
          <Route exact path='/Student_Login_Page' component={() => <Student_Login_Page/>} />
          <Route exact path='/Parent_Login_Page' component={() => <Parent_Login_Page/>} />


          {/* <Route exact path='/Student_Home_Page' component={() => <Student_Home_Page/>} /> */}
          <Route exact path='/Student_Home_Page/:id' component={Student_Home_Page}/>
          <Route exact path='/Teacher_Home_Page/:id' component={Teacher_Home_Page}/>
          <Route exact path='/Parent_Home_Page/:id' component={Parent_Home_Page}/>



          <Route exact path='/Student_Lesson_Info/:id/:subject_code' component={Student_Lesson_Info}/>
          <Route exact path='/Teacher_Lesson_Info/:id/:subject_code' component={Teacher_Lesson_Info}/>


          <Route exact path='/Student_Notes/:id/:subject_code/:lesson_name' component={Student_Notes}/>
          <Route exact path='/Teacher_Notes/:id/:subject_code/:lesson_name' component={Teacher_Notes}/>

          <Route exact path='/Add_Paper/:id/:subject_code/:paper_id' component={Add_Paper}/>
          <Route exact path='/Student_Paper/:id/:subject_code/:paper_id' component={Student_Paper}/>

          {/*<Route exact path='/Notes/:subject_code' component={Notes}/>*/}

          <Route exact path='/Enroll_subject/:id' component= {Enroll_subject}/>

          <Route exact path='/Check_grade/:id/:student_id' component={Check_grade}/>

          <Route exact path='/Mark_Papers/:id/:subject_code/:student_id' component={Mark_Papers}/>

          <Route exact path='/Give_Marks/:id/:subject_code/:student_id/:paper_id' component={Give_Marks}/>

          <Route exact path='/See_Grades/:id' component={See_Grades}/>

          <Redirect to="/Home_Page" />
      </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;