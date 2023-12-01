import React, { Component } from 'react'
import './UpdateProfile.css'
import {Row, Col, Table, Space, Input, Button} from 'antd';
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile';
import axios from 'axios';
import { BACKEND } from '../../Config';
import Avatar from 'antd/lib/avatar/avatar';
import { getCustomerProfile, updateCustomerProfile } from '../../js/actions';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies';

const {Column} = Table;
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
class UpdateProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName : "",
            lastName : "",
            nickName : "",
            birthDay : "",
            headLine : "",
            address : "",
            city : "",
            state : "",
            country: "",
            thingsILove : "", 
            zipCode: "",
            yelping_since : "",
            favourites :"",
            blog : "",
            profile_photo: "",
            email :"" ,
            phoneNumber :"",
            full_name : ""
        }
        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            this.getUserDetails();
        }
        
    }
    componentDidMount() {
        // this.getUserDetails();
        setTimeout(() => {
            
        }, 0);
       
        
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            var birth_day = ""
            var yelping_since = ""
            if(this.props.user.birth_day != null)
            {
                birth_day = this.props.user.birth_day;
                birth_day = birth_day.substring(0, birth_day.indexOf('T'));
            }
            if(this.props.user.yelping_since != null)
            {

                yelping_since = this.props.user.yelping_since;
                yelping_since = yelping_since.substring(0, yelping_since.indexOf('T'));
            }

            this.setState({
                firstName : this.props.user.first_name,
                lastName : this.props.user.last_name,
                nickName : this.props.user.nick_name,
                birthDay : birth_day,
                headLine : this.props.user.headline,
                address : this.props.user.address,
                city : this.props.user.city,
                state : this.props.user.state,
                country: this.props.user.country,
                thingsILove : this.props.user.things_i_love, 
                zipCode: this.props.user.zip_code,
                yelping_since : yelping_since,
                favourites : this.props.user.favourites,
                blog : this.props.user.blog,
                profile_photo: `${BACKEND}/getProfileImage/` +  window.sessionStorage.getItem("UserId"),
                email : this.props.user.email ,
                phoneNumber : this.props.user.phone_number
            })
        })
    }
    getUserDetails = () => {
        var myJson = {
            UserId : window.sessionStorage.getItem("UserId")
        }
        this.props.getCustomerProfile(myJson);
        // ("JSON is ________: ", myJson)
        // axios.post(`${BACKEND}/getUserDetails`, myJson).then(response => {
        //     if(response.status === 200)
        //     {   
        //         var birth_day = ""
        //         var yelping_since = ""
        //         if(response.data.birth_day != null)
        //         {
        //             birth_day = response.data.birth_day;
        //             birth_day = birth_day.substring(0, birth_day.indexOf('T'));
        //         }
        //         if(response.data.yelping_since != null)
        //         {

        //             yelping_since = response.data.yelping_since;
        //             yelping_since = yelping_since.substring(0, yelping_since.indexOf('T'));
        //         }
        //         Object.keys(response.data).forEach(function(key) {
        //             if(response.data[key] === null || response.data[key] === "null") {
        //                 response.data[key] = '';
        //             }
        //         })
        //         (response.data)

        //        this.setState({
        //             firstName : response.data.first_name,
        //             lastName : response.data.last_name,
        //             nickName : response.data.nick_name,
        //             birthDay : birth_day,
        //             headLine : response.data.headline,
        //             city : response.data.city,
        //             state : response.data.state,
        //             country: response.data.country,
        //             thingsILove : response.data.things_i_love,
        //             zipCode: response.data.zip_code,
        //             yelping_since : yelping_since,
        //             favourites :response.data.favourites,
        //             blog : response.data.blog,
        //             profile_photo: `${BACKEND}/getProfileImage/` +  window.sessionStorage.getItem("UserId"),
        //             email : response.data.email,
        //             phoneNumber : response.data.phone_number
        //        })
        //     }
        // }).catch(err => {
        //     (err)
        // })
    }
    UpdateFirstName =(e) => {
        this.setState({
            firstName : e.target.value
        })
    }
    UpdateLastName =(e) => {
        this.setState({
            lastName : e.target.value
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
    UpdateNickName =(e) => {
        this.setState({
            nickName : e.target.value
        })
    }
    UpdateBirthDay =(e) => {
        this.setState({
            birthDay : e.target.value
        })
    }
    UpdateHeadline =(e) => {
        this.setState({
            headLine : e.target.value
        })
    }
    UpdateAddress =(e) => {
        this.setState({
            address : e.target.value
        })
    }
    UpdateCity =(e) => {
        this.setState({
            city : e.target.value
        })
    }
    UpdateState =(e) => {
        this.setState({
            state : e.target.value
        })
    }
    UpdateCountry =(e) => {
        this.setState({
            country : e.target.value
        })
    }
    UpdateZipCode =(e) => {
        this.setState({
            zipCode : e.target.value
        })
    }
    UpdateLove =(e) => {
        this.setState({
            thingsILove : e.target.value
        })
    }
    UpdateBlog =(e) => {
        this.setState({
            blog : e.target.value
        })
    }
    UpdateYelpSince =(e) => {
        this.setState({
            yelping_since : e.target.value
        })
    }
    UpdateFavourites =(e) => {
        this.setState({
            favourites : e.target.value
        })
    }
    handleUpdate = () => {
        var user = {
            user_id : window.sessionStorage.getItem("UserId"),
            full_name : this.state.fi,
            first_name : this.state.firstName,
            last_name : this.state.lastName,
            email : this.state.email,
            phone_number : this.state.phoneNumber,
            nick_name : this.state.nickName,
            birth_day : this.state.birthDay,
            headline : this.state.headLine,
            address : this.state.address,
            city : this.state.city,
            state: this.state.state,
            country : this.state.country,
            zip_code : this.state.zipCode,
            things_i_love : this.state.thingsILove,
            blog : this.state.blog,
            // yelping_since : this.state.yelping_since,
            favourites : this.state.favourites
        }
        this.props.updateCustomerProfile(user)
        // axios.post(`${BACKEND}/updateUserInfo`, user).then(response => {
        //     if(response.status === 200)
        //     {
        //         window.location.href = '/customerProfile'
        //     }
        // }).catch();
    }
    render() {
        let redirectVar = null;
        if(!window.sessionStorage.getItem('isLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        if(this.props.userUpdatedFlag)
        {
            redirectVar = <Redirect to ='/customerProfile'></Redirect>
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
                                    <label style={{fontWeight:"bolder"}}>Your Profile Photo</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Avatar style={{border: "1px solid lightgrey"}} shape="square" size = {100} src = {this.state.profile_photo}/>  
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>First Name</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' id="firstName" value = {this.state.firstName} onChange={this.UpdateFirstName} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Last Name</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.lastName} onChange={this.UpdateLastName} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Email</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input type="email" style={{width:"250%"}} size='middle' disabled value = {this.state.email} onChange={this.UpdateEmail} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Phone Number</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input type="number" style={{width:"250%"}} size='middle' value = {this.state.phoneNumber} onChange={this.UpdatePhoneNumber} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Nick Name</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.nickName} onChange={this.UpdateNickName} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Birth Day</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input type="date" style={{width:"250%"}} size='middle' value = {this.state.birthDay} onChange={this.UpdateBirthDay} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Headline</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.headLine} onChange={this.UpdateHeadline} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Address</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.address} onChange={this.UpdateAddress} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>City</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.city} onChange={this.UpdateCity} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>State</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.state} onChange={this.UpdateState} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Country</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.country} onChange={this.UpdateCountry} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Zip Code</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input type="number" style={{width:"250%"}} size='middle' value = {this.state.zipCode} onChange={this.UpdateZipCode} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Things I Love</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.thingsILove} onChange={this.UpdateLove} required/>
                                    </div>
                                </div>
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Blog or website</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.blog} onChange={this.UpdateBlog} required/>
                                    </div>
                                </div>
                                {/* <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Yelping Since</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input type="date" disabled style={{width:"250%"}} size='middle' value = {this.state.yelping_since} onChange={this.UpdateYelpSince} required/>
                                    </div>
                                </div> */}
                                <div style={{ marginTop:"5%"}}>
                                    <label style={{fontWeight:"bolder"}}>Favorites</label>
                                    <div style={{marginTop : "2%"}}>
                                        <Input style={{width:"250%"}} size='middle' value = {this.state.favourites} onChange={this.UpdateFavourites} required/>
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
// export default  UpdateProfile;
function mapDispatchToProps(dispatch) {
    return {
      getCustomerProfile: user => dispatch(getCustomerProfile(user)),
      updateCustomerProfile: user => dispatch(updateCustomerProfile(user))
    };
  }

  function mapStateToProps(store) {
    return {
      
    //   user_id : store.user_id
        msg: store.message,
        user: store.user,
        fullname : store.fullname,
        first_name : store.first_name,
        last_name : store.last_name,
        nick_name : store.nick_name,
        birthday : store.birthday,
        headline : store.headline,
        address : store.address,
        city : store.city,
        yelping_since : store.yelping_since,
        things_i_love : store.things_i_love,
        location : store.location,
        state : store.state,
        country : store.country,
        zip_code : store.zip_code,
        favourites : store.favourites,
        blog : store.blog,
        profile_photo : store.profile_photo,
        email : store.email,
        phoneNumber : store.phoneNumber,
        userUpdatedFlag : store.userUpdatedFlag
    };
  }
 
  const customerProfile = connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
  export default customerProfile;
