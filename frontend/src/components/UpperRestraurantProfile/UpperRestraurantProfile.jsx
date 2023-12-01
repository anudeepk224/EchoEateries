import React, { Component } from 'react'
import {Row, Col, Input, Button, Select} from 'antd';
import {Link, Redirect} from 'react-router-dom';
import './UpperRestraurantProfile.css'
import cookie from 'react-cookies';
import { customerLogOut, searchRestraurants } from '../../js/actions';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faStar, faCamera, faIdCard, faShoppingCart, faUser, faSignInAlt, faUtensils, faBriefcase, faInbox } from '@fortawesome/free-solid-svg-icons'
import Avatar from 'antd/lib/avatar/avatar';
import { BACKEND } from '../../Config';
const { Option } = Select;
class UpperRestraurantProfile extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            searchValue : "",
            searchFlag : false,
        }
    }
    handleLogOut = () => {
        console.log("Logging out")
        // cookie.remove('cookie', { path: '/' })
        sessionStorage.removeItem("RestrauId");
        sessionStorage.removeItem('RestrauLoggedIn')
        window.location.reload(false)
    }
    handleProfile = () => {
        window.location.href = '/restrauProfile'
    }
    updateSearchValue = (e) => {
        this.setState({
            searchValue : e.target.value
        })
    }
    search = () => {
        var myJson = {
            search : this.state.searchValue
        }
        setTimeout(() => {
            this.props.searchRestraurants(myJson);
        }, 10)
       
    }
    handleChange = (value) => {
        if(value === 'profile')
        {
            window.location.href = '/restrauProfile'
        }
        else if (value === 'logout')
        {
            this.handleLogOut();
        }
    }
    getRestraurants = () => {
        window.location.href = "/restrauProfile"
    }
    getEvents = () => {
        window.location.href = "/restraurantEvents"
    }
    render() {
        let redirectVar = null
        let temp = null
        if(!window.sessionStorage.getItem('RestrauLoggedIn'))
        {
            redirectVar = <Redirect to ='/login'></Redirect>
        }
        if(this.state.searchFlag)
        {
            redirectVar = <Redirect to = {{
                pathname :"/search",
                state : {value : this.state.searchValue}
            }}></Redirect>
        }
        if(window.sessionStorage.getItem("isLoggedIn") === 'true')
        {
            temp = <Avatar src = {`${BACKEND}/getRestrauProfileImage/` +  window.sessionStorage.getItem("RestrauId")} />
        }
        else
        {
            temp = <Avatar src = "https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png" />
        }
        return (
            <div style = {{borderBottom : "1px solid #f5f5f5", paddingBottom: '1%'}}>
                {/* {redirectVar} */}
                <Row>
                        <Col md = {1}>
                            <img className="yelpSymbol" src="https://s3-media0.fl.yelpcdn.com/assets/public/default@2x.yji-3e0b6fdd67576efda4390daddc35c8f1.png"></img>
                        </Col>
                        
                        <Col style={{marginLeft:"68%", marginTop:"2%", width : "10%"}}>
                            <Link to = "/restrauProfile"><h3 onClick = {this.getRestraurants}><FontAwesomeIcon icon = {faUtensils} /> Dishes</h3></Link>
                        </Col>
                        <Col style = {{marginLeft : "0%", marginTop : "2%"}}>
                            <Link to = "/restraurantMessages"><h3><FontAwesomeIcon icon = {faInbox}/></h3></Link>
                        </Col>
                        <Col style = {{marginLeft : "2%", marginTop : "2%"}} >
                            <Link to = "/restraurantEvents"><h3 onClick = {this.getEvents}><FontAwesomeIcon icon = {faBriefcase} /> Events</h3></Link>
                        </Col>
                        <Col style={{marginLeft:"2%", marginTop:"2%", float: 'right'}}>
                            <Select value = {temp}  onChange = {this.handleChange} bordered = {false} style = {{width : "150%"}}>
                                <Option value = 'profile'><FontAwesomeIcon icon = {faUser} /> Profile</Option>
                                <Option value = 'logout'><FontAwesomeIcon icon = {faSignInAlt} />LogOut</Option>
                            </Select>
                        </Col>
                    </Row>
            </div>
        )
    }
}
export default UpperRestraurantProfile;
// function mapDispatchToProps(dispatch) {
//     return {
//       customerLogOut: user => dispatch(customerLogOut(user)),
//       searchRestraurants : restraurant => dispatch(searchRestraurants(restraurant))
//     };
//   }
  
//   function mapStateToProps(store) {
//     //   console.log("Store is: ", store)
//     return {
//       msg: store.message,
//       user_id : "",
//       authFlag : store.authFlag,
//       first_name : store.first_name,
//     last_name : store.last_name,
//     fullname :store.full_name,
//     email : store.email,
//     phoneNumber : store.phoneNumber ,
//     nick_name : store.nick_name,
//     birthday : store.birthday,
//     headline : store.headline,
//     city : store.headline,
//     state : store.state,
//     country : store.country,
//     zip_code : store.zip_code,
//     things_i_love : store.things_i_love,
//     blog : store.blog,
//     yelping_since : store.yelping_since,
//     favourites : store.favourites,
//     userUpdatedFlag : store.userUpdatedFlag,
//     restraurants : store.restraurants
//     };
//   }
 
//   const LogOutForm = connect(mapStateToProps, mapDispatchToProps)(UpperRestraurantProfile);
//   export default LogOutForm;