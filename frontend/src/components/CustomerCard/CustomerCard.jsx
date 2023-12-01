import { Card } from 'antd'
import { Button } from 'react-bootstrap'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class CustomerCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : this.props.user.first_name + " " + this.props.user.last_name
        }
    }
    render() {
        return (
            <div>
                <div style = {{marginTop:"2%"}}>
                    <Card title = {this.state.name} style={{boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}} actions = {[
                        <Button style = {{width : "50%", color : "white", backgroundColor: "#d32323", bordered : "false"}}><Link style = {{color : "white"}} to = {{
                            pathname : "/viewCustomerProfile",
                            state : {id : this.props.user._id,
                                     source : this.props.source   }
                        }}>View Customer Profile</Link></Button>
                    ]}>
                        <ul style = {{listStyleType : 'none'}}>
                            <li>
                                <h3>Email : {this.props.user.email}</h3>
                            </li>
                            <li>
                                <h3>Phone number : {this.props.user.phone_number}</h3>
                            </li>
                            {/* <li>
                                <h3>Address : {this.props.user.address}</h3>
                            </li>
                            <li>
                                <h3>City : {this.props.user.city}</h3>
                            </li> */}
                        </ul>
                    </Card>
                </div>
            </div>
        )
    }
}
export default CustomerCard;