import React, { Component } from 'react'
import './RestrauSignUp.css'
import AppleLogin from 'react-apple-login';
import FacebookLogin from 'react-facebook-login';
import {Button, Input, Form, Row, Col, Select, notification, Space} from 'antd';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { GoogleLogin } from 'react-google-login';
import {Link} from 'react-router-dom';
import axios from 'axios';
import 'antd/dist/antd.css';
import {BACKEND} from '../../Config'
import { register_restraurant } from '../../js/actions/restraurant';
import { connect } from "react-redux";
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

class RestrauSignUp extends Component {
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
        var neighborhood = document.getElementById('neighborhood').value;
        var city = document.getElementById('city').value;
        var state = document.getElementById('state').value;
        var allFilled = false
        if(firstName === "" || lastName === "" || password === "" || email === "" || zipCode === "" || document.getElementById('address').value == "" || document.getElementById('rName').value === "", neighborhood === "" || city === "" || state === "")
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
        }
        if(isValidEmail && allFilled) 
        {
            var restraurant = {
                owner_name : firstName + " " + lastName,
                password : password,
                email : email,
                restraurant_name : document.getElementById("rName").value,
                location : document.getElementById("address").value + ", " + city + ", " + state + " - " + zipCode,
                zip_code : zipCode,
                neighborhood : neighborhood,
                city : city,
                state : state
            }
            this.props.register_restraurant(restraurant);
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
                        
                        <h2 className="signUph222"><b>Sign Up for Yelp Business</b></h2>
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
                                <Row>
                                    <Col md ={6}>
                                        <Input id ='firstName' placeholder="First Name"  style = {{width : "57%"}} required></Input>
                                    </Col>
                                    <Col md ={6}>
                                        <Input id = 'lastName' placeholder="Last Name"  style = {{ width : "57%",marginLeft:"-41%"}}></Input>
                                    </Col>
                                </Row>
                                <Row style = {{marginTop:"1%"}}>
                                    <Input placeholder="Email" id = 'email' style = {{width:"29%"}}></Input>
                                </Row>
                                <Row style = {{marginTop:"1%"}}>
                                    <Input placeholder="Restraurant Name" id = "rName"  style = {{width:"29%"}}></Input>
                                </Row>
                                <Row style = {{marginTop:"1%"}}>
                                    <Input.Password id ='password' placeholder= 'Password' style = {{width:"29%"}}></Input.Password>
                                </Row>
                                <Row style = {{marginTop:"1%"}}>
                                    <Input placeholder="Address" id = "address"  style = {{width:"29%"}}></Input>
                                </Row>
                                <Row style = {{marginTop: "1%"}}>
                                    <Col md ={6}>
                                        <Input id ='city' placeholder="City"  style = {{width : "57%"}} required></Input>
                                    </Col>
                                    <Col md ={6}>
                                        <Input id = 'state' placeholder="State"  style = {{ width : "57%",marginLeft:"-41%"}}></Input>
                                    </Col>
                                </Row>
                                <Row style = {{marginTop:"1%"}}>
                                    <Input type = 'number' id = 'zipCode' style = {{width:"29%"}} placeholder="Zip Code"></Input>
                                </Row>
                                <Row style = {{marginTop:"1%"}}>
                                    <Input placeholder="Neighorhood" id = "neighborhood"  style = {{width:"29%"}}></Input>
                                </Row>
                                <h5 style={{marginTop:"1%"}}>You also understand that Yelp may send marketing</h5>
                                <h5 style={{marginTop:"-1%"}}>emails about Yelp’s products, services, and local</h5>
                                <h5 style={{marginTop:"-1%"}}>events. You can unsubscribe at any time.</h5>
                                <Button onClick={this.handleSubmit} size = 'large'><b>Sign Up</b></Button>
                                <p style={{color:"grey", marginLeft:"11%", marginTop:"1%"}}>Already Member on yelp? <Link to = {{
                                    pathname : '/restrauSignIn'
                                }}>Sign In</Link></p>
                        </div>
                        <div>
                            <img style ={{marginLeft:"55%", marginTop:"-68%"}} src="https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png" />
                        </div>
                </div>
                
            </div>
        )
    }

}
// export default RestrauSignUp;
function mapDispatchToProps(dispatch) {
return {
    register_restraurant: user => dispatch(register_restraurant(user))
};
}

function mapStateToProps(store) {

return {
    msg: store.message,
};
}

const restraurant_sign_in_form = connect(mapStateToProps, mapDispatchToProps)(RestrauSignUp);
export default restraurant_sign_in_form;
