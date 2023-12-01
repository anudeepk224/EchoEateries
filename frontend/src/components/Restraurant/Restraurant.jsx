import { Card, Row, Col, Avatar, Rate } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { BACKEND } from '../../Config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'


class Restraurant extends Component {
    constructor(props){
        super(props);
        var filename = props.restraurant.photo.split('public').pop();

        console.log("Props of restraurant are ", props)
        this.state = {
            restrauId : props.restraurant._id,
            name : props.restraurant.restraurant_name,
            description : props.restraurant.description,
            location : props.restraurant.location,
            photo : `${BACKEND}` + filename,
            weekday : props.restraurant.weekdays_timings,
            weekend : props.restraurant.weekend_timings,
            zipcode : props.restraurant.zip_code,
            cusine : props.restraurant.cusine,
            takeout : props.restraurant.takeout,
            delivery : props.restraurant.delivery, 
            dineIn : props.restraurant.dine_in,
            rating : props.restraurant.reviews
        }
    }
    componentDidMount(){
        if(this.props.restraurant.takeout === 'yes')
        {
            this.setState({
                takeout : faCheck
            })
        }
        else{
            this.setState({
                takeout : faTimes
            })
        }
        if(this.props.restraurant.delivery === 'yes')
        {
            this.setState({
                delivery : faCheck
            })
        }
        else{
            this.setState({
                delivery : faTimes
            })
        }
        if(this.props.restraurant.dine_in === 'yes')
        {
            this.setState({
                dineIn : faCheck
            })
        }
        else{
            this.setState({
                dineIn : faTimes
            })
        }
    }
    render() {
        return (
            <div>
                <div>
                    <Link to = {{
                        pathname : "/restraurantDetails",
                        state: {id : this.props.restraurant._id}
                    }}>
                        <Card  style={{ width: "200%", marginTop:"5%", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)" }}>
                            <Row >
                                <Col style={{borderRight : "1px solid lightgrey", paddingRight : "4%"}}>
                                    <Avatar shape = "square" size = {150} src = {this.state.photo} />
                                </Col>
                                <Col style={{marginLeft:"5%"}}>
                                    <Row>
                                        <Col>
                                            <h2 style={{color:"#d32323", fontWeight:"bolder"}}>{this.state.name}</h2>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:"-4%"}}> 
                                        <h5 style={{color:"grey", fontWeight:"bolder", textDecoration:"underline"}}>{this.state.cusine}</h5>
                                    </Row>
                                    <Row style = {{marginTop :"-3%"}}>
                                        <Col>
                                            <Rate disabled allowHalf defaultValue = {this.state.rating} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>Location:</h4>
                                        </Col>
                                        <Col style={{marginLeft:"0%"}}>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>{this.state.location}</h4>
                                        </Col>
                                    </Row>
                                    <Row style = {{width:"200%"}}>
                                        <Col>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>Delivery:</h4>
                                        </Col>
                                        <Col style={{marginLeft:"0%"}}>
                                            <FontAwesomeIcon style={{color:"green", fontWeight:"bolder"}} icon={this.state.delivery}></FontAwesomeIcon>
                                        </Col>
                                        <Col style={{marginLeft:"2%"}}>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>Takeout:</h4>
                                        </Col>
                                        <Col style={{marginLeft:"0%"}}>
                                            <FontAwesomeIcon style={{color:"green", fontWeight:"bolder"}} icon={this.state.takeout}></FontAwesomeIcon>
                                        </Col>
                                        <Col style={{marginLeft:"2%"}}>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>Dine In:</h4>
                                        </Col>
                                        <Col style={{marginLeft:"0%"}}>
                                            <FontAwesomeIcon style={{color:"green", fontWeight:"bolder"}} icon={this.state.dineIn}></FontAwesomeIcon>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>Description:</h4>
                                        </Col>
                                        <Col>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>{this.state.description}</h4>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            
                        </Card>
                    </Link>    
                </div>
            </div>
        )
    }
}
export default Restraurant;