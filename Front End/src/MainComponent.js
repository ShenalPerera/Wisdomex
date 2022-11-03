import React ,{Component} from 'react';
import Student_Home_Page from './components/js/Student_Home_Page';

import './components/css/Student_Home_Page/bootstrap.css'; 
import './components/css/Student_Home_Page/style.css';


export class MainComponent extends Component {

    render(){
        return(
            <Student_Home_Page/>
        )
    }
}

export default MainComponent;