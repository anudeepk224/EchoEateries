import { Button, Card, notification } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { Component } from 'react'
import { load } from 'react-cookies';
import { BACKEND } from '../../Config';
import { get_customer_restraurant_details, register_for_an_event } from '../../js/actions';
import { connect } from "react-redux";
class CustomerEventRegistrationCard extends Component {
    constructor(props) 
    {
        super(props);
        this.state = {
            restraurant_name : "",
            eventDate : "",
            visible : false,
            loading : false
        }
        var restraurant = {
            RestrauId : props.event.restraurant_id   
        }
        this.props.get_customer_restraurant_details(restraurant);
    }
    componentWillReceiveProps()
    {
        setTimeout(() => {
            var date = this.props.event.event_date.split('T');
            date = date[0]
            this.setState({
                restraurant_name : this.props.customer_restraurant.restraurant_name,
                eventDate : date
            })
            if(this.props.message === "Customer has already registered for this event" || this.props.message === "Register to event successfully")
            {
                this.setState({
                    loading : false,
                    visible : false
                })
            }
        }, );
    }
    registerForEvent = () => {
        this.setState({
            loading : true
        })
        var event = {
     
            event_id : this.props.event._id,
            user_id : window.sessionStorage.getItem("UserId"),
            restraurant_id : this.props.event.restraurant_id,
        }
        this.props.register_for_an_event(event)
    }
    handleCancel = () => {
        this.setState({
            visible : false
        })
        
    }
    openEvent = () => {
        this.setState({
            visible : true
        })
    }
    render() {
        
        return (
            <div>
                <div style = {{marginTop:"2%"}}>
                    <Card title = {this.props.event.event_name} style = {{width : "125%", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}} extra = {[this.props.event.event_hashtag]} actions = {[
                        <Button  onClick = {this.openEvent}>View Event</Button>
                    ]}>
                        <ul style = {{listStyleType : "none"}}>
                             <li>
                                <h3>Restraurant: {this.state.restraurant_name}</h3>
                            </li>
                            
                        </ul>
                    </Card>
                </div>
                <div>
                    <Modal title = "Add an event"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer = {[
                            <Button onClick = {this.handleCancel}>Cancel</Button>,
                            <Button loading={this.state.loading} onClick = {this.registerForEvent}>Register For Event</Button>
                        ]}
                    >   
                        <ul style = {{listStyleType : "none"}}>
                            <li>
                                <h3>Location: {this.props.event.event_location}</h3>
                            </li>
                            <li>
                                <h3>Date: {this.state.eventDate}</h3>
                            </li>
                            <li>
                                <h3>Time: {this.props.event.event_time}</h3>
                            </li>
                            <li>
                                <h4>Description: {this.props.event.event_description}</h4>
                            </li>
                        </ul>
                    </Modal>
                </div>
            </div>
        )
    }
}
// export default  CustomerEventRegistrationCard;
function mapDispatchToProps(dispatch) {
    return {
        get_customer_restraurant_details: user => dispatch(get_customer_restraurant_details(user)),
        register_for_an_event : user => dispatch(register_for_an_event(user))
    };
  }
  
function mapStateToProps(store) {
return {
   message : store.message,
   customer_restraurant : store.customer_restraurant
};
}

const customerEventRegistrationCard = connect(mapStateToProps, mapDispatchToProps)(CustomerEventRegistrationCard);
export default customerEventRegistrationCard;