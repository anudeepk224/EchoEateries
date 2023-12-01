import { notification } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react'
import { BACKEND } from '../../Config';
import { get_cart_item_details, get_customer_current_dish_details } from '../../js/actions/index';
import { connect } from "react-redux";
class CartItemDisplay extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <h3>{this.props.dish.dishName} : {this.props.dish.quantity}</h3>
            </div>
        )
    }
}
// export default CartItemDisplay;
function mapDispatchToProps(dispatch) {
    return {
      get_cart_item_details : user => dispatch(get_cart_item_details(user)),
      get_customer_current_dish_details : user => dispatch(get_customer_current_dish_details(user))
    };
  }
  
function mapStateToProps(store) {
return {
   message : store.message,
   current_cart_item_details : store.current_cart_item_details,
   customer_current_dish_details : store.customer_current_dish_details
};
}

const cartItemDisplyForm = connect(mapStateToProps, mapDispatchToProps)(CartItemDisplay);
export default cartItemDisplyForm;