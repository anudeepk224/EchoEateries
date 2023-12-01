import React, { Component } from 'react'
import {Avatar, Row, Col, notification} from 'antd';
import {Link, Redirect} from 'react-router-dom'
import {SmileOutlined} from '@ant-design/icons';
import './MiddleCustomerProfile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faStar, faCamera, faIdCard } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { BACKEND } from '../../Config';
import { getCustomerProfile } from '../../js/actions';
import { connect } from "react-redux";
class MiddleCustomerProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            image : "https://images.english.elpais.com/resizer/JlI7eLw3aILhKhZ-QgkOMSxctUg=/768x0/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/4OP3BG6NLORJ4PTWJHXPU72ERM.jpg",
            name : "",
            location : "",
            friends : 10,
            photos : 7,
            reviews : 107,
            updateFlag : false,

        }
        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            var user = {
                UserId : window.sessionStorage.getItem("UserId")
            }
            // this.props.getCustomerProfile(user);
            // this.getUserDetails();
        }
        else{
        }
        
    }
    redirect = () => {
        this.setState({
            updateFlag : true
        })
    }
    componentDidMount(){
        // this.getProfileImage();
        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            if(this.props.user)
        {
            var filename = "/profile_images/user.png"
            if(this.props.user.profile_photo)
            {
                filename = this.props.user.profile_photo.split('public').pop()
            }
            this.setState({
                name : this.props.user.first_name + " " + this.props.user.last_name,
                image : `${BACKEND}` +  filename
            })
        }
        else {
            var user = {
                UserId : window.sessionStorage.getItem("UserId")
            }
            this.props.getCustomerProfile(user)
        }
        }   
        
        
    }
    componentWillReceiveProps() {
        setTimeout(() => {
            
            console.log(filename)
           
            if(this.props.user)
            {
                var filename = "/profile_images/user.png"
                if(this.props.user.profile_photo)
                {
                    filename = this.props.user.profile_photo.split('public').pop()
                }
                this.setState({
                    name : this.props.user.first_name + " " + this.props.user.last_name,
                    image : `${BACKEND}` +  filename
                })
            }
        })
    }
    
    render() {
        var name = ""
        var location = ""
        if(this.props.user)
        {
            name = this.props.user.first_name + " " + this.props.user.last_name
            if(this.props.user.city !== undefined && this.props.user.state !== undefined)
            {
                location = this.props.user.city + ", " + this.props.user.state
            }
        }
        return (
            <div>
                <div className = "middleBar">
                    <div className="userDetails">
                        <div className='name'>
                            <h1 style ={{fontWeight:"bolder"}}>{name}</h1>
                        </div>
                        <div className="location">
                            <h3>{location}</h3>
                        </div>
                        <div className="stats">
                            <Row>
                                <Col xs = {4}>
                                <FontAwesomeIcon style={{color:"orange",fontSize:"170%"}} icon = {faUserFriends}  />
                                <h4 style={{color:"purple", fontWeight:"bolder", marginTop:"-16%", marginLeft:"22%"}}>{this.state.friends} Friends</h4>
                                </Col>
                                <Col xs = {4} style={{marginLeft:"-5%"}}>
                                    <FontAwesomeIcon style={{color:"orange",fontSize:"170%"}} icon = {faStar}  />
                                    <h4 style={{color:"purple", fontWeight:"bolder", marginTop:"-16%", marginLeft:"22%"}}>{this.state.reviews} Reviews</h4>
                                </Col>
                                <Col xs = {4} style={{marginLeft:"-3%"}}>
                                    <FontAwesomeIcon style={{color:"orange",fontSize:"170%"}} icon = {faCamera}  />
                                    <h4 style={{color:"purple", fontWeight:"bolder", marginTop:"-16%", marginLeft:"22%"}}>{this.state.photos} Photos</h4>
                                </Col>
                            </Row>
                        </div>
                        <div className = "partition">

                        </div>
                        <div className="actions">
                            <div className="addPic">
                                <FontAwesomeIcon style={{color:"rgb(25 142 255 / 1)",fontSize:"170%"}} icon = {faCamera}  />
                                <a style={{ fontWeight:"bolder", marginTop:"-8%", marginLeft:"3%", textDecoration:"underline"}}><Link to={{ 
                                    pathname: "/uploadPicture", 
                                    state: {source : "customer"}}}>Upload a picture</Link></a>
                            </div>
                            <div className="updateProfile">
                                <FontAwesomeIcon style={{color:"rgb(25 142 255 / 1)",fontSize:"170%"}} icon = {faIdCard}  />
                                <Link to="/updateProfile" style={{ fontWeight:"bolder", marginTop:"-8%", marginLeft:"3%", textDecoration:"underline"}}>Update Profile</Link>
                            </div>
                            <div className="updateProfile">
                                <FontAwesomeIcon style={{color:"rgb(25 142 255 / 1)",fontSize:"170%"}} icon = {faUserFriends}  />
                                <a  style={{ fontWeight:"bolder", marginTop:"-8%", marginLeft:"3%", textDecoration:"underline"}}>Add Friends</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="imageDiv" >
                    <Avatar className="imageBox" shape="square" style={{height:"100%", width:"100%"}} size = 'small' src = {this.state.image}  ></Avatar>
                </div>
                {/* <div style={{backgroundColor:"#f5f5f5"}}>
                    <div className='footer'>

                    </div>
                </div> */}
               
            </div>
        )
    }
}
// export default MiddleCustomerProfile;
function mapDispatchToProps(dispatch) {
    return {
        getCustomerProfile: user => dispatch(getCustomerProfile(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
        // customer_reviews : store.customer_reviews
        user : store.user
    };
  }
 
  const middleCustomerProfile = connect(mapStateToProps, mapDispatchToProps)(MiddleCustomerProfile);
  export default middleCustomerProfile;
