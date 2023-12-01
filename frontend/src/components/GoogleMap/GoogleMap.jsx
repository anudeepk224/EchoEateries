import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faMapMarker, faMapMarkerAlt, faStreetView } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { BACKEND } from '../../Config';
import { connect } from "react-redux";
import { getCustomerProfile, getRestraurant } from '../../js/actions';
import { notification } from 'antd';
import { Redirect } from 'react-router-dom';
const AnyReactComponent = ({ text }) => <div>{text}</div>;
class GoogleMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            location : [],
            user_location : ""
        }
        // this.getCoordinates();
        if(window.sessionStorage.getItem("isLoggedIn") === 'true')
        {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~logged in ")
            if(this.props.user)
            {
                console.log("Lat and lng of users are --------", this.props.user.coords)
            }
            else
            {
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~calling user in ")
                var user = {
                    user_id : window.sessionStorage.getItem("UserId")
                }
                this.props.getCustomerProfile(user);
            }
        }    
    }
    componentWillReceiveProps()
    {
        setTimeout(() => {
            if(this.props.user)
            {
                this.setState({
                    user_location : this.props.user.coords
                })
            }
        },);
    }
    componentWillReceiveProps() {
       setTimeout(() => {
           if(this.props.restraurants)
           {
               let data = [];
               this.props.restraurants.map(restraurant => {
                    let myJson = {
                        lat : restraurant.coords.lat,
                        lng : restraurant.coords.lng,
                        title : restraurant.restraurant_name
                    }
                    data.push(myJson);
               })
               this.setState({
                   location : data
               })
           }
       })
    }
    static defaultProps = {
        center: {
          lat: 37.336020,
          lng: -121.908290
        },
        zoom: 15
      };
    render() {
        var redirectVar = null;
        var lat = null;
        var lng = null;
        var temp = null;
        if(!window.sessionStorage.getItem("isLoggedIn"))
        {
            console.log("Hi inside redirect")
            redirectVar = <Redirect to = "/landingPage"></Redirect>
        }
        
        return (
            <div>
                {redirectVar}
                <div style={{ height: '100vh', width: '190%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyDEoT0HSUWGh-5SZhH0QE7YzRiokTDFa4I" }}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                        >
                        <AnyReactComponent
                            lat = {this.state.user_location.lat}
                            lat = {this.state.user_location.lng}
                            title = "HEYY"
                            text = {
                                <div title = "hey">
                                    <FontAwesomeIcon title = "Your Location" style ={{fontSize : "300%", color :"red"}} icon = {faMapMarkerAlt} />
                                </div>
                            }
                        />
                        {this.state.location.map(i => {
                            return(
                                <AnyReactComponent 
                                    lat = {i.lat}
                                    lng = {i.lng}
                                    id = {i}
                                    // title = {i.title}
                                    text = {
                                        <div>
                                            <FontAwesomeIcon title = {i.title} style ={{fontSize : "300%", color :"blue"}} icon = {faMapMarkerAlt} />
                                        </div>
                                    }
                                />
                            )
                        })}
                    </GoogleMapReact>
                </div>    
            </div>
        )
    }
}
// export default GoogleMap;
function mapDispatchToProps(dispatch) {
    return {
      getRestraurant: user => dispatch(getRestraurant()),
      getCustomerProfile : user => dispatch(getCustomerProfile(user))
    };
  }
  
  function mapStateToProps(store) {
    return {
      
    //   user_id : store.user_id
       restraurants : store.restraurants,
       user : store.user
    };
  }
 
  const googleMap = connect(mapStateToProps, mapDispatchToProps)(GoogleMap);
  export default googleMap;

