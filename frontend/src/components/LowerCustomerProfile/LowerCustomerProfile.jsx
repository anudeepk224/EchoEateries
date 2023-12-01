import React, { Component } from 'react'
import './LowerCustomerProfile.css'
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import {Row, Col, Input, Button, Table, Space, Card} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, faJedi, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BACKEND } from '../../Config';
import CustomerNavigation from '../CustomerNavigation/CustomerNavigation';

class LowerCustomerProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name : "Udit",
            location : "SanJose",
            joinDate : "09-20-2020",
            interest : "You haven't told us yet ... do tell!",
            user : {}
        }
        // this.getUserDetails()
    }
    componentDidMount = () => {
       
    }
    componentWillReceiveProps(props) {
        this.setState({
            first_name : this.props.first_name
        })
    }

    render() {
        return (
            <div>
                <div className="lowerBar">
                    <div className="tableDetails">
                        <Row>
                            <Col md = {4} style={{marginLeft:"15%"}}>
                                <h2 style = {{fontWeight:"bolder", marginTop:"2%", marginLeft:"18%", color:"#2f3235"}}>{this.props.first_name}'s Profile</h2>
                                {/* <Table dataSource={data} pagination={false} style={{width:"70%", marginLeft:"15%"}}>
                                <Column
                                    key="firstName"
                                    render={(text, record) => (
                                        <Space size="middle">
                                        <a style={{color:"grey", fontWeight:"bolder"}}>{record.firstName}</a>
                                        </Space>
                                    )}
                                    />
                                </Table> */}
                                <CustomerNavigation />    
                            </Col>
                            <Col md = {5}>
                                {/* <ul style = {{listStyleType : "none"}}>
                                    <li>
                                        <Card title = "General Information"  style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : "175%"}}>
                                            <ul style = {{listStyleType : "none"}}>
                                                <li>
                                                    <Row>
                                                        <Col>
                                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Nick name: </h3>
                                                        </Col>
                                                        <Col style = {{marginLeft : "1%"}}>
                                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.nick_name}</h3>
                                                        </Col>
                                                    </Row>
                                                </li>
                                                <li>
                                                    <Row>
                                                        <Col>
                                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>BirthDay: </h3>
                                                        </Col>
                                                        <Col style = {{marginLeft : "1%"}}>
                                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.birth_day}</h3>
                                                        </Col>
                                                    </Row>
                                                </li>
                                                <li>
                                                    <Row>
                                                        <Col>
                                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Email: </h3>
                                                        </Col>
                                                        <Col style = {{marginLeft : "1%"}}>
                                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.email}</h3>
                                                        </Col>
                                                    </Row>
                                                </li>
                                                <li>
                                                    <Row>
                                                        <Col>
                                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Phone Number: </h3>
                                                        </Col>
                                                        <Col style = {{marginLeft : "1%"}}>
                                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.phone_number}</h3>
                                                        </Col>
                                                    </Row>
                                                </li>
                                            </ul>
                                        </Card>
                                    </li>
                                    <li style = {{marginTop : "4%"}}>
                                        <Card title = "Address Information"  style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : "175%"}}>
                                            <ul style = {{listStyleType : "none"}}>
                                                <li>
                                                    <Row>
                                                        <Col>
                                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Address: </h3>
                                                        </Col>
                                                        <Col style = {{marginLeft : "1%"}}>
                                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.address}</h3>
                                                        </Col>
                                                    </Row>
                                                </li>
                                                <li>
                                                    <Row>
                                                        <Col>
                                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>City: </h3>
                                                        </Col>
                                                        <Col style = {{marginLeft : "1%"}}>
                                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.city}</h3>
                                                        </Col>
                                                    </Row>
                                                </li>
                                                <li>
                                                    <Row>
                                                        <Col>
                                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>State: </h3>
                                                        </Col>
                                                        <Col style = {{marginLeft : "1%"}}>
                                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.state}</h3>
                                                        </Col>
                                                    </Row>
                                                </li>
                                                <li>
                                                    <Row>
                                                        <Col>
                                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>zip_code: </h3>
                                                        </Col>
                                                        <Col style = {{marginLeft : "1%"}}>
                                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.zip_code}</h3>
                                                        </Col>
                                                    </Row>
                                                </li>
                                            </ul>
                                    </Card>
                                    </li>
                                    <li style = {{marginTop : "4%"}}>
                                        <Card title = "Other Information"  style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : "205%"}}>
                                            <ul style = {{listStyleType : "none"}}>
                                                <li>
                                                    <Row>
                                                        <Col>
                                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Headline: </h3>
                                                        </Col>
                                                        <Col style = {{marginLeft : "1%"}}>
                                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.headline}</h3>
                                                        </Col>
                                                    </Row>
                                                </li>
                                                <li>
                                                    <Row>
                                                        <Col>
                                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Things I Love: </h3>
                                                        </Col>
                                                        <Col style = {{marginLeft : "1%"}}>
                                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.things_i_love}</h3>
                                                        </Col>
                                                    </Row>
                                                </li>
                                                <li>
                                                    <Row>
                                                        <Col>
                                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Favourites: </h3>
                                                        </Col>
                                                        <Col style = {{marginLeft : "1%"}}>
                                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.favourites}</h3>
                                                        </Col>
                                                    </Row>
                                                </li>
                                                <li>
                                                    <Row>
                                                        <Col>
                                                            <h3 style = {{color : "#d32323" , fontWeight: "bolder"}}>Blog or Website: </h3>
                                                        </Col>
                                                        <Col style = {{marginLeft : "1%"}}>
                                                            <h3 style = {{fontWeight : "bolder"}}>{this.state.user.blog}</h3>
                                                        </Col>
                                                    </Row>
                                                </li>
                                            </ul>
                                        </Card>
                                    </li>
                                </ul> */}
                            </Col>
                            <Col md = {3}>
                                <div className="outerDiv">
                                    <div className="details">
                                    <h2 style={{fontWeight:"bolder", color:"#d32323"}}>About {this.state.first_name}</h2>  
                                    <div>
                                        <h4 style={{fontWeight:"bolder"}}>Location</h4>
                                        <h5 style={{fontWeight:"bolder"}}>{this.props.city}</h5>
                                    </div>
                                    <div>
                                        <h4 style={{fontWeight:"bolder"}}>Yelping Since</h4>
                                        <h5 style={{fontWeight:"bolder"}}>{this.props.yelping_since}</h5>
                                    </div>
                                    <div>
                                        <h4 style={{fontWeight:"bolder"}}>Things I Love</h4>
                                        <h5 style={{fontWeight:"bolder"}}>{this.props.things_i_love}</h5>
                                    </div>
                                    </div>      
                                </div>
                            </Col>
                        </Row>
                        
                    </div>
                   
                   
                </div>
            </div>
        )
    }
}

export default LowerCustomerProfile;