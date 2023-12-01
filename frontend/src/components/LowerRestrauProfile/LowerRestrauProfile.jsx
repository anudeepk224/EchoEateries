import React, { Component } from 'react'
import 'antd/dist/antd.css';
import {Row, Col, Input, Button, Table, Space, DatePicker, TimePicker, notification, Pagination} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faStar, faUser, faCalendarCheck, faTag, faJedi, faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import { BACKEND } from '../../Config';
import Avatar from 'antd/lib/avatar/avatar';
import Dish from '../Dish/Dish';
import {Link} from 'react-router-dom'
import './LowerRestrauProfile.css'
import Modal from 'antd/lib/modal/Modal';
import { add_event, get_restraurant_dishes } from '../../js/actions/restraurant';
import { connect } from "react-redux";
const {Column} = Table;
const data = [
    {
      key: '1',
      firstName: 'Menu',
    },
    {
      key: '2',
      firstName: 'Friends',
    },
    {
      key: '3',
      firstName: 'Reviews',
    },
    {
        key: '4',
        firstName: 'Compliments',
    },
    {
        key: '5',
        firstName: 'Tips',
    },
    {
        key: '6',
        firstName: 'Bookmarks',
    },
    {
        key: '7',
        firstName: 'CheckIns',
    }
      
  ];
class LowerRestrauProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            dishes : [],
            visible : false,
            loading : false,
            offset: 0,
            elements: [],
            perPage: 5,
            currentPage: 1,
            pageCount: 1
        }
    }
    componentDidMount() {
        var restraurant = {
            restraurant_id : window.sessionStorage.getItem("RestrauId")
        }
        this.props.get_restraurant_dishes(restraurant);
    }
    componentWillReceiveProps(){
        
        setTimeout(() => {
            if(this.props.restraurant_dishes)
            {
                console.log("Inside props with data" , this.props.restraurant_dishes)
                this.setState({
                    dishes : this.props.restraurant_dishes,
                    pageCount: Math.ceil(this.props.restraurant_dishes.length/this.state.perPage),
                })
                this.setElementsForCurrentPage();
            }
            if(this.props.message === "Event Successfully Added")
            {
                this.setState({
                    loading : false,
                    visible : false
                })
            }
        })
    }
    addEvents = () => {
        this.setState({
            visible : true
        })
    }
    handleCancel = () => {
        this.setState({
            visible : false
        })
        
    }
    handleOk = () => {
        this.setState({
            loading : true
        })
        var event = {
            restraurant_id : window.sessionStorage.getItem("RestrauId"),
            event_name : document.getElementById('eventName').value,
            event_location : document.getElementById('eventLocation').value,
            event_hashtag : document.getElementById('eventHashTag').value,
            event_date : document.getElementById('eventDate').value,
            event_time : document.getElementById('eventTime').value,
            event_description : document.getElementById('eventDescription').value,
        }
        var isEmpty = false
        Object.keys(event).forEach(function(key) {
            if(event[key] === "")
            {
                isEmpty = true;
            }
         })    
        if(isEmpty)
        {
            this.setState({
                loading : false
            })
            notification["error"]({
                message: 'Empty Fields',
                description:
                  'Please fill all the fields',
              });
        }
        else{
            console.log("calling to add event")
            this.props.add_event(event)
        }
        
    }
    setElementsForCurrentPage = () => {
        let elements = this.props.restraurant_dishes.slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ 
            elements : elements
        });
    }
    showCatalogicData = () => {
        console.log("Inside show catolgocal data function", this.state.elements);
        return this.state.elements.map(i => {
            // console.log("Calling child with i ------------------", i)
            return (
                <Dish dish = {i} source = "Restrau" />
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
        var temp = null;
        if(this.state.dishes.length === 0)
        {
            temp = <div>
                <h1 style = {{color : "#d32323", fontWeight : "bolder"}}>No Dishes found</h1>
            </div>
        }
        let paginationElement;
        if(this.props.restraurant_dishes)
        {
            if(this.state.pageCount > 0)
            {
                paginationElement = (<Pagination
                    defaultCurrent={1} 
                    onChange={this.handlePageClick}       
                    size="small" 
                    total={this.props.restraurant_dishes.length}
                    showTotal={(total, range) => 
                    `${range[0]}-${range[1]} of ${total} items`}   
                    defaultPageSize={this.state.perPage}
                />)
            }
        }
        console.log(this.state.dishes)
        return (
            <div>
                <div>
                    <div>
                        <Row>
                            <Col md = {4} style={{marginLeft:"15%"}}>
                                <h2 style = {{fontWeight:"bolder", marginTop:"2%", marginLeft:"18%", color:"#2f3235"}}>{window.sessionStorage.getItem("RestrauName")}</h2>
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
                                        <div className = "sideNav" onClick = {this.addEvents}> 
                                            <Link style = {{color : "black"}}>
                                                <Row>
                                                    <Col>
                                                        <FontAwesomeIcon icon = {faCalendarDay} />
                                                    </Col>
                                                    <Col>
                                                        <h3>Add Events</h3>
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
                            <Col md = {5}>
                                {/* {this.state.dishes.map(i => {
                                    return  <Dish dish = {i} source = "Restrau" />
                                })} */}
                                <div>{this.showCatalogicData()}</div>
                            </Col>
                            
                        </Row>
                    </div>
                    <div style = {{marginLeft : "75%", marginTop : "3%"}}>
                        {paginationElement}
                    </div>
                </div>
                <Modal title = "Add an event"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer = {[
                        <Button onClick = {this.handleCancel}>Cancel</Button>,
                        <Button loading={this.state.loading} onClick = {this.handleOk}>Submit</Button>
                    ]}
                >   
                    <div style = {{marginTop:"2%", width:"65%"}}>
                        <Input id = "eventName" size = 'middle' placeholder = "Event Name"></Input>
                    </div>
                    <div style = {{marginTop:"2%", width:"65%"}}> 
                        <Input id="eventHashTag" size = 'middle' placeholder = "Hashtag"></Input>
                    </div>
                    <div style = {{marginTop:"2%", width:"65%"}}> 
                        <Input id="eventLocation" size = 'middle' placeholder = "Event Location"></Input>
                    </div>
                    <div style = {{marginTop:"2%", width:"100%"}}>
                        <DatePicker id = 'eventDate' style = {{width :"65%"}} placeholder = "Event Date"></DatePicker>
                    </div>
                    <div style = {{marginTop:"2%", width:"100%"}}>
                        <TimePicker id ='eventTime' style = {{width :"65%"}} placeholder = "Event Time"></TimePicker>
                    </div>
                    <div style = {{marginTop:"2%"}}>
                        <Input.TextArea id = 'eventDescription' size = 'middle' placeholder = "Event Description"></Input.TextArea>
                    </div>
                    
                </Modal>
            </div>
        )
    }
}

// export default LowerRestrauProfile;
function mapDispatchToProps(dispatch) {
    return {
        get_restraurant_dishes: user => dispatch(get_restraurant_dishes(user)),
        add_event : user => dispatch(add_event(user))
    };
    }
    
    function mapStateToProps(store) {
    return {
        restraurant_dishes : store.restraurant_dishes,
        message : store.message
    };
    }
    
    const lower_restraurant_details = connect(mapStateToProps, mapDispatchToProps)(LowerRestrauProfile);
    export default lower_restraurant_details;
