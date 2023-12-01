import Avatar from 'antd/lib/avatar/avatar';
import React, { Component } from 'react';
import { connect } from "react-redux";
import { get_customer_chats } from '../../js/actions';
import { get_restraurant_chats } from '../../js/actions/restraurant';
import ContactCard from '../ContactCard/ContactCard';
import "./RestraurantChatList.css";
class RestraurantChatList extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            recieved : false
        }
        if(window.sessionStorage.getItem("RestrauId"))
        {
            var restraurant = {
                restraurant_id : window.sessionStorage.getItem("RestrauId")
            }
            this.props.get_restraurant_chats(restraurant);
        }
        else if(window.sessionStorage.getItem("UserId"))
        {
            var customer = {
                customer_id : window.sessionStorage.getItem("UserId")
            }
            this.props.get_customer_chats(customer);
        }
        
    }
    componentWillReceiveProps(){
        setTimeout(() => {
           if(this.props.restraurant_chats)
           {
               this.setState({
                   recieved : true
               })
           } 
        }, );
    }
    render() {
        var temp = null;
        if(window.sessionStorage.getItem("RestrauId"))
        {
            if(this.props.restraurant_chats)
            {
                temp = this.props.restraurant_chats.map(i => {
                    return(
                        <ContactCard  classname="contact" chat = {i}  key = {i._id}/>
                    )
                })
            }
        }
        else if(window.sessionStorage.getItem("UserId"))
        {
            if(this.props.customer_chats)
            {
                temp = this.props.customer_chats.map(i => {
                    return(
                        <ContactCard  classname="contact" chat = {i}  key = {i._id}/>
                    )
                })
            }
        }
        
        return (
            <div>
                <div className = "titleDiv">
                    <h2 style = {{marginLeft : "25%", color : "white"}}>Conversations</h2>
                </div>
                <div>
                    {temp}
                </div>
            </div>
        )
    }
}
// export default  RestraurantChatList;
function mapDispatchToProps(dispatch) {
    return {
        get_restraurant_chats: user => dispatch(get_restraurant_chats(user)),
        get_customer_chats : user => dispatch(get_customer_chats(user))
    };
    }
    
    function mapStateToProps(store) {
    
    return {
        message: store.message,
        restraurant_chats : store.restraurant_chats,
        customer_chats : store.customer_chats
    };
    }
    
    const restraurant_chat_list = connect(mapStateToProps, mapDispatchToProps)(RestraurantChatList);
    export default restraurant_chat_list;