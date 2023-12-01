var connection =  new require('./kafka/Connection');
var database = require('./database')
//topics files
//var signin = require('./services/signin.js');
var customer_sign_in = require('./services/Customers/CustomerAuthentication/customer_sign_in');
var customer_register = require('./services/Customers/CustomerAuthentication/register_customer');
var get_customer_details = require('./services/Customers/CustomerDetails/get_customer_details');
var update_customer_details = require('./services/Customers/CustomerDetails/update_customer_details');
var upload_profile_image = require('./services/Customers/CustomerDetails/upload_profile_image');
var register_restraurant = require('./services/Restraurants/RestraurantAuthentication/register_restraurant');
var restraurant_sign_in = require("./services/Restraurants/RestraurantAuthentication/restraurant_sign_in");
var get_restraurant_details = require('./services/Restraurants/RestraurantDetails/get_restraurant_details');
var update_restraurant_details = require('./services/Restraurants/RestraurantDetails/update_restraurant_details');
var update_restraurant_profile_image = require('./services/Restraurants/RestraurantDetails/update_restraurant_profile_image');
var add_dish = require('./services/Restraurants/DishDetails/add_dish');
var get_dishes = require('./services/Restraurants/DishDetails/get_dishes');
var get_dish_details = require('./services/Restraurants/DishDetails/get_dish_details');
var update_dish_details = require('./services/Restraurants/DishDetails/update_dish_details');
var get_all_restraurants = require('./services/Customers/Others/get_all_restraurants');
var add_item_to_cart = require('./services/Customers/CustomerCart/add_item_to_cart');
var get_user_cart_details = require('./services/Customers/CustomerCart/get_customer_cart_details');
var delete_cart_item = require('./services/Customers/CustomerCart/delete_cart_item');
var set_cart_item_quantity = require('./services/Customers/CustomerCart/set_cart_item_quantity');
var get_cart_item_details = require('./services/Customers/CustomerCart/get_cart_item_details');
var place_order = require("./services/Customers/CustomerOrders/place_order");
var get_customer_orders = require('./services/Customers/CustomerOrders/get_customer_orders');
var filter_customer_orders = require('./services/Customers/CustomerOrders/filter_customer_orders');
var get_restraurant_orders = require('./services/Restraurants/RestraurantOrders/get_restraurant_orders');
var update_order_status = require('./services/Restraurants/RestraurantOrders/update_order_status');
var filter_restraurant_orders = require('./services/Restraurants/RestraurantOrders/filter_restraurant_orders');
var add_event = require('./services/Restraurants/RestraurantEvents/add_event')
var get_restraurant_events = require('./services/Restraurants/RestraurantEvents/get_restraurant_events');
var get_all_events = require('./services/Customers/CustomerEvents/get_all_events');
var register_for_an_event = require('./services/Customers/CustomerEvents/register_for_an_event');
var get_user_events = require('./services/Customers/CustomerEvents/get_user_events');
var search_events = require('./services/Customers/CustomerEvents/search_events');
var insert_restraurant_review = require('./services/Customers/CustomerReviews/insert_restraurant_review');
var get_customer_reviews = require('./services/Customers/CustomerReviews/get_customer_reviews');
var get_restraurant_reviews = require('./services/Restraurants/RestraurantReviews/get_restraurant_reviews');
var search = require('./services/Customers/Filter/search');
var final_filter = require('./services/Customers/Filter/final_filter');
var upload_restraurant_images = require('./services/Restraurants/RestraurantDetails/upload_restraurant_images');
var get_restraurant_images = require('./services/Restraurants/RestraurantDetails/get_restraurant_images');
var add_chat = require('./services/Restraurants/Chat/add_chat');
var get_restraurant_chats = require('./services/Restraurants/Chat/get_restraurant_chats');
var get_chat = require('./services/Restraurants/Chat/get_chat');
var send_message = require('./services/Restraurants/Chat/send_message');
var get_customer_chats = require('./services/Customers/CustomerChats/get_customer_chats');
var get_all_customers = require('./services/Customers/CustomerFollowers/get_all_customers');
var follow_customer = require('./services/Customers/CustomerFollowers/follow_customer');
var search_customer = require('./services/Customers/CustomerFollowers/search_customer');
var get_customer_followers = require('./services/Customers/CustomerFollowers/get_customer_following');
var get_customet_location_filter = require('./services/Customers/CustomerFollowers/get_location_filter');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("customer_sign_in", customer_sign_in);
handleTopicRequest("register_customer", customer_register);
handleTopicRequest("get_customer_details", get_customer_details);
handleTopicRequest("update_customer_details", update_customer_details);
handleTopicRequest("upload_profile_image", upload_profile_image);
handleTopicRequest("register_restraurant", register_restraurant);
handleTopicRequest("restraurant_sign_in", restraurant_sign_in);
handleTopicRequest("get_restraurant_details", get_restraurant_details);
handleTopicRequest("update_restraurant_details", update_restraurant_details);
handleTopicRequest("update_restraurant_profile_image", update_restraurant_profile_image);
handleTopicRequest("add_dish", add_dish);
handleTopicRequest("get_dishes", get_dishes);
handleTopicRequest("get_dish_details", get_dish_details);
handleTopicRequest("update_dish_details", update_dish_details);
handleTopicRequest("get_all_restraurants", get_all_restraurants);
handleTopicRequest("add_item_to_cart", add_item_to_cart);
handleTopicRequest("get_user_cart_details", get_user_cart_details);
handleTopicRequest("delete_cart_item", delete_cart_item);
handleTopicRequest("set_cart_item_quantity", set_cart_item_quantity);
handleTopicRequest("get_cart_item_details", get_cart_item_details);
handleTopicRequest("place_order", place_order);
handleTopicRequest("get_customer_orders", get_customer_orders);
handleTopicRequest("filter_customer_orders", filter_customer_orders);
handleTopicRequest("get_restraurant_orders", get_restraurant_orders);
handleTopicRequest("update_order_status", update_order_status);
handleTopicRequest("filter_restraurant_orders", filter_restraurant_orders);
handleTopicRequest("add_event", add_event);
handleTopicRequest("get_restraurant_events", get_restraurant_events);
handleTopicRequest("get_all_events", get_all_events);
handleTopicRequest("register_for_an_event", register_for_an_event);
handleTopicRequest("get_user_events", get_user_events);
handleTopicRequest("search_events", search_events);
handleTopicRequest("insert_restraurant_review", insert_restraurant_review);
handleTopicRequest("get_customer_reviews", get_customer_reviews);
handleTopicRequest("get_restraurant_reviews", get_restraurant_reviews);
handleTopicRequest("search", search);
handleTopicRequest("final_filter", final_filter);
handleTopicRequest("upload_restraurant_images", upload_restraurant_images);
handleTopicRequest("get_restraurant_images", get_restraurant_images);
handleTopicRequest("add_chat", add_chat);
handleTopicRequest("get_restraurant_chats", get_restraurant_chats);
handleTopicRequest("get_chat", get_chat);
handleTopicRequest("send_message", send_message);
handleTopicRequest("get_customer_chats", get_customer_chats);
handleTopicRequest("get_all_customers", get_all_customers);
handleTopicRequest("follow_customer", follow_customer);
handleTopicRequest("search_customer", search_customer);
handleTopicRequest("get_customer_followers", get_customer_followers);
handleTopicRequest("get_customet_location_filter", get_customet_location_filter)