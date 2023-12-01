const {ObjectId} = require('mongodb');
var Carts = require('../../../Models/cartModel');

function handle_request(message, callback)
{

    Carts.findOne({_id : ObjectId(message.cart_id)}, (err, cart) => {
        if(err)
        {
            console.log("----------------------------error is------------------------", err)
            callback(null, 500);
        }
        else{
            console.log("-------------------- Cart is ----------------------", cart);
            callback(null, cart);
        }
    })
}
exports.handle_request = handle_request;