import { Col, Pagination, Row } from 'antd'
import Axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { BACKEND } from '../../Config';
import { getRestraurant, getDeliveryFilterRestraurants, getNeighorhoodFilterRestraurants, finalFilter} from '../../js/actions';
import Filter from '../Filter/Filter'
import Restraurant from '../Restraurant/Restraurant';
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import GoogleMap from '../GoogleMap/GoogleMap'
import { connect } from "react-redux";
class CustomerHome extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            restraurants : [],
            offset: 0,
            elements: [],
            perPage: 5,
            currentPage: 1,
            pageCount: 1
        }
    }
    componentDidMount() {
        // console.log(this.props.history.location)
        // if(window.sessionStorage.getItem)
        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            this.props.getRestraurant();
        }
    }
    componentWillReceiveProps () {
        setTimeout(() => {
            console.log("New restraurants are ", this.props.restraurants);
            this.setState({
                restraurants : this.props.restraurants,
                pageCount: Math.ceil(this.props.restraurants.length/this.state.perPage),
            })
            this.setElementsForCurrentPage();
        }, 0)
    }
    finalFilter = (filter, neighorhoods) => {
        filter['search'] = document.getElementById("search").value;
        filter['neighorhoods'] = neighorhoods
        filter['location'] = document.getElementById("searchLocation").value
        this.props.finalFilter(filter)
    }
    setElementsForCurrentPage = () => {
        let elements = this.props.restraurants.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ 
            elements : elements
        });
    }
    showCatalogicData = () => {
        console.log("Inside show catolgocal data function", this.state.elements);
        return this.state.elements.map(i => {
            // console.log("Calling child with i ------------------", i)
            return <Restraurant key = {i._id} restraurant = {i} />
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
        if(!window.sessionStorage.getItem('isLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        var temp = null;
        if(this.state.restraurants.length === 0)
        {
            temp = <div>
                <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No such restraurants found</h1>
            </div>
        }
        // if(this.props.restraurants)
        // {
        //     temp = this.props.restraurants.map(i => {
        //         return <Restraurant key = {i._id} restraurant = {i} />
        //     })
        // }
        let paginationElement;
        if(this.props.restraurants)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.props.restraurants.length}
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
                    <Row style={{marginTop:"2%"}}>
                        <Col md = {3} style={{marginLeft:"3%"}}>
                            <Filter callBackForFinalFilter = {this.finalFilter} />
                        </Col>
                        <Col md = {6} style={{marginLeft:"7%", }}>
                            {temp}
                            <div>{this.showCatalogicData()}</div>
                        </Col>
                        <Col md = {3} style = {{marginLeft : "27%"}}>
                            <GoogleMap  restraurants = {this.state.restraurants}/>
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
// export default CustomerHome
function mapDispatchToProps(dispatch) {
    return {
      getRestraurant: user => dispatch(getRestraurant()),
      getDeliveryFilterRestraurants: user => dispatch(getDeliveryFilterRestraurants(user)),
      getNeighorhoodFilterRestraurants : user => dispatch(getNeighorhoodFilterRestraurants(user)),
      finalFilter : user => dispatch(finalFilter(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      
    //   user_id : store.user_id
       restraurants : store.restraurants
    };
  }
 
  const customeHome = connect(mapStateToProps, mapDispatchToProps)(CustomerHome);
  export default customeHome;