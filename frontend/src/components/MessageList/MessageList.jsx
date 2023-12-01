import React, { Component } from 'react'
import { get_chat, send_message } from '../../js/actions/restraurant';
import { connect } from "react-redux";
import "./MessageList.css"
import { Button, Col, Input, Row } from 'antd';
import Message from '../Message/Message';
import Avatar from 'antd/lib/avatar/avatar';
import { BACKEND } from '../../Config';
class MessageList extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            input : "",
            source: ""
        }
        if(props.chatId !== 0)
        {
            
            var chat = {
                chat_id : props.chatId
            }
            this.props.get_chat(chat);
        }
       
    }
    componentDidMount()
    {
        if(window.sessionStorage.getItem("UserId"))
        {
            console.log('Soruce is user')
            this.setState({
                source : window.sessionStorage.getItem("UserId")
            })
        }
        else if(window.sessionStorage.getItem("RestrauId"))
        {
            console.log("Source is restrau")
            this.setState({
                source : window.sessionStorage.getItem("RestrauId")
            })
        }
    }
    updateInput = (e) => {
        this.setState({
            input : e.target.value
        })
    }
    sendMessage = () => {
        var json = {
            sender : this.state.source,
            message : this.state.input,
            timestamp :  new Date().getTime() 
        }
    
        var myJson = {
            chat_id : this.props.restraurant_customer_chat._id,
            text : json
        }
        this.props.send_message(myJson);
        this.setState({
            input : ""
        })
        
    }
    render() {
        var temp = null;
        if(this.props.restraurant_customer_chat)
        {
            var messages = [];
            console.log("~~~~~~~~~~~~~~~~~~~~~The chats are", this.props.restraurant_customer_chat);
            if(this.props.restraurant_customer_chat.messages.length > 0)
            {
                for(let i in this.props.restraurant_customer_chat.messages)
                {
                    let current = this.props.restraurant_customer_chat.messages[i];
                    let isMine = current.sender === this.state.source;
                    let message = {
                        key : i,
                        isMine : isMine,
                        text : current
                    }
                    messages.push(message);
                }
                temp = messages.map(i =>{
                    return(
                        <Message key = {i.key} isMine = {i.isMine} text = {i.text} />
                    )
                })
            }
            
        }
        var filename = ""
        if( window.sessionStorage.getItem("chatPic"))
        {
            filename =  window.sessionStorage.getItem("chatPic").split('public').pop()
        }
        return (
            <div>
                <div className = "converstationTitle">
                    <Row style = {{marginLeft : "35%"}}> 
                        <Col>
                            <Avatar src = {`${BACKEND}` + filename} />
                        </Col>
                        <Col style = {{marginLeft : "1%"}}>
                            <h2 style = {{color : "white", fontWeight : "bolder"}}>{window.sessionStorage.getItem("chatCustomerName")}</h2>
                        </Col>
                    </Row>
                </div>
                <div>
                    {temp}
                </div>
                <div className = "inputDiv">
                    <Row>
                        <Col style = {{width : "94%"}}>
                            <Input type = "text" value = {this.state.input} onChange = {this.updateInput}></Input>
                        </Col>
                        <Col>
                            <Button onClick = {this.sendMessage} style = {{width : "100%"}}>Send</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
// export default MessageList;
function mapDispatchToProps(dispatch) {
    return {
        get_chat: user => dispatch(get_chat(user)),
        send_message : user => dispatch(send_message(user))
    };
}
    
function mapStateToProps(store) {

    return {
        message: store.message,
        restraurant_customer_chat : store.restraurant_customer_chat,
    };
}

const messageList = connect(mapStateToProps, mapDispatchToProps)(MessageList);
export default messageList;