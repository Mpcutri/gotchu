import "./Home.css";
import React, { Component } from 'react';
import Logo from '../../images/gotchuLogo.png';
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Fade from 'react-reveal/Fade';
import Mouse from '../../images/labMouseLogo.png';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }
 
  render() {
    return (

      <div className="homeBody">

        <div className="logoContainer">
          <Fade top>
           <img id="logo" src={Logo} />
          </Fade>
        </div>

      	<div id="welcomeText">
          <Fade bottom>
            <h1>
              gotchu
            </h1>
          </Fade>
          <Fade bottom>
            <h4>
              Simple Substantial Social Change.
            </h4>
          </Fade>
          <div className="homeImages">
            <Fade bottom>
              <img src={Mouse} />
            </Fade>
          </div>
        </div>

      </div>
    
    );
  }
}

export default Home;
