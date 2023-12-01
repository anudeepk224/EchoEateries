import { Button, Card, Col, Input, notification, Pagination, Row } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { BACKEND } from '../../Config';
import CustomerEventRegistrationCard from '../CustomerEventRegistrationCard/CustomerEventRegistrationCard';
import MiddleCustomerProfile from '../MiddleCustomerProfile/MiddleCustomerProfile';
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import { get_customer_events, search_customer_events } from '../../js/actions';
import { connect } from "react-redux";
class CustomerEvents extends Component {
    constructor(props){
        super(props);
        this.state = {
            events : [],
            offset: 0,
            elements: [],
            perPage: 5,
            currentPage: 1,
            pageCount: 1
        }
        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            this.props.get_customer_events()
        }        
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            this.setState({
                events : this.props.customer_events,
                pageCount: Math.ceil(this.props.customer_events.length/this.state.perPage),
            })
            this.setElementsForCurrentPage();
        })
    }
    setElementsForCurrentPage = () => {
        let elements = this.state.events.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ 
            elements : elements
        });
    }
    showCatalogicData = () => {
        return this.state.elements.map(i => {
            return(
                <CustomerEventRegistrationCard event = {i} key = {i.event_id} />
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
    searchEvent = () => {
        var myJson = {
            search : document.getElementById("eventSearch").value
        }
        this.props.search_customer_events(myJson);
        
    }
    sortAscendingOrder = () => {
        this.setState({
            events : this.state.events.sort((a, b) => (a.event_date > b.event_date) ? 1 : (a.event_date === b.event_date) ? ((a.event_time > b.event_time) ? 1 : -1) : -1 )
        })
        this.setElementsForCurrentPage();
    }
    sortDescendingOrder = () => {
        this.setState({
            events : this.state.events.sort((a, b) => (a.event_date > b.event_date) ? -1 : (a.event_date === b.event_date) ? ((a.event_time > b.event_time) ? -1 : 1) : 1 )
        })
        this.setElementsForCurrentPage();
    }
    render() {
        console.log(window.sessionStorage)
        let redirectVar = null;
        if(!window.sessionStorage.getItem('isLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        var temp = null;
        if(this.state.events.length === 0)
        {
            temp = <div>
                <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No events found</h1>
            </div>
        }
        let paginationElement;
        if(this.props.customer_events)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.props.customer_events.length}
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
                    <UpperCustomerProfile />
                </div>
                <div>
                    <MiddleCustomerProfile />
                </div>
                <div>
                    <Row>
                        <Col md = {4} style = {{marginLeft :"13%", marginTop:"5%"}}>
                            <ul style = {{listStyleType : "none"}}>
                                <li>
                                    <Input id = 'eventSearch' placeholder = "Search Event"></Input>
                                </li>
                                <li style = {{marginTop : "5%"}}>
                                    <Button onClick = {this.searchEvent} style = {{width:"100%"}}>Search</Button>
                                </li>
                                <li style = {{marginTop : "5%"}}>
                                    <Button onClick = {this.sortAscendingOrder} style = {{width:"100%"}}>Ascending Order</Button>
                                </li>
                                <li style = {{marginTop : "5%"}}>
                                    <Button onClick = {this.sortDescendingOrder} style = {{width:"100%"}}>Descending Order</Button>
                                </li>
                            </ul>
                        </Col>
                        <Col md = {8} style = {{marginLeft: "4%"}}>
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
// export default  CustomerEvents;
function mapDispatchToProps(dispatch) {
    return {
        get_customer_events: user => dispatch(get_customer_events(user)),
        search_customer_events: user => dispatch(search_customer_events(user))        
    };
  }
  
  function mapStateToProps(store) {
    console.log('CUSTOMER events stoere is' , store)
    return {
      customer_events : store.customer_events
    };
  }
 
  const customerEvents = connect(mapStateToProps, mapDispatchToProps)(CustomerEvents);
  export default customerEvents;