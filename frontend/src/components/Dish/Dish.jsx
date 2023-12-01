
import React, { Component } from 'react'
import {Row, Col, Card, Avatar, Button} from 'antd';
import { BACKEND } from '../../Config';
import {Link} from "react-router-dom"

class Dish extends Component {
    constructor(props)
    {
        super(props);
        var filename = props.dish.photo.split('public').pop();
        this.state = {
            id : props.dish._id,
            name : props.dish.dish_name,
            type : props.dish.dish_type,
            price : props.dish.price,
            description : props.dish.description,
            image : `${BACKEND}` + filename,
            source : "",
        }
       
    }
   
    componentDidMount() {
        this.setState({
            source : this.props.source
        })
    }
    componentWillReceiveProps(){
        setTimeout(() => {
            
            this.state = {
                id : this.props.dish._id,
                name : this.props.dish.dish_name,
                type : this.props.dish.dish_type,
                price : this.props.dish.price,
                description : this.props.dish.description,
                image : `${BACKEND}/getDishImage/` + this.props.dish._id,
                source : "",
            }
        })
    }
    render() {
        return (
            <div>
                <div style = {{marginTop:"2%"}}>
                    <Link  id="openDish" to = {{ 
                                pathname: "/addDish", 
                                state: {id : this.state.id}
                               }}>
                        <Card title={this.state.name}  id="dishcard" style={{ width: "200%", color:"#d32323", boxShadow : "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                            <Row>
                                <Col style={{paddingRight:"5%"}}>
                                    <Avatar  size={100} src = {this.state.image} shape='circle'></Avatar>
                                </Col>
                                <Col style={{borderLeft:"1px solid lightgrey", paddingLeft:"5%"}}>
                                    <Row>
                                        <Col>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>Type:</h4>
                                        </Col>
                                        <Col style={{marginLeft:"2%"}}>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>{this.state.type}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>Ingredients:</h4>
                                        </Col>
                                        <Col style={{marginLeft:"2%"}}>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>{this.props.dish.dish_ingredients}</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>Price:</h4>
                                        </Col>
                                        <Col style={{marginLeft:"2%"}}>
                                            <h4 style={{color:"grey", fontWeight:"bolder"}}>${this.state.price}</h4>
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
                                <Col>
                                </Col>
                            </Row>
                        </Card>
                    </Link>
                </div>
            </div>
        )
    }
}
export default Dish;
