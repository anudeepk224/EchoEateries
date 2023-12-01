import { faCamera, faStar, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BACKEND } from '../../Config';
import { follow_customer, getCustomerProfile } from '../../js/actions';
import { add_restraurant_chat, get_restraurant_customer_details } from '../../js/actions/restraurant';
import UpperRestraurantProfile from '../UpperRestraurantProfile/UpperRestraurantProfile';
class ViewCustomerProfile extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            user: {},
            image : "",
            fullName : "",
            location : "",
            redirect : false
        }
        console.log(this.props.history.location.state.id)
        var user = {
            UserId : this.props.history.location.state.id
        }
        console.log("Source is ----------", this.props.history.location.state.source);
        this.props.get_restraurant_customer_details(user);
       
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            this.setState({
                user : this.props.restraurant_customer,
                image : `${BACKEND}/getProfileImage/` +  this.props.history.location.state.id,
                fullName : this.props.restraurant_customer.first_name + " " + this.props.restraurant_customer.last_name,
                location : this.props.restraurant_customer.city + ", " + this.props.restraurant_customer.state
            })
        }, );
    }
    redirectToMessages = () => {
        var chat = {
            customer_id : this.props.restraurant_customer._id,
            restraurant_id : window.sessionStorage.getItem("RestrauId")
        }
        this.props.add_restraurant_chat(chat);
        this.setState({
            redirect : true
        })
    }
    followCustomer = () => {
        var myJson = {
            customer_id : window.sessionStorage.getItem("UserId"),
            follower : this.props.restraurant_customer._id
        }
        this.props.follow_customer(myJson);
    }
    render() {
        var buttonTemp = null;
        if(this.props.history.location.state.source === "customer")
        {
            buttonTemp = <Button onClick  = {this.followCustomer}>Follow Customer</Button>
        }
        else if(this.props.history.location.state.source === "restraurant")
        {
            buttonTemp = <Button onClick  = {this.redirectToMessages}>Message Customer</Button>
        }
        let redirectVar = null;
        if(this.state.redirect)
        {
            redirectVar = <Redirect to = "/restraurantMessages"></Redirect>
        }
        console.log(this.state)
        var temp = null
        if(this.props.restraurant_customer)
        {
            temp = <ul style = {{listStyleType : "none"}}>
            <li>
                <Row>
                    <Col md  = {6}>
                        <Card title = "General Information"  style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : "150%"}}>
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
                    </Col>
                    <Col md  = {6} style = {{marginLeft:"20%"}}>
                        <Card title = "Address Information"  style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)", width : "150%"}}>
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
                    </Col>
                </Row>
            </li>
            <li style = {{width: "83%", marginTop : "1%"}}>
                <Card title = "Other Information"  style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
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
        </ul>
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <UpperRestraurantProfile />
                </div>
                <div>
                    <div className = "middleBar">
                        <div className="userDetails">
                            <div className='name'>
                                <h1 style ={{fontWeight:"bolder"}}>{this.state.fullName}</h1>
                            </div>
                            <div className="location">
                                <h3>{this.state.location}</h3>
                            </div>
                            <div>
                                {buttonTemp}
                            </div>
                        </div>
                    </div>
                    <div className="imageDiv" >
                        <Avatar className="imageBox" shape="square" style={{height:"100%", width:"100%"}} size = 'small' src = {this.state.image}  ></Avatar>
                    </div>
                </div>
                <div style = {{marginTop : "3%", marginLeft : "20%"}}>
                    {temp}
                </div>
            </div>
        )
    }
}
// export default ViewCustomerProfile;
function mapDispatchToProps(dispatch) {
return {
    get_restraurant_customer_details: user => dispatch(get_restraurant_customer_details(user)),
    add_restraurant_chat : user => dispatch(add_restraurant_chat(user)),
    follow_customer : user => dispatch(follow_customer(user))
};
}

function mapStateToProps(store) {
return {
    restraurant_customer : store.restraurant_customer,
    message : store.message
};
}

const view_customer_profile = connect(mapStateToProps, mapDispatchToProps)(ViewCustomerProfile);
export default view_customer_profile;