import { Col, notification, Pagination, Row } from 'antd'
import React, { Component } from 'react'
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import MiddleCustomerProfile from '../MiddleCustomerProfile/MiddleCustomerProfile'
import Axios from 'axios';
import { BACKEND } from '../../Config';
import RestraurantReviewCard from '../RestraurantReviewCard/RestraurantReviewCard';
import CustomerReviewCard from '../CustomerReviewCard/CustomerReviewCard';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarWeek, faJedi, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { get_customer_reviews } from '../../js/actions';
import { connect } from "react-redux";
import CustomerNavigation from '../CustomerNavigation/CustomerNavigation';
class CustomerReviews extends Component {
    constructor(props){
        super(props);
        this.state = {
            reviews : [],
            offset: 0,
            elements: [],
            perPage: 5,
            currentPage: 1,
            pageCount: 1
        }

        if(window.sessionStorage.getItem('isLoggedIn') === 'true')
        {
            var user = {
                user_id : window.sessionStorage.getItem("UserId")
            }
            this.props.get_customer_reviews(user);
        }
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            if(this.props.customer_reviews)
            {
                this.setState({
                    reviews : this.props.customer_reviews,
                    pageCount: Math.ceil(this.props.customer_reviews.length/this.state.perPage),
                })
                this.setElementsForCurrentPage();
            }
        })
    }
    setElementsForCurrentPage = () => {
        let elements = this.state.reviews.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ 
            elements : elements
        });
    }
    showCatalogicData = () => {
        console.log("Inside show catolgocal data function", this.state.elements);
        return this.state.elements.map(i => {
            // console.log("Calling child with i ------------------", i)
            return (
                <CustomerReviewCard review = {i} key = {i.review_id}/>
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
        if(!window.sessionStorage.getItem('isLoggedIn'))
        {
            redirectVar = <Redirect to ='/login'></Redirect>
        }
        var temp = null;
        // if(this.props.customer_reviews.length === 0)
        // {
        //     temp = <div>
        //         <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No Reviews found</h1>
        //     </div>
        // }
        // if(this.props.customer_reviews)
        // {
        //     temp = this.props.customer_reviews.map(i => {
        //         return(
        //             <CustomerReviewCard review = {i} key = {i.review_id}/>
        //         )
        //     })
        // }
        let paginationElement;
        if(this.props.customer_reviews)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.props.customer_reviews.length}
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
                    <MiddleCustomerProfile   />
                </div>
                <div>
                   <Row style = {{marginTop :"2%"}}>
                    <Col md = {4} style={{marginLeft:"15%"}} >
                        <CustomerNavigation />
                    </Col>
                    <Col md = {8}>
                        {/* {temp} */}
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
// export default CustomerReviews
function mapDispatchToProps(dispatch) {
    return {
        get_customer_reviews: user => dispatch(get_customer_reviews(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
        customer_reviews : store.customer_reviews,
        user : store.user
    };
  }
 
  const customer_reviews = connect(mapStateToProps, mapDispatchToProps)(CustomerReviews);
  export default customer_reviews;