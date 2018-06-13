import "./LoginModal.css";
import React, { Component } from 'react'
import { HamburgerArrow } from 'react-animated-burgers'
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import UserPortal from '../../pages/UserPortal';
import { Redirect } from 'react-router';
import { List, ListItem } from "../List";
import Login from '../../pages/Login';
import SignUp from '../../pages/SignUp';
import LoginCloseBtn from '../LoginCloseBtn';
import X from '../../images/whiteX.png';
import axios from 'axios';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible : this.props.menuVisiblity,
      signUp: false,
      loggedIn: false,
      user: null
    };
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
    this._logout = this._logout.bind(this)
    this._login = this._login.bind(this)
  }

  toggleLoginModal() {
    this.setState({ visible: !this.props.menuVisibility });
  }

  _logout(event) {
    event.preventDefault()
    console.log('logging out')
    axios.post('/auth/logout').then(response => {
      console.log(response.data)
      if (response.status === 200) {
        this.setState({
          loggedIn: null,
          user: null
        })
        window.location = '/'
      }
    })
  }

  _login(username, password) {
    this.setState({
            loggedIn: true,
            user: {
              first_name: 'charlieman'
            }
          })
    console.log('login function being called correctly' + username + password)
    axios
      .post('/auth/login', {
        username,
        password
      })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          // update the state
          this.setState({
            loggedIn: true,
            user: response.data.user
          })
          console.log(response.data.user)
          window.location = '/user/'
        }
      })
      window.location = '/user/'
  }
 
   render() {
    console.log(this.props)
    var visibility = "hide";
 
    if (this.props.menuVisibility) {   {/* why doesn't putting this.state.visible do the same thing?? If worked, we could use this.state.visible for closing */}
      visibility = "show";
    } else {
      visibility = "hide";
    }

    return (
      <div>
        <div id="loginModal" className={visibility}>
          <div className="headerText">

            <span onClick={() => {this.setState({ signUp: false }) }} className={ this.state.signUp ? "tabColor" : "focusedTab"}>
              <h1 id="loginLink">
                Login
              </h1>
            </span>
            
            <span onClick={() => {this.setState({ signUp: true }) }} className={ !this.state.signUp ? "tabColor" : "focusedTab"}>
              <h1 id="signUpLink">
                Sign Up
              </h1>
            </span>
          </div>

          <span style={{ width: '100%', textAlign: 'right', display: 'inline-block' }}>
            <img id="closeX" src={X} onClick={() => {this.props.toggleLoginModal()} }/>
          </span>

          {!this.state.signUp ? (
            <Login _login={this._login} />
          ) : (
            <SignUp/>
          )}

        </div>



      </div>
    );
  }
}
 
export default LoginModal;
