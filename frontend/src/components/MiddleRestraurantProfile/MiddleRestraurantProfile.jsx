import React, { Component } from 'react'
import './MiddleRestraurantProfile.css';
import {Avatar, Row, Col, notification} from 'antd';
import {SmileOutlined} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faUtensils, faCamera, faIdCard } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import {Link} from 'react-router-dom'
import { BACKEND } from '../../Config';
import { get_restraurant_profile } from '../../js/actions/restraurant';
import { connect } from "react-redux";
class MiddleRestraurantProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            image : "https://images.english.elpais.com/resizer/JlI7eLw3aILhKhZ-QgkOMSxctUg=/768x0/arc-anglerfish-eu-central-1-prod-prisa.s3.amazonaws.com/public/4OP3BG6NLORJ4PTWJHXPU72ERM.jpg",
            name : "Udit Marolia",
            location : "San Jose, CA",
            friends : 10,
            photos : 7,
            reviews : 107,
            restraurant : {}
        }
    }
    componentDidMount() {
        
        // this.getRestrauDetails();
       
        if(this.props.restraurant)
        {
            if(this.props.restraurant.photo)
            {
                var fileName = this.props.restraurant.photo.split('public').pop()
                this.setState({
                    restraurant : this.props.restraurant,
                    image : `${BACKEND}` +  fileName
                })
            }
            else{
                this.setState({
                    restraurant : this.props.restraurant,
                    image : `${BACKEND}` + "/profile_images/user.png"
                })
            }
        }
        else {
            var myJson = {
                RestrauId : window.sessionStorage.getItem("RestrauId")
            }
            this.props.get_restraurant_profile(myJson)
        }
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            if(this.props.restraurant.photo)
            {
                var fileName = this.props.restraurant.photo.split('public').pop()
                this.setState({
                    restraurant : this.props.restraurant,
                    image : `${BACKEND}` +  fileName
                })
            }
            else{
                this.setState({
                    restraurant : this.props.restraurant,
                    image : `${BACKEND}` + "/profile_images/user.png"
                })
            }
                // var fileName = this.props.restraurant.photo.split('public').pop()
                // this.setState({
                //     restraurant : this.props.restraurant,
                //     image : `${BACKEND}` +  fileName
                // })
        })
    }
    // getRestrauDetails = () => {
       
    //     axios.defaults.withCredentials = true;
    //     axios.post(`${BACKEND}/getRestrauDetails`, myJson).then(response => {
    //         if(response.status === 200)
    //         {
    //             window.sessionStorage.setItem("RestrauName",response.data.restraurant_name);
    //             this.setState({
    //                 restraurant_name : response.data.restraurant_name
    //             })
    //             // window.sessionStorage.setItem('Name', response.data.first_name + " " + response.data.last_name.charAt(0) + ".")
    //             if(response.data.profile_photo === null)
    //             {
    //             }
    //             Object.keys(response.data).forEach(function(key) {
    //                 if(response.data[key] === null || response.data[key] === "null") {
    //                     response.data[key] = '';
    //                 }
    //             })
    //             if(response.data.location === "")
    //             {
    //                 response.data.location = "Please update your location"
    //             }

    //             this.setState({
    //                 first_name : response.data.first_name,
    //                 city : response.data.city,
    //                 location : response.data.location
    //             })
                
    //         }
    //     }).catch(err => {
    //         if(err)
    //         {
    //             notification["error"]({
    //                 message: 'Server Sider error',
    //                 description:
    //                   'Please try again in few minutes',
    //               });
    //         }
    //     })
    // }

    render() {
        return (
            <div>
                <div className = "middleBar">
                    <div className="userDetails">
                        <div className='name'>
                            <h1 style ={{fontWeight:"bolder"}}>{this.state.restraurant.restraurant_name}</h1>
                        </div>
                        <div className="location">
                            <h3>{this.state.restraurant.location}</h3>
                        </div>
                        <div className="stats">
                           
                        </div>
                        <div className = "partition">

                        </div>
                        <div className="actions">
                            <div className="addPic">
                                <FontAwesomeIcon style={{color:"rgb(25 142 255 / 1)",fontSize:"170%"}} icon = {faCamera}  />
                                <a  style={{ fontWeight:"bolder", marginTop:"-8%", marginLeft:"3%", textDecoration:"underline"}}><Link to={{ 
                                    pathname: "/uploadPicture", 
                                    state: {source : "restrau"}}}>Upload a picture</Link></a>
                            </div>
                            <div style = {{marginLeft:"15%"}}>
                                <FontAwesomeIcon style={{color:"rgb(25 142 255 / 1)",fontSize:"170%"}} icon = {faCamera}  />
                                <a  style={{ fontWeight:"bolder", marginTop:"-8%", marginLeft:"3%", textDecoration:"underline"}}><Link to={{ 
                                    pathname: "/restraurantPictures"
                                    }}>Add Restraurant Pictures</Link></a>
                            </div>
                            <div className="updateProfile">
                                <FontAwesomeIcon style={{color:"rgb(25 142 255 / 1)",fontSize:"170%"}} icon = {faIdCard}  />
                                <Link to='/updateRestrauProfile' style={{ fontWeight:"bolder", marginTop:"-8%", marginLeft:"3%", textDecoration:"underline"}}>Update Profile</Link>
                            </div>
                            <div className="updateProfile">
                                <FontAwesomeIcon style={{color:"rgb(25 142 255 / 1)",fontSize:"170%"}} icon = {faUtensils}  />
                                <a style={{ fontWeight:"bolder", marginTop:"-8%", marginLeft:"3%", textDecoration:"underline"}}><Link to = {{ 
                                pathname: "/addDish", 
                                state: {id : 0}
                               }}>Add Dish</Link></a>
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
    
    const restraurant_details = connect(mapStateToProps, mapDispatchToProps)(MiddleRestraurantProfile);
    export default restraurant_details;