const {ObjectId} = require('mongodb');
var Carts = require('../../../Models/cartModel');

function handle_request(message, callback)
{
    Carts.remove({_id : ObjectId(message.cart_id)}, (err, result) => {
        if(err)
        {
            callback(null, 500);
        }
        else{
            callback(null, 200);
        }
    })
}

exports.handle_request = handle_request;