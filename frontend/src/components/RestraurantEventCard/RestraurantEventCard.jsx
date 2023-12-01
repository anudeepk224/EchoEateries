import { Button, Card, Col, notification, Row } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import React, { Component } from 'react'
import "./RestraurantEventCard.css";
import Axios from 'axios';
import { BACKEND } from '../../Config';
import CustomerCard from '../CustomerCard/CustomerCard';
import { get_users_of_an_event } from '../../js/actions/restraurant';
import { connect } from 'react-redux';
class RestraurantEventCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            visible : false,
            users : []
        }
        console.log("--------------------------------",props)
    }
    openModel = () => {
        var event = {
            event_id : this.props.event._id
        }
        this.setState({
            visible : true
        })
        this.props.get_users_of_an_event(event);
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            if(this.props.message === "Users of an event fetched")
            {
                this.setState({
                    users : this.props.users_of_an_event,
                })
            }
        }, );
    }
    handleCancel = () => {
        this.setState({
            visible : false
        })
    }
    render() {
        var date = this.props.event.event_date.split('T');
        date = date[0]
        return (
            <div>
                <div style ={{marginTop:"2%"}}>
                    <Card title = {this.props.event.event_name} extra = {[this.props.event.event_hashtag]} style={{width:"125%", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}} actions = {[
                        <Button onClick = {this.openModel}>View Guest List</Button>
                    ]}>
                        <ul style = {{listStyleType : "none"}}>
                            <li>
                                <h3>Location: {this.props.event.event_location}</h3>
                            </li>
                            <li>
                                <h3>Date: {date}</h3>
                            </li>
                            <li>
                                <h3>Time: {this.props.event.event_time}</h3>
                            </li>
                            <li>
                                <h4>Description: {this.props.event.event_description}</h4>
                            </li>
                        </ul>
                    </Card>
                </div>
                <Modal title = "Guest List"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer = {[
                        <Button onClick = {this.handleCancel}>Cancel</Button>
                    ]}
                    bodyStyle = {{
                        height : "450px",
                        overflowY :"scroll"
                    }}
                >
                    {this.state.users.map(i => {
                        return(
                            <CustomerCard user = {i} key = {i.user_id} />
                        )
                    })}
                </Modal>
            </div>
        )
    }
}
// export default  RestraurantEventCard;
function mapDispatchToProps(dispatch) {
    return {
        get_users_of_an_event: user => dispatch(get_users_of_an_event(user))
    };
  }
  
function mapStateToProps(store) {
return {
    message : store.message,
    users_of_an_event : store.users_of_an_event
};
}

const restraurantEventCard = connect(mapStateToProps, mapDispatchToProps)(RestraurantEventCard);
export default restraurantEventCard;