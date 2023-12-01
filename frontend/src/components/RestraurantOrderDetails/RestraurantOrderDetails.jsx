import { Button, Card, Col, notification, Progress, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Axios from 'axios';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BACKEND } from '../../Config';
import { update_order_status } from '../../js/actions/restraurant';
import CartItemDisplay from '../CartItemDisplay/CartItemDisplay';
import CustomerCard from '../CustomerCard/CustomerCard';

class RestraurantOrderDetails extends Component {
    constructor(props){
        super(props);
        var per = 0;
        switch(props.order.status){
            case 'order recieved' :
                per = 25
                break;
            case 'preparing' :
                per = 50
                break;
            case 'on the way' :
                per = 75
                break;
            case 'ready for pick up' :
                // console.log("Setting it right")
                per = 75
                break;
            case 'delivered' :
                per = 100
                break;
            case 'picked up' :
                // console.log("its picked up")
                per = 100
                break
        }
        var cartItems = this.props.order.items.split(',')
        this.state = {
            order_id : props.order._id,
            user_id : props.order.user_id,
            restraurant_id : props.order.restraurant_id,
            items : props.order.items,
            status : props.order.status,
            time_placed : props.order.time_placed, 
            cartDishes : cartItems, 
            visible : false,
            loading : false,
            percentage : per,
            user : props.order.user,
            user_name : props.order.user.first_name + " " + props.order.user.last_name,
            address : props.order.user.address,
            email : props.order.user.email,
            phoneNumber : props.order.user.phone_number,
            
        }
    }
    componentWillReceiveProps()
    {
        setTimeout(() => {
            var per = 0
            // console.log("Hi in the recieving", this.props.order)
            switch(this.props.order.status){
                case 'order recieved' :
                    per = 25
                    break;
                case 'preparing' :
                    per = 50
                    break;
                case 'on the way' :
                    per = 75
                    break;
                case 'ready for pick up' :
                    per = 75
                    break;    
                case 'delivered' :
                    per = 100
                    break;
                case 'picked up' :
                    // console.log("its picked up")
                    per = 100
                    break
            }
           
            var cartItems = this.props.order.items.split(',')
            this.setState({
                order_id : this.props.order._id,
                user_id : this.props.order.user_id,
                restraurant_id : this.props.order.restraurant_id,
                items : this.props.order.items,
                status : this.props.order.status,
                time_placed : this.props.order.time_placed, 
                cartDishes : cartItems, 
                visible : false,
                loading : false,
                percentage : per,
                user : this.props.order.user,
                user_name : this.props.order.user.first_name + " " + this.props.order.user.last_name,
                address : this.props.order.user.address,
                email : this.props.order.user.email,
                phoneNumber : this.props.order.user.phone_number,
                
            })
        }, 0)
       
    }
    
