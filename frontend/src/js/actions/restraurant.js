import { notification } from 'antd';
import axios from 'axios';
import { BACKEND } from '../../Config';
import { ADD_CHAT, ADD_DISH, ADD_EVENT, FILTER_RESTRAURANT_ORDERS, GET_CHAT, GET_CURRENT_DISH_DETAILS, GET_CUSTOMER_RESTRAURANT_DISHES, GET_RESTRAURANT_CHATS, GET_RESTRAURANT_CUSTOMER_DETAILS, GET_RESTRAURANT_DETAILS, GET_RESTRAURANT_DISHES, GET_RESTRAURANT_EVENTS, GET_RESTRAURANT_ORDERS, GET_RESTRAURANT_REVIEWS, GET_USERS_OF_AN_EVENT, INSERT_REVIEW, REGISTER_RESTRAURANT, RESTRAURANT_SIGN_IN, SEND_MESSAGE, UPDATE_DISH, UPDATE_ORDER_STATUS, UPDATE_RESTRAURANT_IMAGES, UPDATE_RESTRAURANT_PHOTO, UPDATE_RESTRAURANT_PROFILE, UPLOAD_DISH_PICTURE } from '../constants/action-types';

export function restraurant_sign_in(payload)
{
    let data = {};
    return(dispatch) => {
        axios.post(`${BACKEND}/restrauSignIn`, payload).then(response => {
            if(response.status === 200)
            {
                notification["success"]({
                    message: 'User SignedIn',
                    description:
                      'User successfully signed in',
                  });
                window.sessionStorage.setItem("RestrauId",response.data._id);
                window.sessionStorage.setItem("RestrauLoggedIn", true)
                window.sessionStorage.setItem("jwtToken", response.data.token);
                // window.location.href='/restrauProfile'
                data = {
                    message : "Restraurant Signed In",
                    restraurant_id : response.data._id
                }
            }
            else if(response.code === 400)
            {

            }
            dispatch({type : RESTRAURANT_SIGN_IN, data})
        }).catch(err => {
            notification["error"]({
                message: 'Invalid credentials',
                description:
                  'Please enter valid Email and Password',
              });
        });
    }
}

