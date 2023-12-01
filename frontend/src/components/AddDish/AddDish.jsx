import React, { Component } from 'react'
import "./AddDish.css"
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import {Input, Row, Col, Avatar, Button, notification} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { BACKEND } from '../../Config';
import { Redirect } from 'react-router-dom';
import { add_dish, get_current_dish_details, update_dish, upload_dish_image} from '../../js/actions/restraurant';
import { connect } from "react-redux";
const { TextArea } = Input;

class AddDish extends Component {
    constructor(props){
        super(props);
        this.state = {
            file : "",
            dishName : "",
            dishType : "",
            description : "",
            price : "", 
            photo : "", 
            ingredients : "",
            dishId : 0,
            redirect : false,
        }
    }
    componentDidMount() {
        if(window.sessionStorage.getItem('RestrauLoggedIn'))
        {
            console.log("id is ===========", this.props.history.location.state.id )
            this.setState({
                dish_id : this.props.history.location.state.id 
            })
            if(this.props.history.location.state.id === 0)
            {
            
            }
            else{
                var dish = {
                    dish_id : this.props.history.location.state.id
                }
                this.props.get_current_dish_details(dish)
            }
        }
    }
    componentWillReceiveProps()
    {
        setTimeout(() => {
            var fileName = "";
            if(this.props.current_dish_details)
            {
                if(this.props.current_dish_details.photo)
                {
                    fileName = this.props.current_dish_details.photo.split('public').pop();
                }
                this.setState({
                    current_dish : this.props.current_dish_details,
                    photo : `${BACKEND}` + fileName,
                    dishName : this.props.current_dish_details.dish_name,
                    dishType : this.props.current_dish_details.dish_type,
                    description : this.props.current_dish_details.description,
                    price : this.props.current_dish_details.price,
                    dishId : this.props.current_dish_details._id,
                    ingredients : this.props.current_dish_details.dish_ingredients,
                    source : this.props.current_dish_details.photo
                })
            }
            
            if(this.props.dishUpdatedFlag === true)
            {
                this.setState({
                    redirect : true
                })
            }
            if(this.props.photoSrc)
            {
                this.setState({
                    photoSrc : this.props.photoSrc,
                    photo : `${BACKEND}` + this.props.fileName
                })
            }
        },);

    }
    uploadImage = () => {
        document.getElementById("imageUpload").click()
    }
    saveImage = (e) => {
        
        this.setState({
            file : e.target.files[0]
        })
        var formData = new FormData();
        formData.append("Image", e.target.files[0]);
        this.props.upload_dish_image(formData)
    }
    updateDish = () => {
        var isEmpty = false;
        for(var key in this.state)
        {
            if(key === "file" || key === "photo")
            {
                continue;
            }
            else
            {
                if(this.state.key === "" || this.state.key === ' ')
                {
                    isEmpty = true;
                    break;
                }
                
            }
        }
        if(isEmpty)
        {
            notification["error"]({
                message: 'Incomplete fields',
                description:
                  'Please complete all the fields',
              });
        }
        else
        {
            var src = this.state.source
            if(this.state.photoSrc === 'undefined' || this.state.photoSrc === undefined)
            {
                
            }
            else{
                src = this.state.photoSrc
            }
            var dish = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                dish_name : this.state.dishName,
                dish_type : this.state.dishType,
                price : this.state.price,
                description : this.state.description,
                dish_ingredients : this.state.ingredients,
                photo : src
            }
            if(this.state.dishId === 0)
            {
                console.log("dish is ", dish)
                this.props.add_dish(dish);
            }
            else{
                dish['dish_id'] = this.state.dishId;
                console.log("Dish to be updated ", dish)
                this.props.update_dish(dish);
            }
           
        }
    }
    UpdateDishName =(e) => {
        this.setState({
            dishName : e.target.value
        })
    }
    UpdateDishType =(e) => {
        this.setState({
            dishType : e.target.value
        })
    }
    UpdatePrice =(e) => {
        this.setState({
            price : e.target.value
        })
    }
    UpdateDescription =(e) => {
        this.setState({
            description : e.target.value
        })
    }
    UpdateIngredients = (e) => {
        this.setState({
            ingredients : e.target.value
        })
    }
    render() {
        let redirectVar = null
        if(!window.sessionStorage.getItem('RestrauLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        if(this.state.redirect)
        {
            redirectVar = <Redirect to = "/restrauProfile"></Redirect>
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <UpperCustomerProfile />
                </div>
                <div className="backToProfile">
                    <Row>
                        <Col>
                            <a href="/restrauProfile" style={{textDecoration:"underline", fontWeight:"bolder", color:"#0073bb", fontSize:"115%"}}>{window.sessionStorage.getItem("RestrauName")}</a>
                        </Col>
                        <Col style = {{marginLeft:"1%"}}>
                            <FontAwesomeIcon icon = {faGreaterThan} style = {{color : "grey", fontWeight:"bolder"}} />    
                        </Col>
                        <Col style = {{marginLeft:"1%"}}>
                            <h3 style = {{color: "grey"}}>Dish</h3>
                        </Col>
                    </Row>

                </div>
                <div className = "addDish">
                    <div className ='addDishForm'>
                        <div style={{ marginTop:"5%"}}>
                            <label style={{fontWeight:"bolder"}}>Dish Name</label>
                            <div style={{marginTop : "2%"}}>
                                <Input style={{width:"250%"}} value={this.state.dishName} onChange={this.UpdateDishName} size='middle' id="dishName"required/>
                            </div>
                        </div>
                        <div style={{ marginTop:"5%"}}>
                            <label style={{fontWeight:"bolder"}}>Dish Type</label>
                            <div style={{marginTop : "2%"}}>
                                <Input style={{width:"250%"}} value={this.state.dishType} onChange={this.UpdateDishType} size='middle' id="dishType"required/>
                            </div>
                        </div>
                        <div style={{ marginTop:"5%"}}>
                            <label style={{fontWeight:"bolder"}}>Price</label>
                            <div style={{marginTop : "2%"}}>
                                <Input type="number" style={{width:"250%"}} value={this.state.price} onChange={this.UpdatePrice} size='middle' id="price"required/>
                            </div>
                        </div>
                        <div style={{ marginTop:"5%"}}>
                            <label style={{fontWeight:"bolder"}}>Ingredients</label>
                            <div style={{marginTop : "2%"}}>
                                <Input style={{width:"250%"}} value={this.state.ingredients} onChange={this.UpdateIngredients} size='middle' id="ingredients"required/>
                            </div>
                        </div>
                        <div style={{ marginTop:"5%"}}>
                            <label style={{fontWeight:"bolder"}}>Description</label>
                            <div style={{marginTop : "2%"}}>
                                <TextArea rows= {4} size="10" style={{minWidth:"250%"}} value={this.state.description} onChange={this.UpdateDescription} size='middle' id="description"required/>
                            </div>
                        </div>
                        <div style={{ marginTop:"5%"}}>
                            <div style={{marginTop : "2%"}}>
                                <Button style={{marginLeft:"190%", width:"60%"}} onClick={this.updateDish}>Update</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dishImage">
                    <Avatar shape="circle" size={300} style={{marginLeft:"35%", marginTop:"2%"}} onClick={this.uploadImage} src={this.state.photo} />
                    <input accept=".jpg, .png, .jpeg" type ='file' id="imageUpload" style={{display:"none"}} onChange = {this.saveImage}/>
                </div>
                
            </div>
        )
    }
}
// export default AddDish;
function mapDispatchToProps(dispatch) {
    return {
        get_current_dish_details: user => dispatch(get_current_dish_details(user)),
        add_dish : user => dispatch(add_dish(user)),
        update_dish : user => dispatch(update_dish(user)),
        upload_dish_image : user => dispatch(upload_dish_image(user))
    };
    }
    
    function mapStateToProps(store) {
    return {
        current_dish_details : store.current_dish_details,
        dishUpdatedFlag : store.dishUpdatedFlag,
        photoSrc : store.photoSrc,
        fileName : store.fileName
    };
    }
    
    const restraurant_details = connect(mapStateToProps, mapDispatchToProps)(AddDish);
    export default restraurant_details;