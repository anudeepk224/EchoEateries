import React, { Component } from 'react';
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'; 
import './UploadPicture.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import {Row, Col, Avatar, notification} from "antd";
import axios from 'axios';
import { BACKEND } from '../../Config';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { upload_user_photo } from '../../js/actions/index'
import { update_restraurant_photo } from '../../js/actions/restraurant';
// import "../../profile_photos/d7d80c5c-45e4-4ccc-a15c-e37cff7c4961-kobe.jpg";
class UploadPicture extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : "",
            newImage : "",
            path : ""
        }
        
    }
    componentDidMount() {
        if(window.sessionStorage.getItem("isLoggedIn") || window.sessionStorage.getItem('RestrauLoggedIn'))
        {   
            console.log(this.props.history)
            console.log("1111!!!!!", this.props.history.location.state.source)
            if(this.props.history.location.state.source === 'restrau')
            {
                console.log('true')
                this.setState({
                    name : window.sessionStorage.getItem("RestrauName"),
                    path : "/restrauProfile"
                })
            }
            else 
            {
                this.setState({
                    name : window.sessionStorage.getItem("Name"),
                    path : "/customerProfile"
                })
            }
        }
    }
    uploadPhoto = (e) =>{
        console.log(e.target.files[0]);
        var files = new FormData();
        files.append("Image", e.target.files[0]);
        
        console.log("Form data is: ", files)
        axios.defaults.withCredentials = true;
        if(this.props.history.location.state.source === 'restrau')
        {
            files.append("restrauId", sessionStorage.getItem("RestrauId"));
            this.props.update_restraurant_photo(files)
        }
        else{
            files.append("UserId", sessionStorage.getItem("UserId"));
            // files
            this.props.upload_user_photo(files)
        }
       
    }
    render() {
        let redirectVar = null
        // if(!window.sessionStorage.getItem('isLoggedIn'))
        // {
        //     redirectVar = <Redirect to ='/landingPage'></Redirect>
        // }
        if(this.props.message === "Photo Uploaded")
        {
            redirectVar = <Redirect to = {this.state.path} />
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <UpperCustomerProfile/>
                </div>
                <div>
                </div>
                <div className="linkToProfile">
                    <Row>
                        <Col>
                            <a href={this.state.path} style={{textDecoration:"underline", fontWeight:"bolder", color:"#0073bb", fontSize:"115%"}}>{this.state.name}</a>
                        </Col>
                        <Col style = {{marginLeft:"1%"}}>
                            <FontAwesomeIcon icon = {faGreaterThan} style = {{color : "grey", fontWeight:"bolder"}} />    
                        </Col>
                        <Col style = {{marginLeft:"1%"}}>
                            <h3 style = {{color: "grey"}}>Profile Photos</h3>
                        </Col>
                    </Row>
                </div>
                <div className="outerUploadDiv">
                    <div className="uploadFile">
                        <input type = 'file' accept=".jpg, .png, .jpeg" onChange={this.uploadPhoto}></input>
                    </div>
                </div>
            </div>
        )
    }
}
// export default UploadPicture;
function mapDispatchToProps(dispatch) {
    return {
        upload_user_photo: user => dispatch(upload_user_photo(user)),
        update_restraurant_photo : user => dispatch(update_restraurant_photo(user))
    };
    }
    
    function mapStateToProps(store) {
    
    return {
        message : store.message
    };
    }
    
    const upload_photo_form = connect(mapStateToProps, mapDispatchToProps)(UploadPicture);
    export default upload_photo_form;