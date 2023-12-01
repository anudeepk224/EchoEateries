import { Card, notification } from 'antd';
import Axios from 'axios';
import React, { Component } from 'react'
import { BACKEND } from '../../Config';

class RegisteredEventCard extends Component {
    constructor(props) 
    {
        super(props);
        var date = props.event.event_date.split('T');
        this.state = {
            restraurant_name : props.event.restraurant.restraurant_name,
            eventDate : date,
        }
    }
    render() {
        
        return (
            <div>
                <div style = {{marginTop:"2%"}}>
                    <Card title = {this.props.event.event_name} style = {{width : "125%", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}} extra = {[this.props.event.event_hashtag]}>
                        <ul style = {{listStyleType : "none"}}>
                             <li>
                                <h3>Restraurant: {this.state.restraurant_name}</h3>
                            </li>
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
                    </Card>
                </div>
            </div>
        )
    }
}
export default  RegisteredEventCard