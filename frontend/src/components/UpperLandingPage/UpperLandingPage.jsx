import React, { Component } from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { Menu, Input, Row, Col, Button } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import './UpperLandingPage.css'

// var background ={
//     backgroundImage : "url(https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_large_assets/1629eec0e96d/assets/img/home/hero_photos/3oz4uflrjm1Uftg_R689PA.jpg)",
//     height: "600px",

// }
class UpperLandingPage extends Component {
    
    constructor(props){
        super(props);
    }
    handleClick = () => {
        
    }
    
    render() {
        return (
            <div>
                <NotificationContainer/>
                <div id = "upperHalf"className="upperLandingPage">
                    <div id = 'navbar' className="nav">
                        <Menu mode = "horizontal" > 
                            <Menu.Item onClick = {this.handleClick}><b>Write a Review</b></Menu.Item>
                            <Menu.Item><b>Events</b></Menu.Item>
                            <Menu.Item><b>Talk</b></Menu.Item>
                            <Menu.Item id = "signUp" style={{float:"right"}}><Link to = {{
                                pathname : '/signUp',
                                state : 'signUp'
                            }} style ={{color:"white"}}><b>Sign Up</b></Link></Menu.Item>
                            <Menu.Item style={{float:"right"}}><Link to = {{
                                pathname : '/login',
                                state : 'login'
                            }} style ={{color:"white"}}><b>Login</b></Link></Menu.Item>
                        </Menu>
                        <div id = 'logo' className = 'logo' style={{backgroundImage: "url(https://s3-media0.fl.yelpcdn.com/assets/public/default@2x.yji-3e0b6fdd67576efda4390daddc35c8f1.png)"}} />
                        <div className="search" id = "searchDiv">
                            <Row id= "searchRow">
                                <Col id="find" md='5'>
                                    <Input size='large' placeholder="Restraurants" addonBefore="Find"></Input>
                                </Col>
                                <Col id = "near" md='5'>
                                    <Input size='large' placeholder="Restraurants" addonBefore="Near"></Input>
                                </Col>
                                <Col id="searchBtn" md = '1'>
                                    <Button size='large' ><SearchOutlined /></Button>
                                </Col>
                            </Row>
                        </div>
                        <div >
                            <Row className = "services">
                                <Col md = '2'> 
                                    <p className = "plumbers" style={{color:'white'}}><b>Plumbers</b></p>
                                </Col>
                                <Col md = '2'> 
                                    <p className = "homeServices" style={{color:'white'}}><b>HomeServices</b></p>
                                </Col>
                                <Col md = '2'> 
                                    <p className = "restraurants" style={{color:'white'}}><b>Restraurants</b></p>
                                </Col>
                                <Col md = '2'> 
                                    <p className = "delivery" style={{color:'white'}}><b>Delivery</b></p>
                                </Col>
                                <Col md = '2'> 
                                    <p className = "blackOwned" style={{color:'white'}}><b>BlackOwned</b></p>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UpperLandingPage;