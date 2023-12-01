import { Card, Col, notification, Rate, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Axios from 'axios';
import React, { Component } from 'react'
import { BACKEND } from '../../Config';
import './RestraurantReviewCard.css'
class RestraurantReviewCard extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            review_id : props.review.review_id,
            user_id : props.review.user_id,
            restraurant_id : props.review.restraurant_id,
            review_ratings : props.review.review_ratings,
            review_description : props.review.review_description,
            review_time : props.review.review_time,
            user_name : props.review.user.first_name + props.review.user.last_name ,
            image : `${BACKEND}/getProfileImage/` +  props.review.user_id,
        }
    }
    render() {
        return (
            <div style = {{marginTop : "3%"}}>
                <Card title = {this.state.user_name} style = {{width:"150%"}} extra = {this.state.review_date}>
                    <Row>
                        <Col md = {5} >
                            <Avatar size={100} src = {this.state.image} />
                        </Col>
                        <Col md = {7} style = {{borderLeft:"1px solid lightgrey"}}>
                            <ul style ={{listStyleType:"none"}}>
                                <li>
                                    <Rate allowHalf defaultValue = {this.state.review_ratings} disabled/>
                                </li>
                                <li  style = {{width : "300%"}}>
                                    <h3 style = {{color :"grey"}}>{this.state.review_description}</h3>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
export default RestraurantReviewCard;