export function register_restraurant(payload)
{
    let data = {}
    return(dispatch) => {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ payload.location +"&key=AIzaSyDEoT0HSUWGh-5SZhH0QE7YzRiokTDFa4I").then(response => {
            payload.coords = response.data.results[0].geometry.location
            axios.post(`${BACKEND}/registerRestraurant`, payload).then(response => {
                if(response.status === 299)
                {
                    notification["error"]({
                        message: 'EmailId already in use',
                        description:
                            'A restraurant is registered with this EmailID',
                        });
                        data = {
                        message : "A restraurant is registered with this EmailID"
                    }   
                }
                if(response.status === 200)
                {
                    notification["success"]({
                        message: 'User Registered',
                        description:
                            'User successfully registered',
                        });
                        setTimeout(function(){
                            window.location.href = '/restrauSignIn'
                        }, 500)
                    data = {
                        message : "Restraurant Registered"
                    }                
                }
                dispatch({type : REGISTER_RESTRAURANT, data})
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
        })
        
    }

}

export function get_restraurant_profile(payload)
{
    console.log("Hi in actions")
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getRestrauDetails`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    restraurant : response.data,
                    message : "Restraurant profile fetched"
                }
            }
            dispatch({type : GET_RESTRAURANT_DETAILS, data})
        })
    }
}
export function get_restraurant_dishes(payload)
{
    let data = {}
    console.log("Payload is", payload)
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getDishes`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    restraurant_dishes : response.data,
                    message : "Restraurant dishes fetched"
                }
            }
            dispatch({type : GET_RESTRAURANT_DISHES, data})
        })
    }
}
export function get_current_dish_details(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getDishDetails`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    current_dish_details : response.data,
                    dishUpdatedFlag : false,
                    message : "Current dish details fetched"
                }
            }
            dispatch({type : GET_CURRENT_DISH_DETAILS, data})
        })
    }
}
export function get_restraurant_orders(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getRestraurantOrders`, payload).then(response => {
            if(response.status === 200)
            {
                var result = [];
                var count = 0;
                for(let i in response.data)
                {
                    let order = response.data[i];
                    var user = {
                        UserId : order.user_id
                    }
                    let temp = async () => {
                        const userResponse = await axios.post(`${BACKEND}/getUserDetails`, user)
                        return userResponse;
                    }
                    temp().then(userResponse => {
                        if(userResponse.status === 200)
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
                                                    order = {...order, user : userResponse.data, dishes : dishes}
                                                    // console.log("FInal order is", order)
                                                    result.push(order)
                                                    count++;
                                                    if(count === response.data.length)
                                                    {
                                                        
                                                        data = {
                                                            restraurant_orders : result,
                                                            message : "Restraurant orders fetched"
                                                        }
                                                        console.log("restraurant orders are", data)
                                                        dispatch({type : GET_RESTRAURANT_ORDERS, data})
                                                    }
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                            // order = {...order, user : userResponse.data}
                            // result.push(order)
                            // count++;
                            // if(count === response.data.length)
                            // {
                            //     data = {
                            //         restraurant_orders : result,
                            //         message : "Restraurant orders fetched"
                            //     }
                            //     console.log("restraurant orders are", data)
                            //     dispatch({type : GET_RESTRAURANT_ORDERS, data})
                            // }
                        }
                    })
                }
               
            }
            
        })
    }
}
export function filter_restraurant_orders(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/filterRestraurantOrders`, payload).then(response => {
            if(response.status === 200)
            {
                var result = [];
                var count = 0;
                for(let i in response.data)
                {
                    let order = response.data[i];
                    var user = {
                        UserId : order.user_id
                    }
                    let temp = async () => {
                        const userResponse = await axios.post(`${BACKEND}/getUserDetails`, user)
                        return userResponse;
                    }
                    temp().then(userResponse => {
                        if(userResponse.status === 200)
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
                                                    order = {...order, user : userResponse.data, dishes : dishes}
                                                    // console.log("FInal order is", order)
                                                    result.push(order)
                                                    count++;
                                                    if(count === response.data.length)
                                                    {
                                                        
                                                        data = {
                                                            restraurant_orders : result,
                                                            message : "Restraurant orders fetched"
                                                        }
                                                        console.log("restraurant orders are", data)
                                                        dispatch({type : FILTER_RESTRAURANT_ORDERS, data})
                                                    }
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                            // order = {...order, user : userResponse.data}
                            // result.push(order)
                            // count++;
                            // if(count === response.data.length)
                            // {
                            //     data = {
                            //         restraurant_orders : result,
                            //         message : "Restraurant orders fetched"
                            //     }
                            //     console.log("restraurant orders are", data)
                            //     dispatch({type : GET_RESTRAURANT_ORDERS, data})
                            // }
                        }
                    })
                }
               
            }
            // if(response.status === 200)
            // {
            //     if(response.data.length > 0)
            //     {
            //         var result = []
            //         var count = 0
            //         for(let i in response.data)
            //         {
            //             let order = response.data[i]
            //             var user = {
            //                 UserId : order.user_id
            //             }
            //             let temp = async () => {
            //                 const userResponse = await axios.post(`${BACKEND}/getUserDetails`, user)
            //                 return userResponse;
            //             }
            //             temp().then(userResponse => {
            //                 if(userResponse.status === 200)
            //                 {
            //                     order = {...order, user : userResponse.data}
            //                     result.push(order)
            //                     count++;
            //                     if(count === response.data.length)
            //                     {
            //                         data = {
            //                             restraurant_orders : result,
            //                             message : "Restraurant orders fetched"
            //                         }
            //                         console.log("restraurant orders are", data)
            //                         dispatch({type : FILTER_RESTRAURANT_ORDERS, data})
            //                     }
            //                 }
            //             })
            //         }
            //     }
            //     else{
            //         data = {
            //             restraurant_orders : response.data,
            //             message : "Restraurant orders fetched"
            //         }
            //         dispatch({type : FILTER_RESTRAURANT_ORDERS, data})
            //     }
                
            // }
        })
    }
}
export function get_restraurant_reviews(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getRestraurantReviews`, payload).then(response => {
            if(response.status === 200)
            {
                var result = []
                for(let i in response.data)
                {
                    let review = response.data[i];
                    var customer = {
                        UserId : review.user_id
                    }
                    let temp = async() => {
                        const customerResponse = await axios.post(`${BACKEND}/getUserDetails`, customer);
                        return customerResponse
                    }
                    temp().then(customerResponse => {
                        if(customerResponse.status === 200)
                        {
                            review = {...review, user : customerResponse.data}
                            result.push(review)
                            if(result.length === response.data.length)
                            {
                                data = {
                                    restraurant_reviews : result,
                                    message : "Restraurants reviews have been fetched"
                                }
                                dispatch({type : GET_RESTRAURANT_REVIEWS, data})
                            }
                        }
                    })
                }
                
            }
        })
    }
}
export function get_restraurant_events(payload)
{
    console.log("GEtting evnts", payload)
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getRestraurantEvents`, payload).then(response => {
           
            if(response.status === 200)
            {
                
                data = {
                    restraurant_events : response.data,
                    message : "Restraurants events have been fetched"
                }
                console.log("Respone is ------------------",data)
            }
            dispatch({type : GET_RESTRAURANT_EVENTS, data})
        })
    }
}
export function add_dish(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.defaults.withCredentials = true;
        axios.post(`${BACKEND}/addDish`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    dishUpdatedFlag : true,
                    message : "Dish has been added"
                }
            }
            dispatch({type : ADD_DISH, data})
        }).catch(err => {
            if(err)
            {
                console.log(err)
                notification["error"]({
                    message: 'Server Sider errorrr',
                    description:
                    'Please try again in few minutes',
                });
            }
        });
    }
}
export function update_dish(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.defaults.withCredentials = true;
        axios.post(`${BACKEND}/updateDish`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    dishUpdatedFlag : true,
                    message : "Dish has been updated"
                }
            }
            dispatch({type : UPDATE_DISH, data})
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
export function upload_dish_image(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.defaults.withCredentials = true;
        axios.post(`${BACKEND}/uploadDishImage`, payload).then(response => {
            var fileName = response.data.split('public').pop();
            data = {
                photoSrc : response.data,
                fileName : fileName
            }
            dispatch({type : UPLOAD_DISH_PICTURE, data})
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
export function get_users_of_an_event(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getUsersOfAnEvent`, payload).then(reponse => {
            if(reponse.status === 200)
            {
                data = {
                    message : "Users of an event fetched",
                    users_of_an_event : reponse.data
                }
            }
            dispatch({type : GET_USERS_OF_AN_EVENT, data})
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
export function update_order_status(payload)
{
    let data = {} 
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/updateOrderStatus`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Order status has been updated"
                }
            }
            dispatch({
                type : UPDATE_ORDER_STATUS,
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
        })
    }
}
export function update_restraurant_profile_details(payload)
{
    let data = {}
    return(dispatch) => {
        axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+ payload.location +"&key=AIzaSyDEoT0HSUWGh-5SZhH0QE7YzRiokTDFa4I").then(response => {
            payload.coords = response.data.results[0].geometry.location
            axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
            axios.post(`${BACKEND}/updateRestrauDetails`, payload).then(response => {
                if(response.status === 200)
                {
                    data = {
                        message : "Restraurant details updated"
                    }
                }
                dispatch({type : UPDATE_RESTRAURANT_PROFILE, data})
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
        })
    }
}
export function update_restraurant_photo(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/uploadRestrauProfilePic`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Photo Uploaded"
                }
            }
            dispatch({type : UPDATE_RESTRAURANT_PHOTO, data})
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
export function update_restraurant_images(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/uploadRestraurantImages`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Uploded restraurant images",
                    restraurant_image_name : response.data
                }
            }
            dispatch({type : UPDATE_RESTRAURANT_IMAGES, data})
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
export function get_restraurant_customer_details(payload)
{
    console.log("Trying to get customer details");
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getUserDetails`, payload).then(response => {
            console.log("response is -------------", response);
            if(response.status === 200)
            {
                console.log("response is -------------", response);
                data = {
                    message : "Customer details fetched",
                    restraurant_customer : response.data
                }
            }
            dispatch({type : GET_RESTRAURANT_CUSTOMER_DETAILS, data})
        }).catch(err => {
            console.log("errr", err)
        })
    }
}
export function add_event(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/addEvent`, payload).then(response => { 
            console.log("response is: ", response)
            if(response.status === 200)
            {
                
                setTimeout(() => {
                    notification["success"]({
                        message: 'Event added',
                        description:
                          'Event Successfully Added',
                      });
                })
                data = {
                    message : "Event Successfully Added"
                }
            }
            dispatch({type : ADD_EVENT, data})
        }).catch();
    }
}
export function insert_review(payload)
{
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/insertRestraurantReview`, payload).then(response => {
            if(response.status === 200)
            {
                notification["success"]({
                    message: 'Review added',
                    description:
                      'Review Successfully Added',
                  });
                data = {
                    message : "Review Inserted",
                    restraurant_review_stars : response.data.reviews_rating,
                    reviews_count : response.data.reviews_count
                }
                console.log("Review has been inserted with data", data);
                dispatch({type : INSERT_REVIEW, data})
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
export function add_restraurant_chat(payload)
{
    
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/addRestraurantChat`, payload).then(response => {
            
            if(response.status === 200)
            {
                data = {
                    message : "Chat Successfully added"
                }
                dispatch({type : ADD_CHAT, data});
            }
        })
    }
}
export function get_restraurant_chats(payload)
{
    let data = {}
    return(dispatch) => {
        console.log("Trying to get chats ")
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getRestraurantChats`, payload).then(response => {
            if(response.status === 200)
            {
                var result = [];
                for(let i = 0; i < response.data.length; i++)
                {
                    let chat = response.data[i];
                    let user = {
                        UserId : chat.customer_id
                    }

                    let temp = async () => {
                        const userResponse = await axios.post(`${BACKEND}/getUserDetails`, user)
                        return userResponse;
                    }
                    temp().then(userResponse => {
                        if(userResponse.status === 200)
                        {
                            chat = {...chat, customer : userResponse.data}
                            result.push(chat)
                            if(result.length === response.data.length)
                            {
                                data = {
                                    message : "Fetched restraurant chats", 
                                    restraurant_chats : result
                                }
                                dispatch({type : GET_RESTRAURANT_CHATS, data});
                            }
                        }
                    })
                }
            }
        })
    }
}
export function get_chat(payload)
{
    console.log("Getting chat")
    let data = {}
    return(dispatch) => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/getChat`, payload).then(response => {
            if(response.status === 200)
            {
                data = {
                    message : "Fetched a particular chat",
                    restraurant_customer_chat : response.data
                }
                dispatch({type : GET_CHAT, data})
            }
        })
    }
}
export function send_message(payload)
{
    let data = {}
    return(dispatch) => {
        console.log("Send message with pay,oad", payload)
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('jwtToken');
        axios.post(`${BACKEND}/sendMessage`, payload).then(response => {
            console.log("~~~~~~~~~~~` respone ise ~~~~~~~~`", response)
            if(response.status === 200)
            {
                data = {
                    message : "Message sent",
                    restraurant_customer_chat : response.data
                }
                dispatch({type : SEND_MESSAGE, data})
            }
        })
    }
}

