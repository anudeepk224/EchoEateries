import React, { Component } from 'react'
import MessageList from '../MessageList/MessageList'
import RestraurantChatList from '../RestraurantChatList/RestraurantChatList'
import UpperCustomerProfile from '../UpperCustomerProfile/UpperCustomerProfile'

class CustomerChats extends Component {
    render() {
        return (
            <div>
                <div>
                    <UpperCustomerProfile />
                </div>
                <div className = "messenger">
                    <div className="scrollable sidebar">
                        <RestraurantChatList />
                    </div>

                    <div className="scrollable content">
                        <MessageList />
                    </div>
                </div>
            </div>
        )
    }
}
export default CustomerChats;