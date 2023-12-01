import { Button, Checkbox, notification } from 'antd'
import Axios from 'axios';
import React, { Component } from 'react'
import { BACKEND } from '../../Config';
import './Filter.css'
import { connect } from "react-redux";
import { getRestraurant } from '../../js/actions';

class Filter extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            neighborhoods : []
        }
        if(this.props.restraurants)
        {
            this.getRestraurants();
        }
        else 
        {
            this.props.getRestraurant();
        }
    }
    componentWillReceiveProps(){
        if(this.props.restraurants)
        {
            this.getRestraurants();
        }
    }
    getRestraurants = () => {
        var neighborhoods = [];
        this.props.restraurants.map(i => {
            neighborhoods.push(i.neighborhood)
        })
        neighborhoods = [...new Set(neighborhoods)]
        this.setState({
            neighborhoods : neighborhoods
        })
        // Axios.get(`${BACKEND}/getAllRestraurants`).then(response => {
        //     if(response.status === 200)
        //     {
        //         var neighborhoods = [];
        //         response.data.map(i => {
        //             neighborhoods.push(i.neighborhood)
        //         })
        //         neighborhoods = [...new Set(neighborhoods)]
        //         this.setState({
        //             neighborhoods : neighborhoods
        //         })
        //     }
        // }).catch(err => {
        //     if(err)
        //     {
        //         notification["error"]({
        //             message: 'Server Sider error',
        //             description:
        //               'Please try again in few minutes',
        //           });
        //     }
        // })
    }
    applyFilter = () => {
        var dineIn = document.getElementById("dineIn").checked;
        var takeOut = document.getElementById("takeOut").checked;
        var delivery = document.getElementById("delivery").checked;
        var filter = {
            dineIn : (document.getElementById("dineIn").checked) ? 'yes' : 'no',
            takeOut : (document.getElementById("takeOut").checked) ? 'yes' : 'no',
            delivery : (document.getElementById("delivery").checked) ? 'yes' : 'no'
        }
        var neighborhoods = [];
        this.state.neighborhoods.map(i => {
            if(document.getElementById(i).checked)
            {
                neighborhoods.push(i);
            }
        })
        this.props.callBackForFinalFilter(filter, neighborhoods)
    }
    render() {
        return (
            <div style = {{marginTop:"10%"}}>
                <div> 
                    <ul style = {{listStyleType : 'none'}}>
                        <li>
                            <div>
                                <h3 className="deliveryTitle">Delivery Filter: </h3>
                                <ul className="deliveryList">
                                    <li><Checkbox id="dineIn" >Dine In</Checkbox></li>
                                    <li><Checkbox id="takeOut" >Take Out</Checkbox></li>
                                    <li><Checkbox id="delivery" >Delivery</Checkbox></li>
                                </ul>
                            </div>
                        </li>
                        <li style = {{marginTop:"20%"}}>
                            <div>
                                <h3 className="deliveryTitle">Neighborhood Filter: </h3>
                                <ul className = "deliveryList" style = {{listStyleType : "none"}}>
                                    {this.state.neighborhoods.map(i => {
                                        return(
                                            <li>
                                                <Checkbox  id = {i}>{i}</Checkbox>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </li>
                        <li style = {{marginTop : '10%'}}>
                            <Button onClick = {this.applyFilter} style = {{width : '100%'}}>ApplyFilter</Button>
                        </li>    
                    </ul>
                </div>
            </div>
        )
    }
}
// export default Filter;
function mapDispatchToProps(dispatch) {
    return {
        getRestraurant : user => dispatch(getRestraurant(user))
        // get_customer_restraurant_details: user => dispatch(get_customer_restraurant_details(user)),
        // get_customer_restraurant_dishes : user => dispatch(get_customer_restraurant_dishes(user)),
        // get_customer_restraurant_images : user => dispatch(get_customer_restraurant_images(user)),
        // insert_review : user => dispatch(insert_review(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
        restraurants : store.restraurants,
        message : store.message,
    };
  }
 
  const filter = connect(mapStateToProps, mapDispatchToProps)(Filter);
  export default filter;