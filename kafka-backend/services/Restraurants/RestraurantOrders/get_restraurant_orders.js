const {ObjectId} = require('mongodb');
var Orders = require('../../../Models/orderModel');

function handle_request(message, callback)
{
    Orders.find({restraurant_id : ObjectId(message.restraurant_id)}, (err, orders) => {
        var response = {}
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else
        {
            response.code = 200;
            response.data = orders;
        }
        callback(null, response);
    })
}

exports.handle_request = handle_request;