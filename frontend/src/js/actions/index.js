import { CUSTOMER_LOGIN, CUSTOMER_PROFILE, CUSTOMER_SIGNUP, UPDATE_CUSTOMER, LOGOUT_CUSTOMER, GET_RESTRAURANT, SEARCH_RESTRAURANT, FILTER_DELIVERY_RESTRAURANT, FILTER_NEIGHORHOOD_RESTRAURANT, FINAL_FILTER, CUSTOMRE_ORDERS, FILTER_CUSTOMER_ORDERS, CUSTOMER_EVENTS, SEARCH_CUSTOMER_EVENTS, CUSTOMER_REGISTERED_EVENTS, CUSTOMER_REVIEWS, USER_CART_DETAILS, GET_CUSTOMER_RESTRAURANT_DETAILS, GET_CUSTOMER_RESTRAURANT_DISHES, DELETE_CART_ITEM, PLACE_ORDER, GET_CUSTOMER_CURRENT_DISH_DETAILS, SET_CART_ITEM_QUANTITY, GET_CURRENT_CART_ITEM_DETAILS, REGISTER_FOR_AN_EVENT, ADD_ITEM_TO_CART, GET_CUSTOMER_RESTRAURANT_IMAGES, UPDATE_RESTRAURANT_PROFILE, UPDATE_USER_PHOTO, GET_CUSTOMER_CHATS, GET_ALL_CUSTOMERS, FOLLOW_CUSTOMER, SEARCH_CUSTOMER, GET_CUSTOMER_FOLLOWERS, GET_CUSTOMER_LOCATION_FILTER } from '../constants/action-types'
import axios from 'axios';
import { BACKEND } from '../../Config';
import {Input, Button, notification} from 'antd';
import { responsiveMap } from 'antd/lib/_util/responsiveObserve';
import cookie from 'react-cookies';

export function customerLogin(payload){
    let data = {};
    return(dispatch)=>{
        axios.defaults.withCredentials = true;
        axios.post(`${BACKEND}/signIn`, payload).then(response => {
            if(response.status === 200)
            {
                notification["success"]({
                    message: 'User SignedIn',
                    description:
                      'User successfully signed in',
                  });
                  window.sessionStorage.setItem("isLoggedIn", true)
                  window.sessionStorage.setItem("UserId",response.data._id);
                  window.sessionStorage.setItem("jwtToken", response.data.token);
                  delete response.data.token;
                  data ={
                    message : "Successfully logged in",
                    user_id : response.data._id,
                    user : response.data,
                    authFlag : true
                  }
                  console.log("Data is ----------------", data);
            }
            else if(response.status === 209)
            {
                notification["error"]({
                    message: 'Invalid credentials',
                    description:
                        'Please enter valid Password',
                        user_id : -1
                    });
                data ={
                    message : "Please check your credentials",
                    user_id : -1,
                    authFlag : false
                  }
                
            }
            else if(response.status === 207)
            {
                notification["error"]({
                    message: 'Invalid credentials',
                    description:
                        'User doesnt exist',
                        user_id : -1
                    });
                data ={
                    message : "Please check your credentials",
                    user_id : -1, 
                    authFlag : false
                  }
                
            }
        
            dispatch({ type: CUSTOMER_LOGIN, data })
        })
        .catch(err => {
            notification["error"]({
                message: 'Invalid credentials ',
                description:
                  'Please enter valid Email and Password in server',
                  user_id : -1
              });
              data ={
                msg : "Please check your credentials",
              }
            // dispatch({ type: CUSTOMER_LOGIN, data })
        });
    }
} 

