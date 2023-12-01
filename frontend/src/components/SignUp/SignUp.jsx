import React, { Component } from 'react';
import AppleLogin from 'react-apple-login';
import FacebookLogin from 'react-facebook-login';
import {Button, Input, Form, Row, Col, Select, notification, Space} from 'antd';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { GoogleLogin } from 'react-google-login';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './SignUp.css'
import 'antd/dist/antd.css';
import {BACKEND} from '../../Config'
import { connect } from "react-redux";
import { useToasts } from 'react-toast-notifications'
import { resgisterUser } from '../../js/actions';
 
const { Option } = Select;
const days = []
for (let i = 0; i < 31; i++) {
    days.push(<Option key={i}>{i}</Option>);
}

const months = []
months.push(<Option key ={'January'}>January</Option>)
months.push(<Option key ={'February'}>February</Option>)
months.push(<Option key ={'March'}>March</Option>)
months.push(<Option key ={'April'}>April</Option>)
months.push(<Option key ={'May'}>May</Option>)
months.push(<Option key ={'June'}>June</Option>)
months.push(<Option key ={'July'}>July</Option>)
months.push(<Option key ={'August'}>August</Option>)
months.push(<Option key ={'September'}>September</Option>)
months.push(<Option key ={'October'}>October</Option>)
months.push(<Option key ={'November'}>November</Option>)
months.push(<Option key ={'December'}>December</Option>)

const years= []
for (let i = 1950; i < 2020; i++) {
    years.push(<Option key={i}>{i}</Option>);
}

