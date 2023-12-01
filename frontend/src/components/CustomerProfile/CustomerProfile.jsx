import React, { Component } from 'react';
import "./CustomerProfile.css";
import {Row, Col, Input, Button} from 'antd';
import {SearchOutlined, MessageOutlined, BellOutlined, UserOutlined, DownOutlined} from '@ant-design/icons';
import axios from 'axios';
import { BACKEND } from '../../Config';
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile';
import MiddleCustomerProfile from '../MiddleCustomerProfile/MiddleCustomerProfile';
import LowerCustomerProfile from '../LowerCustomerProfile/LowerCustomerProfile';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import { getCustomerProfile } from '../../js/actions';
import { connect } from "react-redux";

class CustomerProfile extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            imageUrl : "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png",
            name : "",
            first_name : ""
        }
    }
    componentDidMount = () => {
        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            this.getUserDetails();
        }        
        
    }
    
    getUserDetails = () => {
        var user = {
            UserId : window.sessionStorage.getItem("UserId")
        }
        this.props.getCustomerProfile(user)
    }
    render() {
        let redirectVar = null;
        if(!window.sessionStorage.getItem('isLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        var temp = null
        if(this.props.user)
        {
            temp = <LowerCustomerProfile  first_name = {this.props.user.first_name} city = {this.props.user.city} yelping_since = {this.props.user.yelping_since} things_i_love ={this.props.user.things_i_love} />
        }
        return (
            <div>
                {redirectVar}
                <div id = "topBar">
                    <UpperCustomerProfile />
                </div>
                <div id = "middleBar">
                    <MiddleCustomerProfile  NAME={this.props.fullname} location={this.props.location}/>
                </div>
                <div className="lowerBar">
                    {temp}
                </div>
            </div>
        )
    }
}
// export default CustomerProfile;
function mapDispatchToProps(dispatch) {
    return {
      getCustomerProfile: user => dispatch(getCustomerProfile(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      
    //   user_id : store.user_id
        msg: store.message,
        fullname : store.fullname,
        first_name : store.first_name,
        city : store.city,
        yelping_since : store.yelping_since,
        things_i_love : store.things_i_love,
        location : store.location,
        user: store.user
    };
  }
 
  const customerProfile = connect(mapStateToProps, mapDispatchToProps)(CustomerProfile);
  export default customerProfile;