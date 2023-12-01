import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Row } from 'antd'
import React, { Component } from 'react'
import { faCalendarWeek, faJedi, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
class CustomerNavigation extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect : false,
            path : ""
        }
    }
    render() {
        return (
            <div>
                <ul style = {{listStyleType : 'none'}}>
                    <Link to = "/customerProfile">
                        <li className = "sideNav">
                            <Row style ={{marginTop: "1%"}}>
                                <Col>
                                    <FontAwesomeIcon icon = {faUser} />
                                </Col>
                                <Col style ={{marginLeft: "5%"}}>
                                    <h3>Profile</h3>
                                </Col>
                            </Row>
                        </li>
                    </Link>
                    <Link to = "/customerReviews">
                        <li className = "sideNav" >
                            <Row style ={{marginTop: "1%"}}>
                                <Col>
                                    <FontAwesomeIcon icon = {faStar} />
                                </Col>
                                <Col style ={{marginLeft: "5%"}}>
                                    <h3>Reviews</h3>
                                </Col>
                            </Row>
                        </li>
                    </Link>
                    <Link to = "/customerRegisteredEvents">
                        <li className = "sideNav">
                            <Row style ={{marginTop: "1%"}} >
                                <Col>
                                    <FontAwesomeIcon icon = {faCalendarWeek} />
                                </Col>
                                <Col style ={{marginLeft: "5%"}}>
                                    <h3>Events</h3>
                                </Col>
                            </Row>
                        </li>
                    </Link>        
                    <Link to = '/customerOrders'>
                        <li className = "sideNav" >
                            <Row style ={{marginTop: "1%"}}>
                                <Col>
                                    <FontAwesomeIcon icon = {faJedi} />
                                </Col>
                                <Col style ={{marginLeft: "5%"}}>
                                    <h3>Orders</h3>
                                </Col>
                            </Row>
                        </li>
                    </Link>        
                </ul>
            </div>
        )
    }
}
export default CustomerNavigation