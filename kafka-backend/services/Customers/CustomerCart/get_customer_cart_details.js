const {ObjectId} = require('mongodb');
var Carts = require('../../../Models/cartModel');

function handle_request(message, callback)
{
    Carts.find({user_id : ObjectId(message.user_id), is_active : "yes"}, (err, result) => {
        if(err)
        {
            callback(null, 500);
        }
        else{
            callback(null, result);
        }
    })
}

exports.handle_request = handle_request;