import React, { Component } from 'react'
import "./RestrauProfile.css"
import {Row, Col, Input, Button, notification} from 'antd';
import {SearchOutlined, MessageOutlined, BellOutlined, UserOutlined, DownOutlined} from '@ant-design/icons';
import axios from 'axios';
import { BACKEND } from '../../Config';
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile';
import MiddleCustomerProfile from '../MiddleCustomerProfile/MiddleCustomerProfile';
import LowerCustomerProfile from '../LowerCustomerProfile/LowerCustomerProfile';
import MiddleRestraurantProfile from '../MiddleRestraurantProfile/MiddleRestraurantProfile';
import LowerRestrauProfile from '../LowerRestrauProfile/LowerRestrauProfile';
import UpperRestraurantProfile from '../UpperRestraurantProfile/UpperRestraurantProfile';
import { Redirect } from 'react-router-dom';
import { get_restraurant_profile } from '../../js/actions/restraurant';
import { connect } from "react-redux";
 class RestrauProfile extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            imageUrl : "https://s3-media0.fl.yelpcdn.com/assets/srv0/yelp_styleguide/7e4e0dfd903f/assets/img/default_avatars/user_large_square.png",
            restraurant_name : "",
            first_name : ""
        }
    }
    componentDidMount = () => {
        if(window.sessionStorage.getItem('RestrauLoggedIn') === 'true')
        {
            var myJson = {
                RestrauId : window.sessionStorage.getItem("RestrauId")
            }
            this.props.get_restraurant_profile(myJson)
        }
    }

    render() {
        let redirectVar = null
        if(!window.sessionStorage.getItem('RestrauLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        return (
            <div>
                {redirectVar}
                <div id = "topBar">
                    <UpperRestraurantProfile />
                </div>
                <div id = "middleBar">
                    <MiddleRestraurantProfile restraurant_name={this.state.name}/>
                </div>
                <div className="lowerBar">
                    <LowerRestrauProfile />
                </div>
            </div>
        )
    }
}
// export default RestrauProfile;
function mapDispatchToProps(dispatch) {
    return {
        get_restraurant_profile: user => dispatch(get_restraurant_profile(user))
    };
    }
    
    function mapStateToProps(store) {
    return {
        restraurant : store.restraurant
    };
    }
    
    const restraurant_details = connect(mapStateToProps, mapDispatchToProps)(RestrauProfile);
    export default restraurant_details;
