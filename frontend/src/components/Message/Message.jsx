import React, { Component } from 'react'
import "./Message.css"
class Message extends Component {
    constructor(props)
    {
        super(props);
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            console.log("Props inside message is", this.props);
        }, );
    }
    render() {
        console.log("Props inside message is", this.props);
        return (
            <div className={[
                'message',
                `${this.props.isMine ? 'mine' : ''}`,
                // `${startsSequence ? 'start' : ''}`,
                // `${endsSequence ? 'end' : ''}`
              ].join(' ')}>
                {
                //   showTimestamp &&
                    <div>
                      {/* { friendlyTimestamp } */}
                    </div>
                }
        
                <div className="bubble-container">
                  <div className="bubble">
                    { this.props.text.message }
                  </div>
                </div>
            </div>
        )
    }
}
export default Message;