import { faCalendarCheck, faCalendarDay, faJedi, faStar, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, notification, Pagination, Row } from 'antd'
import Axios from 'axios'
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { BACKEND } from '../../Config'
import MiddleRestraurantProfile from '../MiddleRestraurantProfile/MiddleRestraurantProfile'
import RestraurantEventCard from '../RestraurantEventCard/RestraurantEventCard'
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import UpperRestraurantProfile from '../UpperRestraurantProfile/UpperRestraurantProfile'
import { get_restraurant_events } from '../../js/actions/restraurant';
import { connect } from "react-redux";
class RestraurantEvent extends Component {
    constructor(props){
        super(props)
        this.state = {
            events : [],
            offset: 0,
            elements: [],
            perPage: 5,
            currentPage: 1,
            pageCount: 1
        }
        if(window.sessionStorage.getItem('RestrauLoggedIn') === 'true')
        {
            var restraurant = {
                restraurant_id : window.sessionStorage.getItem("RestrauId")
            }
            this.props.get_restraurant_events(restraurant)
        }
            
    }
    componentWillReceiveProps() {
        setTimeout(() => {
           this.setState({
               events : this.props.restraurant_events,
               pageCount: Math.ceil(this.props.restraurant_events.length/this.state.perPage),
           }) 
           this.setElementsForCurrentPage();
        }, );
    }
    setElementsForCurrentPage = () => {
        let elements = this.props.restraurant_events.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ 
            elements : elements
        });
    }
    showCatalogicData = () => {
        console.log("Inside show catolgocal data function", this.state.elements);
        return this.state.elements.map(i => {
            // console.log("Calling child with i ------------------", i)
            return (
                <RestraurantEventCard event = {i} key = {i.event_id} />
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
    render() {
        let redirectVar = null
        if(!window.sessionStorage.getItem('RestrauLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        var temp = null;
        if(this.props.restraurant_events)
        {
            // temp = this.props.restraurant_events.map(i => {
            //     return(
            //         <RestraurantEventCard event = {i} key = {i.event_id} />
            //     )
            // })
        }
        if(this.state.events.length === 0)
        {
            temp = <div>
                <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No events found</h1>
            </div>
        }
        let paginationElement;
        if(this.props.restraurant_events)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.props.restraurant_events.length}
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
                    <Row style = {{marginTop : "3%"}}>
                        <Col md = {4} style = {{marginLeft:"15%"}}>
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
// export default RestraurantEvent;
function mapDispatchToProps(dispatch) {
    return {
        get_restraurant_events: user => dispatch(get_restraurant_events(user))
    };
    }
    
    function mapStateToProps(store) {
    console.log("STore is restrau profile is ", store)
    return {
        restraurant_events : store.restraurant_events
    };
    }
    
    const restraurant_details = connect(mapStateToProps, mapDispatchToProps)(RestraurantEvent);
    export default restraurant_details;