export function getCustomerProfile (payload) {
    let data = {};
    return(dispatch)=>{
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getUserDetails`, payload).then(response => {
            if(response.status === 200)
            {
                // window.sessionStorage.setItem('Name', response.data.first_name + " " + response.data.last_name.charAt(0) + ".")
                if(response.data.profile_photo === null)
                {
                }
                console.log("User is ", response.data)
                Object.keys(response.data).forEach(function(key) {
                    if(response.data[key] === null || response.data[key] === "null") {
                        response.data[key] = '';
                    }
                })
                if(response.data.city === "null")
                {
                    response.data.city = "Please let us know where ar you?"
                    
                }
                if(response.data.state === "null")
                {
                    response.data.state = " "
                }
                data = {
                    user : response.data,
                    // name : response.data.first_name + " " + response.data.last_name.charAt(0) + ".",
                    // first_name : response.data.first_name,
                    // last_name : response.data.last_name,
                    // nick_name : response.data.nick_name,
                    // birthday : response.data.birth_day,
                    // headline : response.data.headline,
                    // adress: response.data.address,
                    // city : response.data.city,
                    // yelping_since : response.data.yelping_since,
                    // things_i_love : response.data.things_i_love,
                    // location : response.data.city + ", " + response.data.state,
                    // state : response.data.state,
                    // country : response.data.country,
                    // zip_code : response.data.zip_code,
                    // favourites : response.data.favourites,
                    // blog : response.data.blog,
                    // profile_photo : `${BACKEND}/getProfileImage/` +  window.sessionStorage.getItem("UserId"),
                    // email : response.data.email,
                    // phoneNumber : response.data.phone_number,
                    // msg : "Fetched User Info",
                    // address : response.data.address,
                    authFlag : true,
                    userUpdatedFlag : false,
                    message : "Customer Info fetched"
                }
                dispatch({ type: CUSTOMER_PROFILE, data })
            }
        }).catch(err => {
            if(err)
            {
                console.log(err)
                notification["error"]({
                    message: 'Server Sider errorrrrrrr',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }
}

export function resgisterUser(payload){
    let data = {}
    
    return(dispatch) => {
        axios.defaults.withCredentials = true
            axios.post(`${BACKEND}/registerUser`, payload).then(response => {
                if(response.status === 299)
                {
                    data = {
                        message : "User with same email exists"
                    }
                    notification["error"]({
                        message: 'EmailId exists',
                        description:
                          'User with same EmailId is registered',
                      });
                }
                else if(response.status === 200)
                {
                    data = {
                        message : "User Registered"
                    }
                    notification["success"]({
                        message: 'User Registered',
                        description:
                          'User successfully registered',
                      });
                }
                dispatch({type : CUSTOMER_SIGNUP, data})
            }).catch(err => {
            });
    }
}

export function updateCustomerProfile(payload){
    let data = {}
    return(dispatch) => {
        var location = payload.address + ", " + payload.city + ", " + payload.state + "-" + payload.zip_code
        axios.defaults.withCredentials = false;
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ location +"&key=AIzaSyDEoT0HSUWGh-5SZhH0QE7YzRiokTDFa4I").then(response => {
            payload.coords = response.data.results[0].geometry.location
            axios.defaults.withCredentials = true;
            console.log("Final payload is!!!!!!!~~~~~~~~~~~~~~~~~~~~~", payload)
            axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
            axios.post(`${BACKEND}/updateUserInfo`, payload).then(response => {
                if(response.status === 200)
                {
                    data = {
                        message : "User Info Updated",
                        userUpdatedFlag : true
                    }
                    dispatch({type : UPDATE_CUSTOMER, data});
                    // window.location.href = '/customerProfile'
                }
            }).catch()
        })
        
    }
}

export function customerLogOut(){
    let data = {}
    return(dispatch) => {
        cookie.remove('cookie', { path: '/' })
        sessionStorage.clear();
        data = {
            message : "User Logged out",
            authFlag : false,
            fullname : "",
            first_name : "",
            last_name : "",
            nick_name : "",
            birthday : "",
            headline : "",
            city : "",
            // yelping_since : "",
            things_i_love : "",
            location : "",
            state: "",
            country : "",
            zip_code : "",
            favourites : "",
            blog : "",
            profile_photo : "",
            email : "",
            phoneNumber : "",

        }
        dispatch({type: LOGOUT_CUSTOMER, data})
    }
}

export function getRestraurant(){
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.get(`${BACKEND}/getAllRestraurants`).then(response => {
            if(response.status === 200)
            {
                data = {
                    restraurants : response.data,
                    message : "Fetched all the restraurants"
                }
                dispatch({type : GET_RESTRAURANT, data})
            }
        }).catch(err => {
            if(err)
            {
                // notification["error"]({
                //     message: 'Server Sider errorrrr',
                //     description:
                //       'Please try again in few minutes',
                //   });
            }
        })
    }
}

export function searchRestraurants(payload){
    let data = {}
    return (dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/search`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    restraurants : response.data,
                    message : "Restraurants searched"
                }
            }
            dispatch({type : SEARCH_RESTRAURANT, data})
        }).catch();
    }
}

