import { Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BACKEND } from '../../Config';
import { get_chat } from '../../js/actions/restraurant';
import "./ContactCard.css"
class ContactCard extends Component {
    constructor(props)
    {
        super(props);
        this.state = {

        }
        console.log("Chat prips are --------------", props)
    }
    openChat = () => {
        if(window.sessionStorage.getItem("RestrauId"))
        {
            window.sessionStorage.setItem("chatCustomerName", this.props.chat.customer.first_name + " " + this.props.chat.customer.last_name);
            window.sessionStorage.setItem("chatPic", this.props.chat.customer.profile_photo)
        }
        else if(window.sessionStorage.getItem("UserId"))
        {
            window.sessionStorage.setItem("chatCustomerName", this.props.chat.restraurant.restraurant_name);
            window.sessionStorage.setItem("chatPic", this.props.chat.restraurant.photo)
        }
        console.log(this.props)
        var chat = {
            chat_id : this.props.chat._id
        }
        this.props.get_chat(chat);
        // this.props.callbackFromContactCard(this.props.chat._id);
    }
    render() {
        var filename = "";
        var name = ""
        if(window.sessionStorage.getItem("RestrauId"))
        {
            filename = `${BACKEND}` + this.props.chat.customer.profile_photo.split('public').pop();
            name = this.props.chat.customer.first_name + " " + this.props.chat.customer.last_name
        }
        else if(window.sessionStorage.getItem("UserId"))
        {
            filename = `${BACKEND}` + this.props.chat.restraurant.photo.split('public').pop();
            name = this.props.chat.restraurant.restraurant_name
        }
        
        return (
            <div className="conversation-list-item" onClick = {this.openChat}>
                <Avatar className="conversation-photo" src={filename} alt="conversation" />
                <div className="conversation-info">
                    <h1 className="conversation-title">{ name }</h1>
                    <p className="conversation-snippet">Testing</p>
                </div>
          </div>
            
        )
    }
}
// export default ContactCard;
function mapDispatchToProps(dispatch) {
    return {
        get_chat: user => dispatch(get_chat(user))
    };
}
    
function mapStateToProps(store) {

    return {
        message: store.message,
        restraurant_customer_chat : store.restraurant_customer_chat,
    };
}

const contactCard = connect(mapStateToProps, mapDispatchToProps)(ContactCard);
export default contactCard;