const {ObjectId} = require('mongodb');
var Carts = require('../../../Models/cartModel');

function handle_request(message, callback)
{
    Carts.updateOne({_id : ObjectId(message.cart_id)}, {$set : {
        quantity : message.quantity
    }}, (err, result) => {
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