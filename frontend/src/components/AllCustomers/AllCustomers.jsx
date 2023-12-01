import React, { Component } from 'react'
import { get_all_customers, get_customer_followers, get_customet_location_filter, search_customer } from '../../js/actions';
import { connect } from "react-redux";
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import CustomerCard from '../CustomerCard/CustomerCard';
import { Button, Col, Input, Pagination, Row } from 'antd';

class AllCustomers extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            customers : [],
            offset: 0,
            elements: [],
            perPage: 5,
            currentPage: 1,
            pageCount: 1, 
            inputValue : "",
            locationInput : "",
            type : "All Customers"
        }
        this.props.get_all_customers();
        this.setElementsForCurrentPage();
    }
   componentWillReceiveProps(){
       setTimeout(() => {
           this.setState({
               customers : this.props.customers
           })
           this.setElementsForCurrentPage();
       })
   }
    setElementsForCurrentPage = () => {
        let elements = this.state.customers.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ 
            elements : elements
        });
    }
    showCatalogicData = () => {
        console.log("Inside show catolgocal data function", this.state.elements);
        return this.state.elements.map(i => {
            return(
                <CustomerCard source = "customer" user = {i} key = {i._id} />
            )
        })
    }
    handlePageClick = (pageNo) => {
        const selectedPage = pageNo - 1; 
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, 
            () => this.setElementsForCurrentPage()
            );
    }
    updateInput = (e) => {
        this.setState({
            inputValue : e.target.value
        })
    }
    searchCustomer = () => {
        var myJson = {
            search : this.state.inputValue
        }
        this.props.search_customer(myJson);
    }
    getAllCustomers = () => {
        this.setState({
            type : "All Customers"
        })
        this.props.get_all_customers();
    }
    getFollowing = () => {
        this.setState({
            type : "Following"
        })
        var myJson = {
            customer_id : window.sessionStorage.getItem("UserId")
        }
        this.props.get_customer_followers(myJson);
    }
    updateLocationInput = (e) => {
        this.setState({
            locationInput : e.target.value
        })
    }
    getLocationFilter = () => {
        console.log("Trying to call the function");
        this.setState({
            type : "Location Filtered"
        })
        var myJson = {
            search : this.state.locationInput
        }
        
        this.props.get_customet_location_filter(myJson);
    }
    render() {
        let paginationElement;
        if(this.props.customers)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.props.customers.length}
                    showTotal={(total, range) => 
                    `${range[0]}-${range[1]} of ${total} items`}   
                    defaultPageSize={this.state.perPage}
                />)
            }
        }
        
        return (
            <div>
                <div>
                    <UpperCustomerProfile />
                </div>
                <div>
                    <Row>
                        <Col md = {6} >
                            <ul style = {{listStyleType : "none"}}>
                                <li>
                                    <Button style = {{width : "100%"}} onClick = {this.getAllCustomers}>All customers</Button>
                                </li>
                                <li style = {{marginTop : "2%"}}>
                                    <Button style = {{width : "100%"}} onClick = {this.getFollowing}>Following</Button>
                                </li>
                            </ul>
                            <h2 style = {{color : "#d32323", marginLeft : "30%"}}>Search Customers</h2>
                            <ul style = {{listStyleType : "none"}}>
                                <li>
                                    <Input style = {{width : "70%", marginLeft : "9%"}} type = "text" value = {this.state.inputValue} onChange = {this.updateInput}/>
                                </li>
                                <Button onClick = {this.searchCustomer} style = {{marginTop : "10%", marginLeft : "29%"}}>Search</Button>
                            </ul>
                        </Col>
                        <Col md = {6} style = {{marginLeft : "10%"}}>
                            <h2 style = {{color : "#d32323"}}>{this.state.type}</h2>
                            <div>{this.showCatalogicData()}</div>
                        </Col>
                        <Col>
                            <ul style = {{listStyleType : "none"}}>
                                <li>
                                    <h2 style = {{color : "#d32323"}}>Search Customers via Location</h2>
                                </li>
                                <li>
                                    <Input type = "text" value = {this.state.locationInput} onChange = {this.updateLocationInput}></Input>
                                </li>
                                <li>
                                    <Button style = {{marginLeft : "35%", marginTop : "5%"}} onClick = {this.getLocationFilter}>Search</Button>
                                </li>
                            </ul>
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
// export default AllCustomers;
function mapDispatchToProps(dispatch) {
    return {
        get_all_customers: user => dispatch(get_all_customers(user)),
        search_customer : user => dispatch(search_customer(user)),
        get_customer_followers : user => dispatch(get_customer_followers(user)),
        get_customet_location_filter : user => dispatch(get_customet_location_filter(user))
    };
  }
  
function mapStateToProps(store) {
    console.log("Store is ==================", store)
return {
    message : store.message,
    customers : store.customers
};
}

const allCustomers = connect(mapStateToProps, mapDispatchToProps)(AllCustomers);
export default allCustomers;