class SignUp extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            day: "",
            month : "",
            year : ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount = () => {
    }
    onDayChange = (value) => {
        this.setState({
            day : value
        });
    } 
    onMonthChange = (value) => {
        this.setState({
            month : value
        });
    }
    onYearChange = (value) =>{
        this.setState({
            year : value
        });
    }
    handleSubmit = () => {
        var headers = new Headers();
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var password = document.getElementById('password').value;
        var email = document.getElementById('email').value;
        var zipCode = document.getElementById('zipCode').value;
        var allFilled = false
        if(firstName === "" || lastName === "" || password === "" || email === "" || zipCode === "")
        {
            // NotificationManager.error("Error" , "Please field all values")
            notification["error"]({
                message: 'Empty Fields',
                description:
                  'Please complete all the fields',
              });
        }
        else{
            allFilled = true;
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var isValidEmail =  re.test(String(email).toLowerCase());
        if(!isValidEmail) 
        {
            notification["error"]({
                message: 'Invalid Email',
                description:
                  'Please enter a valid email address',
              });
            // NotificationManager.error("Error" , "Please Enter a valid email")
        }
        if(isValidEmail && allFilled) 
        {
            var user = {
                first_name : firstName,
                last_name : lastName,
                password : password,
                email : email,
                zip_code : zipCode,
                day : this.state.day,
                month : this.state.month,
                year : this.state.year,
                user_type : "customer"
            }
            this.props.registerUser(user);
            // axios.defaults.withCredentials = true
            // axios.post(`${BACKEND}/registerUser`, user).then(response => {
            //     if(response.status === 299)
            //     {
            //         notification["error"]({
            //             message: 'EmailId exists',
            //             description:
            //               'User with same EmailId is registered',
            //           });
            //     }
            //     else if(response.status === 200)
            //     {

            //         notification["success"]({
            //             message: 'User Registered',
            //             description:
            //               'User successfully registered',
            //           });
            //           setTimeout(function(){
            //               window.location.href = '/login'
            //           }, 500)
            //     }
                
            // }).catch(err => {
            // });
        }
    }
    render() {
        
        return (
            <div>
                <Space />
                <div className='topBar' id='symbolBar' style={{backgroundColor:"#d32323"}}>
                    <img src="https://s3-media0.fl.yelpcdn.com/assets/public/default@2x.yji-3e0b6fdd67576efda4390daddc35c8f1.png"></img>
                </div>
                <div className="lowerSignUp">
                    <div>
                        
                        <h2 className="signUpH2"><b>Sign Up for Yelp</b></h2>
                        <p className='connect'><b>Connect with great Local businesses</b></p>
                        <p style={{marginLeft:'22%', fontSize:"80%"}}>By continuing, you agree to Yelp’s Terms of Service and</p>
                        <p style={{marginLeft:'25%', fontSize:"80%", marginTop:"-1%"}}>acknowledge Yelp’s Privacy Policy.</p>
                    </div>
                    <div>
                        <div className="apple">
                            <AppleLogin designProp = {
                                {
                                    width: 320,
                                    height: 35,
                                }
                            } />
                        </div>
                        <div className='facebook'>
                            <FacebookLogin size='small' className='facebookbtn'/>
                        </div>
                        <div id='google'>
                            <GoogleLogin  id = "googleBtn" disabled style={{opacity:'1.0 !important'}}/> 
                            <p style={{fontSize:'90%'}}>Dont worry we never post without your permission</p>   
                        </div>    
                        <div>
                            <p style={{marginLeft:"21%", color:'grey'}}><b>-----------------------Or-----------------------</b></p>
                        </div>
                    </div>
                        <div className="signUpForm">
                            {/* <Form onFinish={this.handleSubmit}> */}
                                <Row>
                                    <Col md ={6}>
                                        {/* <Form.Item id = 'firstName'
                                        rules = {[
                                            {
                                                required : true,
                                                message :"Please Enter the First Name"
                                            }
                                        ]}
                                        style = {{
                                            width : "57%"
                                        }}
                                        > */}
                                            <Input id ='firstName' placeholder="First Name"  style = {{width : "57%"}} required></Input>
                                        {/* </Form.Item> */}
                                    </Col>
                                    <Col md ={6}>
                                    {/* <Form.Item id = 'lastName'
                                        rules = {[
                                            {
                                                required : true,
                                                message :"Please Enter the Last Name"
                                            }
                                        ]}
                                        style = {{
                                            width : "57%",
                                            marginLeft:"-41%"
                                        }}
                                        > */}
                                            <Input id = 'lastName' placeholder="Last Name"  style = {{ width : "57%",marginLeft:"-41%"}}></Input>
                                    {/* </Form.Item> */}
                                    </Col>
                                </Row>
                                <Row style = {{marginTop:"1%"}}>
                                    {/* <Form.Item id = 'email'
                                        rules = {[
                                            {
                                                required : true,
                                                message :"Please Enter your Email"
                                            }
                                        ]}
                                        style = {{
                                            width:"29%"
                                        }}
                                        > */}
                                            <Input placeholder="Email" id = 'email' style = {{width:"29%"}}></Input>
                                            
                                    {/* </Form.Item> */}
                                </Row>
                                <Row style = {{marginTop:"1%"}}>
                                    <Input.Password id ='password' placeholder= 'Password' style = {{width:"29%"}}></Input.Password>
                                </Row>
                                <Row style = {{marginTop:"1%"}}>
                                {/* <Form.Item id = 'zipCode'
                                        rules = {[
                                            {
                                                required : true,
                                                message :"Please Enter your Zip Code"
                                            }
                                        ]}
                                        style = {{width:"29%"}}
                                        > */}
                                            <Input id = 'zipCode' style = {{width:"29%"}} placeholder="Zip Code"></Input>
                                    {/* </Form.Item> */}
                                </Row>
                                <h4 style = {{marginTop:"1%"}}><b>Birthday</b> Optional</h4>
                                <Row >
                                    <Col md = {3}>
                                        {/* <Form.Item id = 'day'
                                            style = {{width:"72%"}}
                                            > */}
                                                <Select onChange = {this.onDayChange} style = {{width:"72%"}} id ='day' defaultValue = 'Day'>
                                                    {days}
                                                </Select>
                                        {/* </Form.Item> */}
                                    </Col>
                                    <Col md = {3}>
                                        {/* <Form.Item id = 'month'
                                            style = {{width:"72%", marginLeft:"-20%"}}
                                            > */}
                                                <Select onChange = {this.onMonthChange}  id = 'month' style = {{width:"72%", marginLeft:"-20%"}} defaultValue = 'Month'>
                                                    {months}
                                                </Select>
                                        {/* </Form.Item> */}
                                    </Col>
                                    <Col md = {3}>
                                        {/* <Form.Item id = 'year'
                                            style = {{width:"72%",marginLeft:"-40%"}}
                                            > */}
                                                <Select id ='year' onChange = {this.onYearChange}  style = {{width:"72%",marginLeft:"-40%"}} defaultValue = 'Year'>
                                                    {years}
                                                </Select>
                                        {/* </Form.Item> */}
                                    </Col>
                                </Row>
                                <h5 style={{marginTop:"1%"}}>You also understand that Yelp may send marketing</h5>
                                <h5 style={{marginTop:"-1%"}}>emails about Yelp’s products, services, and local</h5>
                                <h5 style={{marginTop:"-1%"}}>events. You can unsubscribe at any time.</h5>
                                <Button onClick={this.handleSubmit} size = 'large'><b>Sign Up</b></Button>
                                <p style={{color:"grey", marginLeft:"11%", marginTop:"1%"}}>Already Member on yelp? <Link to = {{
                                    pathname : '/login'
                                }}>Sign In</Link></p>
                            {/* </Form> */}
                        </div>
                        <div>
                            <img style ={{marginLeft:"55%", marginTop:"-68%"}} src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png" />
                        </div>
                </div>
                
            </div>
        )
    }
}
// export default SignUp;
function mapDispatchToProps(dispatch) {
    return {
      registerUser: user => dispatch(resgisterUser(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      msg: store.message,
    };
  }
 
  const SignUpForm = connect(mapStateToProps, mapDispatchToProps)(SignUp);
  export default SignUpForm;
