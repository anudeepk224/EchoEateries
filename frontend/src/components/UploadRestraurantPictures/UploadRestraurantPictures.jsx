import { Button, Col, notification, Row } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BACKEND } from '../../Config';
import { update_restraurant_images } from '../../js/actions/restraurant';
import UpperRestraurantProfile from '../UpperRestraurantProfile/UpperRestraurantProfile';

class UploadRestraurantPictures extends Component {
    constructor(props){
        super(props);
        this.state = {
            photo : "", 
            index : 0,
            image1 : "",
            image2 : "",
            image3 : "",
            image4 : "",
        }
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            var fileName = this.props.restraurant_image_name.split('public').pop()
            switch(this.state.index){
                case 1:
                    this.setState({
                        image1 : `${BACKEND}` + fileName
                    })
                    break;
                case 2:
                    this.setState({
                        image2 : `${BACKEND}` + fileName
                    })
                    break;
                case 3:
                    this.setState({
                        image3 : `${BACKEND}` + fileName
                    })
                    break;
                case 4:
                this.setState({
                    image4 : `${BACKEND}` + fileName
                })
                break;
            }    
        }, );
    }
    uploadImage = (index) => {
        this.setState({
            index : index
        })
        document.getElementById('imageUpload').click();
    }
    saveImage = (e) => {
        var file = e.target.files[0];
        var formdata = new FormData();
        formdata.append("Image", file);
        formdata.append("restraurant_id", window.sessionStorage.getItem("RestrauId"))
        this.props.update_restraurant_images(formdata)
        // Axios.post(`${BACKEND}/uploadRestraurantImages`, formdata).then(response => {
        //     if(response.status === 200)
        //     {
        //         var fileName = response.data.split('public').pop();
        //         console.log("Index is ",this.state.index)
        //         console.log("RESPONSE is", response.data)
        //         switch(this.state.index){
        //         case 1:
        //             this.setState({
        //                 image1 : `${BACKEND}` + fileName
        //             })
        //             break;
        //         case 2:
        //             this.setState({
        //                 image2 : `${BACKEND}` + fileName
        //             })
        //             break;
        //         case 3:
        //             this.setState({
        //                 image3 : `${BACKEND}` + fileName
        //             })
        //             break;
        //         case 4:
        //         this.setState({
        //             image4 : `${BACKEND}` + fileName
        //         })
        //         break;

        //         }
                

        //     }
        // })
    }
    upload = () => {
        window.location.href = "/restrauProfile"
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
                <div>
                    <UpperRestraurantProfile />
                </div>
                <div style = {{
                    marginLeft : "8%",
                    marginTop: "5%"
                }}>
                    <h1 style = {{color :"#d32323", fontWeight :"bolder"}}>Upload Restraurant Pictures</h1>
                </div>
                <div>
                    <Row style = {{marginTop:"5%"}}>
                        <Col>
                            <Avatar shape="circle" size={300} style={{marginLeft:"35%", marginTop:"2%"}} onClick={() => this.uploadImage(1)} src={this.state.image1} />
                        </Col>
                        <Col style = {{marginLeft:"3%"}}>
                            <Avatar shape="circle" size={300} style={{marginLeft:"35%", marginTop:"2%"}} onClick={() => this.uploadImage(2)} src={this.state.image2} />
                        </Col>
                        <Col style = {{marginLeft:"3%"}}>
                            <Avatar shape="circle" size={300} style={{marginLeft:"35%", marginTop:"2%"}} onClick={() => this.uploadImage(3)} src={this.state.image3} />
                        </Col>
                        <Col style = {{marginLeft:"3%"}}>
                            <Avatar shape="circle" size={300} style={{marginLeft:"35%", marginTop:"2%"}} onClick={() => this.uploadImage(4)} src={this.state.image4} />
                        </Col>
                    </Row>
                    <input type ='file' id="imageUpload" style={{display:"none"}} accept=".jpg, .png, .jpeg" onChange = {this.saveImage}/>
                </div>
                <div>
                    <Button style = {{marginLeft : "80%", marginTop:"5%", width : "15%"}} onClick = {this.upload}>Upload</Button>
                </div>
            </div>
        )
    }
}
// export default UploadRestraurantPictures;
function mapDispatchToProps(dispatch) {
    return {
        update_restraurant_images: user => dispatch(update_restraurant_images(user))
    };
    }
    
    function mapStateToProps(store) {
    
    return {
       message : store.message,
       restraurant_image_name : store.restraurant_image_name
    };
    }
    
    const upload_restraurant_images_form = connect(mapStateToProps, mapDispatchToProps)(UploadRestraurantPictures);
    export default upload_restraurant_images_form;