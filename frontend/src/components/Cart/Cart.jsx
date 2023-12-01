import { Button, Card, Checkbox, Col, notification, Row } from 'antd';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import { get_user_cart_details, get_customer_restraurant_details, delete_cart_item, place_order } from '../../js/actions';
import { connect } from "react-redux";

var dict = {}
class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            cartItems: [],
            subTotal : 0,
            tax: 0,
            total : 0, 
            amount : 0,
            dict : {},
            restraurant_id : '',
            count: 0,
            delivery: false,
            deliveryVisible : true,
            takeOutVisible : true,
            takeOut: false, 
            orderPlaced : false
        }    
    }
    componentDidMount() {
        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            // this.getUserCartDetails();
            this.props.get_user_cart_details();
            if(this.props.cartItems)
            {
                var restraurant = {
                    RestrauId : window.sessionStorage.getItem("OrderRestrauId")
                }
                console.log("Customer restraurant is: ", restraurant)
                this.props.get_customer_restraurant_details(restraurant)
            }
        }
        
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            this.setState({
                cartItems : this.props.cartItems,
            })
            console.log("Restraurant is ", this.props.customer_restraurant)
            if(this.props.cartItems)
            {
                if(this.props.customer_restraurant)
                {

                }
                else {
                    var restraurant = {
                        RestrauId : window.sessionStorage.getItem("OrderRestrauId")
                    }
                    console.log("Customer restraurant is: ", restraurant)
                    // this.props.get_customer_restraurant_details(restraurant)
                }
            }
            if(this.props.customer_restraurant)
            {
                if(this.props.customer_restraurant.delivery === 'no')
                {
                    setTimeout(() => {
                        this.setState({
                            deliveryVisible : false
                        })
                        document.getElementById("delivery").style.display = 'none'
                    }, 10)
                }
                if(this.props.customer_restraurant.takeout === 'no')
                {
                    setTimeout(() => {
                        this.setState({
                            takeOutVisible : false
                        })
                        document.getElementById("takeout").style.display = 'none'
                    }, 10)
                }
            }
            
            if(this.props.message === 'Cart Item Deleted')
            {
                setTimeout(() => {
                    console.log("Hi the item has been deleted")
                    this.props.get_user_cart_details()
                }, 10)
            }
            if(this.props.message === 'Order Placed')
            {
                setTimeout(() => {
                    this.setState({
                        orderPlaced : true
                    })
                }, 10);
            }
        })
    }
    calculateSubTotal = (price, key) => {
        var amount = 0;
        dict[key] = price
        console.log("Dict is ", dict)
        Object.keys(dict).forEach(function(key) {
           amount = amount + parseInt(dict[key])
        })    

        var finalTax = (amount * 0.0725).toFixed(2)
        this.setState({
            subTotal : amount,
            tax : finalTax,
            total : (Number(finalTax) + Number(amount))
        })
    }
    deleteCartItem =(id) => {
        console.log("Hiiii")
        var cart = {
            cart_id : id
        }
        this.props.delete_cart_item(cart)
    }
    handleDelivery = (value) => {
        document.getElementById("takeoutCheckBox").checked = false;
        this.setState({
            delivery : true,
            takeOut : false
        })
    }
    handleTakeOut = () => {

        this.setState({
            takeOut : true,
            delivery : false
        })
    }
    placeOrder = () => {
        if(this.state.deliveryVisible || this.state.takeOutVisible)
        {
            if(this.state.delivery || this.state.takeOut)
            {   
                var mode = this.state.delivery ? "delivery" : "takeout";
                var cartItems = []
                for(var i in this.props.cartItems)
                {
                    cartItems.push(this.props.cartItems[i]._id)
                }
                var order = {
                    user_id : window.sessionStorage.getItem("UserId"),
                    restraurant_id : window.sessionStorage.getItem("OrderRestrauId"),
                    items : cartItems,
                    status : 'order recieved',
                    amount : this.state.total,
                    order_type: mode
                }
                this.props.place_order(order);
            }
            else{
                notification["error"]({
                    message: 'Delivery Method',
                    description:
                      'Please Select a delivery method',
                  });
            }
        }
        
    }

    render() {
        let redirectVar = null;
        if(!window.sessionStorage.getItem('isLoggedIn'))
        {
            redirectVar = <Redirect to = '/landingPage'></Redirect>
        }
        if(this.state.orderPlaced)
        {
            redirectVar = <Redirect to = '/customerHome'></Redirect>
        }
        var temp = null;
        if(this.props.cartItems)
        {
            temp = this.props.cartItems.map(i => {
                return(
                    <CartItem cartItem = {i} key = {i.cart_id} callBackFromCartItemToDelete = {this.deleteCartItem} callBackFromCartItem = {this.calculateSubTotal}/>
                )
                })
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <UpperCustomerProfile />
                </div>
                <div>
                    <div>
                        <h1 style={{color: "#d32323", marginLeft:"12%", marginTop:"3%", fontSize:40}}>Cart</h1>
                    </div>
                    <div>
                        <Row>
                            <Col>
                                {temp}
                            </Col>
                            <Col style={{marginTop:"0.5%", marginLeft:"30%"}}>
                                <Card title = "Checkout" style={{width:"150%", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}} actions={[
                                    <Button style = {{width:"50%"}} onClick={this.placeOrder}>Place Order</Button>
                                ]}>
                                    <ul style = {{listStyleType:'none'}}>
                                        <li>
                                            <Row>
                                                <Col>
                                                    <h3 style={{fontWeight:"bolder", color:"grey"}}>Sub Total : </h3>
                                                </Col>
                                                <Col>
                                                    <h3 style={{fontWeight:"bolder", color:"grey"}}>{this.state.subTotal}</h3>
                                                </Col>
                                            </Row>
                                        </li>
                                        <li>
                                            <Row>
                                                <Col>
                                                    <h3 style={{fontWeight:"bolder", color:"grey"}}>Tax : </h3>
                                                </Col>
                                                <Col>
                                                    <h3 style={{fontWeight:"bolder", color:"grey"}}>{this.state.tax}</h3>
                                                </Col>
                                            </Row>
                                        </li>
                                        <li>
                                            <Row style={{borderTop:"1px solid lightgrey"}}>

                                            </Row>
                                        </li>
                                        <li>
                                            <Row>
                                                <Col>
                                                    <h3 style={{fontWeight:"bolder", color:"grey"}}>Total : </h3>
                                                </Col>
                                                <Col>
                                                    <h3 style={{fontWeight:"bolder", color:"grey"}}>{this.state.total}</h3>
                                                </Col>
                                            </Row>
                                        </li>
                                    </ul>
                                    <Row>
                                        <Row id = 'delivery'>
                                            <Col>
                                                <Checkbox id="deliveryCheckBox" checked = {this.state.delivery} onChange={this.handleDelivery} />
                                            </Col>
                                            <Col>
                                                <span>Delivery</span>
                                            </Col>
                                        </Row>
                                        <Row id = 'takeout' style={{marginLeft:"5px"}}>
                                            <Col>
                                                <Checkbox id="takeoutCheckBox" checked={this.state.takeOut} onChange={this.handleTakeOut} />
                                            </Col>
                                            <Col>
                                                <span>Take out</span>
                                            </Col>
                                        </Row>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}
// export default Cart;
function mapDispatchToProps(dispatch) {
    return {
        get_user_cart_details: user => dispatch(get_user_cart_details(user)),
        get_customer_restraurant_details : user => dispatch(get_customer_restraurant_details(user)),
        delete_cart_item : user => dispatch(delete_cart_item(user)),
        place_order : user => dispatch(place_order(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
        cartItems : store.cartItems,
        customer_restraurant : store.customer_restraurant,
        message : store.message
    };
  }
 
  const customer_cart_details = connect(mapStateToProps, mapDispatchToProps)(Cart);
  export default customer_cart_details;
