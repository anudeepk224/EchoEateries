import React, { Component } from 'react'
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import MiddleRestraurantProfile from '../MiddleRestraurantProfile/MiddleRestraurantProfile'
import { Col, notification, Pagination, Row } from 'antd'
import Axios from 'axios';
import { BACKEND } from '../../Config';
import RestraurantReviewCard from '../RestraurantReviewCard/RestraurantReviewCard';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faCalendarDay, faJedi, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import UpperRestraurantProfile from '../UpperRestraurantProfile/UpperRestraurantProfile';
import { get_restraurant_reviews } from '../../js/actions/restraurant';
import { connect } from "react-redux";
class RestraurantReviews extends Component {
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
        if(window.sessionStorage.getItem('RestrauLoggedIn') === 'true')
        {
            var restraurant = {
                restraurant_id : window.sessionStorage.getItem("RestrauId")
            }
            this.props.get_restraurant_reviews(restraurant);
        }
        
    }
    componentWillReceiveProps(){
        setTimeout(() => {
           this.setState({
               reviews : this.props.restraurant_reviews,
               pageCount: Math.ceil(this.props.restraurant_reviews.length/this.state.perPage),
           }) 
           this.setElementsForCurrentPage();
        }, );
    }
    // getRestraurantReviews = () => {
    //     var restraurant = {
    //         restraurant_id : window.sessionStorage.getItem("RestrauId")
    //     }
    //     Axios.post(`${BACKEND}/getRestraurantReviews`, restraurant).then(response => {
    //         if(response.status === 200)
    //         {
    //             this.setState({
    //                 reviews : response.data
    //             })
    //         }
    //     }).catch(err => {
    //         if(err)
    //         {
    //             notification["error"]({
    //                 message: 'Server Sider error',
    //                 description:
    //                 'Please try again in few minutes',
    //             });
    //         }
    //     })
    // }
    setElementsForCurrentPage = () => {
        let elements = this.props.restraurant_reviews.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ 
            elements : elements
        });
    }
    showCatalogicData = () => {
        console.log("Inside show catolgocal data function", this.state.elements);
        return this.state.elements.map(i => {
            // console.log("Calling child with i ------------------", i)
            return (
                <RestraurantReviewCard review = {i} key = {i.review_id}  />
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
        if(this.props.restraurant_reviews)
        {
            // temp = this.props.restraurant_reviews.map(i => {
            //     return(
            //         <RestraurantReviewCard review = {i} key = {i.review_id}  />
            //     )
            // })
        }
        if(this.state.reviews.length === 0)
        {
            temp = <div>
                <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No Reviews found</h1>
            </div>
        }
        let paginationElement;
        if(this.props.restraurant_reviews)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.props.restraurant_reviews.length}
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
                    <Row style = {{marginTop:"1%"}}>
                        <Col md = {4} style = {{marginLeft : "15%"}}>
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
// export default RestraurantReviews;
function mapDispatchToProps(dispatch) {
    return {
        get_restraurant_reviews: user => dispatch(get_restraurant_reviews(user))
    };
    }
    
    function mapStateToProps(store) {
    console.log("STore is restrau profile is ", store)
    return {
        restraurant_reviews : store.restraurant_reviews
    };
    }
    
    const restraurant_reviews_form = connect(mapStateToProps, mapDispatchToProps)(RestraurantReviews);
    export default restraurant_reviews_form;