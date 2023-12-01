import React, { Component } from 'react';
import "./RestrauSignIn.css";
import {Link, Redirect} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import {Input, Button, notification} from 'antd';
import Password from 'antd/lib/input/Password';
import { BACKEND } from '../../Config';
import axios from 'axios';
import { restraurant_sign_in } from '../../js/actions/restraurant';
import { connect } from "react-redux";
class RestrauSignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
componentDidMount = () => {
   
}

handleSignIn = () => {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var isValidEmail =  re.test(String(email).toLowerCase());
    if(!isValidEmail) 
    {
        notification["error"]({
            message: 'Invalid Email',
            description:
              'Please enter a valid email address',
          });
    }
    if(password === "")
    {
        notification["error"]({
            message: 'Empty fields',
            description:
              'Please complete all the fields',
          });
    }
    if(isValidEmail && password != "")
    {
        var user = {
            email : document.getElementById("email").value,
            password : document.getElementById("password").value
        }
        this.props.restraurant_sign_in(user);
    //     axios.defaults.withCredentials = true;
    //     axios.post(`${BACKEND}/restrauSignIn`, user).then(response => {
    //         if(response.status === 200)
    //         {
    //             notification["success"]({
    //                 message: 'User SignedIn',
    //                 description:
    //                   'User successfully signed in',
    //               });
    //               window.sessionStorage.setItem("RestrauId",response.data);
    //               window.sessionStorage.setItem("RestrauLoggedIn", true)
    //               window.location.href='/restrauProfile'
    //         }
    //         else if(response.code === 400)
    //         {
    //         }
    //     }).catch(err => {
    //         notification["error"]({
    //             message: 'Invalid credentials',
    //             description:
    //               'Please enter valid Email and Password',
    //           });
    //     });
    }
   
}
    render() {
        console.log(sessionStorage)
        let redirectVar = null
        if(window.sessionStorage.getItem('RestrauLoggedIn'))
        {
            redirectVar = <Redirect to ='/restrauProfile'></Redirect>
        }
        else{
            redirectVar = <Redirect to ='/restrauSignIn'></Redirect>
        }
        return (
            <div>
                {redirectVar}
                <div className='topBar' id='symbolBar'>
                    <img src="https://s3-media0.fl.yelpcdn.com/assets/public/default@2x.yji-3e0b6fdd67576efda4390daddc35c8f1.png"></img>
                </div>
                <div id = 'lowerHalf'>
                    <div>
                        <h2 className="signInWelcome">Sign in To Yelp Business</h2>
                        <h4 className="signUpH4">New to Yelp? <Link to ={{
                            pathname : "/restrauSignUp"
                        }}>Sign Up</Link></h4>
                        <h4 className="customerSignUpH4">New Customer to Yelp? <Link to ={{
                            pathname : "/signUp"
                        }}>Customer Sign Up</Link></h4>
                        <p style={{marginLeft:"20%"}}>By logging in, you agree to Yelp’s Terms of Service and</p>
                        <p style={{marginLeft:"29%", marginTop:"-1%"}}>Privacy Policy</p>
                    </div>
                    <div className="signInButtons">
                        <div>
                            <FacebookLogin size='small' className='facebookbtn'/>
                        </div>
                        <div style = {{marginTop:"1%"}}>
                            <GoogleLogin  id = "googleBtn" disabled style={{opacity:'1.0 !important'}}/> 
                        </div>
                    </div>
                    <div>
                            <p style={{marginLeft:"21%", marginTop:"1%",color:'grey'}}><b>-----------------------Or-----------------------</b></p>
                    </div>
                    <div>
                        <div className="loginForm">
                            <Input id="email" placeholder="Email"></Input>
                        </div>
                        <div style = {{marginTop:"1%", marginLeft:"21%"}}>
                            <Input.Password style = {{width: "29%"}} id = 'password' placeholder = "Password"></Input.Password>
                        </div>
                        <div className = "btnPosition">
                            <h5 style={{marginTop:"1%", color:"blue", marginLeft:"20%"}}>Forgot Password?</h5>
                            <Button onClick={this.handleSignIn} size = 'large'><b>Sign In</b></Button>
                            <p style={{color:"grey", marginLeft:"17%", marginTop:"1%"}}>New to yelp? <Link to = {{
                                    pathname : '/login'
                                }}>Sign Up</Link></p>
                        </div>
                    </div>
                </div>
                <div>
                    <img style ={{marginLeft:"55%", marginTop:"-53%"}} src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png" />
                </div>
            </div>
        )
    }
}
// export default RestrauSignIn;
function mapDispatchToProps(dispatch) {
return {
    restraurant_sign_in: user => dispatch(restraurant_sign_in(user))
};
}

function mapStateToProps(store) {

return {
    msg: store.message,
    restraurant_id : store.restraurant_id,
};
}

const restraurant_sign_in_form = connect(mapStateToProps, mapDispatchToProps)(RestrauSignIn);
export default restraurant_sign_in_form;