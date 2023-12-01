import React, { Component } from 'react'
import './ResrtraurantOrder.css'
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import MiddleRestraurantProfile from '../MiddleRestraurantProfile/MiddleRestraurantProfile'
import Axios from 'axios';
import { BACKEND } from '../../Config';
import RestraurantOrderDetails from '../RestraurantOrderDetails/RestraurantOrderDetails';
import { Checkbox, Col, notification, Pagination, Row, Spin } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCalendarDay, faJedi, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import UpperRestraurantProfile from '../UpperRestraurantProfile/UpperRestraurantProfile';
import { filter_restraurant_orders, get_restraurant_orders } from '../../js/actions/restraurant';
import { connect } from "react-redux";
class RestraurantOrder extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            orders: [],
            current : false,
            past : false,
            currentDelivery : false,
            currentTakeout : false,
            pastDelivery : false,
            pastTakeout : false,
            offset: 0,
            elements: [],
            perPage: 5,
            currentPage: 1,
            pageCount: 1,
            spin : false
        }
        if(window.sessionStorage.getItem('RestrauLoggedIn') === 'true')
        {
            var restraurant = {
                restraurant_id : window.sessionStorage.getItem("RestrauId")
            }
            
            this.props.get_restraurant_orders(restraurant);
        }
       
    }
    componentDidMount() {
        this.setState({
            spin : true
        })
        document.getElementById("pastOrdersFilters").style.display = 'none'
        document.getElementById("currentOrdersFilters").style.display = 'none'
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            this.setState({
                pageCount: Math.ceil(this.props.restraurant_orders.length/this.state.perPage),
                spin : false
            })
            this.setElementsForCurrentPage();
        })
    }
    setElementsForCurrentPage = () => {
        let elements = this.props.restraurant_orders.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ 
            elements : elements
        });
    }
    showCatalogicData = () => {
        console.log("Inside show catolgocal data function", this.state.elements);
        return this.state.elements.map(i => {
            // console.log("Calling child with i ------------------", i)
            return (
                <RestraurantOrderDetails  order = {i} key = {i._id}/>
              )
           });
    }
    handlePageClick = (pageNo) => {
        const selectedPage = pageNo - 1; 
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, 
            () => this.setElementsForCurrentPage()
            );
    }
    handleCurrentOrders = (e) => {
       
        console.log(e.target.checked)
        if(e.target.checked)
        {
            console.log("SEtting current")
            this.setState({
                current : true
            })
            document.getElementById("currentOrdersFilters").style.display = 'block'
            document.getElementById("pastOrdersFilters").style.display = 'none'
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "current"
            }
            this.props.filter_restraurant_orders(order);
        }
        else{
            document.getElementById("currentOrdersFilters").style.display = 'none'
            this.setState({
                current : false
            })
            var restraurant = {
                restraurant_id : window.sessionStorage.getItem("RestrauId")
            }
            this.props.get_restraurant_orders(restraurant);
        }
    }
    handlePastOrders = (e) => {
        
        if(e.target.checked)
        {
            document.getElementById("pastOrdersFilters").style.display = 'block'
            document.getElementById("currentOrdersFilters").style.display = 'none'
            this.setState({
                past : true,
                current : false
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "past"
            }
           this.props.filter_restraurant_orders(order)
        }
        else{
            document.getElementById("pastOrdersFilters").style.display = 'none'
            var restraurant = {
                restraurant_id : window.sessionStorage.getItem("RestrauId")
            }
            this.props.get_restraurant_orders(restraurant)
        }

        
    }
    handleCurrentDelivery = (e) =>{
        if(e.target.checked)
        {
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "currentDelivery"
            }
            this.setState({
                currentDelivery : true,
                currentTakeout : false
            })
            this.props.filter_restraurant_orders(order)
        }
        else
        {
            this.setState({
                currentDelivery : false
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "current"
            }
            this.props.filter_restraurant_orders(order)
        }
        
        
    }
    handleCurrentTakeout = (e) =>{
        if(e.target.checked)
        {
            this.setState({
                currentDelivery : false,
                currentTakeout : true
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "currentTakeout"
            }
            this.props.filter_restraurant_orders(order)
        }
        else{
            this.setState({
                currentTakeout : false
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "current"
            }
            this.props.filter_restraurant_orders(order)
        }
        
    }
    handlePastDelivery = (e) =>{
        if(e.target.checked)
        {
            this.setState({
                pastDelivery : true,
                
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "pastDelivery"
            }
            this.props.filter_restraurant_orders(order)
        }
        else{
            this.setState({
                pastDelivery : false
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "past"
            }
            this.props.filter_restraurant_orders(order)
        }
        
    }
    handlePastTakeout = (e) =>{
        if(e.target.checked)
        {
            this.setState({
                pastTakeout : true,
                pastDelivery : false
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "pastTakeout"
            }
            this.props.filter_restraurant_orders(order)
        }
        else{
            this.setState({
                pastTakeout : false
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "past"
            }
            this.props.filter_restraurant_orders(order)
        }
        
    }
    handleCanceledOrders = (e) => {
        if(e.target.checked)
        {
            this.setState({
                canceled : true
            })
            var order = {
                restraurant_id : window.sessionStorage.getItem("RestrauId"),
                filter : "canceled"
            }
            this.props.filter_restraurant_orders(order)
        }
    }
    render() {
        console.log("The spin state is -----------------------------", this.state.spin)
        var temp = null;
        
        if(this.props.restraurant_orders)
        {
            console.log("Restraurant orders are", this.props.restraurant_orders)
            // temp = this.props.restraurant_orders.map(i => {
            //     return(
            //         <RestraurantOrderDetails order = {i} />
            //     )
            // })
        }
        else{
            temp = <div>
            <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No Orders found</h1>
        </div>
        }
        let redirectVar = null
        if(!window.sessionStorage.getItem('RestrauLoggedIn'))
        {
            redirectVar = <Redirect to ='/restrauSignIn'></Redirect>
        }
        if(this.state.spin)
        {
            temp = <Spin size = {"large"} spinning = {this.state.spin} />
        }
        let paginationElement;
        if(this.props.restraurant_orders)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.props.restraurant_orders.length}
                    showTotal={(total, range) => 
                    `${range[0]}-${range[1]} of ${total} items`}   
                    defaultPageSize={this.state.perPage}
                />)
            }
        }
        return (
            <div>
                {redirectVar}
                <div>
                    <UpperRestraurantProfile />
                </div>
                <div>
                    <MiddleRestraurantProfile />
                </div>
                <div>
                    <Row style = {{marginTop: "3%"}}>
                        <Col md={4} style = {{marginLeft : "15%", width:"10%"}}>
                            <ul style = {{listStyleType : "none"}}>
                                <li>
                                    <div className = "sideNav"> 
                                        <Link style = {{color : "black"}} to = {{
                                            pathname : "/restrauProfile"
                                        }}>
                                            <Row>
                                                <Col>
                                                    <FontAwesomeIcon icon = {faUser} />
                                                </Col>
                                                <Col>
                                                    <h3>Profile</h3>
                                                </Col>
                                            </Row>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className = "sideNav"> 
                                        <Link style = {{color : "black"}} to = {{
                                            pathname : "/restraurantOrders"
                                        }}>
                                            <Row>
                                                <Col>
                                                    <FontAwesomeIcon icon = {faJedi} />
                                                </Col>
                                                <Col>
                                                    <h3>Orders</h3>
                                                </Col>
                                            </Row>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className = "sideNav"> 
                                        <Link style = {{color : "black"}} to = {{
                                            pathname : "/restraurantReviews"
                                        }}>
                                            <Row>
                                                <Col>
                                                    <FontAwesomeIcon icon = {faStar} />
                                                </Col>
                                                <Col>
                                                    <h3>Reviews</h3>
                                                </Col>
                                            </Row>
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className = "sideNav"> 
                                        <Link style = {{color : "black"}} to = {{
                                            pathname :"/restraurantEvents"
                                        }}>
                                            <Row>
                                                <Col>
                                                    <FontAwesomeIcon icon = {faCalendarCheck} />
                                                </Col>
                                                <Col>
                                                    <h3>Events</h3>
                                                </Col>
                                            </Row>
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                            <ul style = {{listStyleType : 'none'}}>
                                <li>
                                    <Checkbox value = {this.state.current} onChange = {this.handleCurrentOrders}>Current Orders</Checkbox>
                                    <ul style = {{listStyleType : "none"}} id = "currentOrdersFilters">
                                        <li>
                                            <Checkbox value = {this.state.currentDelivery} onChange = {this.handleCurrentDelivery}>Delivery</Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox value = {this.state.currentTakeout} onChange = {this.handleCurrentTakeout}>Takeout</Checkbox>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Checkbox value = {this.state.past} onChange = {this.handlePastOrders}>Past Orders</Checkbox>
                                    <ul style = {{listStyleType : "none"}} id = "pastOrdersFilters">
                                        <li >
                                            <Checkbox value = {this.state.pastDelivery} onChange = {this.handlePastDelivery}>Delivery</Checkbox>
                                        </li>
                                        <li>
                                            <Checkbox value = {this.state.pastTakeout} onChange = {this.handlePastTakeout}>Takeout</Checkbox>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Checkbox value = {this.state.canceled} onChange = {this.handleCanceledOrders}>Canceled Orders</Checkbox>
                                </li>
                            </ul>                            
                        </Col>
                        <Col md = {8}>
                            {temp}
                            <div>{this.showCatalogicData()}</div>
                        </Col>
                    </Row>
                    
                </div>
                <div style = {{marginLeft : "75%", marginTop : "3%"}}>
                    {paginationElement}
                </div>
            </div>
        )
    }
}
// export default RestraurantOrder;
function mapDispatchToProps(dispatch) {
    return {
        get_restraurant_orders: user => dispatch(get_restraurant_orders(user)),
        filter_restraurant_orders: user => dispatch(filter_restraurant_orders(user))
    };
}
    
function mapStateToProps(store) {
    return {
        restraurant_orders : store.restraurant_orders
    };
}
    
const restraurant_orders = connect(mapStateToProps, mapDispatchToProps)(RestraurantOrder);
export default restraurant_orders;