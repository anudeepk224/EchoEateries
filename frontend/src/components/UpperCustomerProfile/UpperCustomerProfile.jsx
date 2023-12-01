import React, { Component } from 'react'
import {Row, Col, Input, Button, Select, notification} from 'antd';
import {SearchOutlined, MessageOutlined, BellOutlined, UserOutlined, DownOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import {Link, Redirect} from 'react-router-dom';
import './UpperCustomerProfile.css'
import cookie from 'react-cookies';
import { customerLogOut, searchRestraurants, finalFilter } from '../../js/actions';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faStar, faCamera, faIdCard, faShoppingCart, faUser, faSignOutAlt, faBriefcase, faUtensils, faInbox } from '@fortawesome/free-solid-svg-icons'
import Avatar from 'antd/lib/avatar/avatar';
import { BACKEND } from '../../Config';
const { Option } = Select;

class UpperCustomerProfile extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            searchValue : "",
            searchFlag : false,
            location : "",
            restraurantsRedirect : false,
            eventsRedirect : false,
            cartRedirect : false
        }
    }
    getRestraurants = () => {
        if(window.sessionStorage.getItem("isLoggedIn") === 'true')
        {
            // window.location.href = "/customerHome"
            this.setState({
                restraurantsRedirect : true
            })
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
            // window.location.href = "/customerEvents"
            this.setState({
                eventsRedirect : true
            })
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
    handleLogOut = () => {
        console.log("Logging out")
        // cookie.remove('cookie', { path: '/' })
        // sessionStorage.clear();
        this.props.customerLogOut();
        sessionStorage.removeItem("UserId");
        sessionStorage.removeItem('isLoggedIn')
        window.location.reload(false)
        
    }
    handleProfile = () => {
        window.location.href = '/customerProfile'
    }
    openCart = () => {
        // window.location.href = '/cart'
        
    }
    updateSearchValue = (e) => {
        this.setState({
            searchValue : e.target.value
        })
    }
    search = () => {
        var myJson = {
            search : this.state.searchValue,
            location : this.state.location

        }
        setTimeout(() => {
            this.props.finalFilter(myJson);
        }, 10)
       
    }
    handleChange = (value) => {
        if(value === 'profile')
        {
            window.location.href = '/customerProfile'
        }
        else if (value === 'logout')
        {
            this.handleLogOut();
        }
    }
    updateLocation = (e) => {
        this.setState({
            location : e.target.value
        })
    }
    render() {
        let redirectVar = null
        let temp = null;
        if(this.state.restraurantsRedirect)
        {
            redirectVar = <Link to = '/customerHome' />
        }
        else if(this.state.eventsRedirect)
        {
            redirectVar = <Redirect to = '/customerEvents' />
        }
        if(window.sessionStorage.getItem("isLoggedIn") === 'true')
        {
            var filename = "/profile_images/user.png"
            // console.log(this.props.user)
            if(this.props.user)
            {
                if(this.props.user.profile_photo)
                {
                    filename = this.props.user.profile_photo.split('public').pop()
                }
            }
            temp = <Avatar src = {`${BACKEND}` + filename}/>
        }
        else
        {
            temp = <Avatar src = "https://cdn0.iconfinder.com/data/icons/social-media-network-4/48/male_avatar-512.png" />
        }
        return (
            <div style = {{borderBottom : "1px solid #f5f5f5", paddingBottom: '3%'}}>
                {redirectVar}
                <Row>
                        <Col md = {1}>
                            <img className="yelpSymbol" src="https://s3-media0.fl.yelpcdn.com/assets/public/default@2x.yji-3e0b6fdd67576efda4390daddc35c8f1.png"></img>
                        </Col>
                        <Col md = {6} className="searchCol">
                            <Row>
                                <Col md = {5}>
                                    <Input value = {this.state.searchValue} onChange = {this.updateSearchValue} id = "search" size = 'large' placeholder= 'Restraurant, Burger, Pizaa' style={{width:"450%"}}></Input>
                                </Col>
                                <Col md = {5}>
                                    <Input id = "searchLocation" value= {this.state.location} size = 'large' placeholder= 'Location' onChange = {this.updateLocation} style ={{marginLeft:"350%", width:"450%"}}></Input>
                                </Col>
                                <Col md = {2}>
                                    <Button size = 'large' style={{marginLeft:"1750%", width:"165%"}} onClick = {this.search}>
                                        {/* <Link to = {{
                                            pathname : "/search",
                                            state : {source : "search", value : this.state.searchValue}
                                        }}> */}
                                            <SearchOutlined />
                                        {/* </Link> */}
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        
                        <Col style={{marginLeft:"30%", marginTop:"2%", width : "10%"}}>
                            <Link to = '/customerHome'><h3 ><FontAwesomeIcon icon = {faUtensils} /></h3></Link>
                        </Col>
                        <Col style = {{marginLeft : "-6%", marginTop : "2%"}}>
                            <Link to = "/customerMessages"><h3><FontAwesomeIcon icon = {faInbox}/></h3></Link>
                        </Col>
                        <Col style = {{marginLeft : "4%", marginTop : "2%"}} >
                            <Link to = '/allCustomers'><h3><FontAwesomeIcon icon = {faUserFriends} /></h3></Link>
                        </Col>
                        <Col style = {{marginLeft : "4%", marginTop : "2%"}} >
                            <Link to = '/customerEvents'><h3><FontAwesomeIcon icon = {faBriefcase} /></h3></Link>
                        </Col>
                        <Col style = {{marginLeft : "2%", marginTop : "2%"}} >
                            <Link to = "/cart">
                                <FontAwesomeIcon onClick = {this.openCart} className="shoppingCart" icon={faShoppingCart}/>
                            </Link>
                        </Col>
                        <Col style={{marginLeft:"2%", marginTop:"2%"}}>
                            {/* <Button style = {{width : "100%"}} onClick = {this.handleLogOut}>Logout</Button> */}
                            <Select value = {temp}  onChange = {this.handleChange} bordered = {false} style = {{width : "150%"}}>
                                <Option value = 'profile'><FontAwesomeIcon icon = {faUser} /> Profile</Option>
                                <Option value = 'logout'><FontAwesomeIcon icon = {faSignOutAlt} />LogOut</Option>
                            </Select>
                        </Col>
                    </Row>
                       
                        
            </div>
        )
    }
}
// export default UpperCustomerProfile;
function mapDispatchToProps(dispatch) {
    return {
      customerLogOut: user => dispatch(customerLogOut(user)),
      searchRestraurants : restraurant => dispatch(searchRestraurants(restraurant)),
      finalFilter : user => dispatch(finalFilter(user))
    };
  }
  
  function mapStateToProps(store) {
    //   console.log("Store is: ", store)
    return {
      msg: store.message,
      user_id : "",
      user : store.user,
      authFlag : store.authFlag,
      first_name : store.first_name,
    last_name : store.last_name,
    fullname :store.full_name,
    email : store.email,
    phoneNumber : store.phoneNumber ,
    nick_name : store.nick_name,
    birthday : store.birthday,
    headline : store.headline,
    city : store.headline,
    state : store.state,
    country : store.country,
    zip_code : store.zip_code,
    things_i_love : store.things_i_love,
    blog : store.blog,
    yelping_since : store.yelping_since,
    favourites : store.favourites,
    userUpdatedFlag : store.userUpdatedFlag,
    restraurants : store.restraurants
    };
  }
 
  const LogOutForm = connect(mapStateToProps, mapDispatchToProps)(UpperCustomerProfile);
  export default LogOutForm;