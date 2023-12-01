const {ObjectId} = require('mongodb');
var Carts = require('../../../Models/cartModel');

function handle_request(message, callback)
{
    message.dish_id = ObjectId(message.dish_id);
    message.restraurant_id = ObjectId(message.restraurant_id);
    message.user_id = ObjectId(message.user_id);
    Carts.create(message, (err, cart) => {
        if(err)
        {
            callback(null, 500);
        }
        if(cart)
        {
            callback(null, 200);
        }
    })
}
exports.handle_request = handle_request;