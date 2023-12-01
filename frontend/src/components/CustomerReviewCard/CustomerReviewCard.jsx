import { Card, Col, notification, Rate, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Axios from 'axios';
import React, { Component } from 'react'
import { BACKEND } from '../../Config';
import { get_customer_restraurant_details, register_for_an_event } from '../../js/actions';
import { connect } from "react-redux";
class CustomerReviewCard extends Component {
    constructor(props)
    {
        super(props);
        
        var fileName = ""
        if(props.review.restraurant)
        {
            fileName = props.review.restraurant.photo.split("public").pop();
        }
        this.state = {
            // review_id : props.review._id,
            // user_id : props.review.user_id,
            // restraurant_id : props.review.restraurant_id,
            // review_ratings : props.review.review_ratings,
            // review_description : props.review.review_description,
            // review_time : props.review.review_time,
            // user_name : props.review.restraurant.restraurant_name,
            // image : `${BACKEND}` +  fileName,
        }
    }
    // componentWillReceiveProps() {
    //     setTimeout(() => {
    //         // console.log("Props are ", this.props.review);
    //         var fileName = ""
    //         if(this.props.review.restraurant)
    //         {
    //             fileName = this.props.review.restraurant.photo.split("public").pop();
    //         }
    //         console.log("Setting the state")
    //         this.state = {
    //             review_id : this.props.review._id,
    //             user_id : this.props.review.user_id,
    //             restraurant_id : this.props.review.restraurant_id,
    //             review_ratings : this.props.review.review_ratings,
    //             review_description : this.props.review.review_description,
    //             review_time : this.props.review.review_time,
    //             user_name : this.props.review.restraurant.restraurant_name,
    //             image : `${BACKEND}` +  fileName,
    //         }
    //     }, );
    // }
    render() {
        var fileName = ""
        if(this.props.review.restraurant)
        {
            fileName = `${BACKEND}` + this.props.review.restraurant.photo.split("public").pop();
        }
        var rating = this.props.review.review_ratings
        return (
            
            <div style = {{marginTop : "3%"}}>
                <Card title = {this.props.review.restraurant.restraurant_name} style = {{width:"150%", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}} extra = {this.props.review.review_date}>
                    <Row>
                        <Col md = {5} >
                            <Avatar size={100} src = {fileName} />
                        </Col>
                        <Col md = {7} style = {{borderLeft:"1px solid lightgrey"}}>
                            <ul style ={{listStyleType:"none"}}>
                                <li>
                                    <Rate  value = {rating} disabled/>
                                </li>
                                <li style = {{width : "300%"}}>
                                    <h3 style = {{color :"grey"}}>{this.props.review.review_description}</h3>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}
// export default CustomerReviewCard;
function mapDispatchToProps(dispatch) {
    return {
        get_customer_restraurant_details : user => dispatch(get_customer_restraurant_details(user))
    };
  }
  
function mapStateToProps(store) {
return {
   message : store.message,
   customer_restraurant : store.customer_restraurant
};
}

const customerReviewCard = connect(mapStateToProps, mapDispatchToProps)(CustomerReviewCard);
export default customerReviewCard;