    handlePrepare = () => {
        // console.log('Preparing')
        var order = {
            order_id : this.state.order_id,
            status : "preparing"
        }
        this.setState({
            status : "preparing",
            percentage : 50
        })
        this.props.update_order_status(order)
        // Axios.post(`${BACKEND}/updateOrderStatus`, order).then(response => {
        //     if(response.status === 200)
        //     {
        //         this.setState({
        //             status : "preparing",
        //             percentage : 50
        //         })
        //     }
        // })
    }
    handleOut = () => {
        console.log('out')
        var status = "on the way"
        if(this.props.order.order_type === 'takeout')
        {
            status  = 'ready for pick up'
        }
        var order = {
            order_id : this.state.order_id,
            status : status
        }
        this.setState({
            status : status,
            percentage : 75
        })
        this.props.update_order_status(order)
        // Axios.post(`${BACKEND}/updateOrderStatus`, order).then(response => {
        //     if(response.status === 200)
        //     {
        //         this.setState({
        //             status : status,
        //             percentage : 75
        //         })
        //     }
        // }).catch(err => {
        //     if(err)
        //     {
        //         notification["error"]({
        //             message: 'Server Sider error',
        //             description:
        //             'Please try again in few minutes',
        //         });
        //     }
        // })
    }
    handleDelivered = () => {
        console.log('delivered')
        var status = "delivered"
        if(this.props.order.order_type === 'takeout')
        {
            status  = 'picked up'
        }
        var order = {
            order_id : this.state.order_id,
            status : status
        }
        this.setState({
            status : status,
            percentage : 100
        })
        this.props.update_order_status(order)
        // Axios.post(`${BACKEND}/updateOrderStatus`, order).then(response => {
        //     if(response.status === 200)
        //     {
                
        //     }
        // }).catch(err => {
        //     if(err)
        //     {
        //         notification["error"]({
        //             message: 'Server Sider error',
        //             description:
        //             'Please try again in few minutes',
        //         });
        //     }
        // })
    }
    handleCancelOrder = () => {
        console.log('cancel')
        var order = {
            order_id : this.state.order_id,
            status : "canceled"
        }
        this.props.update_order_status(order)

        // Axios.post(`${BACKEND}/updateOrderStatus`, order).then(response => {
        //     if(response.status === 200)
        //     {
                
        //     }
        // }).catch(err => {
        //     if(err)
        //     {
        //         notification["error"]({
        //             message: 'Server Sider error',
        //             description:
        //             'Please try again in few minutes',
        //         });
        //     }
        // })
    }
    showModal = () => {
        this.setState({
            visible : true
        })
    }
    handleCancel = () => {
        this.setState({
            visible :  false
        })
    }
    render() {
        let temp1 = null;
        let temp2 = null;
        let temp3 = null
        let temp4 = null
        if(this.props.order.order_type === 'delivery')
        {
            temp1 = <Button id = 'out' onClick={this.handleOut} style={{width : '90%'}}>On the way</Button>
            temp2 = <Button id = 'delivered' onClick={this.handleDelivered} style={{width : '90%'}}>Delivered</Button>
        }
        else if(this.props.order.order_type === 'takeout')
        {
            temp1 = <Button id = 'out' onClick={this.handleOut} style={{width : '90%'}}>Ready for Pick Up</Button>
            temp2 = <Button id = 'delivered' onClick={this.handleDelivered} style={{width : '90%'}}>Picked Up</Button>
        }
        var temp = null
        if(this.props.order)
        {
            temp = <Row style={{marginTop : "3%"}}>
                <Col md = {12} style = {{
                }}>
                    <Card title = {this.state.user_name}  extra = {<Button onClick = {this.showModal} style = {{width : "100%"}}>View User Details</Button>}   style={{
                        width:"300%",
                        boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"
                    }} actions = {[
                        <Button id = 'preparing' onClick={this.handlePrepare} style={{width : '90%'}}>Preparing</Button>,
                        temp1,
                        temp2,
                        <Button id = 'cancel' onClick={this.handleCancelOrder} style={{width : '90%'}}>Cancel Order</Button>
                    ]}>
                        <Row style = {{marginLeft:'-7%' }}>
                            <Col md = {6}>
                                <ul style = {{listStyleType:"none"}}>
                                    <li>
                                        <h4>OrderId : {this.props.order._id}</h4>
                                    </li>
                                    <li>
                                        <h4>Amount: ${this.props.order.amount}</h4>
                                    </li>
                                    <li>
                                        <h4>Mode: {this.props.order.order_type}</h4>
                                    </li>
                                </ul>
                            </Col>
                            <Col md = {6} style={{borderLeft : "1px solid lightgrey", paddingLeft: "0.5%", marginLeft : "10%"}}>
                                <ul>
                                    {this.props.order.dishes.map(i => {
                                        return(
                                            <li style = {{width :"150%"}}>
                                                <CartItemDisplay dish = {i} />    
                                            </li>
                                        )
                                    })}
                                </ul>
                            </Col>
                            <Col style = {{marginLeft : "21%"}}>
                                <Progress 
                                type = "dashboard"
                                strokeColor={{
                                    "0%": "#d32323",
                                    "100%": "#d32323"
                                }}
                                percent = {this.state.percentage}
                                format={(percent) => `${this.state.status}`} 
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col md = {3}>
                    
                </Col>
            </Row>
        }
        return (
            <div>
                <div>
                    {temp}
                </div>
                <Modal title = "User Info"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer = {[
                        <Button onClick = {this.handleCancel}>Cancel</Button>
                    ]}
                    bodyStyle = {{
                        height : "450px",
                        overflowY :"scroll"
                    }}
                >
                    <CustomerCard source = "restraurant" user = {this.state.user} />
                </Modal>
            </div>
        )
    }
}
// export default  RestraurantOrderDetails;
function mapDispatchToProps(dispatch) {
    return {
        update_order_status: user => dispatch(update_order_status(user)),
    };
}
    
function mapStateToProps(store) {
    // console.log("STore is restrau profile is ", store)
    return {
        restraurant_orders : store.restraurant_orders
    };
}
    
const restraurant_order_details = connect(mapStateToProps, mapDispatchToProps)(RestraurantOrderDetails);
export default restraurant_order_details;