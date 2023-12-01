import { Col, Rate, Row , Button, Card, Input, notification, Pagination} from 'antd'
import Axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { BACKEND } from '../../Config';
import Dish from '../Dish/Dish';
import DishDetails from '../DishDetails/DishDetails';
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'
import './RestraurantView.css'
import cookie from 'react-cookies';
import Modal from 'antd/lib/modal/Modal';
import { get_customer_restraurant_details, get_customer_restraurant_dishes, get_customer_restraurant_images } from '../../js/actions';
import { connect } from "react-redux";
import { insert_review } from '../../js/actions/restraurant';
class RestraurantView extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            name : "",
            reviews : "",
            cusine : "",
            weekday: "",
            weekend: "",
            dishes : [],
            visible : false,
            rateValue : 0,
            loading : false,
            image1 : "https://s3-media0.fl.yelpcdn.com/bphoto/iMsXDwBDeooJC0-zyeJEjw/l.jpg",
            image2 : "https://s3-media0.fl.yelpcdn.com/bphoto/Wfx490HEQA6EwwH8-AxLAA/l.jpg",
            image3 : "https://s3-media0.fl.yelpcdn.com/bphoto/5Z70LwSlJPwnP0-kFk99ow/o.jpg",
            image4 : "https://s3-media0.fl.yelpcdn.com/bphoto/9w12kT6Bm5BELhHtCvVsZA/o.jpg",
            images : [],
            offset: 0,
            elements: [],
            perPage: 5,
            currentPage: 1,
            pageCount: 1
        }
    }
    componentDidMount(){
        if(window.sessionStorage.getItem('isLoggedIn'))
        {
            let myJson = {
                RestrauId : this.props.history.location.state.id
            }
            console.log("Restraurant is ", myJson)
            this.props.get_customer_restraurant_details(myJson)
            var restraurant = {
                restraurant_id : this.props.history.location.state.id
            }
            this.props.get_customer_restraurant_dishes(restraurant)
            this.props.get_customer_restraurant_images(restraurant)
        }
        
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            if(this.props.customer_restraurant)
            {
                this.setState({
                    id : this.props.customer_restraurant._id,
                    name : this.props.customer_restraurant.restraurant_name,
                    reviews : this.props.customer_restraurant.reviews,
                    cusine : this.props.customer_restraurant.cusine,
                    weekday : this.props.customer_restraurant.weekdays_timings,
                    weekend : this.props.customer_restraurant.weekend_timings,
                    reviewsCount : this.props.customer_restraurant.reviews_count,
                    email : this.props.customer_restraurant.email,
                    phoneNumber : this.props.customer_restraurant.phone_number,
                    
                })
                // this.setElementsForCurrentPage();
            }
            if(this.props.customer_restraurant_dishes)
            {
                this.setState({
                    dishes : this.props.customer_restraurant_dishes,
                    pageCount: Math.ceil(this.props.customer_restraurant_dishes.length/this.state.perPage),
                })
                this.setElementsForCurrentPage();
            }
            if(this.props.message === "Review Inserted")
            {
                this.setState({
                    reviews : this.props.restraurant_review_stars,
                    reviewsCount : this.props.reviews_count
                })
            }
            if(this.props.customer_restraurant_images)
            {
                console.log("Hii in the correct condition")
                if(this.props.customer_restraurant_images[0])
                {
                    var fileName = this.props.customer_restraurant_images[0].image.split('public').pop();
                    this.setState({
                        image1 : `${BACKEND}` + fileName
                    })
                }
                if(this.props.customer_restraurant_images[1])
                {
                    var fileName = this.props.customer_restraurant_images[1].image.split('public').pop();
                    this.setState({
                        image2 : `${BACKEND}` + fileName
                    })
                }
                if(this.props.customer_restraurant_images[2])
                {
                    var fileName = this.props.customer_restraurant_images[2].image.split('public').pop();
                    this.setState({
                        image3 : `${BACKEND}` + fileName
                    })
                }
                if(this.props.customer_restraurant_images[3])
                {
                    var fileName = this.props.customer_restraurant_images[3].image.split('public').pop();
                    this.setState({
                        image4 : `${BACKEND}` + fileName
                    })
                }
            }
        });
    }
    
    openModal = () => {
        this.setState({
            visible : true
        })
    }
    handleCancel = () => {
        this.setState({
            visible : false
        })
    }
    handleRateChange = (value) => {
        this.setState({
            rateValue : value
        })
    }
    handleOk = () => {
        this.setState({ 
            loading: true
        });
       
        var review = {
            user_id : window.sessionStorage.getItem("UserId"),
            restraurant_id : this.props.history.location.state.id,
            review_description : this.state.description,
            review_ratings : this.state.rateValue,
        }
        console.log(review)
        // review
        this.props.insert_review(review)
        setTimeout(() => {
            this.setState({
                  loading: false, 
                  visible: false,
                  description : "",
                  rateValue : 0,
              });
          }, 1000);
    }
    
    updateDescription = (e) => {
        this.setState({
            description : e.target.value
        })
    }
    setElementsForCurrentPage = () => {
        let elements = this.props.customer_restraurant_dishes.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ 
            elements : elements
        });
    }
    showCatalogicData = () => {
        console.log("Inside show catolgocal data function", this.state.elements);
        return this.state.elements.map(i => {
            // console.log("Calling child with i ------------------", i)
            return <DishDetails source = "Customer" key = {i._id} dish = {i} style={{width:"40%"}}/>
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
        const reviews = parseInt(this.state.reviews)
        let redirectVar = null;
        if(!window.sessionStorage.getItem('isLoggedIn'))
        {
            redirectVar = <Redirect to ='/landingPage'></Redirect>
        }
        var temp = null;
        // if(this.props.customer_restraurant_dishes)
        // {
        //     temp = this.props.customer_restraurant_dishes.map(i => {
        //         return <DishDetails source = "Customer" key = {i._id} dish = {i} style={{width:"40%"}}/>
        //     })
        // }
        let paginationElement;
        if(this.props.customer_restraurant_dishes)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.props.customer_restraurant_dishes.length}
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
                <div className="image-row">
                    <div className="image-col">
                        <img style={{width:"100%", height:250}} src={this.state.image1}/>
                    </div>
                    <div className="image-col">
                        <img style={{width:"100%", height:250}} src={this.state.image2}/>
                    </div>
                    <div className="image-col">
                        <img style={{width:"100%", height:250}} src = {this.state.image3}/>
                    </div>
                    <div className="image-col">
                        <img style={{width:"100%", height:250}} src = {this.state.image4}/>
                    </div>
                </div>
                <div className = "topSection">
                    <div className='restrauName'>
                        <h1 className = "restrauHeading">{this.state.name}</h1>
                        <Row>
                            <Col>
                                <Rate value = {Number(this.state.reviews)} allowHalf disabled />
                            </Col>
                            <Col className="reviewsRating">
                                <h2 style={{color:"grey"}}>{this.state.reviewsCount} Reviews</h2>
                            </Col>
                        </Row>
                        <h2 className = 'cusine'>{this.state.cusine}</h2>
                        <h2 className = 'cusine'>{this.state.weekday}</h2>
                        <Row>
                            <Col>
                                <Button onClick = {this.openModal} className="writeReview" >Write a Review</Button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div>
                    <Row>
                         <Col md = {8}>
                            <div className="dishes">
                                {temp}
                                <div>{this.showCatalogicData()}</div>
                            </div>
                           
                        </Col> 
                        <Col md = {4} style ={{marginLeft:"25%", marginTop:"3.3%"}}>
                            <ul style={{listStyleType : "none"}}>
                                <li>
                                    <Card title = "Contact Info" style = {{width :"200%", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                                        <Row>
                                            <Col>
                                                <h3>Email : {this.state.email} </h3>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h3>Phone Number : {this.state.phoneNumber}</h3>
                                            </Col>
                                        </Row>
                                    </Card>
                                </li>
                                <li >
                                    <Card title='Timings'  style = {{width :"200%", marginTop:"4%", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                                        <Row>
                                            <Col>
                                                <h3>Monday:  {this.state.weekday}</h3>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h3>Tuesday:  {this.state.weekday}</h3>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h3>Wednesday: &nbsp; {this.state.weekday}</h3>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h3>Thursday: {this.state.weekday}</h3>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h3>Friday: {this.state.weekday}</h3>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h3>Saturday: {this.state.weekend}</h3>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <h3>Sunday:{this.state.weekend}</h3>
                                            </Col>
                                        </Row>
                                    </Card>
                                </li>
                            </ul>
                        </Col> 
                    </Row>
                </div>
                <div style = {{marginLeft : "45%", marginTop : "3%"}}>
                    {paginationElement}
                </div>
                <Modal title = "Write a Review"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer = {[
                        <Button onClick = {this.handleCancel}>Cancel</Button>,
                        <Button loading={this.state.loading} onClick = {this.handleOk}>Submit</Button>
                    ]}
                >
                    <ul style={{listStyleType : "none"}}>
                        <li>
                            <Row>
                                <Col>
                                    <h3>Ratings: </h3>
                                </Col>
                                <Col style = {{marginLeft: '2%', marginTop:"-1%"}}>
                                    <Rate value = {this.state.rateValue} allowHalf onChange = {this.handleRateChange}/>
                                </Col>
                            </Row>
                        </li>
                        <li>
                            <Row>
                                <Col>
                                    <h3>Review Description: </h3>
                                </Col>
                            </Row>
                        </li>
                        <li>
                            <Input.TextArea rows = {3} value = {this.state.description} onChange = {this.updateDescription}/>
                        </li>
                    </ul>
                </Modal>
            </div>
        )
    }
}
// export default  RestraurantView;
function mapDispatchToProps(dispatch) {
    return {
        get_customer_restraurant_details: user => dispatch(get_customer_restraurant_details(user)),
        get_customer_restraurant_dishes : user => dispatch(get_customer_restraurant_dishes(user)),
        get_customer_restraurant_images : user => dispatch(get_customer_restraurant_images(user)),
        insert_review : user => dispatch(insert_review(user))
    };
  }
  
  function mapStateToProps(store) {
      console.log("In restraurant view store is", store)
    return {
        customer_restraurant : store.customer_restraurant,
        customer_restraurant_dishes : store.customer_restraurant_dishes,
        customer_restraurant_images : store.customer_restraurant_images,
        message : store.message,
        reviews_count : store.reviews_count,
        restraurant_review_stars : store.restraurant_review_stars
    };
  }
 
  const customer_restraurant_details = connect(mapStateToProps, mapDispatchToProps)(RestraurantView);
  export default customer_restraurant_details;