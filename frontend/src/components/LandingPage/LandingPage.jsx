
import React, { Component } from 'react'
import './LandingPage.css'
import { Menu, Input, Row, Col, Button, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link, Redirect} from 'react-router-dom';
import { faBriefcase, faCalendar, faUtensils} from '@fortawesome/free-solid-svg-icons';
import 'antd/dist/antd.css';
import Avatar from 'antd/lib/avatar/avatar';
import { BACKEND } from '../../Config';
import { connect } from 'react-redux';

class LandingPage extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            restraurantsRedirect : false,
            eventsRedirect : false,
            profileRedirect : false
        }
    }
    getRestraurants = () => {
        if(window.sessionStorage.getItem("isLoggedIn") === 'true')
        {

        }
        else
        {
            notification["error"]({
                message: 'User not Login',
                description:
                  'Please login to access this functionality',
              });
        }
    }
    getEvents = () => {
        if(window.sessionStorage.getItem("isLoggedIn") === 'true')
        {

        }
        else
        {
            notification["error"]({
                message: 'User not Login',
                description:
                  'Please login to access this functionality',
              });
        }
    }
    getProfile = () => {
        if(window.sessionStorage.getItem("isLoggedIn") === 'true')
        {
        
        }
    }
    getYelpBusiness = () => {
        window.location.href = "/restrauSignUp"
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            console.log("In props profile image is-----------------", this.props)
        })
    }
    render() {
        console.log(sessionStorage)
        var temp1 = null
        var temp2 = null
        var temp3 = null
        if(sessionStorage.getItem('isLoggedIn') === 'true')
        {
            console.log("user is _____________________", this.props.user)
            var filename = ""
            if(this.props.user)
            {
                if(this.props.user.profile_photo)
                {
                    filename = this.props.user.profile_photo.split('public').pop();
                }
                temp1 = <Link to = '/customerProfile'><Avatar size = {50}  style = {{marginLeft : "58%"}} src = {`${BACKEND}` +  filename} /></Link>
            }
            else{
                temp1 = <Link to = '/customerProfile'><Avatar size = {50}  style = {{marginLeft : "58%"}} src = {`${BACKEND}/getProfileImage/` +  window.sessionStorage.getItem("UserId")} /></Link>
            }
            
        }
        else
        {
            temp1 = <Menu.Item id = "signUp" style={{float:"right"}}><Link to = {{
                pathname : '/signUp',
                state : 'signUp'
            }} style ={{color:"white"}}><b>Sign Up</b></Link></Menu.Item>
            temp2 = <Menu.Item style={{float:"right"}}><Link to = {{
                pathname : '/login',
                state : 'login'
            }} style ={{color:"white"}}><b>Login</b></Link></Menu.Item>
            temp3 = <a><h2 style = {{color : 'white', fontWeight : "bolder"}} onClick = {this.getYelpBusiness}><FontAwesomeIcon icon = {faBriefcase} /> Yelp Business</h2></a> 
        }
        return (
            <div>
                <div style={{backgroundImage:"url(https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/a2a6dfbdce53/assets/img/home/hero_photos/Y52KtIDZeG8aAMBaLIjSlQ.jpg)", height: "800px",backgroundSize:"100% 100%"}}>
                    <div style={{paddingTop:30}}>
                        <div className = "navigation">
                            <Menu mode = "horizontal" > 
                                <Menu.Item onClick = {this.handleClick}><b>Write a Review</b></Menu.Item>
                                <Menu.Item><b>Events</b></Menu.Item>
                                <Menu.Item><b>Talk</b></Menu.Item>
                                {temp1}
                                {temp2}
                            </Menu>
                        </div>
                    </div>
                    <div id = 'logo' className = 'yelpLogo' style={{backgroundImage: "url(https://s3-media0.fl.yelpcdn.com/assets/public/default@2x.yji-3e0b6fdd67576efda4390daddc35c8f1.png)"}} />
                    <div>
                        <ul style = {{listStyleType : "none"}}>
                            <li>
                                <Row style ={{marginTop : "-10%", marginLeft : "38%"}}>
                                    <Col>
                                        <Link to = "/customerHome"><h2 style = {{color : 'white', fontWeight : "bolder"}} onClick = {this.getRestraurants}><FontAwesomeIcon icon = {faUtensils} /> Restraurants</h2></Link>                                
                                    </Col>
                                    <Col style = {{marginLeft : "5%"}}>
                                        <Link to = "/customerEvents"><h2 style = {{color : 'white', fontWeight : "bolder"}} onClick = {this.getEvents}><FontAwesomeIcon icon = {faCalendar} /> Events</h2></Link>                                
                                    </Col>
                                </Row>
                            </li>
                            <li>
                                <Row style ={{marginTop : "5%", marginLeft : "43%"}}>
                                    <Col>
                                        {temp3}
                                    </Col>
                                </Row>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

// export default LandingPage;
// export default MiddleCustomerProfile;
function mapDispatchToProps(dispatch) {
    return {
        // getCustomerProfile: user => dispatch(getCustomerProfile(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
        user : store.user
    };
  }
 
  const landingPage = connect(mapStateToProps, mapDispatchToProps)(LandingPage);
  export default landingPage;
