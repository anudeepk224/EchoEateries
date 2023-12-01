import { Col, Row } from 'antd'
import React, { Component } from 'react'
import MessageList from '../MessageList/MessageList'
import RestraurantChatList from '../RestraurantChatList/RestraurantChatList'
import UpperRestraurantProfile from '../UpperRestraurantProfile/UpperRestraurantProfile'
import "./RestraurantMessages.css"
class RestraurantMessages extends Component {
    constructor(props)
    {
        super(props);
    }
    render() {
        return (
            <div>
                <div>
                    <UpperRestraurantProfile />
                </div>
                <div className = "messenger">
                    <div className="scrollable sidebar" >
                        <RestraurantChatList />
                    </div>

                    <div className="scrollable content" >
                        <MessageList style = {{marginRight : "1px solid lightgrey"}}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default RestraurantMessages;