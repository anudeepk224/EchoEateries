import { Card, Col, Input, notification, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import {Button} from 'react-bootstrap';
import React, { Component } from 'react'
import { BACKEND } from '../../Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { get_customer_current_dish_details, set_cart_item_quantity } from '../../js/actions';
import { connect } from "react-redux";
import Axios from 'axios';
class CartItem extends Component {
    constructor(props){
        super(props);
        console.log("cartitem Props are ", props)
        var filename = props.cartItem.dish.photo.split('public').pop();
        this.state = {
            cartId : props.cartItem._id,
            dishId : props.cartItem.dish_id,
            restraurantId : props.cartItem.restraurant_id,
            activeQuantity : props.cartItem.quantity,
            dishName : props.cartItem.dish.dish_name,
            price : props.cartItem.dish.price,
            image : `${BACKEND}` + filename,
            type: props.cartItem.dish.dish_type,
            description : props.cartItem.dish.description,
            amount : 0
        }
        this.props.callBackFromCartItem(Number(props.cartItem.dish.price) * Number(props.cartItem.quantity)  , props.cartItem.dish_id)
    }
    // componentWillReceiveProps(){
        // setTimeout(() => {
        //     this.props.callBackFromCartItem(Number(this.props.customer_current_dish_details.price) * Number(this.state.activeQuantity)  , this.state.dishId)
        //    this.setState({
        //     dishName : this.props.customer_current_dish_details.dish_name,
        //     price : this.props.customer_current_dish_details.price,
        //     image : `${BACKEND}/getDishImage/` + this.state.dishId,
        //     type: this.props.customer_current_dish_details.dish_type,
        //     description : this.props.customer_current_dish_details.description
        //    }) 
        // }, );
    // }
    componentDidMount(){
        this.checkQuantity();
    }
    decreaseQuantity = () =>{
        this.setState({
            activeQuantity : this.state.activeQuantity - 1
        })
        setTimeout(() => {
            this.checkQuantity();
            this.setCartItemQuantityDb();
            this.props.callBackFromCartItem(this.state.price * this.state.activeQuantity, this.state.dishId)
        }, 100)
    }
    increaseQuantity = () =>{
        this.setState({
            activeQuantity : this.state.activeQuantity + 1
        })
        setTimeout(() => {
            this.checkQuantity();
            this.setCartItemQuantityDb();
            this.props.callBackFromCartItem(this.state.price * this.state.activeQuantity, this.state.dishId)
        }, 100)
    }
    setCartItemQuantityDb = () => {
        var cart = {
            cart_id : this.state.cartId,
            quantity : this.state.activeQuantity
        }
        this.props.set_cart_item_quantity(cart);
    }
    checkQuantity = () => {
        if(this.state.activeQuantity === 1)
        {
            document.getElementById(this.state.cartId).disabled = true
        }
        else if(this.state.activeQuantity > 1)
        {
            document.getElementById(this.state.cartId).disabled = false
        }
    }
    deleteCartItem = () => {
        this.props.callBackFromCartItemToDelete(this.state.cartId);
    }
    render() {
        return (
            <div style={{marginLeft:"34%", marginTop:"1%"}}>
                <Card title={this.state.dishName}  id="dishcard" style={{ width: "220%", color:"#d32323", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)" }} bordered={true}>
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
                            </Row>
                            <Row style={{marginLeft:"80%", marginTop:"2%"}}>
                                <Col>
                                    <FontAwesomeIcon onClick={this.deleteCartItem} icon = {faTrash} style={{fontSize:"150%"}} />
                                </Col>
                                <Col style={{marginLeft:"15%"}}>
                                    <Button  id={this.state.cartId} onClick={this.decreaseQuantity}>-</Button>
                                </Col>
                                <Col style={{marginLeft: "2%", marginTop:"0.75%", marginRight:"2%"}}>
                                    <span className='badge primary' >{this.state.activeQuantity}</span>
                                </Col>
                                <Col>
                                    <Button onClick={this.increaseQuantity}>+</Button>
                                </Col>
                            </Row>
                        </Card>
            </div>
        )
    }
}
// export default CartItem;
function mapDispatchToProps(dispatch) {
    return {
        // get_customer_current_dish_details: user => dispatch(get_customer_current_dish_details(user)),
        set_cart_item_quantity : user => dispatch(set_cart_item_quantity(user))
    };
  }
  
function mapStateToProps(store) {
return {
    message : store.message,
    customer_current_dish_details : store.customer_current_dish_details
};
}

const cartItemForm = connect(mapStateToProps, mapDispatchToProps)(CartItem);
export default cartItemForm;