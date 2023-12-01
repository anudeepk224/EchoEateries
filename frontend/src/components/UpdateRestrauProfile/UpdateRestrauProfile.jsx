import React, { Component } from 'react'
// import './UpdateProfile.css'
import {Row, Col, Table, Space, Input, Button, notification, Select} from 'antd';
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile';
import axios from 'axios';
import { BACKEND } from '../../Config';
import Avatar from 'antd/lib/avatar/avatar';
import { Redirect } from 'react-router-dom';
import { get_restraurant_profile, update_restraurant_profile_details } from '../../js/actions/restraurant';
import { connect } from "react-redux";
const {Column} = Table;
const {Option} = Select;

const data = [
    {
      key: '1',
      firstName: 'Profile Overview',
    },
    {
      key: '2',
      firstName: 'Friends',
    },
    {
      key: '3',
      firstName: 'Reviews',
    },
    {
        key: '4',
        firstName: 'Compliments',
    },
    {
        key: '5',
        firstName: 'Tips',
    },
    {
        key: '6',
        firstName: 'Bookmarks',
    },
    {
        key: '7',
        firstName: 'CheckIns',
    }
      
  ];
  
class UpdateRestrauProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            ownerName : "",
            restraurantName : "",
            description : "",
            location: "",
            zipCode: "",
            yelping_since : "",
            weekDays :"",
            weekEnd : "",
            profile_photo: "",
            email :"" ,
            phoneNumber :"",
            cusine : "",
            takeOut : "",
            delivery : "",
            dineIn : "",
            redirect : false
        }
    }
    componentDidMount() {
        if(window.sessionStorage.getItem('RestrauLoggedIn'))
        {
            if(this.props.restraurant)
            {
                this.setState({
                    ownerName : this.props.restraurant.owner_name,
                    restraurantName : this.props.restraurant.restraurant_name,
                    description : this.props.restraurant.description,
                    location: this.props.restraurant.location,
                    zipCode: this.props.restraurant.zip_code,
                    weekDays : this.props.restraurant.weekdays_timings,
                    weekEnd :this.props.restraurant.weekend_timings,
                    profile_photo: `${BACKEND}/getRestrauProfileImage/` +  window.sessionStorage.getItem("RestrauId"),
                    email : this.props.restraurant.email,
                    phoneNumber : this.props.restraurant.phone_number,
                    cusine : this.props.restraurant.cusine,
                    takeOut : this.props.restraurant.takeout,
                    delivery : this.props.restraurant.delivery,
                    dineIn : this.props.restraurant.dine_in
                })
            }
            else{
                var myJson = {
                    RestrauId : window.sessionStorage.getItem("RestrauId")
                }
                this.props.get_restraurant_profile(myJson)
            }
        }
       
    }
    componentWillReceiveProps()
    {
        setTimeout(() => {
            if(this.props.message === "Restraurant details updated")
            {
                this.setState({
                    redirect : true
                })
            }
            this.setState({
                ownerName : this.props.restraurant.owner_name,
                restraurantName : this.props.restraurant.restraurant_name,
                description : this.props.restraurant.description,
                location: this.props.restraurant.location,
                zipCode: this.props.restraurant.zip_code,
                weekDays : this.props.restraurant.weekdays_timings,
                weekEnd :this.props.restraurant.weekend_timings,
                profile_photo: `${BACKEND}/getRestrauProfileImage/` +  window.sessionStorage.getItem("RestrauId"),
                email : this.props.restraurant.email,
                phoneNumber : this.props.restraurant.phone_number,
                cusine : this.props.restraurant.cusine,
                takeOut : this.props.restraurant.takeout,
                delivery : this.props.restraurant.delivery,
                dineIn : this.props.restraurant.dine_in
            })

        }, );
    }
    UpdateOwnerName =(e) => {

        this.setState({
            ownerName : e.target.value
        })
    }
    UpdateEmail =(e) => {
        this.setState({
            email : e.target.value
        })
    }
    UpdatePhoneNumber =(e) => {
        this.setState({
            phoneNumber : e.target.value
        })
    }
    UpdateRestraurantName =(e) => {
        this.setState({
            restraurantName : e.target.value
        })
    }
    UpdateDescription =(e) => {
        this.setState({
            description : e.target.value
        })
    }
    UpdateLocation =(e) => {
        this.setState({
            location : e.target.value
        })
    }
    UpdateZipCode =(e) => {
        this.setState({
            zipCode : e.target.value
        })
    }
    UpdateWeekDays =(e) => {
        this.setState({
            weekDays : e.target.value
        })
    }
    UpdateWeekEnd =(e) => {
        this.setState({
            weekEnd : e.target.value
        })
    }
    UpdateDelivery = (value) => {
        this.setState({
            delivery : `${value}`
        })
    }
    UpdateTakeOut = (value) => {
        this.setState({
            takeOut : `${value}`
        })
    }
    UpdateCusine = (e) => {
        this.setState({
            cusine : e.target.value
        })
    }
    UpdateDineIn = (value) => {
        this.setState({
            dineIn : `${value}`
        })
    }
    handleUpdate = () => {
        var isEmpty = false;
        if(this.state.ownerName === "" || this.state.email === "" || this.state.phoneNumber === "" || this.state.restraurantName === "" 
        || this.state.description === "" || this.state.location === "" || this.state.zipCode === "" || this.state.weekDays === "" || this.state.weekEnd === "" 
        || this.state.ownerName === " " || this.state.email === " " || this.state.phoneNumber === " " || this.state.restraurantName === " " 
        || this.state.description === " " || this.state.location === " " || this.state.zipCode === " " || this.state.weekDays === " " || this.state.weekEnd === " ")
        {
            isEmpty = true
        }
        if(isEmpty)
        {
            notification["error"]({
                message: 'Incomplete fields',
                description:
                  'Please complete all the fields',
              });
        }
        if(!isEmpty)
        {
            var restraurant = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                owner_name : this.state.ownerName,
                email : this.state.email,
                phone_number : this.state.phoneNumber,
                restraurant_name : this.state.restraurantName,
                description : this.state.description,
                location : this.state.location,
                zip_code : this.state.zipCode,
                weekdays_timings : this.state.weekDays,
                weekend_timings : this.state.weekEnd,
                delivery : this.state.delivery,
                takeout : this.state.takeOut,
                cusine : this.state.cusine,
                dine_in : this.state.dineIn
            }
            this.props.update_restraurant_profile_details(restraurant)
            // axios.post(`${BACKEND}/updateRestrauDetails`, restraurant).then(response => {
            //     if(response.status === 200)
            //     {
            //         window.location.href = '/restrauProfile'
            //     }
            // })
        }
        
    }
    render() {
        let redirectVar = null
        if(!window.sessionStorage.getItem('RestrauLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        if(this.state.redirect)
        {
            redirectVar = <Redirect to = '/restrauProfile' />
        }
        return (
            <div>
                {redirectVar}
                <div className='upperBar'>
                    <UpperCustomerProfile />
                </div>
                <div className = "lowerDiv">
                    <Row>
                        <Col md ={3} style={{marginLeft: "13%", marginTop:"1%"}}>
                        <h2 style = {{fontWeight:"bolder", marginTop:"2%", marginLeft:"18%", color:"#2f3235", width : "100%"}}>{this.state.firstName}'s Profile</h2>
                                <Table dataSource={data} pagination={false} style={{width:"100%", marginLeft:"15%"}}>
                                <Column
                                    key="firstName"
                                    render={(text, record) => (
                                        <Space size="middle">
                                        <a style={{color:"grey", fontWeight:"bolder"}}>{record.firstName}</a>
                                        </Space>
                                    )}
                                    />
                                </Table>
                        </Col>
                        <Col md = {9} style={{marginLeft:"7%", marginTop:"1%"}}>
                            <div>
                                <h2 style={{fontWeight : "bolder", color:"#d32323",paddingBottom:"5%", borderBottom :"1px solid lightgrey"}}>Profile</h2>
                            </div>
                            <div style={{float:"left"}}>
                                <div>
                                    <label style={{fontWeight:"bolder"}}>Your Profile Photo<a href="/uploadPicture" style={{textDecoration:"underline"}}>(Update)</a></label>
                                    <div style={{marginTop : "2%"}}>
                                        <Avatar style={{border: "1px solid lightgrey"}} shape="square" size = {100} src = {this.state.profile_photo}/>  
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Owner Name</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' id="firstName" value = {this.state.ownerName} onChange={this.UpdateOwnerName} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Email</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input type="email" style={{width:"250%"}} id="email" size='middle' value = {this.state.email} onChange={this.UpdateEmail} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Phone Number</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input type="number" style={{width:"250%"}} size='middle' value = {this.state.phoneNumber} onChange={this.UpdatePhoneNumber} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Restraurant Name</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.restraurantName} onChange={this.UpdateRestraurantName} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Description</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.description} onChange={this.UpdateDescription} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Location</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' id = 'address' value = {this.state.location} onChange={this.UpdateLocation} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Zip Code</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input type="number" style={{width:"250%"}} size='middle' value = {this.state.zipCode} onChange={this.UpdateZipCode} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>WeekDays Timings</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.weekDays} onChange={this.UpdateWeekDays} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>WeekEnd Timings</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.weekEnd} onChange={this.UpdateWeekEnd} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Cusine</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.cusine} onChange={this.UpdateCusine} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Delivery</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Select style={{width:"250%"}} size='middle' value = {this.state.delivery} onChange={this.UpdateDelivery} required>
                                            <Option value="yes">Yes</Option>
                                            <Option value="no">No</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Take out</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Select style={{width:"250%"}} size='middle' value = {this.state.takeOut} onChange={this.UpdateTakeOut} required>
                                            <Option value="yes">Yes</Option>
                                            <Option value="no">No</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Dine In</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Select style={{width:"250%"}} size='middle' value = {this.state.dineIn} onChange={this.UpdateDineIn} required>
                                            <Option value="yes">Yes</Option>
                                            <Option value="no">No</Option>
                                        </Select>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    
                                    <div style={{marginTop : "2%"}}>
                                        <Button type="primary" style={{backgroundColor : "#d32323", width:"50%"}} onClick = {this.handleUpdate} >Update</Button>
                                    </div>
                                </div>
                            </div>
                            
                        </Col>
                    </Row>
                </div>
                <div>
                    
                </div>
            </div>
        )
    }
}
// export default  UpdateRestrauProfile;
function mapDispatchToProps(dispatch) {
    return {
        get_restraurant_profile: user => dispatch(get_restraurant_profile(user)),
        update_restraurant_profile_details : user => dispatch(update_restraurant_profile_details(user))
    };
}
    
function mapStateToProps(store) {
    console.log("STore is update profile is ", store)
    return {
        restraurant : store.restraurant,
        message : store.message
    };
}
    
const update_restraurant_details = connect(mapStateToProps, mapDispatchToProps)(UpdateRestrauProfile);
export default update_restraurant_details;