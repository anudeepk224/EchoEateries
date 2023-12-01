// 
import React, { Component } from 'react'
import {Row, Col, Card, Avatar, Button, notification} from 'antd';
import { BACKEND } from '../../Config';
import {Link, Redirect} from "react-router-dom"
import Axios from 'axios';
import { add_item_to_cart } from '../../js/actions';
import { connect } from "react-redux";

class DishDetails extends Component {
    constructor(props)
    {
        super(props);
        var filename = props.dish.photo.split('public').pop();
        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            this.state = {
                id : this.props.dish._id,
                name : this.props.dish.dish_name,
                type : this.props.dish.dish_type,
                price : this.props.dish.price,
                description : this.props.dish.description,
                image : `${BACKEND}` + filename,
                source : "",
                restraurant_id : this.props.dish.restraurant_id,
            }
        }
       
       
    }
    addDishToCart = (id) => {
        if(window.sessionStorage.getItem("OrderRestrauId"))
        {
            console.log("New dish id is = ", this.state.restraurant_id)
            console.log("Old dish id is ", )
            if(this.state.restraurant_id === window.sessionStorage.getItem("OrderRestrauId"))
            {
                //add
                this.addToCart();
            }
            else{
                notification["error"]({
                    message: 'Different Restraurant',
                    description:
                    'You have cart items from different restraurants in the cart',
                });
            }
        }
        else{
            this.addToCart();
        }
        
    }
    addToCart =() => {
        var cartItem = {
            dish_id : this.state.id,
            restraurant_id : this.state.restraurant_id,
            user_id : window.sessionStorage.getItem("UserId"),
            quantity : 1
        }
        window.sessionStorage.setItem("OrderRestrauId", this.state.restraurant_id)
        this.props.add_item_to_cart(cartItem)
    }
    componentDidMount() {
        if(window.sessionStorage.getItem('isLoggedIn') === 'true'){
            this.setState({
                source : this.props.source
            })
        }
       
    }
    render() {
        let redirectVar = null;
        if(!window.sessionStorage.getItem('isLoggedIn'))
        {
            console.log("hey")
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        console.log("session is ", sessionStorage)
        return (
            <div>
                {redirectVar}
                <div style = {{marginTop:"2%"}}>
                        <Card title={this.state.name}  id="dishcard" style={{ width: "200%", color:"#d32323", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)" }} actions = {[
                            <Button onClick ={() => this.addDishToCart(this.state.id)} style ={{float:"right", width:"20%", marginRight:"5%"}}>Add to cart</Button>
                        ]}>
                            <Row>
                                <Col style={{paddingRight:"5%"}}>
                                    <Avatar  size={100} src = {this.state.image} shape='circle'></Avatar>
                                </Col>
                                <Col style={{borderLeft:"1px solid lightgrey", paddingLeft:"5%"}}>
                                    <Row>
                                        <Col>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>Type:</h4>
                                        </Col>
                                        <Col style={{marginLeft:"2%"}}>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>{this.state.type}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>Ingredients:</h4>
                                        </Col>
                                        <Col style={{marginLeft:"2%"}}>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>{this.props.dish.dish_ingredients}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>Price:</h4>
                                        </Col>
                                        <Col style={{marginLeft:"2%"}}>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>${this.state.price}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>Description:</h4>
                                        </Col>
                                        <Col>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>{this.state.description}</h4>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                        </Card>
                </div>
            </div>
        )
    }
}
// export default DishDetails;
function mapDispatchToProps(dispatch) {
    return {
        add_item_to_cart: user => dispatch(add_item_to_cart(user))
    };
  }
  
function mapStateToProps(store) {
return {
   message : store.message,
};
}

const LoginForm = connect(mapStateToProps, mapDispatchToProps)(DishDetails);
export default LoginForm;