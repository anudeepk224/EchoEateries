const {ObjectId} = require('mongodb');
var Orders = require('../../../Models/orderModel');

function handle_request(message, calback)
{
    Orders.updateOne({_id : ObjectId(message.order_id)} , {$set : {
        status : message.status
    }}, (err, result) => {
        var response = {};
        if(err)
        {
            response.code = 500;
            response.data = err;
        }
        else{
            response.code = 200;
        }
        calback(null, response);
    })
}
exports.handle_request = handle_request;