export function getDeliveryFilterRestraurants(payload){
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getDeliveryFilterRestraurants`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    restraurants : response.data
                }
            }
            dispatch({type : FILTER_DELIVERY_RESTRAURANT, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        }); 
    }
} 

export function getNeighorhoodFilterRestraurants(payload){
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getNeighorhoodRestraurants`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    restraurants : response.data
                }
            }
            dispatch({type : FILTER_NEIGHORHOOD_RESTRAURANT, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        }); 
    }
} 

export function finalFilter(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/finalFilter`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    restraurants : response.data,
                    message : "Filter has been applied"
                }
            }
        dispatch({type : FINAL_FILTER, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }
}
export function getCustomerOrders(payload)
{
    console.log("Finction has been called")
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getUserOrders`, payload).then(response => {
            if(response.status === 200)
            {
                var result = []
                var count = 0
                for(let i in response.data)
                {
                    let order = response.data[i];
                    var restraurant = {
                        RestrauId : order.restraurant_id
                    }

                    let temp = async () => {
                        const restrauResponse = await axios.post(`${BACKEND}/getRestrauDetails`, restraurant)
                        return restrauResponse;                   
                    }
                    temp().then(restraurantResponse=>{
                        if(restraurantResponse.status === 200)
                        {
                            var items = order.items.split(',')
                            // console.log("Order in indexz is ---------------", order.items)
                            var dishes = []
                            for(let j in items)
                            {
                                // console.log("Executing inner loop", j)
                                let temp1 = async () => {
                                    var cart = {
                                        cart_id : items[j]
                                    }
                                    const itemResponse = await axios.post(`${BACKEND}/getCartItemDetails`, cart)
                                    return itemResponse;
                                }
                                temp1().then(itemResponse => {
                                    if(itemResponse.status === 200)
                                    {
                                        // console.log("Item response ", j, "is", itemResponse.data)
                                        let temp2 = async () => {
                                            var dish = {
                                                dish_id : itemResponse.data.dish_id
                                            }
                                            const dishResponse = await axios.post(`${BACKEND}/getDishDetails`, dish)
                                            return dishResponse;
                                        }
                                        temp2().then(dishResponse => {
                                            // console.log("dish response is", dishResponse.data)
                                            if(dishResponse.status === 200)
                                            {
                                                let dishQuantity = {
                                                    dishName : dishResponse.data.dish_name,
                                                    quantity : itemResponse.data.quantity
                                                }
                                                dishes.push(dishQuantity);
                                                if(dishes.length === items.length)
                                                {
                                                    // console.log("dishes areeee", dishes)
                                                    order = {...order, restraurant : restraurantResponse.data, dishes : dishes}
                                                    // console.log("FInal order is", order)
                                                    result.push(order)
                                                    count++;
                                                    if(count === response.data.length)
                                                    {
                                                        
                                                        data = { 
                                                            customer_orders : result,
                                                            message : "Customer Orders updated"
                                                        }
                                                        console.log("dishpatching order", data)
                                                        dispatch({type : CUSTOMRE_ORDERS, data})
                                                    }
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                            
                        }        
                    })
                }     
                
            }
           
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }
}
export function filter_customer_orders(payload)
{
    console.log("Trying to fitler customer orders");
    let data = {}
    return(dispatch) =>{
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/filterCustomerOrders`, payload).then(response => {
            if(response.status === 200)
            {
                var result = []
                var count = 0
                for(let i in response.data)
                {
                    let order = response.data[i];
                    var restraurant = {
                        RestrauId : order.restraurant_id
                    }

                    let temp = async () => {
                        const restrauResponse = await axios.post(`${BACKEND}/getRestrauDetails`, restraurant)
                        return restrauResponse;                   
                    }
                    temp().then(restraurantResponse=>{
                        if(restraurantResponse.status === 200)
                        {
                            var items = order.items.split(',')
                            // console.log("Order in indexz is ---------------", order.items)
                            var dishes = []
                            for(let j in items)
                            {
                                // console.log("Executing inner loop", j)
                                let temp1 = async () => {
                                    var cart = {
                                        cart_id : items[j]
                                    }
                                    const itemResponse = await axios.post(`${BACKEND}/getCartItemDetails`, cart)
                                    return itemResponse;
                                }
                                temp1().then(itemResponse => {
                                    if(itemResponse.status === 200)
                                    {
                                        // console.log("Item response ", j, "is", itemResponse.data)
                                        let temp2 = async () => {
                                            var dish = {
                                                dish_id : itemResponse.data.dish_id
                                            }
                                            const dishResponse = await axios.post(`${BACKEND}/getDishDetails`, dish)
                                            return dishResponse;
                                        }
                                        temp2().then(dishResponse => {
                                            // console.log("dish response is", dishResponse.data)
                                            if(dishResponse.status === 200)
                                            {
                                                let dishQuantity = {
                                                    dishName : dishResponse.data.dish_name,
                                                    quantity : itemResponse.data.quantity
                                                }
                                                dishes.push(dishQuantity);
                                                if(dishes.length === items.length)
                                                {
                                                    // console.log("dishes areeee", dishes)
                                                    order = {...order, restraurant : restraurantResponse.data, dishes : dishes}
                                                    // console.log("FInal order is", order)
                                                    result.push(order)
                                                    count++;
                                                    if(count === response.data.length)
                                                    {
                                                        
                                                        data = { 
                                                            customer_orders : result,
                                                            message : "Customer Orders updated"
                                                        }
                                                        console.log("dishpatching order", data)
                                                        dispatch({type : FILTER_CUSTOMER_ORDERS, data})
                                                    }
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                            
                        }        
                    })
                }     
                
            }
           
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }   
}
export function get_customer_events()
{
    let data = {}
    return(dispatch) =>{
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getEvents`).then(response => {
            if(response.status === 200)
            {   
                response.data.sort((a, b) => (a.event_date > b.event_date) ? 1 : (a.event_date === b.event_date) ? ((a.event_time > b.event_time) ? 1 : -1) : -1 )
                data = {
                    customer_events : response.data,
                    message : "Customer Events Fetched"
                }
            }
            dispatch({type : CUSTOMER_EVENTS, data})
        }).catch()
    }   
}
export function search_customer_events(payload)
{
    let data = {}
    return(dispatch) =>{
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/searchEvents`, payload).then(response => {
            if(response.status === 200)
            {   
                response.data.sort((a, b) => (a.event_date > b.event_date) ? 1 : (a.event_date === b.event_date) ? ((a.event_time > b.event_time) ? 1 : -1) : -1 )
                data = {
                    customer_events : response.data,
                    message : "Customer events searched"
                }
               
            }
            dispatch({type : SEARCH_CUSTOMER_EVENTS, data})
        }).catch()
    }   
}
export function get_customer_registered_events(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getUserEvents`, payload).then(response => {
            if(response.status === 200)
            {
                var result = []
                for(let i in response.data)
                {
                    let event = response.data[i]
                    var restraurant = {
                        RestrauId : event.restraurant_id
                    }
                    let temp = async () => {
                        const restrauResponse = await axios.post(`${BACKEND}/getRestrauDetails`, restraurant)
                        return restrauResponse;                   
                    }
                    temp().then(restraurantResponse=>{
                        if(restraurantResponse.status === 200)
                        {
                            event = {...event, restraurant : restraurantResponse.data}
                            result.push(event)
                            if(result.length === response.data.length)
                            {
                                data = {
                                    customer_registered_events : result,
                                    message : "Customer registered events fetched"
                                }
                                dispatch({type : CUSTOMER_REGISTERED_EVENTS, data})
                            }
                        }        
                    })
                }
               
            }
            
        })
    }
}
export function get_customer_reviews(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getUserReviews`, payload).then(response => {
            if(response.status === 200)
            {
                var result = []
                for(let i in response.data)
                {
                    let review = response.data[i];
                    var restraurant = {
                        RestrauId : review.restraurant_id
                    }
                    let temp = async () => {
                        const restrauResponse = await axios.post(`${BACKEND}/getRestrauDetails`, restraurant)
                        return restrauResponse;
                    }
                    temp().then(restrauResponse => {
                        if(restrauResponse.status === 200)
                        {
                            review = {...review, restraurant : restrauResponse.data}
                            result.push(review)
                            if(result.length === response.data.length)
                            {
                                data = {
                                    customer_reviews : result,
                                    message : "Customer Reviews Fetched"
                                }
                                dispatch({type: CUSTOMER_REVIEWS, data})
                            }
                        }
                    })
                }
                
            }
            
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }
}
export function get_user_cart_details()
{
    let data = {}
    return(dispatch) => {
        var user = {
            user_id : window.sessionStorage.getItem("UserId")
        }
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getUserCartDetails`, user).then(response => {
            if(response.status === 200)
            {
                if(response.data.length > 0)
                {
                    window.sessionStorage.setItem("OrderRestrauId", response.data[0].restraurant_id)
                }
                else{
                    window.sessionStorage.removeItem("OrderRestrauId")
                }
                var count = 0;
                var result =[];
                for(let i in response.data)
                {
                    let item = response.data[i];
                    var dish = {
                        dish_id : item.dish_id
                    }
                    let temp = async() => {
                        const dishResponse = await axios.post(`${BACKEND}/getDishDetails`, dish)
                        return dishResponse
                    }
                    temp().then(dishResponse => {
                        if(dishResponse.status === 200)
                        {
                            item = {...item, dish : dishResponse.data}
                            result.push(item)
                            if(result.length === response.data.length)
                            {
                                data = {
                                    cartItems : result,
                                    message : "User cart details fetched"
                                }
                                dispatch({type : USER_CART_DETAILS, data})
                            }
                        }
                    })
                }
                
                
                
            }
            
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }
}
export function get_customer_restraurant_details(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getRestrauDetails`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    customer_restraurant : response.data,
                    message : "Customer side Restraurant Details fetched"
                }
            }
            dispatch({type : GET_CUSTOMER_RESTRAURANT_DETAILS, data})
        })
    }
}
export function get_customer_restraurant_dishes(payload)
{
    let data = {}
    return(dispatch) =>{
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getDishes`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    customer_restraurant_dishes : response.data,
                    message : "Customer side dishes fetched"
                }
            }
            dispatch({type : GET_CUSTOMER_RESTRAURANT_DISHES, data})
        })
    }
   
}
export function delete_cart_item(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/deleteCartItem`, payload).then(response => {
            if(response.status === 200)
            {
                
                data = {
                    message : "Cart Item Deleted"
                }
            }
            dispatch({type : DELETE_CART_ITEM, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }
}
export function place_order(payload)
{
    console.log("Order is", payload)
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/placeOrder`, payload).then(response => {
            if(response.status === 200)
            {
                notification["success"]({
                    message: 'Order Placed',
                    description: 'Order placed successfully',
                });
                window.sessionStorage.removeItem("OrderRestrauId")
                data = {
                    message : "Order Placed"
                }
            }
            dispatch({type : PLACE_ORDER, data})
        })
    }
}
export function get_customer_current_dish_details(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getDishDetails`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    customer_current_dish_details : response.data,
                    message : "Customer Current dish details fetched"
                }
            }
            dispatch({type : GET_CUSTOMER_CURRENT_DISH_DETAILS, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }
}
export function set_cart_item_quantity(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/setCartItemQuantity`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Cart item quantity updated"
                }
            }
            dispatch({type : SET_CART_ITEM_QUANTITY, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }
}
export function get_cart_item_details(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getCartItemDetails`, payload).then(reponse => {
            if(reponse.status === 200)
            {
                data = {
                    current_cart_item_details : reponse.data,
                    message : "Current cart item details fetched"
                }
            }
            dispatch({type : GET_CURRENT_CART_ITEM_DETAILS, data})
        })
    }
}
export function register_for_an_event(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/registerUserForEvent`, payload).then(response => {
            if(response.status === 299)
            {
                notification["error"]({
                    message: 'Already Registered',
                    description:
                      'Customer has already registered for the event',
                  });
                  data = {
                      message : "Customer has already registered for this event"
                  }
            }
            if(response.status === 200)
            {
                setTimeout(() =>{
                    notification["success"]({
                        message: 'Event added',
                        description:
                          'Registered to event successfully',
                      });
                }, 1500)
                data = {
                    message : "Register to event successfully"
                }
            }
            dispatch({type : REGISTER_FOR_AN_EVENT, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }
}
export function add_item_to_cart(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/addItemToCart`, payload).then(response => {
            if(response.status === 200)
            {
                    notification["success"]({
                        message: 'Item Added',
                        description:
                        'Item successfully added to the cart',
                    });
                // window.sessionStorage.setItem("OrderRestrauId", this.state.restraurant_id)
                data = {
                    message : "Item Added to the cart"
                }
            }
            dispatch({type : ADD_ITEM_TO_CART, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider errorrrrr',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }
}
export function get_customer_restraurant_images(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getRestraurantImages`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Restraurant Images fetched",
                    customer_restraurant_images : response.data
                }
            }
            dispatch({type : GET_CUSTOMER_RESTRAURANT_IMAGES, data})
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider errorrrrr',
                    description:
                      'Please try again in few minutes',
                  });
            }
        })
    }
}
export function upload_user_photo(payload)
{
    let data = {}
    return(dispatch) => {
        axios.post(`${BACKEND}/uploadPhoto`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Photo Uploaded"
                }
            }
            dispatch({
                type : UPDATE_USER_PHOTO,
                data
            })
        }).catch(err => {
            if(err)
            {
                notification["error"]({
                    message: 'Server Sider error',
                    description:
                    'Please try again in few minutes',
                });
            }
        });
    }
}
export function get_customer_chats(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getCustomerChats`, payload).then(response => {
            if(response.status === 200)
            {
                var result = [];
                for(let i = 0; i < response.data.length; i++)
                {
                    let chat = response.data[i];
                    let restraurant = {
                        RestrauId : chat.restraurant_id
                    }
                    let temp = async () => {
                        const restrauResponse = await axios.post(`${BACKEND}/getRestrauDetails`, restraurant)
                        return restrauResponse;                   
                    }
                    temp().then(restraurantResponse=>{
                        if(restraurantResponse.status === 200)
                        {
                            chat = {...chat, restraurant : restraurantResponse.data}
                            result.push(chat);
                            if(result.length === response.data.length)
                            {
                                data = {
                                    message : "Fetched customer chats",
                                    customer_chats : result
                                }
                                dispatch({type : GET_CUSTOMER_CHATS, data});
                            }
                        }        
                    })

                }
            }
        })
    }
}
export function get_all_customers(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.get(`${BACKEND}/getAllCustomers`).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Fetched all customers",
                    customers : response.data
                }
                dispatch({type : GET_ALL_CUSTOMERS, data});
            }
        })
    }
}
export function follow_customer(payload)
{
    let data = {};
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/followCustomer`, payload).then(response => {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~ response is ~~~~~~~~~~~~~~~~~~~~~~~~~", response)
            if(response.status === 200)
            {
                notification["success"]({
                    message: 'Success',
                    description:
                      'Customer Followed',
                  });
                data = {
                    message : "Customer Followed"
                }
                dispatch({type : FOLLOW_CUSTOMER, data});
            }
            else if(response.status === 299)
            {
                notification["error"]({
                    message: 'Error',
                    description:
                      'Already following the customer',
                });
                data = {
                    message : "Already Following the customer"
                }
                dispatch({type : FOLLOW_CUSTOMER, data});
            }
        })
    }
}
export function search_customer(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/searchCustomer`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Customers Searched",
                    customers : response.data
                }
                dispatch({type : SEARCH_CUSTOMER, data});
            }
        })
    }
}
export function get_customer_followers(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getCustomerFollowers`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Following fetched",
                    customers : response.data
                }
                dispatch({type : GET_CUSTOMER_FOLLOWERS, data});
            }
        })
    }
}
export function get_customet_location_filter(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getCustometLocationFilter`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Customers fetched via location",
                    customers : response.data
                }
                dispatch({type : GET_CUSTOMER_LOCATION_FILTER, data});
            }
        })
    }
}