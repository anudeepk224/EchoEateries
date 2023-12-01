import { message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { CUSTOMER_LOGIN, CUSTOMER_PROFILE, CUSTOMER_SIGNUP, UPDATE_CUSTOMER, LOGOUT_CUSTOMER, GET_RESTRAURANT, SEARCH_RESTRAURANT, FILTER_DELIVERY_RESTRAURANT, FILTER_NEIGHORHOOD_RESTRAURANT, FINAL_FILTER, CUSTOMRE_ORDERS, FILTER_CUSTOMER_ORDERS, CUSTOMER_EVENTS, SEARCH_CUSTOMER_EVENTS, CUSTOMER_REGISTERED_EVENTS, CUSTOMER_REVIEWS, USER_CART_DETAILS, GET_CUSTOMER_RESTRAURANT_DETAILS, GET_CUSTOMER_RESTRAURANT_DISHES, RESTRAURANT_SIGN_IN, REGISTER_RESTRAURANT, GET_RESTRAURANT_DETAILS, GET_RESTRAURANT_DISHES, GET_CURRENT_DISH_DETAILS, GET_RESTRAURANT_ORDERS, FILTER_RESTRAURANT_ORDERS, GET_RESTRAURANT_REVIEWS, GET_RESTRAURANT_EVENTS, ADD_DISH, UPDATE_DISH, UPLOAD_DISH_PICTURE, DELETE_CART_ITEM, PLACE_ORDER, GET_CUSTOMER_CURRENT_DISH_DETAILS, SET_CART_ITEM_QUANTITY, GET_CURRENT_CART_ITEM_DETAILS, REGISTER_FOR_AN_EVENT, ADD_ITEM_TO_CART, GET_USERS_OF_AN_EVENT, UPDATE_ORDER_STATUS, GET_CUSTOMER_RESTRAURANT_IMAGES, UPDATE_RESTRAURANT_PROFILE, UPDATE_USER_PHOTO, UPDATE_RESTRAURANT_PHOTO, UPDATE_RESTRAURANT_IMAGES, GET_RESTRAURANT_CUSTOMER_DETAILS, ADD_EVENT, INSERT_REVIEW, ADD_CHAT, GET_RESTRAURANT_CHATS, GET_CHAT, SEND_MESSAGE, GET_CUSTOMER_CHATS, GET_ALL_CUSTOMERS, FOLLOW_CUSTOMER, SEARCH_CUSTOMER, GET_CUSTOMER_FOLLOWERS, GET_CUSTOMER_LOCATION_FILTER} from '../constants/action-types'

const initialState = {
    
  };

function rootReducer(state = initialState, action)
{
    if (action.type === CUSTOMER_LOGIN) {
             return Object.assign({},state,{
              user_id: action.data.user_id,
              message : action.data.message,
              authFlag : action.data.authFlag,
              user : action.data.user,
            })
      }
    else if(action.type === CUSTOMER_PROFILE)
    {
        return Object.assign({},state,{
            user : action.data.user,
            message : action.data.message,
            authFlag : action.data.authFlag,
            userUpdatedFlag : action.data.userUpdatedFlag
          })
    }  
    else if(action.type === CUSTOMER_SIGNUP)
    {
        return Object.assign({},state,{
            message : action.data.message
          })
    }
    else if(action.type === UPDATE_CUSTOMER)
    {
      return Object.assign({},state,{
        message : action.data.message,
        userUpdatedFlag : action.data.userUpdatedFlag
      })
    }
    else if(action.type === LOGOUT_CUSTOMER)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        authFlag : action.data.authFlag,
        first_name : action.data.first_name,
        last_name : action.data.last_name,
        fullname : action.data.full_name,
        email : action.data.email,
        phoneNumber : action.data.phoneNumber ,
        nick_name : action.data.nick_name,
        birthday : action.data.birthday,
        headline : action.data.headline,
        city : action.data.headline,
        state : action.data.state,
        country : action.data.country,
        zip_code : action.data.zip_code,
        things_i_love : action.data.things_i_love,
        blog : action.data.blog,
        yelping_since : action.data.yelping_since,
        favourites : action.data.favourites,
      })
    }
    else if(action.type === GET_RESTRAURANT)
    {
      return Object.assign({}, state, {
        restraurants : action.data.restraurants,
        message  : "Fetched all the restraurants"
      })
    }
    else if(action.type === SEARCH_RESTRAURANT)
    {
      return Object.assign({}, state, {
        restraurants : action.data.restraurants,
        message : action.data.message
      })
    }
    else if(action.type === FILTER_DELIVERY_RESTRAURANT)
    {
      console.log("HEY inside reducers")
      return Object.assign({}, state, {
        restraurants : action.data.restraurants
      })
    }
    else if(action.type === FILTER_NEIGHORHOOD_RESTRAURANT)
    {
      console.log("HEY inside reducers")
      return Object.assign({}, state, {
        restraurants : action.data.restraurants
      })
    }
    else if(action.type === FINAL_FILTER)
    {
      console.log("HEY inside reducers")
      return Object.assign({}, state, {
        restraurants : action.data.restraurants,
        message : action.data.message
      })
    }
    else if(action.type === CUSTOMRE_ORDERS)
    {
      return Object.assign({}, state, {
        customer_orders : action.data.customer_orders,
        message : action.data.message
      })
    }
    else if(action.type === FILTER_CUSTOMER_ORDERS)
    {
      return Object.assign({}, state, {
        customer_orders : action.data.customer_orders,
        message : action.data.message
      })
    }
    else if(action.type === CUSTOMER_EVENTS)
    {
      return Object.assign({}, state, {
        customer_events : action.data.customer_events,
        message : action.data.message
      })
    }
    else if(action.type === SEARCH_CUSTOMER_EVENTS)
    {
      return Object.assign({}, state, {
        customer_events : action.data.customer_events,
        message : action.data.message
      })
    }
    else if(action.type === CUSTOMER_REGISTERED_EVENTS)
    {
      return Object.assign({}, state, {
        customer_registered_events : action.data.customer_registered_events,
        message : action.data.message
      })
    }
    else if(action.type === CUSTOMER_REVIEWS)
    {
      return Object.assign({}, state, {
        customer_reviews : action.data.customer_reviews,
        message : action.data.message
      })
    }
    else if(action.type === USER_CART_DETAILS)
    {
      return Object.assign({}, state, {
        cartItems : action.data.cartItems,
        message : action.data.message
      })
    }
    else if(action.type === GET_CUSTOMER_RESTRAURANT_DETAILS)
    {
      return Object.assign({}, state, {
        customer_restraurant : action.data.customer_restraurant,
        message : action.data.message
      })
    }
    else if(action.type === GET_CUSTOMER_RESTRAURANT_DISHES)
    {
      return Object.assign({}, state, {
        customer_restraurant_dishes : action.data.customer_restraurant_dishes,
        message : action.data.message
      })
    }
    else if(action.type === RESTRAURANT_SIGN_IN)
    {
        return Object.assign({}, state, {
            message : action.data.message,
            restraurant_id : action.data.restraurant_id
        })
    }
    else if(action.type === REGISTER_RESTRAURANT)
    {
      return Object.assign({}, state, {
        message : action.data.message
      })
    }
    else if(action.type === GET_RESTRAURANT_DETAILS)
    {
      return Object.assign({}, state, {
        restraurant : action.data.restraurant,
        message : action.data.message
      })
    }
    else if(action.type === GET_RESTRAURANT_DISHES)
    {
      return Object.assign({}, state, {
        restraurant_dishes : action.data.restraurant_dishes,
        message : action.data.message
      })
    }
    else if(action.type === GET_CURRENT_DISH_DETAILS)
    {
      return Object.assign({}, state, {
        current_dish_details : action.data.current_dish_details,
        dishUpdatedFlag : action.data.dishUpdatedFlag,
        message : action.data.message
      })
    }
    else if(action.type === GET_RESTRAURANT_ORDERS)
    {
      return Object.assign({}, state, {
        restraurant_orders : action.data.restraurant_orders,
        message : action.data.message
      })
    }
    else if(action.type === FILTER_RESTRAURANT_ORDERS)
    {
      return Object.assign({}, state, {
        restraurant_orders : action.data.restraurant_orders,
        message : action.data.message
      })
    }
    else if(action.type === GET_RESTRAURANT_REVIEWS)
    {
      return Object.assign({}, state, {
        restraurant_reviews : action.data.restraurant_reviews,
        message : action.data.message
      })
    }
    else if(action.type === GET_RESTRAURANT_EVENTS)
    {
      return Object.assign({}, state, {
        restraurant_events : action.data.restraurant_events,
        message : action.data.message
      })
    }
    else if(action.type === ADD_DISH)
    {
      return Object.assign({}, state, {
        dishUpdatedFlag : action.data.dishUpdatedFlag,
        message : action.data.message
      })
    }
    else if(action.type === UPDATE_DISH)
    {
      return Object.assign({}, state, {
        dishUpdatedFlag : action.data.dishUpdatedFlag,
        message : action.data.message
      })
    }
    else if(action.type === UPLOAD_DISH_PICTURE)
    {
      return Object.assign({}, state, {
        photoSrc : action.data.photoSrc,
        fileName : action.data.fileName
      })
    }
    else if(action.type === DELETE_CART_ITEM)
    {
      return Object.assign({}, state, {
        message : action.data.message
      })
    }
    else if(action.type === PLACE_ORDER)
    {
      return Object.assign({}, state, {
        message : action.data.message
      })
    }
    else if(action.type === GET_CUSTOMER_CURRENT_DISH_DETAILS)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        customer_current_dish_details : action.data.customer_current_dish_details
      })
    }
    else if(action.type === SET_CART_ITEM_QUANTITY)
    {
      return Object.assign({}, state, {
        message: action.data.message
      })
    }
    else if(action.type === GET_CURRENT_CART_ITEM_DETAILS)
    {
      return Object.assign({}, state, {
        current_cart_item_details : action.data.current_cart_item_details,
        message : action.data.message
      })
    }
    else if(action.type === REGISTER_FOR_AN_EVENT)
    {
      return Object.assign({}, state, {
        message : action.data.message
      })
    }
    else if(action.type === ADD_ITEM_TO_CART)
    {
      return Object.assign({}, state, {
        message : action.data.message
      })
    }
    else if(action.type === GET_USERS_OF_AN_EVENT)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        users_of_an_event : action.data.users_of_an_event
      })
    }
    else if(action.type === UPDATE_ORDER_STATUS)
    {
      return Object.assign({}, state, {
        message : action.data.message,
      })
    }
    else if(action.type === GET_CUSTOMER_RESTRAURANT_IMAGES)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        customer_restraurant_images : action.data.customer_restraurant_images
      })
    }
    else if(action.type === UPDATE_RESTRAURANT_PROFILE)
    {
      return Object.assign({}, state, {
        message : action.data.message
      })
    }
    else if(action.type === UPDATE_USER_PHOTO)
    {
      return Object.assign({}, state, {
        message : action.data.message
      })
    }
    else if(action.type === UPDATE_RESTRAURANT_PHOTO)
    {
      return Object.assign({}, state, {
        message : action.data.message
      })
    }
    else if(action.type === UPDATE_RESTRAURANT_IMAGES)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        restraurant_image_name : action.data.restraurant_image_name
      })
    }
    else if(action.type === GET_RESTRAURANT_CUSTOMER_DETAILS)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        restraurant_customer : action.data.restraurant_customer
      })
    }
    else if(action.type === ADD_EVENT)
    {
      return Object.assign({}, state, {
        message : action.data.message
      })
    }
    else if(action.type === INSERT_REVIEW)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        restraurant_review_stars : action.data.restraurant_review_stars,
        reviews_count : action.data.reviews_count
      })
    }
    else if(action.type === ADD_CHAT)
    {
      return Object.assign({}, state, {
        message : action.data.message
      })
    }
    else if(action.type === GET_RESTRAURANT_CHATS)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        restraurant_chats : action.data.restraurant_chats
      })
    }
    else if(action.type === GET_CHAT)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        restraurant_customer_chat : action.data.restraurant_customer_chat
      })
    }
    else if(action.type === SEND_MESSAGE)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        restraurant_customer_chat : action.data.restraurant_customer_chat
      })
    }
    else if(action.type === GET_CUSTOMER_CHATS)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        customer_chats : action.data.customer_chats
      })
    }
    else if(action.type === GET_ALL_CUSTOMERS)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        customers : action.data.customers
      })
    }
    else if(action.type === FOLLOW_CUSTOMER)
    {
      return Object.assign({}, state, {
        message : action.data.message
      })
    }
    else if(action.type === SEARCH_CUSTOMER)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        customers : action.data.customers
      })
    }
    else if(action.type === GET_CUSTOMER_FOLLOWERS)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        customers : action.data.customers
      })
    }
    else if(action.type === GET_CUSTOMER_LOCATION_FILTER)
    {
      return Object.assign({}, state, {
        message : action.data.message,
        customers : action.data.customers
      })
    }
    return state;  
}

export default rootReducer;